"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useStore } from "@/lib/store";
import { formatMoney, formatShortDate, parseMoney } from "@/lib/utils";

export default function AdminDonationsPage() {
    const { donations, saveDonations, addDonation, deleteDonation } = useStore();
    const [raised, setRaised] = useState(String(donations.raised));
    const [goal, setGoal] = useState(String(donations.goal));
    const [lastYear, setLastYear] = useState(String(donations.lastYearRaised));
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setRaised(String(donations.raised));
        setGoal(String(donations.goal));
        setLastYear(String(donations.lastYearRaised));
    }, [donations.raised, donations.goal, donations.lastYearRaised]);

    async function saveTotals(e: FormEvent) {
        e.preventDefault();
        await saveDonations({
            ...donations,
            raised: parseMoney(raised),
            goal: parseMoney(goal),
            lastYearRaised: parseMoney(lastYear),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 1600);
    }

    async function onLog(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        await addDonation({
            date: String(form.get("date") || new Date().toISOString().slice(0, 10)),
            source: String(form.get("source") || "Donation"),
            amount: parseMoney(String(form.get("amount") || "0")),
            note: String(form.get("note") || ""),
        });
        e.currentTarget.reset();
    }

    return (
        <AdminShell>
            <h1 className="font-display text-5xl tracking-wide">Donations</h1>
            <p className="mt-2 max-w-2xl text-sm text-parchment/60">
                Track the Heroes&apos; Lead Bike total. The public Donate page also pulls live Convoy
                lifetime and leaderboard numbers from the official hoodie store page.
            </p>

            <form onSubmit={saveTotals} className="mt-8 grid max-w-xl gap-4 rounded-2xl border border-white/10 bg-ink-800 p-5">
                <label className="text-xs uppercase tracking-[0.18em] text-parchment/50">
                    Raised this year (AUD)
                    <input className="admin-input mt-2" value={raised} onChange={(e) => setRaised(e.target.value)} />
                </label>
                <label className="text-xs uppercase tracking-[0.18em] text-parchment/50">
                    Goal (AUD)
                    <input className="admin-input mt-2" value={goal} onChange={(e) => setGoal(e.target.value)} />
                </label>
                <label className="text-xs uppercase tracking-[0.18em] text-parchment/50">
                    Last year Lead Bike bid (AUD)
                    <input className="admin-input mt-2" value={lastYear} onChange={(e) => setLastYear(e.target.value)} />
                </label>
                <button className="rounded-full bg-gold-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950">
                    {saved ? "Saved" : "Save totals"}
                </button>
            </form>

            <h2 className="mt-12 font-display text-3xl tracking-wide">Log a donation</h2>
            <form onSubmit={onLog} className="mt-4 grid max-w-xl gap-3 rounded-2xl border border-white/10 bg-ink-800 p-5">
                <input className="admin-input" name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                <input className="admin-input" name="source" required placeholder="Source — Bunnings, trivia, cash tin…" />
                <input className="admin-input" name="amount" required placeholder="Amount e.g. 320.50" />
                <input className="admin-input" name="note" placeholder="Note (optional)" />
                <button className="rounded-full border border-gold-300/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
                    Add to tracker
                </button>
            </form>

            <div className="mt-8 max-w-2xl space-y-3">
                {donations.log.length === 0 && (
                    <p className="text-sm text-parchment/50">No line items yet. Add sausage sizzle takings as they come in.</p>
                )}
                {donations.log.map((row) => (
                    <div key={row.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3">
                        <div>
                            <p className="text-sm">{row.source} · {formatMoney(row.amount)}</p>
                            <p className="text-xs text-parchment/50">
                                {formatShortDate(row.date)}
                                {row.note ? ` · ${row.note}` : ""}
                            </p>
                        </div>
                        <button className="text-xs uppercase tracking-[0.16em] text-crimson-400" onClick={() => deleteDonation(row.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </AdminShell>
    );
}
