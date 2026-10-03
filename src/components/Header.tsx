"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "Our Story" },
    { href: "/donate", label: "Donate" },
    { href: "/help", label: "Need Help" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    if (pathname.startsWith("/admin")) return null;

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/70 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                <Link href="/" className="relative z-10" onClick={() => setOpen(false)}>
                    <Logo className="scale-90 sm:scale-100" />
                </Link>
                <nav className="hidden items-center gap-1 lg:flex">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={cn(
                                "rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition",
                                pathname === l.href
                                    ? "text-gold-300"
                                    : "text-parchment/70 hover:text-parchment"
                            )}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Link
                        href="https://www.facebook.com/bikers4heroes"
                        target="_blank"
                        className="ml-2 rounded-full border border-gold-300/50 bg-gold-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-950 transition hover:bg-gold-200"
                    >
                        Facebook
                    </Link>
                </nav>
                <button
                    className="rounded-md p-2 text-parchment lg:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Menu"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>
            {open && (
                <div className="border-t border-white/10 bg-ink-900 px-4 py-4 lg:hidden">
                    <div className="flex flex-col gap-2">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-3 text-sm uppercase tracking-[0.2em] text-parchment"
                            >
                                {l.label}
                            </Link>
                        ))}
                        <Link
                            href="https://www.facebook.com/bikers4heroes"
                            target="_blank"
                            className="rounded-full bg-gold-300 px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-ink-950"
                        >
                            Facebook
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
