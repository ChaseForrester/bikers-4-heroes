"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    collection,
    doc,
    onSnapshot,
    setDoc,
    deleteDoc,
    writeBatch,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, firebaseEnabled, storage } from "./firebase";
import { SEED, slugify } from "./seed";
import type {
    AppState,
    CharityEvent,
    ContactMessage,
    DonationEntry,
    DonationState,
    Photo,
    SiteContent,
} from "./types";
import { uid } from "./utils";

const LOCAL_KEY = "b4h-cms-state-v1";

type Store = AppState & {
    ready: boolean;
    firebaseLive: boolean;
    saveSite: (site: SiteContent) => Promise<void>;
    saveEvent: (event: CharityEvent) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    savePhoto: (photo: Photo) => Promise<void>;
    deletePhoto: (id: string) => Promise<void>;
    addMessage: (message: Omit<ContactMessage, "id" | "createdAt" | "read">) => Promise<void>;
    markMessageRead: (id: string) => Promise<void>;
    deleteMessage: (id: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string>;
    resetToSeed: () => Promise<void>;
    saveDonations: (donations: DonationState) => Promise<void>;
    addDonation: (entry: Omit<DonationEntry, "id">) => Promise<void>;
    deleteDonation: (id: string) => Promise<void>;
};

const StoreContext = createContext<Store | null>(null);

function loadLocal(): AppState {
    if (typeof window === "undefined") return SEED;
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (!raw) return SEED;
        const parsed = JSON.parse(raw) as Partial<AppState>;
        return {
            events: parsed.events?.length ? parsed.events : SEED.events,
            photos: parsed.photos?.length ? parsed.photos : SEED.photos,
            site: parsed.site ? { ...SEED.site, ...parsed.site } : SEED.site,
            messages: parsed.messages ?? [],
            donations: parsed.donations
                ? { ...SEED.donations, ...parsed.donations, log: parsed.donations.log ?? [] }
                : SEED.donations,
        };
    } catch {
        return SEED;
    }
}

function persistLocal(state: AppState) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AppState>(SEED);
    const [ready, setReady] = useState(false);
    const [firebaseLive, setFirebaseLive] = useState(false);

    useEffect(() => {
        const local = loadLocal();
        setState(local);
        setReady(true);

        if (!firebaseEnabled || !db) return;

        const unsubEvents = onSnapshot(collection(db, "events"), (snap) => {
            if (snap.empty) return;
            const events = snap.docs.map((d) => d.data() as CharityEvent);
            setState((s) => {
                const next = { ...s, events };
                persistLocal(next);
                return next;
            });
            setFirebaseLive(true);
        });

        const unsubPhotos = onSnapshot(collection(db, "photos"), (snap) => {
            if (snap.empty) return;
            const photos = snap.docs.map((d) => d.data() as Photo);
            setState((s) => {
                const next = { ...s, photos };
                persistLocal(next);
                return next;
            });
            setFirebaseLive(true);
        });

        const unsubSite = onSnapshot(doc(db, "site", "content"), (snap) => {
            if (!snap.exists()) return;
            const site = snap.data() as SiteContent;
            setState((s) => {
                const next = { ...s, site };
                persistLocal(next);
                return next;
            });
            setFirebaseLive(true);
        });

        const unsubMessages = onSnapshot(collection(db, "messages"), (snap) => {
            const messages = snap.docs.map((d) => d.data() as ContactMessage);
            setState((s) => {
                const next = { ...s, messages };
                persistLocal(next);
                return next;
            });
        });

        const unsubDonations = onSnapshot(doc(db, "site", "donations"), (snap) => {
            if (!snap.exists()) return;
            const donations = snap.data() as DonationState;
            setState((s) => {
                const next = { ...s, donations: { ...SEED.donations, ...donations, log: donations.log ?? [] } };
                persistLocal(next);
                return next;
            });
            setFirebaseLive(true);
        });

        return () => {
            unsubEvents();
            unsubPhotos();
            unsubSite();
            unsubMessages();
            unsubDonations();
        };
    }, []);

    const commit = useCallback(async (next: AppState) => {
        setState(next);
        persistLocal(next);
    }, []);

    const saveSite = useCallback(
        async (site: SiteContent) => {
            await commit({ ...state, site });
            if (db) await setDoc(doc(db, "site", "content"), site);
        },
        [commit, state]
    );

    const saveEvent = useCallback(
        async (event: CharityEvent) => {
            const today = new Date().toISOString().slice(0, 10);
            const normalised: CharityEvent = {
                ...event,
                slug: event.slug || slugify(event.title),
                status: event.date >= today ? "upcoming" : "past",
            };
            const events = state.events.some((e) => e.id === normalised.id)
                ? state.events.map((e) => (e.id === normalised.id ? normalised : e))
                : [normalised, ...state.events];
            await commit({ ...state, events });
            if (db) await setDoc(doc(db, "events", normalised.id), normalised);
        },
        [commit, state]
    );

    const deleteEvent = useCallback(
        async (id: string) => {
            const events = state.events.filter((e) => e.id !== id);
            await commit({ ...state, events });
            if (db) await deleteDoc(doc(db, "events", id));
        },
        [commit, state]
    );

    const savePhoto = useCallback(
        async (photo: Photo) => {
            const photos = state.photos.some((p) => p.id === photo.id)
                ? state.photos.map((p) => (p.id === photo.id ? photo : p))
                : [photo, ...state.photos];
            await commit({ ...state, photos });
            if (db) await setDoc(doc(db, "photos", photo.id), photo);
        },
        [commit, state]
    );

    const deletePhoto = useCallback(
        async (id: string) => {
            const photos = state.photos.filter((p) => p.id !== id);
            await commit({ ...state, photos });
            if (db) await deleteDoc(doc(db, "photos", id));
        },
        [commit, state]
    );

    const addMessage = useCallback(
        async (input: Omit<ContactMessage, "id" | "createdAt" | "read">) => {
            const message: ContactMessage = {
                ...input,
                id: uid("msg"),
                createdAt: new Date().toISOString(),
                read: false,
            };
            const messages = [message, ...state.messages];
            await commit({ ...state, messages });
            if (db) await setDoc(doc(db, "messages", message.id), message);
        },
        [commit, state]
    );

    const markMessageRead = useCallback(
        async (id: string) => {
            const messages = state.messages.map((m) =>
                m.id === id ? { ...m, read: true } : m
            );
            await commit({ ...state, messages });
            const found = messages.find((m) => m.id === id);
            if (db && found) await setDoc(doc(db, "messages", id), found);
        },
        [commit, state]
    );

    const deleteMessage = useCallback(
        async (id: string) => {
            const messages = state.messages.filter((m) => m.id !== id);
            await commit({ ...state, messages });
            if (db) await deleteDoc(doc(db, "messages", id));
        },
        [commit, state]
    );

    const uploadImage = useCallback(async (file: File) => {
        if (storage) {
            const path = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
            const fileRef = ref(storage, path);
            await uploadBytes(fileRef, file);
            return getDownloadURL(fileRef);
        }
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
    }, []);

    const saveDonations = useCallback(
        async (donations: DonationState) => {
            await commit({ ...state, donations });
            if (db) await setDoc(doc(db, "site", "donations"), donations);
        },
        [commit, state]
    );

    const addDonation = useCallback(
        async (input: Omit<DonationEntry, "id">) => {
            const entry: DonationEntry = { ...input, id: uid("don") };
            const donations: DonationState = {
                ...state.donations,
                raised: Number((state.donations.raised + entry.amount).toFixed(2)),
                log: [entry, ...state.donations.log],
            };
            await saveDonations(donations);
        },
        [saveDonations, state.donations]
    );

    const deleteDonation = useCallback(
        async (id: string) => {
            const found = state.donations.log.find((e) => e.id === id);
            const donations: DonationState = {
                ...state.donations,
                raised: Number((state.donations.raised - (found?.amount ?? 0)).toFixed(2)),
                log: state.donations.log.filter((e) => e.id !== id),
            };
            await saveDonations(donations);
        },
        [saveDonations, state.donations]
    );

    const resetToSeed = useCallback(async () => {
        await commit(SEED);
        if (!db) return;
        const firestore = db;
        const batch = writeBatch(firestore);
        SEED.events.forEach((e) => batch.set(doc(firestore, "events", e.id), e));
        SEED.photos.forEach((p) => batch.set(doc(firestore, "photos", p.id), p));
        batch.set(doc(firestore, "site", "content"), SEED.site);
        batch.set(doc(firestore, "site", "donations"), SEED.donations);
        await batch.commit();
    }, [commit]);

    const value = useMemo<Store>(
        () => ({
            ...state,
            ready,
            firebaseLive,
            saveSite,
            saveEvent,
            deleteEvent,
            savePhoto,
            deletePhoto,
            addMessage,
            markMessageRead,
            deleteMessage,
            uploadImage,
            resetToSeed,
            saveDonations,
            addDonation,
            deleteDonation,
        }),
        [
            state,
            ready,
            firebaseLive,
            saveSite,
            saveEvent,
            deleteEvent,
            savePhoto,
            deletePhoto,
            addMessage,
            markMessageRead,
            deleteMessage,
            uploadImage,
            resetToSeed,
            saveDonations,
            addDonation,
            deleteDonation,
        ]
    );

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error("useStore must be used within StoreProvider");
    return ctx;
}

export function useUpcomingEvents() {
    const { events } = useStore();
    const today = new Date().toISOString().slice(0, 10);
    return [...events]
        .filter((e) => e.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date));
}

export function usePastEvents() {
    const { events } = useStore();
    const today = new Date().toISOString().slice(0, 10);
    return [...events]
        .filter((e) => e.date < today)
        .sort((a, b) => b.date.localeCompare(a.date));
}

export function useFeaturedEvent() {
    const upcoming = useUpcomingEvents();
    return upcoming.find((e) => e.featured) ?? upcoming[0] ?? null;
}
