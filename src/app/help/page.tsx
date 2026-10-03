"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useStore } from "@/lib/store";

export default function HelpPage() {
    const { addMessage } = useStore();
    const [sent, setSent] = useState(false);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        await addMessage({
            name: String(form.get("name") || ""),
            email: String(form.get("email") || ""),
            subject: "Community in Need",
            message: String(form.get("message") || ""),
        });
        setSent(true);
    }

    return (
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6">
            <Reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-gold-300">We&apos;re here</p>
                <h1 className="mt-2 font-display text-6xl tracking-wide">Community in Need</h1>
                <p className="mt-4 text-lg text-parchment/75">
                    If you know of a child, family, group or anyone at all that could really use a visit
                    from Bikers 4 Heroes, share your story. We will do everything in our power to help.
                </p>
            </Reveal>
            {sent ? (
                <div className="mt-10 rounded-3xl border border-gold-300/30 bg-ink-800 p-8 text-center">
                    <p className="font-display text-3xl text-gold-300">Message received.</p>
                    <p className="mt-3 text-parchment/70">The Heroes will be in touch.</p>
                </div>
            ) : (
                <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-3xl border border-white/10 bg-ink-800 p-6">
                    <input name="name" required placeholder="Your name" className="admin-input" />
                    <input name="email" type="email" required placeholder="Email" className="admin-input" />
                    <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell us who needs a visit, and how we can help."
                        className="admin-input"
                    />
                    <button className="rounded-full bg-gold-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950">
                        Send to the Heroes
                    </button>
                </form>
            )}
        </div>
    );
}
