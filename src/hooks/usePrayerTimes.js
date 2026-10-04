"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LOCATION, getPrayerTimes } from "@/lib/api/prayer";
import {
  getPrayerState,
  localDateParam,
  nowSecondsInZone,
} from "@/lib/prayer-utils";

export default function usePrayerTimes(location = DEFAULT_LOCATION) {
  const { city, country } = location;
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [nowSec, setNowSec] = useState(null);

  // ডাটা আনা (আগে ক্যাশ দেখে)
  useEffect(() => {
    let cancelled = false;
    setError(false);
    const key = `prayer:${city}:${country}:${localDateParam()}`;

    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        setData(JSON.parse(cached));
        return;
      }
    } catch {}

    getPrayerTimes({ city, country })
      .then((d) => {
        if (cancelled) return;
        setData(d);
        try {
          localStorage.setItem(key, JSON.stringify(d));
        } catch {}
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [city, country]);

  // প্রতি সেকেন্ডে ঘড়ি
  useEffect(() => {
    if (!data) return;
    const tick = () => setNowSec(nowSecondsInZone(data.timezone));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [data]);

  const state =
    data && nowSec !== null ? getPrayerState(data.timings, nowSec) : null;

  return { data, state, error, nowSec };
  }