"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firebaseEnabled } from "./firebase";

const SESSION_KEY = "b4h-super-admin";

type AuthState = {
    ready: boolean;
    isAdmin: boolean;
    email: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

const localEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@bikers4heroes.org";
const localPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "HeroesRide4Kids";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (firebaseEnabled && auth) {
            const unsub = onAuthStateChanged(auth, (user) => {
                setIsAdmin(Boolean(user));
                setEmail(user?.email ?? null);
                setReady(true);
            });
            return () => unsub();
        }
        const saved = localStorage.getItem(SESSION_KEY);
        if (saved) {
            setIsAdmin(true);
            setEmail(saved);
        }
        setReady(true);
    }, []);

    const login = useCallback(async (inputEmail: string, password: string) => {
        if (firebaseEnabled && auth) {
            await signInWithEmailAndPassword(auth, inputEmail, password);
            return;
        }
        if (
            inputEmail.trim().toLowerCase() === localEmail.toLowerCase() &&
            password === localPassword
        ) {
            localStorage.setItem(SESSION_KEY, inputEmail);
            setIsAdmin(true);
            setEmail(inputEmail);
            return;
        }
        throw new Error("Those details don’t match the super admin account.");
    }, []);

    const logout = useCallback(async () => {
        if (firebaseEnabled && auth) {
            await signOut(auth);
        }
        localStorage.removeItem(SESSION_KEY);
        setIsAdmin(false);
        setEmail(null);
    }, []);

    const value = useMemo(
        () => ({ ready, isAdmin, email, login, logout }),
        [ready, isAdmin, email, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
