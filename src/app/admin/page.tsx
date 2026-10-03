"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { firebaseEnabled } from "@/lib/firebase";

export default function AdminLoginPage() {
    const { login, isAdmin, ready } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (ready && isAdmin) router.replace("/admin/dashboard");
    }, [ready, isAdmin, router]);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setBusy(true);
        const form = new FormData(e.currentTarget);
        try {
            await login(String(form.get("email")), String(form.get("password")));
            router.push("/admin/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md space-y-5 rounded-[2rem] border border-gold-300/25 bg-ink-800 p-8 shadow-gold"
            >
                <Logo className="justify-center" />
                <div className="text-center">
                    <h1 className="font-display text-4xl tracking-wide">Super admin</h1>
                    <p className="mt-2 text-sm text-parchment/60">
                        Change events, photos and copy on the public site.
                    </p>
                </div>
                <input
                    name="email"
                    type="email"
                    required
                    defaultValue="admin@bikers4heroes.org"
                    className="admin-input"
                    placeholder="Email"
                />
                <input
                    name="password"
                    type="password"
                    required
                    className="admin-input"
                    placeholder="Password"
                />
                {error && <p className="text-sm text-crimson-400">{error}</p>}
                <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-full bg-gold-300 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ink-950 disabled:opacity-60"
                >
                    {busy ? "Signing in…" : "Enter HQ"}
                </button>
                <p className="text-center text-[11px] text-parchment/45">
                    {firebaseEnabled
                        ? "Firebase Auth is connected."
                        : "Local super admin mode. Connect Firebase in Settings after login."}
                </p>
            </form>
        </div>
    );
}
