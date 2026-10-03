"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { CharityEvent } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

export function EventCard({ event, index = 0 }: { event: CharityEvent; index?: number }) {
    const upcoming = event.date >= new Date().toISOString().slice(0, 10);

    return (
        <Link
            href={`/events/${event.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-ink-800 shadow-lg"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="relative h-56 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${upcoming ? "bg-gold-300 text-ink-950" : "bg-ink-950/80 text-parchment"
                        }`}
                >
                    {upcoming ? "Upcoming" : "Past event"}
                </span>
            </div>
            <div className="space-y-3 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold-300">{event.category}</p>
                <h3 className="font-display text-2xl tracking-wide text-parchment">{event.title}</h3>
                <p className="line-clamp-2 text-sm text-parchment/70">{event.subtitle}</p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-parchment/60">
                    <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-gold-300" />
                        {formatShortDate(event.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="text-gold-300" />
                        {event.location}
                    </span>
                </div>
            </div>
        </Link>
    );
}
