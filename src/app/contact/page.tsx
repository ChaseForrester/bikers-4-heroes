"use client";

import { FormEvent, useState } from "react";
import { FacebookIcon } from "@/components/FacebookIcon";
import { Reveal } from "@/components/Reveal";
import { useStore } from "@/lib/store";

export default function ContactPage() {
    const { site, addMessage } = useStore();
    const [sent, setSent] = useState(false);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        await addMessage({
            name: String(form.get("name") || ""),
            email: String(form.get("email") || ""),
            subject: String(form.get("subject") || "Website message"),
            message: String(form.get("message") || ""),
        });
        setSent(true);
    }

    return (
        <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6">
            <Reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Say G&apos;day</p>
                <h1 className="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Contact</h1>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
                <Reveal className="space-y-5">
                    <p className="text-parchment/75">
                        Based in the Illawarra. Home of sausage sizzles, trivia nights and a Lead Bike pack
                        that rides for kids.
                    </p>
                    <a
                        href={site.facebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-gold-300"
                    >
                        <FacebookIcon size={18} /> facebook.com/bikers4heroes
                    </a>
                    <p className="text-sm text-parchment/60">{site.region}</p>
                    <p className="text-sm text-parchment/60">{site.email}</p>
                </Reveal>
                {sent ? (
                    <div className="rounded-3xl border border-gold-300/30 bg-ink-800 p-8">
                        <p className="font-display text-3xl text-gold-300">Got it.</p>
                        <p className="mt-2 text-parchment/70">We&apos;ll come back to you.</p>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-ink-800 p-6">
                        <input name="name" required placeholder="Name" className="admin-input" />
                        <input name="email" type="email" required placeholder="Email" className="admin-input" />
                        <input name="subject" placeholder="Subject" className="admin-input" />
                        <textarea name="message" required rows={5} placeholder="Message" className="admin-input" />
                        <button className="rounded-full bg-gold-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950">
                            Send
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
