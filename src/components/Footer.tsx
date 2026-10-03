"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export function Footer() {
    const pathname = usePathname();
    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="relative mt-24 border-t border-gold-300/20 bg-ink-900">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
                <div>
                    <Logo />
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-parchment/70">
                        An alliance of friends and motorcycle enthusiasts who unite dressed as Super
                        Heroes to bring support and funding to those in need.
                    </p>
                </div>
                <div>
                    <h3 className="font-display text-lg tracking-[0.2em] text-gold-300">RIDE WITH US</h3>
                    <ul className="mt-4 space-y-2 text-sm text-parchment/80">
                        <li>
                            <Link href="/events" className="hover:text-gold-300">
                                Upcoming & past events
                            </Link>
                        </li>
                        <li>
                            <Link href="/donate" className="hover:text-gold-300">
                                Donate to Convoy
                            </Link>
                        </li>
                        <li>
                            <Link href="/help" className="hover:text-gold-300">
                                Community in Need
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://www.facebook.com/bikers4heroes"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-gold-300"
                            >
                                facebook.com/bikers4heroes
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-lg tracking-[0.2em] text-gold-300">THE CAUSE</h3>
                    <p className="mt-4 text-sm leading-relaxed text-parchment/70">
                        Funds raised go to our Lead Bike bid for the i98FM Illawarra Convoy and the
                        Illawarra Community Foundation — supporting local families facing serious
                        illness. The kids are the real heroes.
                    </p>
                </div>
            </div>
            <div className="border-t border-white/10 py-5 text-center text-xs uppercase tracking-[0.25em] text-parchment/50">
                © {new Date().getFullYear()} Bikers 4 Heroes · Illawarra · Life&apos;s not always fair, so
                let&apos;s make it FUN ·{" "}
                <Link href="/admin" className="text-parchment/40 hover:text-gold-300">
                    HQ
                </Link>
            </div>
        </footer>
    );
}
