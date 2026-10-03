"use client";

import { Clock, MapPin } from "lucide-react";
import usePrayerTimes from "@/hooks/usePrayerTimes";
import { DEFAULT_LOCATION, METHOD_NAME, SCHOOL_NAME } from "@/lib/api/prayer";
import { format12h, formatCountdown, formatToday } from "@/lib/prayer-utils";

export default function PrayerTimesView() {
  const { data, state, error } = usePrayerTimes();

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-red-500">Could not load prayer times.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="h-96 animate-pulse rounded-2xl bg-brand-50 dark:bg-brand-800/40" />
    );
  }

  const info = [
    { label: "Calculation Method", value: METHOD_NAME },
    { label: "Asr Juristic Method", value: SCHOOL_NAME },
    { label: "Time Format", value: "12 Hour" },
    { label: "Location", value: data.location },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Clock className="text-brand-600 dark:text-brand-300" /> Prayer Times
        </h1>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <MapPin size={14} /> {DEFAULT_LOCATION.city}, {DEFAULT_LOCATION.country}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* পরের নামাজ */}
        <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-8 text-white">
          <p className="text-sm text-brand-100">Next Prayer</p>
          <p className="mt-1 text-4xl font-bold">{state.next.label}</p>
          <p className="mt-4 text-5xl font-bold tabular-nums text-gold-400">
            {formatCountdown(state.remaining)}
          </p>
          <p className="mt-4 text-sm text-brand-100">
            at {format12h(state.next.time)}
          </p>
          <div className="mt-6 border-t border-white/20 pt-4 text-sm text-brand-100">
            <p>{formatToday(data.timezone)}</p>
            <p>
              {data.hijri.day} {data.hijri.month} {data.hijri.year} AH
            </p>
          </div>
        </div>

        {/* আজকের সময়সূচি */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 font-bold">Today&apos;s Prayer Times</h2>
          <ul className="space-y-1.5">
            {state.list.map((p) => {
              const current = p.key === state.currentKey;
              return (
                <li
                  key={p.key}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                    current ? "bg-brand-600 font-semibold text-white" : "bg-background"
                  }`}
                >
                  <span>{p.label}</span>
                  <span className="flex items-center gap-2">
                    {format12h(p.time)}
                    {current && (
                      <span className="rounded bg-white/25 px-1.5 text-[10px]">Now</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* সেটিংস তথ্য */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {info.map((i) => (
          <div key={i.label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted">{i.label}</p>
            <p className="mt-1 text-sm font-semibold">{i.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}