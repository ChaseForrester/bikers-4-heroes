"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    Calendar,
    Camera,
    LayoutDashboard,
    LogOut,
    HeartHandshake,
    Mail,
    Settings,
    Type,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/photos", label: "Photos", icon: Camera },
    { href: "/admin/content", label: "Website copy", icon: Type },
    { href: "/admin/donations", label: "Donations", icon: HeartHandshake },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/settings", label: "Firebase", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
    const { ready, isAdmin, email, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (ready && !isAdmin) router.replace("/admin");
    }, [ready, isAdmin, router]);

    if (!ready || !isAdmin) {
        return (
            <div className="flex min-h-screen items-center justify-center text-parchment/50">
                Checking super admin…
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ink-950 lg:grid lg:grid-cols-[240px_1fr]">
            <aside className="border-b border-white/10 bg-ink-900 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between px-4 py-4 lg:block">
                    <Link href="/">
                        <Logo className="scale-90" />
                    </Link>
                    <p className="hidden px-1 pt-4 text-[10px] uppercase tracking-[0.25em] text-gold-300 lg:block">
                        Super admin
                    </p>
                </div>
                <nav className="flex gap-1 overflow-x-auto px-2 pb-3 lg:flex-col lg:px-3">
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm whitespace-nowrap",
                                pathname.startsWith(item.href)
                                    ? "bg-gold-300/15 text-gold-300"
                                    : "text-parchment/70 hover:bg-white/5"
                            )}
                        >
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="hidden border-t border-white/10 p-4 lg:block">
                    <p className="truncate text-xs text-parchment/50">{email}</p>
                    <button
                        onClick={() => logout().then(() => router.push("/admin"))}
                        className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-parchment/60"
                    >
                        <LogOut size={14} /> Sign out
                    </button>
                </div>
            </aside>
            <div className="px-4 py-8 sm:px-8">{children}</div>
        </div>
    );
}
