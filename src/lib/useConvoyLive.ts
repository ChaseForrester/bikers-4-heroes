"use client";

import { useEffect, useState } from "react";
import type { ConvoyLive } from "./types";

export function useConvoyLive() {
    const [data, setData] = useState<ConvoyLive | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/convoy-totals")
            .then(async (res) => {
                if (!res.ok) throw new Error("Convoy totals unavailable");
                return res.json() as Promise<ConvoyLive>;
            })
            .then((json) => {
                if (!cancelled) setData(json);
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { data, error, loading };
}
