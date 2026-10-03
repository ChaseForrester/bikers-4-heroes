"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { useStore } from "@/lib/store";
import { slugify } from "@/lib/seed";
import { uid } from "@/lib/utils";
import type { CharityEvent } from "@/lib/types";

function blankEvent(): CharityEvent {
    return {
        id: uid("evt"),
        slug: "",
        title: "",
        subtitle: "",
        date: new Date().toISOString().slice(0, 10),
        time: "",
        location: "",
        address: "",
        description: "",
        details: "",
        featured: false,
        status: "upcoming",
        image: "/gallery/bikes-lineup.jpg",
        gallery: [],
        facebookUrl: "https://www.facebook.com/bikers4heroes",
        ticketUrl: "",
        price: "",
        category: "Fundraiser",
    };
}

export default function EventEditorPage() {
    const { id } = useParams<{ id: string }>();
    const isNew = id === "new";
    const { events, saveEvent, uploadImage } = useStore();
    const router = useRouter();
    const existing = events.find((e) => e.id === id);
    const [form, setForm] = useState<CharityEvent>(blankEvent);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (existing) setForm(existing);
    }, [existing]);

    function set<K extends keyof CharityEvent>(key: K, value: CharityEvent[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function onImage(file: File | undefined, field: "image" | "gallery") {
        if (!file) return;
        const url = await uploadImage(file);
        if (field === "image") set("image", url);
        else set("gallery", [...form.gallery, url]);
    }

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setBusy(true);
        await saveEvent({
            ...form,
            slug: form.slug || slugify(form.title),
        });
        setBusy(false);
        router.push("/admin/events");
    }

    return (
        <AdminShell>
            <h1 className="font-display text-5xl tracking-wide">{isNew ? "New event" : "Edit event"}</h1>
            <form onSubmit={onSubmit} className="mt-8 grid max-w-3xl gap-4">
                <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
                <input className="admin-input" placeholder="Subtitle" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
                <div className="grid gap-4 sm:grid-cols-2">
                    <input className="admin-input" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required />
                    <input className="admin-input" placeholder="Time" value={form.time} onChange={(e) => set("time", e.target.value)} />
                </div>
                <input className="admin-input" placeholder="Location" value={form.location} onChange={(e) => set("location", e.target.value)} />
                <input className="admin-input" placeholder="Address" value={form.address} onChange={(e) => set("address", e.target.value)} />
                <div className="grid gap-4 sm:grid-cols-2">
                    <input className="admin-input" placeholder="Category" value={form.category} onChange={(e) => set("category", e.target.value)} />
                    <input className="admin-input" placeholder="Price / ticket note" value={form.price ?? ""} onChange={(e) => set("price", e.target.value)} />
                </div>
                <textarea className="admin-input" rows={4} placeholder="Short description" value={form.description} onChange={(e) => set("description", e.target.value)} />
                <textarea className="admin-input" rows={5} placeholder="Full details" value={form.details} onChange={(e) => set("details", e.target.value)} />
                <input className="admin-input" placeholder="Facebook URL" value={form.facebookUrl ?? ""} onChange={(e) => set("facebookUrl", e.target.value)} />
                <input className="admin-input" placeholder="Ticket / register URL" value={form.ticketUrl ?? ""} onChange={(e) => set("ticketUrl", e.target.value)} />
                <label className="flex items-center gap-3 text-sm">
                    <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
                    Featured on homepage (event page hero)
                </label>
                <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-parchment/50">Cover image</p>
                    <img src={form.image} alt="" className="mb-3 h-36 w-full rounded-xl object-cover" />
                    <input type="file" accept="image/*" onChange={(e) => onImage(e.target.files?.[0], "image")} />
                </div>
                <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-parchment/50">Gallery</p>
                    <div className="mb-3 flex flex-wrap gap-2">
                        {form.gallery.map((src) => (
                            <img key={src} src={src} alt="" className="h-20 w-20 rounded-lg object-cover" />
                        ))}
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => onImage(e.target.files?.[0], "gallery")} />
                </div>
                <button disabled={busy} className="rounded-full bg-gold-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950">
                    {busy ? "Saving…" : "Save event"}
                </button>
            </form>
        </AdminShell>
    );
}
