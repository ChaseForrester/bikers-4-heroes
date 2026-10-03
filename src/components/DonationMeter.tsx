"use client";

import { useStore } from "@/lib/store";
import { formatMoney } from "@/lib/utils";

export function DonationMeter({ compact = false }: { compact?: boolean }) {
    const { donations } = useStore();
    const pct = Math.min(100, donations.goal > 0 ? (donations.raised / donations.goal) * 100 : 0);

    return (
        <div className={compact ? "" : "rounded-[2rem] border border-gold-300/30 bg-ink-800 p-6 sm:p-8"}>
            <p className="text-xs uppercase tracking-[0.32em] text-gold-300">
                {donations.year} Lead Bike bid
            </p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <div className="font-display text-5xl tracking-wide text-gold-300 sm:text-6xl">
                        {formatMoney(donations.raised)}
                    </div>
                    <p className="mt-1 text-sm text-parchment/60">
                        of {formatMoney(donations.goal)} toward Convoy Sunday 15 November
                    </p>
                </div>
                <div className="text-right text-sm text-parchment/55">
                    <div>{Math.round(pct)}% of goal</div>
                    <div>{donations.lastYearLabel}: {formatMoney(donations.lastYearRaised)}</div>
                </div>
            </div>
            <div className="mt-5 h-4 overflow-hidden rounded-full bg-ink-950 ring-1 ring-gold-300/20">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-300 to-gold-100 transition-all duration-1000"
                    style={{ width: `${Math.max(pct, donations.raised > 0 ? 3 : 0)}%` }}
                />
            </div>
        </div>
    );
}
