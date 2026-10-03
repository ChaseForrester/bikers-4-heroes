"use client";

import { AdminShell } from "@/components/AdminShell";
import { firebaseEnabled } from "@/lib/firebase";
import { useStore } from "@/lib/store";

export default function SettingsPage() {
    const { resetToSeed, firebaseLive } = useStore();

    return (
        <AdminShell>
            <h1 className="font-display text-5xl tracking-wide">Firebase</h1>
            <div className="mt-8 max-w-2xl space-y-6 text-sm leading-relaxed text-parchment/75">
                <div className="rounded-2xl border border-white/10 bg-ink-800 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-gold-300">Status</p>
                    <p className="mt-3">
                        {firebaseEnabled
                            ? firebaseLive
                                ? "Connected. Public pages and admin writes are using Firestore."
                                : "Config present. Seed Firestore to push the current events and photos up."
                            : "Not connected yet. The site still runs with super-admin local storage so you can edit immediately."}
                    </p>
                </div>
                <ol className="list-decimal space-y-3 pl-5">
                    <li>Create a project at <a className="text-gold-300" href="https://console.firebase.google.com" target="_blank">console.firebase.google.com</a>.</li>
                    <li>Enable Authentication (Email/Password), Cloud Firestore, and Storage.</li>
                    <li>Create the super admin user with the same email you use to log in here.</li>
                    <li>
                        In Firestore, set a custom claim or simply use the security rules in{" "}
                        <code className="text-gold-300">firestore.rules</code>. For a first launch you can
                        temporarily allow authenticated writes, then lock it to superAdmin.
                    </li>
                    <li>
                        Copy the web app keys into <code className="text-gold-300">.env.local</code> using{" "}
                        <code className="text-gold-300">.env.local.example</code>.
                    </li>
                    <li>Restart the dev server, then seed below so events and photos live in Firebase.</li>
                </ol>
                <button
                    onClick={() => resetToSeed()}
                    className="rounded-full border border-gold-300/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-300"
                >
                    Seed / reset to Bikers 4 Heroes starter content
                </button>
                <p className="text-xs text-parchment/45">
                    Facebook page wired throughout the site: https://www.facebook.com/bikers4heroes
                </p>
            </div>
        </AdminShell>
    );
}
