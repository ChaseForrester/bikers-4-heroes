"use client";

import Link from "next/link";
import { ConvoyBanner } from "@/components/ConvoyBanner";
import { DonationMeter } from "@/components/DonationMeter";
import { Reveal } from "@/components/Reveal";
import { useFeaturedEvent, useStore } from "@/lib/store";
import { useConvoyLive } from "@/lib/useConvoyLive";
import { formatMoney, formatShortDate } from "@/lib/utils";
import type { ConvoyLeader } from "@/lib/types";

function LeaderList({ title, items }: { title: string; items: ConvoyLeader[] }) {
    if (!items.length) return null;
    return (
        <div>
            <h3 className="font-display text-3xl tracking-wide text-gold-300">{title}</h3>
            <ul className="mt-4 space-y-3">
                {items.map((t) => (
                    <li key={t.url}>
                        <a
                            href={t.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink-900 px-4 py-3 hover:border-gold-300/40"
                        >
                            <span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-300">{t.place}</span>
                                <span className="mt-0.5 block text-sm text-parchment">{t.name}</span>
                            </span>
                            <span className="font-display text-xl text-gold-300">{formatMoney(t.amount)}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function DonatePage() {
    const { site, donations } = useStore();
    const featured = useFeaturedEvent();
    const live = useConvoyLive();

    return (
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
            <Reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-gold-300">i98FM Illawarra Convoy</p>
                <h1 className="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Donate</h1>
                <p className="mt-4 max-w-2xl text-lg text-parchment/75">
                    Every sausage, trivia table, raffle ticket and cruise registration goes to our Lead Bike
                    bid. Merch from the official Convoy store — including the 2025 hoodies on sale — also
                    funds the Illawarra Community Foundation.
                </p>
            </Reveal>

            <Reveal className="mt-10">
                <ConvoyBanner />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <DonationMeter />
                <Reveal delay={0.1} className="rounded-[2rem] border border-white/10 bg-ink-800 p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-gold-300">Convoy since 2005</p>
                    <div className="mt-3 font-display text-4xl text-parchment sm:text-5xl">
                        {live.data ? formatMoney(live.data.lifetimeRaised) : live.loading ? "…" : "—"}
                    </div>
                    <p className="mt-2 text-sm text-parchment/60">
                        Live total from the official Convoy site. Sunday 15 November 2026.
                    </p>
                    {live.data && (
                        <p className="mt-3 text-[11px] text-parchment/40">
                            Pulled from the hoodie store page ·{" "}
                            {new Date(live.data.fetchedAt).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                    )}
                </Reveal>
            </div>

            {donations.log.length > 0 && (
                <section className="mt-12">
                    <h2 className="font-display text-4xl tracking-wide">How the Heroes raised it</h2>
                    <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
                        {donations.log.map((row) => (
                            <div
                                key={row.id}
                                className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-4 last:border-0"
                            >
                                <div>
                                    <p className="text-sm text-parchment">{row.source}</p>
                                    <p className="text-xs text-parchment/50">
                                        {formatShortDate(row.date)}
                                        {row.note ? ` · ${row.note}` : ""}
                                    </p>
                                </div>
                                <p className="font-display text-2xl text-gold-300">{formatMoney(row.amount)}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="mt-14 grid gap-6 lg:grid-cols-2">
                <Reveal className="overflow-hidden rounded-[2rem] border border-gold-300/25 bg-ink-800">
                    <img src="/branding/convoy-hoodies.jpg" alt="2025 Convoy hoodies in khaki and black" className="h-56 w-full object-cover" />
                    <div className="p-6">
                        <p className="text-xs uppercase tracking-[0.28em] text-gold-300">Official merch</p>
                        <h2 className="mt-2 font-display text-4xl tracking-wide">{donations.hoodieTitle}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-parchment/70">{donations.hoodieBlurb}</p>
                        <p className="mt-4 text-sm text-parchment/80">
                            Adults {formatMoney(donations.hoodieAdultPrice)} · Kids {formatMoney(donations.hoodieKidsPrice)}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href={donations.hoodieUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-gold-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950"
                            >
                                Buy a hoodie
                            </a>
                            <a
                                href={donations.storeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]"
                            >
                                Convoy store
                            </a>
                        </div>
                    </div>
                </Reveal>

                <div className="grid gap-6">
                    <Reveal className="rounded-[2rem] border border-white/10 bg-ink-800 p-6">
                        <h2 className="font-display text-3xl tracking-wide">Come to an event</h2>
                        <p className="mt-3 text-sm text-parchment/70">
                            The Heroes raise most of their Lead Bike money face to face.
                            {featured ? ` Next up: ${featured.title}.` : ""}
                        </p>
                        <Link
                            href={featured ? `/events/${featured.slug}` : "/events"}
                            className="mt-5 inline-block rounded-full bg-gold-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950"
                        >
                            See events
                        </Link>
                    </Reveal>
                    <Reveal className="rounded-[2rem] border border-white/10 bg-ink-800 p-6">
                        <h2 className="font-display text-3xl tracking-wide">Give on the Convoy site</h2>
                        <p className="mt-3 text-sm text-parchment/70">
                            Donate to a team, a truck or a bike — or drop a general gift. Tax receipts come from
                            the Illawarra Community Foundation.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <a
                                href={donations.donateGeneralUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-gold-300/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-300"
                            >
                                Donate to Convoy
                            </a>
                            <a
                                href={donations.donateTeamUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]"
                            >
                                Browse teams
                            </a>
                        </div>
                        <a
                            href={site.facebookUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-gold-300"
                        >
                            facebook.com/bikers4heroes →
                        </a>
                    </Reveal>
                </div>
            </section>

            <section className="mt-16">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gold-300">From the Convoy hoodie page</p>
                        <h2 className="font-display text-4xl tracking-wide sm:text-5xl">Live leaderboard</h2>
                    </div>
                    <a
                        href={donations.hoodieUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase tracking-[0.2em] text-gold-300"
                    >
                        Open source page →
                    </a>
                </div>
                {live.loading && <p className="text-parchment/50">Loading Convoy totals…</p>}
                {live.error && (
                    <p className="text-sm text-parchment/60">
                        Could not refresh the Convoy board just now. The hoodie store is still open at the link
                        above.
                    </p>
                )}
                {live.data && (
                    <div className="grid gap-10 md:grid-cols-2">
                        <LeaderList title="Top teams" items={live.data.teams} />
                        <LeaderList title="Top fundraisers" items={live.data.fundraisers} />
                    </div>
                )}
            </section>
        </div>
    );
}
