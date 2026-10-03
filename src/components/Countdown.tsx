"use client";

import { useEffect, useState } from "react";

export function Countdown({ date }: { date: string }) {
    const [now, setNow] = useState<number | null>(null);

    useEffect(() => {
        setNow(Date.now());
        const t = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(t);
    }, []);

    const target = new Date(`${date}T08:00:00`).getTime();
    const diff = Math.max(0, target - (now ?? target));
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const cells = [
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Mins", value: mins },
        { label: "Secs", value: secs },
    ];

    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {cells.map((c) => (
                <div
                    key={c.label}
                    className="rounded-2xl border border-gold-300/30 bg-ink-950/70 px-2 py-3 text-center backdrop-blur"
                >
                    <div className="font-display text-2xl text-gold-300 sm:text-4xl">
                        {String(c.value).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-parchment/60">
                        {c.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
