"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useStore } from "@/lib/store";

export default function ContentPage() {
    const { site, saveSite, uploadImage, ready } = useStore();
    const [form, setForm] = useState(site);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (ready) setForm(site);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready]);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        await saveSite(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <AdminShell>
            <h1 className="font-display text-5xl tracking-wide">Website copy</h1>
            <p className="mt-2 text-sm text-parchment/60">Mission, tagline, stats, Facebook link and hero image.</p>
            <form onSubmit={onSubmit} className="mt-8 grid max-w-3xl gap-4">
                <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="admin-input" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
                <input className="admin-input" value={form.facebookUrl} onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })} />
                <input className="admin-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <textarea className="admin-input" rows={4} value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} />
                <textarea className="admin-input" rows={4} value={form.storyShort} onChange={(e) => setForm({ ...form, storyShort: e.target.value })} />
                <textarea className="admin-input" rows={12} value={form.storyLong} onChange={(e) => setForm({ ...form, storyLong: e.target.value })} />
                <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-parchment/50">Hero image</p>
                    <img src={form.heroImage} alt="" className="mb-3 h-40 w-full rounded-xl object-cover" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = await uploadImage(file);
                            setForm((f) => ({ ...f, heroImage: url }));
                        }}
                    />
                </div>
                {form.stats.map((s, i) => (
                    <div key={i} className="grid grid-cols-2 gap-3">
                        <input
                            className="admin-input"
                            value={s.value}
                            onChange={(e) => {
                                const stats = [...form.stats];
                                stats[i] = { ...stats[i], value: e.target.value };
                                setForm({ ...form, stats });
                            }}
                        />
                        <input
                            className="admin-input"
                            value={s.label}
                            onChange={(e) => {
                                const stats = [...form.stats];
                                stats[i] = { ...stats[i], label: e.target.value };
                                setForm({ ...form, stats });
                            }}
                        />
                    </div>
                ))}
                <button className="rounded-full bg-gold-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950">
                    {saved ? "Saved" : "Save copy"}
                </button>
            </form>
        </AdminShell>
    );
}
