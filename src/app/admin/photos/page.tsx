"use client";

import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useStore } from "@/lib/store";
import { uid } from "@/lib/utils";

export default function AdminPhotosPage() {
    const { photos, events, savePhoto, deletePhoto, uploadImage } = useStore();
    const [busy, setBusy] = useState(false);
    const [caption, setCaption] = useState("");
    const [eventId, setEventId] = useState("");
    const [featured, setFeatured] = useState(true);

    async function onUpload(file: File | undefined) {
        if (!file) return;
        setBusy(true);
        const src = await uploadImage(file);
        await savePhoto({
            id: uid("ph"),
            src,
            alt: caption || file.name,
            caption: caption || "Bikers 4 Heroes",
            featured,
            eventId: eventId || undefined,
        });
        setCaption("");
        setBusy(false);
    }

    return (
        <AdminShell>
            <h1 className="font-display text-5xl tracking-wide">Photos</h1>
            <p className="mt-2 text-sm text-parchment/60">
                Upload new shots. Featured photos appear on the homepage mosaic.
            </p>
            <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-ink-800 p-5 md:grid-cols-2">
                <input
                    className="admin-input"
                    placeholder="Caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <select className="admin-input" value={eventId} onChange={(e) => setEventId(e.target.value)}>
                    <option value="">No event link</option>
                    {events.map((e) => (
                        <option key={e.id} value={e.id}>
                            {e.title}
                        </option>
                    ))}
                </select>
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                    Featured
                </label>
                <input type="file" accept="image/*" disabled={busy} onChange={(e) => onUpload(e.target.files?.[0])} />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {photos.map((p) => (
                    <figure key={p.id} className="overflow-hidden rounded-2xl border border-white/10">
                        <img src={p.src} alt={p.alt} className="h-36 w-full object-cover" />
                        <figcaption className="flex items-center justify-between gap-2 p-3 text-xs">
                            <span className="line-clamp-2 text-parchment/70">{p.caption}</span>
                            <button className="text-crimson-400" onClick={() => deletePhoto(p.id)}>
                                Delete
                            </button>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </AdminShell>
    );
}
