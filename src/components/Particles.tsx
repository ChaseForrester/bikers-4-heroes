"use client";

export function Particles() {
    const dots = Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 19) % 100}%`,
        delay: `${(i % 8) * 0.4}s`,
        size: 2 + (i % 4),
    }));

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {dots.map((d) => (
                <span
                    key={d.id}
                    className="absolute rounded-full bg-gold-300/70 animate-float"
                    style={{
                        left: d.left,
                        top: d.top,
                        width: d.size,
                        height: d.size,
                        animationDelay: d.delay,
                        boxShadow: "0 0 8px rgba(212,175,55,0.8)",
                    }}
                />
            ))}
        </div>
    );
}

export function MotorcycleRide() {
    return (
        <div className="pointer-events-none absolute bottom-10 left-0 right-0 h-16 overflow-hidden opacity-80">
            <div className="animate-ride-across absolute bottom-0">
                <svg width="140" height="56" viewBox="0 0 140 56" fill="none" aria-hidden>
                    <circle cx="32" cy="40" r="12" stroke="#d4af37" strokeWidth="3" />
                    <circle cx="32" cy="40" r="4" fill="#d4af37" />
                    <circle cx="108" cy="40" r="12" stroke="#d4af37" strokeWidth="3" />
                    <circle cx="108" cy="40" r="4" fill="#d4af37" />
                    <path
                        d="M32 40 L58 40 L70 22 H92 L108 40 M70 22 L62 12 H78"
                        stroke="#f4f0e6"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    <path d="M58 40 L70 28" stroke="#d4af37" strokeWidth="2" />
                </svg>
            </div>
        </div>
    );
}
