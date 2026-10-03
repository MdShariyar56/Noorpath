"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DAY,
  EVENTS,
  HIJRI_SUPPORTED,
  MONTHS,
  WEEK_START,
  fmtFull,
  fmtMon,
  fmtMonthYear,
  fmtShort,
  hijriOf,
  monthDays,
  monthStartOf,
  nextMonthStart,
  prevMonthStart,
  todayMs,
  upcomingEvents,
} from "@/lib/hijri";

const WD_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WD_BN = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];
const ORDER = Array.from({ length: 7 }, (_, i) => (WEEK_START + i) % 7);

// ইংরেজি লেখা, তার নিচে বাংলা
function Bi({ en, bn }) {
  return (
    <>
      <span>{en}</span>
      <span className="block text-[0.92em] opacity-75">{bn}</span>
    </>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h2 className="mb-3 font-bold">{title}</h2>
      {children}
    </div>
  );
}

function inDays(ms, today) {
  const n = Math.round((ms - today) / DAY);
  if (n === 0) return { en: "Today", bn: "আজ" };
  if (n === 1) return { en: "Tomorrow", bn: "আগামীকাল" };
  return { en: `In ${n} days`, bn: `${n} দিন পর` };
}

export default function HijriCalendar() {
  const [offset, setOffset] = useState(0);
  const [today, setToday] = useState(null);
  const [start, setStart] = useState(null);
  const [selected, setSelected] = useState(null);

  // হাইড্রেশন মিসম্যাচ এড়াতে আজকের তারিখ ক্লায়েন্টে মাউন্টের পরে নিই
  useEffect(() => {
    let off = 0;
    try {
      off = Number(localStorage.getItem("hijri-offset")) || 0;
    } catch {}
    if (![-1, 0, 1].includes(off)) off = 0;
    const t = todayMs();
    setOffset(off);
    setToday(t);
    setSelected(t);
    setStart(monthStartOf(t, off));
  }, []);

  const days = useMemo(
    () => (start === null ? [] : monthDays(start, offset)),
    [start, offset]
  );
  const upcoming = useMemo(
    () => (today === null ? [] : upcomingEvents(today, offset, 4)),
    [today, offset]
  );

  if (!HIJRI_SUPPORTED) {
    return (
      <p className="rounded-2xl border border-border bg-card p-6 text-red-500">
        This browser does not support the Islamic calendar. Please use an
        up-to-date Chrome, Edge, Firefox or Safari.
      </p>
    );
  }

  if (start === null) {
    return (
      <div className="h-96 animate-pulse rounded-2xl bg-brand-50 dark:bg-brand-800/40" />
    );
  }

  const h = hijriOf(start, offset);
  const month = MONTHS[h.month - 1];
  const lead = (days[0].dow - WEEK_START + 7) % 7;
  const monthEvents = EVENTS.filter((e) => e.m === h.month);
  const eventByDay = new Map(monthEvents.map((e) => [e.d, e]));
  const lastMs = days[days.length - 1].ms;
  const gRange =
    fmtMonthYear(start) === fmtMonthYear(lastMs)
      ? fmtMonthYear(start)
      : `${fmtMonthYear(start)} – ${fmtMonthYear(lastMs)}`;

  const sel = hijriOf(selected, offset);
  const selMonth = MONTHS[sel.month - 1];
  const isToday = selected === today;

  const goToMonth = (target) => {
    let s = start;
    let m = h.month;
    while (m < target) {
      s = nextMonthStart(s, offset);
      m++;
    }
    while (m > target) {
      s = prevMonthStart(s, offset);
      m--;
    }
    setStart(s);
  };

  const changeOffset = (o) => {
    // এখন যে মাস দেখছি, নতুন সমন্বয়েও সেই মাসেই থাকি
    setStart(monthStartOf(start + 14 * DAY, o));
    setOffset(o);
    try {
      localStorage.setItem("hijri-offset", String(o));
    } catch {}
  };

  const goToday = () => {
    setSelected(today);
    setStart(monthStartOf(today, offset));
  };

  const chip = (active) =>
    `shrink-0 rounded-full border px-3 py-1 text-center text-xs font-medium leading-tight transition ${
      active
        ? "border-brand-600 bg-brand-600 text-white"
        : "border-border bg-card text-foreground/70 hover:border-brand-300"
    }`;

  const offsets = [
    { v: -1, label: "−1 day / −১ দিন" },
    { v: 0, label: "0 (Umm al-Qura)" },
    { v: 1, label: "+1 day / +১ দিন" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <CalendarDays /> Hijri Calendar
          <span className="text-lg font-medium text-brand-100">· হিজরি ক্যালেন্ডার</span>
        </h1>
        <p className="mt-1 text-sm text-brand-100">
          <Bi
            en="Islamic dates and important days"
            bn="ইসলামি তারিখ ও গুরুত্বপূর্ণ দিনসমূহ"
          />
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* ক্যালেন্ডার */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setStart(prevMonthStart(start, offset))}
              aria-label="Previous month"
              className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-brand-300"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="text-center">
              <p className="text-xl font-bold">
                {month.en} {h.year} AH
              </p>
              <p className="text-sm text-muted">
                {month.bn} {h.year} হিজরি
              </p>
              <p className="text-xs text-muted">
                {gRange} · {days.length} days / {days.length} দিন
              </p>
            </div>

            <button
              onClick={() => setStart(nextMonthStart(start, offset))}
              aria-label="Next month"
              className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-brand-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* ১২ মাস */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {MONTHS.map((m, i) => (
              <button
                key={m.en}
                onClick={() => goToMonth(i + 1)}
                className={chip(i + 1 === h.month)}
              >
                {m.en}
                <span className="block text-[10px] opacity-75">{m.bn}</span>
              </button>
            ))}
          </div>

          {/* সপ্তাহের নাম */}
          <div className="grid grid-cols-7 gap-1.5 text-center sm:gap-2">
            {ORDER.map((d) => (
              <div
                key={d}
                className={`py-1 text-[11px] font-semibold leading-tight ${
                  d === 5 ? "text-brand-600 dark:text-brand-300" : "text-muted"
                }`}
              >
                {WD_EN[d]}
                <span className="block text-[10px] font-normal">{WD_BN[d]}</span>
              </div>
            ))}

            {Array.from({ length: lead }).map((_, i) => (
              <div key={`b${i}`} />
            ))}

            {days.map((d, i) => {
              const ev = eventByDay.get(d.hDay);
              const white =
                d.hDay >= 13 && d.hDay <= 15 && !(h.month === 12 && d.hDay === 13);
              const isTodayCell = d.ms === today;
              const isSel = d.ms === selected;
              const gText = i === 0 || d.g === 1 ? `${d.g} ${fmtMon(d.ms)}` : d.g;

              return (
                <button
                  key={d.ms}
                  onClick={() => setSelected(d.ms)}
                  title={ev ? ev.en : undefined}
                  aria-label={`${d.hDay} ${month.en} ${h.year}`}
                  aria-pressed={isSel}
                  className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border transition ${
                    isTodayCell
                      ? "border-brand-600 bg-brand-600 text-white"
                      : isSel
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-800"
                      : "border-border bg-background hover:border-brand-300"
                  } ${
                    !isTodayCell && d.dow === 5
                      ? "text-brand-600 dark:text-brand-300"
                      : ""
                  }`}
                >
                  <span className="text-base font-bold leading-none sm:text-lg">
                    {d.hDay}
                  </span>
                  <span className="mt-1 text-[10px] leading-none opacity-70">
                    {gText}
                  </span>
                  {ev && (
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold-500" />
                  )}
                  {white && (
                    <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ব্যাখ্যা */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-600" /> Today / আজ
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gold-500" /> Important day /
              গুরুত্বপূর্ণ দিন
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> White days (13-15)
              / আইয়ামে বীজ
            </span>
          </div>
        </div>

        {/* ডান পাশ */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600 p-5 text-white">
            <p className="text-xs text-brand-100">
              {isToday ? "Today / আজ" : "Selected date / নির্বাচিত তারিখ"}
            </p>
            <p className="mt-1 text-2xl font-bold">
              {sel.day} {selMonth.en} {sel.year} AH
            </p>
            <p className="text-sm text-brand-100">
              {sel.day} {selMonth.bn} {sel.year} হিজরি
            </p>
            <p className="mt-2 text-sm">{fmtFull(selected)}</p>
            {(!isToday || start !== monthStartOf(today, offset)) && (
              <button
                onClick={goToday}
                className="mt-3 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium hover:bg-white/25"
              >
                Go to today / আজকে ফিরুন
              </button>
            )}
          </div>

          <Card title="This month / এই মাসে">
            {monthEvents.length === 0 ? (
              <p className="text-sm text-muted">
                <Bi
                  en="No listed special days this month."
                  bn="এই মাসে তালিকাভুক্ত বিশেষ দিন নেই।"
                />
              </p>
            ) : (
              <ul className="space-y-3">
                {monthEvents.map((e) => (
                  <li key={e.en} className="text-sm">
                    <p className="font-semibold">
                      <Bi en={e.en} bn={e.bn} />
                    </p>
                    <p className="text-xs text-brand-600 dark:text-brand-300">
                      {e.d} {month.en} · {fmtShort(start + (e.d - 1) * DAY)}
                    </p>
                    {e.noteEn && (
                      <p className="mt-1 text-[11px] text-muted">
                        <Bi en={e.noteEn} bn={e.noteBn} />
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 border-t border-border pt-3 text-[11px] text-muted">
              <Bi
                en="White days (13, 14, 15): voluntary fasting is recommended, except 13 Dhul Hijjah."
                bn="আইয়ামে বীজ (১৩, ১৪, ১৫): নফল রোজা রাখা সুন্নত, তবে ১৩ জিলহজ বাদে।"
              />
            </p>
          </Card>

          <Card title="Upcoming / আসন্ন">
            <ul className="space-y-3">
              {upcoming.map((e) => {
                const rel = inDays(e.ms, today);
                return (
                  <li key={`${e.en}-${e.ms}`} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 shrink-0 rounded-lg bg-brand-50 px-2 py-1 text-center text-[11px] font-semibold leading-tight text-brand-700 dark:bg-brand-800 dark:text-brand-200">
                      <Bi en={rel.en} bn={rel.bn} />
                    </span>
                    <span>
                      <span className="block font-semibold">
                        <Bi en={e.en} bn={e.bn} />
                      </span>
                      <span className="text-xs text-muted">
                        {fmtShort(e.ms)} · {e.d} {MONTHS[e.m - 1].en} {e.year}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card title="Date adjustment / তারিখ সমন্বয়">
            <div className="inline-flex flex-wrap gap-1 rounded-2xl border border-border bg-background p-1">
              {offsets.map((o) => (
                <button
                  key={o.v}
                  onClick={() => changeOffset(o.v)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    offset === o.v
                      ? "bg-brand-600 text-white"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              <Bi
                en="Dates follow the Umm al-Qura calendar (Saudi Arabia). In Bangladesh, months begin after the local moon sighting, which can be one day later. Choose −1 if your local date is a day behind."
                bn="তারিখগুলো উম্মুল কুরা ক্যালেন্ডার (সৌদি আরব) অনুযায়ী। বাংলাদেশে স্থানীয় চাঁদ দেখার পর মাস শুরু হয়, যা একদিন পরে হতে পারে। আপনার স্থানীয় তারিখ একদিন পিছিয়ে থাকলে −১ বেছে নিন।"
              />
            </p>
          </Card>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
        <p className="mb-1 font-semibold">Please note / জেনে রাখুন</p>
        <p>
          <Bi
            en="These are calculated dates for planning. The start of Ramadan and the Eids are confirmed by moon sighting announcements in your country, and scholars differ on the observance of some days listed here."
            bn="এগুলো পরিকল্পনার জন্য হিসাব করা তারিখ। রমজান ও ঈদের শুরু আপনার দেশের চাঁদ দেখার ঘোষণায় নিশ্চিত হয়, আর এখানে তালিকাভুক্ত কিছু দিন পালন নিয়ে আলেমদের মতভেদ আছে।"
          />
        </p>
      </div>
    </div>
  );
}