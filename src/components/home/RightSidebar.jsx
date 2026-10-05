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
      {/* নামাজের সময় */}
      <Card>
        <h3 className="flex items-center gap-2 font-bold">
          <Clock size={18} className="text-brand-600 dark:text-brand-300" />
          Prayer Times
        </h3>
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {DEFAULT_LOCATION.city}, {DEFAULT_LOCATION.country}
          </span>
          <Link href="/prayer-times" className="font-medium text-brand-600 dark:text-brand-300">
            Details
          </Link>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500">
            Could not load prayer times. Please check your connection and refresh.
          </p>
        )}

        {!state && !error && <Skeleton />}

        {state && (
          <>
            <ul className="mt-3 space-y-1">
              {state.list.map((p) => {
                const current = p.key === state.currentKey;
                return (
                  <li
                    key={p.key}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                      current ? "bg-brand-600 font-semibold text-white" : ""
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

            <div className="mt-3 rounded-xl bg-brand-50 p-3 dark:bg-brand-800/50">
              <p className="text-xs font-semibold text-brand-600 dark:text-brand-300">
                Next Prayer
              </p>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="font-medium">{state.next.label}</span>
                <span className="font-semibold tabular-nums">
                  {formatCountdown(state.remaining)}
                </span>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* ইসলামিক ক্যালেন্ডার */}
      <Card>
        <h3 className="flex items-center gap-2 font-bold">
          <CalendarDays size={18} className="text-brand-600 dark:text-brand-300" />
          Islamic Calendar
        </h3>
        {data ? (
          <>
            <p className="mt-3 text-sm font-semibold">
              {data.hijri.day} {data.hijri.month} {data.hijri.year} AH
            </p>
            <p className="text-xs text-muted">{formatToday(data.timezone)}</p>
          </>
        ) : (
          <div className="mt-3 h-10 animate-pulse rounded-lg bg-brand-50 dark:bg-brand-800/50" />
        )}
        <Link
          href="/calendar"
          className="mt-2 inline-block text-xs font-semibold text-brand-600 dark:text-brand-300"
        >
          View Calendar →
        </Link>
      </Card>

      {/* ফিচার্ড আর্টিকেল */}
      {featured && (
        <Card>
          <h3 className="mb-3 font-bold">Featured Article</h3>
          <Link
            href={`/articles/${featured.slug}`}
            className="group flex gap-3 rounded-xl border border-border p-2.5 transition hover:border-brand-300"
          >
            <span
              className={`grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-2xl ${featured.bg}`}
            >
              {featured.icon}
            </span>
            <span className="min-w-0">
              <span className="line-clamp-2 block text-sm font-semibold">
                {featured.title[0]}
              </span>
              <span className="block text-[11px] text-muted">
                {fmtDate(featured.date)}
              </span>
              <span className="mt-1 block text-xs font-semibold text-brand-600 dark:text-brand-300">
                Read More →
              </span>
            </span>
          </Link>
        </Card>
      )}

      {/* আসন্ন ইভেন্ট */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold">Events</h3>
          <Link href="/calendar" className="text-xs font-semibold text-brand-600 dark:text-brand-300">
            View All →
          </Link>
        </div>

        {events === null && <Skeleton rows={3} h="h-12" />}

        {events && events.length === 0 && (
          <p className="text-xs text-muted">No upcoming events.</p>
        )}

        {events && events.length > 0 && (
          <ul className="space-y-3">
            {events.map((e) => (
              <li key={`${e.en}-${e.ms}`} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-lg dark:bg-brand-800">
                  {e.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{e.en}</p>
                  <p className="text-[11px] text-muted">
                    {fmtShort(e.ms)} · {e.rel}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </aside>
  );
}