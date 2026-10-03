import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-24 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-300">Off the route</p>
            <h1 className="mt-3 font-display text-6xl tracking-wide">Page not found</h1>
            <p className="mt-4 max-w-md text-parchment/70">
                That road doesn&apos;t go anywhere. Head back to the village.
            </p>
            <Link
                href="/"
                className="mt-8 rounded-full bg-gold-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-950"
            >
                Home
            </Link>
        </div>
    );
}
