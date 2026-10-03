"use client";

import { EventCard } from "@/components/EventCard";
import { Reveal } from "@/components/Reveal";
import { usePastEvents, useUpcomingEvents } from "@/lib/store";

export default function EventsPage() {
    const upcoming = useUpcomingEvents();
    const past = usePastEvents();

    return (
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
            <Reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-gold-300">The road book</p>
                <h1 className="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Events</h1>
                <p className="mt-4 max-w-2xl text-parchment/70">
                    Trivia, sausage sizzles, masquerade balls, hospital visits and the i98FM Illawarra
                    Convoy. This page is the live event hub — upcoming first, then everything we have
                    already ridden.
                </p>
            </Reveal>

            <section className="mt-14">
                <h2 className="font-display text-4xl tracking-wide text-gold-300">Upcoming</h2>
                {upcoming.length === 0 ? (
                    <p className="mt-4 text-parchment/60">
                        Nothing locked in on the site yet. Follow us on Facebook for the next roll-out.
                    </p>
                ) : (
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {upcoming.map((e, i) => (
                            <EventCard key={e.id} event={e} index={i} />
                        ))}
                    </div>
                )}
            </section>

            <section className="mt-20">
                <h2 className="font-display text-4xl tracking-wide">Past events</h2>
                <p className="mt-2 text-sm text-parchment/60">
                    The nights, rides and visits that built the village.
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {past.map((e, i) => (
                        <EventCard key={e.id} event={e} index={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
