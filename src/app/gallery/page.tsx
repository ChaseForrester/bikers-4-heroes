"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useStore } from "@/lib/store";

export default function GalleryPage() {
    const { photos } = useStore();
    const [active, setActive] = useState<string | null>(null);
    const selected = photos.find((p) => p.id === active);

    return (
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
            <Reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-gold-300">The village</p>
                <h1 className="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Gallery</h1>
                <p className="mt-4 max-w-2xl text-parchment/70">
                    Superheroes on the ward, bikes in the sun, gold balloons at the ball, snags on the
                    hotplate. This is what Bikers 4 Heroes looks like.
                </p>
            </Reveal>
            <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
                {photos.map((p, i) => (
                    <button
                        key={p.id}
                        onClick={() => setActive(p.id)}
                        className="mb-4 block w-full overflow-hidden rounded-2xl"
                    >
                        <Reveal delay={(i % 6) * 0.05}>
                            <img
                                src={p.src}
                                alt={p.alt}
                                className="w-full object-cover transition duration-500 hover:scale-[1.03]"
                            />
                        </Reveal>
                    </button>
                ))}
            </div>

            {selected && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/90 p-4"
                    onClick={() => setActive(null)}
                >
                    <figure className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
                        <img src={selected.src} alt={selected.alt} className="max-h-[80vh] w-full rounded-2xl object-contain" />
                        <figcaption className="mt-3 text-center text-sm text-parchment/80">
                            {selected.caption}
                        </figcaption>
                    </figure>
                </div>
            )}
        </div>
    );
}
