"use client";

export function ConvoyBanner({ className = "" }: { className?: string }) {
    return (
        <a
            href="https://illawarraconvoy.com.au"
            target="_blank"
            rel="noreferrer"
            className={`block overflow-hidden rounded-[1.6rem] bg-black ${className}`}
        >
            <img
                src="/branding/convoy-2026.png"
                alt="i98FM Illawarra Convoy 2026 — Sunday 15 November — Illawarra Community Foundation"
                className="mx-auto h-auto w-full max-w-4xl object-contain"
            />
        </a>
    );
}
