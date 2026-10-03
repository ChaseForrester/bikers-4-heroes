"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, Shield, Users } from "lucide-react";
import { FacebookIcon } from "@/components/FacebookIcon";
import { MotorcycleRide, Particles } from "@/components/Particles";
import { Reveal } from "@/components/Reveal";
import { EventCard } from "@/components/EventCard";
import { Countdown } from "@/components/Countdown";
import { Logo } from "@/components/Logo";
import { ConvoyBanner } from "@/components/ConvoyBanner";
import { DonationMeter } from "@/components/DonationMeter";
import { useFeaturedEvent, usePastEvents, useStore, useUpcomingEvents } from "@/lib/store";
import { formatDate, formatMoney } from "@/lib/utils";
import { useConvoyLive } from "@/lib/useConvoyLive";

const icons = [Users, Shield, HeartHandshake];

export default function HomePage() {
    const { site, photos, donations } = useStore();
    const featured = useFeaturedEvent();
    const upcoming = useUpcomingEvents();
    const past = usePastEvents().slice(0, 3);
    const mosaic = photos.filter((p) => p.featured).slice(0, 6);
    const live = useConvoyLive();

    return (
        <div>
            <section className="relative isolate min-h-[100svh] overflow-hidden">
                <img
                    src={site.heroImage}
                    alt="Bikers 4 Heroes motorcycles"
                    className="absolute inset-0 h-full w-full object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-hero-fade" />
                <div className="absolute inset-0 bg-ink-950/35" />
                <Particles />
                <MotorcycleRide />
                <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:justify-center lg:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-3xl"
                    >
                        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-gold-300">
                            Illawarra · Lead Bike · i98FM Convoy
                        </p>
                        <h1 className="font-display text-6xl leading-[0.9] tracking-wide text-parchment sm:text-8xl">
                            <span className="shimmer-text">BIKERS</span>
                            <br />
                            4 HEROES
                        </h1>
                        <p className="mt-5 font-script text-3xl text-gold-300 sm:text-4xl">{site.tagline}</p>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment/80 sm:text-lg">
                            {site.mission}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href={featured ? `/events/${featured.slug}` : "/events"}
                                className="inline-flex items-center gap-2 rounded-full bg-gold-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-ink-950 shadow-gold-sm transition hover:bg-gold-200"
                            >
                                {featured ? "Next event" : "See events"} <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/donate"
                                className="inline-flex items-center gap-2 rounded-full border border-parchment/30 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-parchment hover:border-gold-300 hover:text-gold-300"
                            >
                                Donate
                            </Link>
                            <a
                                href={site.facebookUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-parchment/30 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-parchment hover:border-gold-300"
                            >
                                <FacebookIcon size={16} /> Follow
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {featured && (
                <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:-mt-16 sm:px-6">
                    <Reveal className="overflow-hidden rounded-[2rem] border border-gold-300/30 bg-ink-800 shadow-gold">
                        <div className="grid lg:grid-cols-2">
                            <div className="relative min-h-[280px]">
                                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
                                <div className="absolute left-4 top-4 rounded-full bg-crimson-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white animate-pulse-gold">
                                    Live event page
                                </div>
                            </div>
                            <div className="space-y-5 p-6 sm:p-10">
                                <p className="text-xs uppercase tracking-[0.32em] text-gold-300">Coming up</p>
                                <h2 className="font-display text-4xl tracking-wide sm:text-5xl">{featured.title}</h2>
                                <p className="text-parchment/75">{featured.subtitle}</p>
                                <p className="text-sm text-parchment/60">
                                    {formatDate(featured.date)} · {featured.time}
                                    <br />
                                    {featured.location}
                                </p>
                                <Countdown date={featured.date} />
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link
                                        href={`/events/${featured.slug}`}
                                        className="rounded-full bg-gold-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950"
                                    >
                                        Event details
                                    </Link>
                                    {featured.facebookUrl && (
                                        <a
                                            href={featured.facebookUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]"
                                        >
                                            Facebook
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>
            )}

            <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
                <Reveal>
                    <ConvoyBanner />
                </Reveal>
                <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <DonationMeter />
                    <Reveal className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-ink-800 p-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-gold-300">Convoy since 2005</p>
                            <div className="mt-3 font-display text-4xl">
                                {live.data ? formatMoney(live.data.lifetimeRaised) : "…"}
                            </div>
                            <p className="mt-2 text-sm text-parchment/60">
                                Official total, live from the Convoy hoodie store page.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/donate"
                                className="rounded-full bg-gold-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950"
                            >
                                Track donations
                            </Link>
                            <a
                                href={donations.hoodieUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]"
                            >
                                Buy a hoodie
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
                <Reveal>
                    <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Why we ride</p>
                    <h2 className="mt-3 font-display text-5xl tracking-wide sm:text-6xl">The kids are the real heroes</h2>
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-parchment/75">{site.storyShort}</p>
                </Reveal>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {site.values.map((v, i) => {
                        const Icon = icons[i] ?? Shield;
                        return (
                            <Reveal key={v.title} delay={i * 0.12} className="rounded-3xl border border-white/10 bg-ink-800 p-7">
                                <Icon className="text-gold-300" />
                                <h3 className="mt-4 font-display text-3xl tracking-wide">{v.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-parchment/70">{v.body}</p>
                            </Reveal>
                        );
                    })}
                </div>
                <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {site.stats.map((s, i) => (
                        <Reveal key={s.label} delay={i * 0.08} className="rounded-2xl border border-gold-300/20 bg-ink-900 p-5 text-center">
                            <div className="font-display text-3xl text-gold-300 sm:text-4xl">{s.value}</div>
                            <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-parchment/60">{s.label}</div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {upcoming.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-gold-300">The calendar</p>
                            <h2 className="font-display text-5xl tracking-wide">Upcoming events</h2>
                        </div>
                        <Link href="/events" className="text-xs uppercase tracking-[0.2em] text-gold-300">
                            All events →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {upcoming.map((e, i) => (
                            <EventCard key={e.id} event={e} index={i} />
                        ))}
                    </div>
                </section>
            )}

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-gold-300">The village</p>
                        <h2 className="font-display text-5xl tracking-wide">Past events</h2>
                    </div>
                    <Link href="/events" className="text-xs uppercase tracking-[0.2em] text-gold-300">
                        Full archive →
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {past.map((e, i) => (
                        <EventCard key={e.id} event={e} index={i} />
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Capes, bikes, smiles</p>
                        <h2 className="font-display text-5xl tracking-wide">Gallery</h2>
                    </div>
                    <Link href="/gallery" className="text-xs uppercase tracking-[0.2em] text-gold-300">
                        Open gallery →
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {mosaic.map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.06} className="group overflow-hidden rounded-2xl">
                            <img
                                src={p.src}
                                alt={p.alt}
                                className="h-44 w-full object-cover transition duration-700 group-hover:scale-110 md:h-56"
                            />
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="relative mx-auto my-16 max-w-7xl overflow-hidden rounded-[2.5rem] border border-gold-300/20 px-4 py-16 sm:px-10">
                <div className="absolute inset-0">
                    <img src="/gallery/heroes-stage.jpg" alt="" className="h-full w-full object-cover opacity-25" />
                    <div className="absolute inset-0 bg-ink-950/70" />
                </div>
                <Reveal className="relative mx-auto max-w-2xl text-center">
                    <Logo showWordmark={false} className="mx-auto justify-center" />
                    <h2 className="mt-6 font-display text-5xl tracking-wide sm:text-6xl">Ride with the Heroes</h2>
                    <p className="mt-4 text-parchment/75">
                        Come to a trivia night. Buy a snag. Jump on a cruise. Share a family who needs a visit.
                        Follow every roll-out on Facebook.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/donate"
                            className="rounded-full bg-gold-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950"
                        >
                            Give
                        </Link>
                        <a
                            href={site.facebookUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-gold-300/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-300"
                        >
                            facebook.com/bikers4heroes
                        </a>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
