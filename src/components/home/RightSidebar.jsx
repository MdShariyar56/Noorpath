"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import usePrayerTimes from "@/hooks/usePrayerTimes";
import { DEFAULT_LOCATION } from "@/lib/api/prayer";
import { format12h, formatCountdown, formatToday } from "@/lib/prayer-utils";

const events = [
  { icon: "🌙", title: "Ramadan 2025", date: "Mar 01 - Mar 29, 2025" },
  { icon: "🕌", title: "Eid al-Fitr", date: "Mar 30, 2025" },
  { icon: "🕋", title: "Eid al-Adha", date: "Jun 06, 2025" },
];

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-4 ${className}`}>
      {children}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="mt-3 animate-pulse space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-9 rounded-lg bg-brand-50 dark:bg-brand-800/50" />
      ))}
    </div>
  );
}

export default function RightSidebar() {
  const { data, state, error } = usePrayerTimes();

  return (
    <aside className="space-y-4">
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

      {/* ইভেন্ট */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold">Events</h3>
          <Link href="/events" className="text-xs font-semibold text-brand-600 dark:text-brand-300">
            View All →
          </Link>
        </div>
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.title} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-lg dark:bg-brand-800">
                {e.icon}
              </span>
              <div>
                <p className="text-sm font-semibold">{e.title}</p>
                <p className="text-[11px] text-muted">{e.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}