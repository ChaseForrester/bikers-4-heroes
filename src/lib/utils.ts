export function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string) {
    const d = new Date(`${iso}T12:00:00`);
    return d.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function formatShortDate(iso: string) {
    const d = new Date(`${iso}T12:00:00`);
    return d.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function uid(prefix = "id") {
    return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function formatMoney(n: number) {
    return n.toLocaleString("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: n % 1 === 0 ? 0 : 2,
    });
}

export function parseMoney(value: string) {
    const n = Number(String(value).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
}

export function daysUntil(iso: string) {
    const target = new Date(`${iso}T00:00:00`);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - now.getTime()) / 86400000);
}
