"use client";

import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { useStore } from "@/lib/store";
import { formatShortDate } from "@/lib/utils";

export default function AdminEventsPage() {
    const { events, deleteEvent } = useStore();
    const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <AdminShell>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="font-display text-5xl tracking-wide">Events</h1>
                    <p className="mt-2 text-sm text-parchment/60">Upcoming and past. Featured events drive the homepage.</p>
                </div>
                <Link
                    href="/admin/events/new"
                    className="rounded-full bg-gold-300 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ink-950"
                >
                    New event
                </Link>
            </div>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-ink-800 text-[11px] uppercase tracking-[0.18em] text-parchment/50">
                        <tr>
                            <th className="px-4 py-3">Event</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Featured</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((e) => (
                            <tr key={e.id} className="border-t border-white/10">
                                <td className="px-4 py-3">
                                    <div className="font-medium">{e.title}</div>
                                    <div className="text-xs text-parchment/50">{e.location}</div>
                                </td>
                                <td className="px-4 py-3 text-parchment/70">{formatShortDate(e.date)}</td>
                                <td className="px-4 py-3 uppercase tracking-[0.16em] text-xs">
                                    {e.date >= new Date().toISOString().slice(0, 10) ? "Upcoming" : "Past"}
                                </td>
                                <td className="px-4 py-3">{e.featured ? "Yes" : "—"}</td>
                                <td className="px-4 py-3 text-right">
                                    <Link href={`/admin/events/${e.id}`} className="text-gold-300">
                                        Edit
                                    </Link>
                                    <button
                                        className="ml-4 text-crimson-400"
                                        onClick={() => {
                                            if (confirm(`Delete ${e.title}?`)) deleteEvent(e.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminShell>
    );
}
