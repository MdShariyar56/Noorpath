"use client";

import { Clock, MapPin } from "lucide-react";
import usePrayerTimes from "@/hooks/usePrayerTimes";
import { DEFAULT_LOCATION, METHOD_NAME, SCHOOL_NAME } from "@/lib/api/prayer";
import { format12h, formatCountdown, formatToday } from "@/lib/prayer-utils";
import Image from "next/image";

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
      <div className=" rounded-2xl flex items-center gap-4 text-2xl  bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4 text-white">
        <Image
          src="https://imglink.cc/cdn/EyWT2qGjai.png"
          alt="Prayer Times Logo"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border-2 object-cover"
        />
        <div className="">
          <p className="font-bold text-2xl">Prayer Times</p>
          <p className="mt-1 text-sm text-brand-100 flex items-center gap-2">
            <MapPin size={14} /> {DEFAULT_LOCATION.city},{" "}
            {DEFAULT_LOCATION.country}
          </p>
        </div>
      </div>

     <div className="grid gap-6 lg:grid-cols-2">
  {/* Next Prayer */}
  <div className="group relative min-h-[380px] overflow-hidden rounded-3xl border border-white/10 shadow-xl">
    {/* Islamic Background */}
    <img
      src="https://imglink.cc/cdn/3iTP1-e5Mi.jpg"
      alt="Beautiful mosque"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-900/80 to-brand-700/60" />

    {/* Content */}
    <div className="relative z-10 flex h-full flex-col justify-between p-7 text-white md:p-9">
      <div>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/20 backdrop-blur-sm">
            <span className="text-xl">☪</span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-100">
              Next Prayer
            </p>
            <p className="text-sm text-white/70">
              Prepare yourself for Salah
            </p>
          </div>
        </div>

        <p className="text-4xl font-bold tracking-tight md:text-5xl">
          {state.next.label}
        </p>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-widest text-brand-100">
            Remaining Time
          </p>

          <p className="mt-1 text-5xl font-bold tabular-nums tracking-tight text-gold-400 md:text-6xl">
            {formatCountdown(state.remaining)}
          </p>
        </div>

        <div className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
          🕐&nbsp; Prayer at {format12h(state.next.time)}
        </div>
      </div>

      {/* Date Information */}
      <div className="mt-8 border-t border-white/15 pt-5">
        <p className="text-sm font-medium text-white">
          {formatToday(data.timezone)}
        </p>

        <p className="mt-1 text-sm text-brand-100">
          {data.hijri.day} {data.hijri.month} {data.hijri.year} AH
        </p>
      </div>
    </div>
  </div>

  {/* Today's Prayer Times */}
  <div className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
    {/* Header */}
    <div className="mb-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
          Daily Schedule
        </p>

        <h2 className="mt-1 text-xl font-bold text-foreground md:text-2xl">
          Today&apos;s Prayer Times
        </h2>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-xl">
        🕌
      </div>
    </div>

    {/* Prayer List */}
    <ul className="space-y-2">
      {state.list.map((p) => {
        const current = p.key === state.currentKey;

        return (
          <li
            key={p.key}
            className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-200 ${
              current
                ? "bg-gradient-to-r from-brand-700 to-brand-500 text-white shadow-md shadow-brand-700/20"
                : "bg-background hover:bg-brand-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold ${
                  current
                    ? "bg-white/15 text-white"
                    : "bg-brand-100 text-brand-700"
                }`}
              >
                {p.label.charAt(0)}
              </span>

              <span
                className={`font-medium ${
                  current ? "text-white" : "text-foreground"
                }`}
              >
                {p.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`font-semibold tabular-nums ${
                  current ? "text-white" : "text-foreground"
                }`}
              >
                {format12h(p.time)}
              </span>

              {current && (
                <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                  Now
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
</div>

      {/* সেটিংস তথ্য */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {info.map((i) => (
          <div
            key={i.label}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <p className="text-xs text-muted">{i.label}</p>
            <p className="mt-1 text-sm font-semibold">{i.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
