"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { FacebookIcon } from "@/components/FacebookIcon";
import { Countdown } from "@/components/Countdown";
import { EventCard } from "@/components/EventCard";
import { Reveal } from "@/components/Reveal";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function EventDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { events, photos } = useStore();
    const event = events.find((e) => e.slug === slug);
    const upcoming = event ? event.date >= new Date().toISOString().slice(0, 10) : false;
    const related = events.filter((e) => e.slug !== slug).slice(0, 3);
    const gallery = event
        ? Array.from(
            new Set([
                ...event.gallery,
                ...photos.filter((p) => p.eventId === event.id).map((p) => p.src),
            ])
        )
        : [];

    if (!event) {
        return (
            <div className="mx-auto max-w-3xl px-4 pb-20 pt-32 text-center">
                <h1 className="font-display text-5xl">Event not found</h1>
                <Link href="/events" className="mt-6 inline-block text-gold-300">
                    Back to events
                </Link>
            </div>
        );
    }

    return (
        <div>
            <section className="relative isolate min-h-[70vh] overflow-hidden">
                <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/25" />
                <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-gold-300">
                        {upcoming ? "Upcoming event" : "Past event"} · {event.category}
                    </p>
                    <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-wide sm:text-7xl">{event.title}</h1>
                    <p className="mt-4 max-w-2xl text-lg text-parchment/80">{event.subtitle}</p>
                </div>
            </section>

            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.8fr]">
                <Reveal>
                    <p className="text-lg leading-relaxed text-parchment/80">{event.description}</p>
                    <p className="mt-6 leading-relaxed text-parchment/70">{event.details}</p>
                    {gallery.length > 0 && (
                        <div className="mt-10 grid grid-cols-2 gap-3">
                            {gallery.map((src) => (
                                <img key={src} src={src} alt="" className="h-44 w-full rounded-2xl object-cover md:h-56" />
                            ))}
                        </div>
                    )}
                </Reveal>
                <Reveal delay={0.1} className="h-fit rounded-3xl border border-gold-300/25 bg-ink-800 p-6">
                    {upcoming && (
                        <div className="mb-6">
                            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold-300">Starts in</p>
                            <Countdown date={event.date} />
                        </div>
                    )}
                    <ul className="space-y-4 text-sm">
                        <li className="flex gap-3">
                            <Calendar className="mt-0.5 text-gold-300" size={18} />
                            <span>{formatDate(event.date)}</span>
                        </li>
                        <li className="flex gap-3">
                            <Clock className="mt-0.5 text-gold-300" size={18} />
                            <span>{event.time}</span>
                        </li>
                        <li className="flex gap-3">
                            <MapPin className="mt-0.5 text-gold-300" size={18} />
                            <span>
                                {event.location}
                                <br />
                                <span className="text-parchment/60">{event.address}</span>
                            </span>
                        </li>
                        {event.price && (
                            <li className="flex gap-3">
                                <Ticket className="mt-0.5 text-gold-300" size={18} />
                                <span>{event.price}</span>
                            </li>
                        )}
                    </ul>
                    <div className="mt-6 flex flex-col gap-3">
                        {event.ticketUrl && (
                            <a
                                href={event.ticketUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-gold-300 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-950"
                            >
                                Tickets / register
                            </a>
                        )}
                        <a
                            href={event.facebookUrl || "https://www.facebook.com/bikers4heroes"}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em]"
                        >
                            <FacebookIcon size={14} /> Facebook
                        </a>
                        <Link href="/donate" className="text-center text-xs uppercase tracking-[0.2em] text-gold-300">
                            Support the cause
                        </Link>
                    </div>
                </Reveal>
            </div>

            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
                <h2 className="font-display text-4xl tracking-wide">More from the Heroes</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    {related.map((e, i) => (
                        <EventCard key={e.id} event={e} index={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
