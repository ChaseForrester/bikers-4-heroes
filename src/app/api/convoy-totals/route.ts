import { NextResponse } from "next/server";
import type { ConvoyLeader, ConvoyLive } from "@/lib/types";

const SOURCE = "https://illawarraconvoy.com.au/store/product/2025-convoy-hoodies";

function money(value: string) {
    return Number(value.replace(/,/g, ""));
}

function parseLeaders(block: string): ConvoyLeader[] {
    const items: ConvoyLeader[] = [];
    const re =
        /<a href="(\/team\/[^"]+|\/individual\/[^"]+)"><span class="name">([^<]+)<\/span><\/a>\s*<span class="amount">\$([0-9,.]+) Raised<\/span>\s*<span class="position">([^<]+)<\/span>[\s\S]{0,400}?(?:of <strong>\$([0-9,.]+)<\/strong>)?/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(block))) {
        items.push({
            url: `https://illawarraconvoy.com.au${m[1]}`,
            name: m[2].replace(/\s+/g, " ").trim(),
            amount: money(m[3]),
            place: m[4].trim(),
            goal: m[5] ? money(m[5]) : undefined,
        });
    }
    return items;
}

export async function GET() {
    try {
        const res = await fetch(SOURCE, {
            headers: { "User-Agent": "Bikers4Heroes/1.0 (charity tracker)" },
            next: { revalidate: 900 },
        });
        if (!res.ok) {
            return NextResponse.json({ error: "Convoy page unavailable" }, { status: 502 });
        }
        const html = await res.text();
        const lifetimeMatch = html.match(/Raised Since 2005<\/small>\s*\$([0-9,]+)/i);
        const teamsStart = html.indexOf("Top Teams");
        const fundsStart = html.indexOf("Top Fundraisers");
        const teamsBlock =
            teamsStart >= 0 ? html.slice(teamsStart, fundsStart > teamsStart ? fundsStart : teamsStart + 8000) : "";
        const fundsBlock = fundsStart >= 0 ? html.slice(fundsStart, fundsStart + 8000) : "";

        const payload: ConvoyLive = {
            lifetimeRaised: lifetimeMatch ? money(lifetimeMatch[1]) : 0,
            teams: parseLeaders(teamsBlock).slice(0, 5),
            fundraisers: parseLeaders(fundsBlock).slice(0, 5),
            sourceUrl: SOURCE,
            fetchedAt: new Date().toISOString(),
        };

        return NextResponse.json(payload);
    } catch {
        return NextResponse.json({ error: "Could not read Convoy totals" }, { status: 502 });
    }
}
