"use client";

import { Reveal } from "@/components/Reveal";
import { useStore } from "@/lib/store";

export default function AboutPage() {
    const { site } = useStore();
    const paragraphs = site.storyLong.split("\n\n");

    return (
        <div>
            <section className="relative isolate min-h-[50vh] overflow-hidden">
                <img src="/gallery/superhero-night.jpg" alt="Bikers 4 Heroes crew" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-ink-950/70" />
                <div className="relative mx-auto flex min-h-[50vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Since 2018</p>
                    <h1 className="font-display text-6xl tracking-wide sm:text-7xl">Our Story</h1>
                </div>
            </section>
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.8fr]">
                <Reveal className="space-y-5 text-base leading-relaxed text-parchment/80">
                    {paragraphs.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                    <p className="font-script text-3xl text-gold-300">{site.tagline}</p>
                </Reveal>
                <Reveal delay={0.1} className="space-y-6">
                    {site.values.map((v) => (
                        <div key={v.title} className="rounded-3xl border border-white/10 bg-ink-800 p-6">
                            <h3 className="font-display text-3xl tracking-wide text-gold-300">{v.title}</h3>
                            <p className="mt-2 text-sm text-parchment/70">{v.body}</p>
                        </div>
                    ))}
                    <div className="rounded-3xl border border-gold-300/30 p-6">
                        <p className="text-xs uppercase tracking-[0.25em] text-gold-300">Founders</p>
                        <p className="mt-3 text-parchment/80">
                            Russell Parkinson, Daniel Barnes and Stuart Butler — with Shay, Kayla and a
                            village that now includes Thor and every Hero who puts a cape on for a kid.
                        </p>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
