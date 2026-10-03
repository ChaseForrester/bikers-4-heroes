"use client";

import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { usePastEvents, useStore, useUpcomingEvents } from "@/lib/store";
import { firebaseEnabled } from "@/lib/firebase";

export default function DashboardPage() {
    const { photos, messages, firebaseLive, events, donations } = useStore();
    const upcoming = useUpcomingEvents();
    const past = usePastEvents();
    const unread = messages.filter((m) => !m.read).length;

    const cards = [
        { label: "Upcoming events", value: upcoming.length, href: "/admin/events" },
        { label: "Past events", value: past.length, href: "/admin/events" },
        { label: "Photos", value: photos.length, href: "/admin/photos" },
        { label: "Unread messages", value: unread, href: "/admin/messages" },
        { label: `${donations.year} raised`, value: `$${Math.round(donations.raised).toLocaleString("en-AU")}`, href: "/admin/donations" },
    ];

    return (
        <AdminShell>
            <h1 className="font-display text-5xl tracking-wide">HQ</h1>
            <p className="mt-2 text-sm text-parchment/60">
                Super admin control for Bikers 4 Heroes. Edits appear on the public site immediately.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((c) => (
                    <Link
                        key={c.label}
                        href={c.href}
                        className="rounded-2xl border border-white/10 bg-ink-800 p-5 hover:border-gold-300/40"
                    >
                        <div className="font-display text-4xl text-gold-300">{c.value}</div>
                        <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-parchment/60">
                            {c.label}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-8 rounded-2xl border border-gold-300/20 bg-ink-800 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-gold-300">Data source</p>
                <p className="mt-3 text-sm text-parchment/75">
                    {firebaseEnabled
                        ? firebaseLive
                            ? "Live Firebase (Firestore + Storage) is syncing."
                            : "Firebase keys are set. Waiting for the first Firestore snapshot — seed from Settings if collections are empty."
                        : "Running on local super-admin storage. Add Firebase keys in Settings to sync across devices."}
                </p>
                <p className="mt-2 text-xs text-parchment/50">{events.length} events loaded.</p>
            </div>
        </AdminShell>
    );
}
