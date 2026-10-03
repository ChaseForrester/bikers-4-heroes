import { cn } from "@/lib/utils";

export function Logo({
    className,
    showWordmark = true,
    invert = false,
}: {
    className?: string;
    showWordmark?: boolean;
    invert?: boolean;
}) {
    const stroke = invert ? "#f4f0e6" : "#f4f0e6";
    const fill = invert ? "#0c0c0c" : "#0c0c0c";
    const gold = "#d4af37";

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <svg
                viewBox="0 0 200 200"
                className="h-12 w-12 shrink-0 drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                aria-hidden
            >
                <circle cx="100" cy="100" r="96" fill={fill} stroke={gold} strokeWidth="6" />
                <circle cx="100" cy="100" r="84" fill="none" stroke={stroke} strokeWidth="2.5" />
                <path
                    d="M48 78c8-22 28-38 54-40 18-1 34 6 46 20 8 10 12 22 10 34-8 4-18 6-26 4 2 14-2 28-14 38-8 8-20 12-32 10-18-2-32-14-38-30-4-10-4-22 0-36z"
                    fill="none"
                    stroke={stroke}
                    strokeWidth="7"
                    strokeLinejoin="round"
                />
                <path
                    d="M58 92c10-8 22-14 36-14 10 0 22 4 28 12"
                    fill="none"
                    stroke={gold}
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <path
                    d="M70 78c18-10 40-10 58 2"
                    fill="none"
                    stroke={stroke}
                    strokeWidth="5"
                    strokeLinecap="round"
                />
                <ellipse cx="128" cy="96" rx="22" ry="16" fill="none" stroke={stroke} strokeWidth="5" />
                <text
                    x="96"
                    y="132"
                    textAnchor="middle"
                    fontFamily="Impact, Haettenschweiler, sans-serif"
                    fontSize="64"
                    fontWeight="700"
                    fill={stroke}
                >
                    4
                </text>
                <path
                    d="M38 58h124l-10 22H48z"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="3"
                />
                <text
                    x="100"
                    y="74"
                    textAnchor="middle"
                    fontFamily="Impact, sans-serif"
                    fontSize="16"
                    letterSpacing="3"
                    fill={stroke}
                >
                    BIKERS
                </text>
                <path
                    d="M38 148h124l-10-22H48z"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="3"
                />
                <text
                    x="100"
                    y="144"
                    textAnchor="middle"
                    fontFamily="Impact, sans-serif"
                    fontSize="16"
                    letterSpacing="2"
                    fill={stroke}
                >
                    HEROES
                </text>
            </svg>
            {showWordmark && (
                <div className="leading-none">
                    <div className="font-display text-xl tracking-[0.14em] text-parchment sm:text-2xl">
                        BIKERS 4 HEROES
                    </div>
                    <div className="mt-1 font-script text-sm text-gold-300">Illawarra</div>
                </div>
            )}
        </div>
    );
}
