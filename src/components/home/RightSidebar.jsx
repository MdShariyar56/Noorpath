"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import usePrayerTimes from "@/hooks/usePrayerTimes";
import { DEFAULT_LOCATION } from "@/lib/api/prayer";
import { format12h, formatCountdown, formatToday } from "@/lib/prayer-utils";
import {
  DAY,
  HIJRI_SUPPORTED,
  fmtShort,
  todayMs,
  upcomingEvents,
} from "@/lib/hijri";
import { fmtDate } from "@/lib/date";

const EVENT_ICON = {
  "1-1": "🌙",
  "1-10": "🕌",
  "3-12": "📖",
  "7-27": "✨",
  "8-15": "🌕",
  "9-1": "🌙",
  "9-27": "✨",
  "10-1": "🎉",
  "12-9": "⛰️",
  "12-10": "🐑",
};

function relative(ms, today) {
  const n = Math.round((ms - today) / DAY);
  if (n === 0) return "Today";
  if (n === 1) return "Tomorrow";
  return `In ${n} days`;
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-4 ${className}`}>
      {children}
    </div>
  );
}

function Skeleton({ rows = 6, h = "h-9" }) {
  return (
    <div className="mt-3 animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`${h} rounded-lg bg-brand-50 dark:bg-brand-800/50`} />
      ))}
    </div>
  );
}

export default function RightSidebar({ featured }) {
  const { data, state, error } = usePrayerTimes();
  const [events, setEvents] = useState(null);

  // আসন্ন ইসলামি দিন (হাইড্রেশন মিসম্যাচ এড়াতে ক্লায়েন্টে মাউন্টের পরে)
  useEffect(() => {
    if (!HIJRI_SUPPORTED) {
      setEvents([]);
      return;
    }
    let off = 0;
    try {
      off = Number(localStorage.getItem("hijri-offset")) || 0;
    } catch {}
    if (![-1, 0, 1].includes(off)) off = 0;

    const today = todayMs();
    setEvents(
      upcomingEvents(today, off, 3).map((e) => ({
        ...e,
        rel: relative(e.ms, today),
        icon: EVENT_ICON[`${e.m}-${e.d}`] || "🌙",
      }))
    );
  }, []);

  return (
    

<aside className="space-y-4 xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:self-start xl:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

  {/* =====================================================
      PRAYER TIMES
  ====================================================== */}
  <Card>
    <div className="relative overflow-hidden rounded-2xl">

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-500/10" />

      <div className="relative">

        {/* Header */}
        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-800/70 dark:text-brand-200">
              <Clock size={18} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Prayer Times
              </h3>

              <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                Daily Salah Schedule
              </p>
            </div>

          </div>

          <Link
            href="/prayer-times"
            className="rounded-lg border border-brand-200 px-2.5 py-1.5 text-[11px] font-semibold text-brand-600 transition hover:bg-brand-50 dark:border-brand-700 dark:text-brand-300 dark:hover:bg-brand-800/50"
          >
            Details
          </Link>

        </div>

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
          <MapPin size={12} />
          <span>
            {DEFAULT_LOCATION.city}, {DEFAULT_LOCATION.country}
          </span>
        </div>


        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/30">
            <p className="text-xs leading-relaxed text-red-600 dark:text-red-400">
              Could not load prayer times. Please check your connection and refresh.
            </p>
          </div>
        )}


        {/* Loading */}
        {!state && !error && (
          <div className="mt-4 space-y-2">
            <Skeleton rows={5} h="h-9" />
          </div>
        )}


        {/* Prayer Data */}
        {state && (
          <>

            {/* Prayer List */}
            <ul className="mt-4 space-y-1.5">

              {state.list.map((p) => {

                const current = p.key === state.currentKey;

                return (
                  <li
                    key={p.key}
                    className={`group relative flex items-center justify-between overflow-hidden rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                      current
                        ? "bg-gradient-to-r from-brand-700 to-brand-600 font-semibold text-white shadow-md shadow-brand-900/20"
                        : "text-gray-700 hover:bg-brand-50 dark:text-gray-200 dark:hover:bg-brand-800/40"
                    }`}
                  >

                    {/* Active indicator */}
                    {current && (
                      <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-white/70" />
                    )}

                    <span className="flex items-center gap-2">

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          current
                            ? "bg-white"
                            : "bg-brand-300 dark:bg-brand-600"
                        }`}
                      />

                      {p.label}

                    </span>

                    <span className="flex items-center gap-2 tabular-nums">

                      {format12h(p.time)}

                      {current && (
                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                          Now
                        </span>
                      )}

                    </span>

                  </li>
                );
              })}

            </ul>


            {/* Next Prayer */}
            <div className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 p-4 text-white shadow-lg shadow-brand-900/20 dark:from-brand-950 dark:via-brand-900 dark:to-brand-800">

              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border border-white/10" />

              <div className="pointer-events-none absolute -right-2 -top-2 h-12 w-12 rounded-full border border-white/10" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/65">
                    Next Prayer
                  </span>

                  <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-medium text-white/80 backdrop-blur-sm">
                    Coming Up
                  </span>

                </div>

                <div className="mt-2 flex items-end justify-between gap-3">

                  <div>
                    <p className="text-lg font-bold">
                      {state.next.label}
                    </p>

                    <p className="mt-0.5 text-xs text-white/60">
                      Prepare for Salah
                    </p>
                  </div>

                  <span className="text-xl font-bold tabular-nums tracking-tight">
                    {formatCountdown(state.remaining)}
                  </span>

                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-2/5 rounded-full bg-white/70" />
                </div>

              </div>

            </div>

          </>
        )}

      </div>
    </div>
  </Card>


  {/* =====================================================
      ISLAMIC CALENDAR
  ====================================================== */}
  <Card>

    <div className="flex items-start justify-between">

      <div className="flex items-center gap-3">

        <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300">
          <CalendarDays size={18} />
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">
            Islamic Calendar
          </h3>

          <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
            Hijri Date
          </p>
        </div>

      </div>

      <span className="rounded-full bg-brand-50 px-2 py-1 text-[9px] font-bold text-brand-600 dark:bg-brand-800/60 dark:text-brand-300">
        AH
      </span>

    </div>


    {data ? (
      <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/70 p-4 dark:border-brand-700/40 dark:bg-brand-900/40">

        <p className="text-xs font-medium text-brand-600 dark:text-brand-300">
          Today
        </p>

        <p className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.hijri.day}{" "}
          {data.hijri.month}{" "}
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {data.hijri.year} AH
          </span>
        </p>

        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
          <CalendarDays size={12} />
          {formatToday(data.timezone)}
        </div>

      </div>
    ) : (
      <div className="mt-4 h-24 animate-pulse rounded-2xl bg-brand-50 dark:bg-brand-800/50" />
    )}


    <Link
      href="/calendar"
      className="group mt-3 flex items-center justify-between rounded-xl px-1 py-2 text-xs font-semibold text-brand-600 transition hover:bg-brand-50 hover:px-2 dark:text-brand-300 dark:hover:bg-brand-800/40"
    >
      <span>Explore Islamic Calendar</span>

      <span className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </Link>

  </Card>


  {/* =====================================================
      FEATURED ARTICLE
  ====================================================== */}
  {featured && (
    <Card>

      <div className="mb-3 flex items-center justify-between">

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">
            Featured Article
          </h3>

          <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
            Learn & reflect
          </p>
        </div>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-brand-600 dark:bg-brand-800/60 dark:text-brand-300">
          Featured
        </span>

      </div>


      <Link
        href={`/articles/${featured.slug}`}
        className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-brand-700/50 dark:bg-brand-900/30"
      >

        {/* Image */}
        <div className="relative h-36 overflow-hidden">

          <img loading="lazy"
            src={featured.icon}
            alt={featured.title[0]}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <span className="absolute bottom-3 left-3 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur-md">
            Islamic Knowledge
          </span>

        </div>


        {/* Content */}
        <div className="p-3.5">

          <h4 className="line-clamp-2 text-sm font-bold leading-5 text-gray-900 dark:text-white">
            {featured.title[0]}
          </h4>

          <div className="mt-2 flex items-center justify-between">

            <span className="text-[10px] text-gray-500 dark:text-gray-400">
              {fmtDate(featured.date)}
            </span>

            <span className="text-xs font-bold text-brand-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-brand-300">
              Read →
            </span>

          </div>

        </div>

      </Link>

    </Card>
  )}


  {/* =====================================================
      EVENTS
  ====================================================== */}
  <Card>

    <div className="mb-4 flex items-center justify-between">

      <div>
        <h3 className="font-bold text-gray-900 dark:text-white">
          Upcoming Events
        </h3>

        <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
          Important Islamic dates
        </p>
      </div>

      <Link
        href="/calendar"
        className="rounded-lg px-2 py-1 text-[10px] font-semibold text-brand-600 transition hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-800/50"
      >
        View All →
      </Link>

    </div>


    {/* Loading */}
    {events === null && (
      <Skeleton rows={3} h="h-12" />
    )}


    {/* Empty */}
    {events && events.length === 0 && (
      <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center dark:border-brand-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          No upcoming events.
        </p>
      </div>
    )}


    {/* Events */}
    {events && events.length > 0 && (
      <ul className="relative space-y-1">

        {/* Timeline */}
        <span className="absolute bottom-5 left-5 top-5 w-px bg-brand-100 dark:bg-brand-800" />

        {events.map((e) => (

          <li
            key={`${e.en}-${e.ms}`}
            className="group relative flex items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-brand-50 dark:hover:bg-brand-800/30"
          >

            {/* Icon */}
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-100 bg-white text-base shadow-sm transition-transform duration-200 group-hover:scale-105 dark:border-brand-700 dark:bg-brand-900">
              {e.icon}
            </span>


            {/* Event Info */}
            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {e.en}
              </p>

              <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                {fmtShort(e.ms)}
                <span className="mx-1">·</span>
                {e.rel}
              </p>

            </div>


            {/* Arrow */}
            <span className="text-xs text-gray-400 transition-transform duration-200 group-hover:translate-x-1 dark:text-gray-500">
              →
            </span>

          </li>

        ))}

      </ul>
    )}

  </Card>

</aside>



  );
}