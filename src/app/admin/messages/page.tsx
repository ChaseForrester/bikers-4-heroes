"use client";

import { AdminShell } from "@/components/AdminShell";
import { useStore } from "@/lib/store";

export default function MessagesPage() {
    const { messages, markMessageRead, deleteMessage } = useStore();

    return (
        <AdminShell>
            <h1 className="font-display text-5xl tracking-wide">Messages</h1>
            <p className="mt-2 text-sm text-parchment/60">Contact form and Community in Need requests.</p>
            <div className="mt-8 space-y-4">
                {messages.length === 0 && <p className="text-parchment/50">No messages yet.</p>}
                {messages.map((m) => (
                    <article
                        key={m.id}
                        className={`rounded-2xl border p-5 ${m.read ? "border-white/10 bg-ink-800" : "border-gold-300/30 bg-ink-800"}`}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="font-medium">{m.name} · {m.email}</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-gold-300">{m.subject}</p>
                            </div>
                            <p className="text-xs text-parchment/50">{new Date(m.createdAt).toLocaleString("en-AU")}</p>
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm text-parchment/80">{m.message}</p>
                        <div className="mt-4 flex gap-4 text-xs uppercase tracking-[0.16em]">
                            {!m.read && (
                                <button className="text-gold-300" onClick={() => markMessageRead(m.id)}>
                                    Mark read
                                </button>
                            )}
                            <button className="text-crimson-400" onClick={() => deleteMessage(m.id)}>
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </AdminShell>
    );
}
