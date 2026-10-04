"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Minus, Moon, Plus } from "lucide-react";
import usePrayerTimes from "@/hooks/usePrayerTimes";
import {
  DAY,
  HIJRI_SUPPORTED,
  fmtFull,
  hijriOf,
  monthStartOf,
  nextMonthStart,
  nextRamadan,
  todayMs,
} from "@/lib/hijri";
import { format12h, formatCountdown, toSeconds } from "@/lib/prayer-utils";
import { DUAS, GOALS, HADITHS } from "@/data/ramadan";

const EMPTY = [];

// ইংরেজি লেখা, তার নিচে বাংলা
function Bi({ en, bn }) {
  return (
    <>
      <span>{en}</span>
      <span className="block text-[0.92em] opacity-75">{bn}</span>
    </>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      {title && <h2 className="mb-3 font-bold">{title}</h2>}
      {children}
    </section>
  );
}

function Bar({ value, light = false }) {
  const pct = Math.round(Math.min(Math.max(value, 0), 1) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2 overflow-hidden rounded-full ${light ? "bg-white/20" : "bg-brand-50 dark:bg-brand-800"}`}
    >
      <div
        className={`h-full rounded-full transition-all ${light ? "bg-gold-400" : "bg-brand-600"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// localStorage এ সেভ থাকা মান। key না থাকলে (null) কিছু করে না
function useStored(key, initial) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (!key) return;
    try {
      const raw = localStorage.getItem(key);
      setValue(raw ? JSON.parse(raw) : initial);
    } catch {
      setValue(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next) => {
      setValue(next);
      if (!key) return;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}
    },
    [key]
  );

  return [value, update];
}

function fastingPhase(timings, nowSec) {
  const fajr = toSeconds(timings.Fajr);
  const maghrib = toSeconds(timings.Maghrib);

  if (nowSec < fajr) {
    return {
      status: { en: "Suhoor time", bn: "সেহরির সময়" },
      label: { en: "Suhoor ends in", bn: "সেহরি শেষ হতে বাকি" },
      remaining: fajr - nowSec,
      progress: 0,
    };
  }
  if (nowSec < maghrib) {
    return {
      status: { en: "Fast in progress", bn: "রোজা চলছে" },
      label: { en: "Iftar in", bn: "ইফতারের বাকি" },
      remaining: maghrib - nowSec,
      progress: (nowSec - fajr) / (maghrib - fajr),
    };
  }
  return {
    status: { en: "Iftar time", bn: "ইফতারের সময়" },
    // আগামীকালের ফজর আজকের ফজর ধরে আনুমানিক হিসাব
    label: { en: "Next suhoor ends in (approx.)", bn: "পরের সেহরি শেষ হতে বাকি (আনুমানিক)" },
    remaining: fajr + 86400 - nowSec,
    progress: 1,
  };
}

export default function RamadanDashboard() {
  const [offset, setOffset] = useState(0);
  const [today, setToday] = useState(null);
  const [preview, setPreview] = useState(false);
  const { data, error, nowSec } = usePrayerTimes();

  useEffect(() => {
    let off = 0;
    try {
      off = Number(localStorage.getItem("hijri-offset")) || 0;
    } catch {}
    if (![-1, 0, 1].includes(off)) off = 0;
    setOffset(off);
    setToday(todayMs());
  }, []);

  const real = useMemo(() => {
    if (today === null || !HIJRI_SUPPORTED) return null;
    const h = hijriOf(today, offset);
    if (h.month === 9) {
      const startMs = monthStartOf(today, offset);
      const length = Math.round((nextMonthStart(startMs, offset) - startMs) / DAY);
      return { inRamadan: true, year: h.year, day: h.day, length, startMs };
    }
    const nx = nextRamadan(today, offset) ?? { ms: today, year: h.year };
    return {
      inRamadan: false,
      year: nx.year,
      startMs: nx.ms,
      daysTo: Math.round((nx.ms - today) / DAY),
    };
  }, [today, offset]);

  const info =
    real && !real.inRamadan && preview
      ? { inRamadan: true, preview: true, year: real.year, day: 15, length: 30, startMs: real.startMs }
      : real;

  const yearKey = info ? (info.preview ? "preview" : info.year) : null;
  const dateKey = today !== null ? new Date(today).toISOString().slice(0, 10) : null;

  const [juz, setJuz] = useStored(yearKey && `ramadan-juz:${yearKey}`, 0);
  const [fasts, setFasts] = useStored(yearKey && `ramadan-fasts:${yearKey}`, EMPTY);
  const [goals, setGoals] = useStored(dateKey && `ramadan-goals:${dateKey}`, EMPTY);

  if (!HIJRI_SUPPORTED) {
    return (
      <p className="rounded-2xl border border-border bg-card p-6 text-red-500">
        This browser does not support the Islamic calendar. Please use an
        up-to-date Chrome, Edge, Firefox or Safari.
      </p>
    );
  }

  if (!info) {
    return <div className="h-96 animate-pulse rounded-2xl bg-brand-50 dark:bg-brand-800/40" />;
  }

  const toggleFast = (d) =>
    setFasts(fasts.includes(d) ? fasts.filter((x) => x !== d) : [...fasts, d]);
  const toggleGoal = (id) =>
    setGoals(goals.includes(id) ? goals.filter((x) => x !== id) : [...goals, id]);

  const phase = data && nowSec !== null ? fastingPhase(data.timings, nowSec) : null;
  const hadith = HADITHS[info.inRamadan ? info.day % HADITHS.length : 0];

  return (
    <div className="space-y-6">
      {/* হিরো */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="relative">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Moon /> Ramadan {info.year} AH
            <span className="text-lg font-medium text-brand-100">· রমজান {info.year} হিজরি</span>
          </h1>

          {info.inRamadan ? (
            <>
              <p className="mt-3 text-3xl font-bold text-gold-400">
                Day {info.day} of {info.length}
                <span className="ml-2 text-lg font-medium text-brand-100">
                  / {info.length} দিনের {info.day}তম দিন
                </span>
              </p>
              <div className="mt-3 max-w-xl">
                <Bar value={info.day / info.length} light />
              </div>
              <p className="mt-2 text-sm text-brand-100">
                <Bi
                  en={`${info.length - info.day} days left`}
                  bn={`আর ${info.length - info.day} দিন বাকি`}
                />
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-3xl font-bold text-gold-400">
                {info.daysTo === 1 ? (
                  "Ramadan begins tomorrow"
                ) : (
                  <>Ramadan begins in {info.daysTo} days</>
                )}
              </p>
              <p className="text-brand-100">
                {info.daysTo === 1
                  ? "রমজান শুরু আগামীকাল"
                  : `রমজান শুরু হতে আর ${info.daysTo} দিন বাকি`}
              </p>
              <p className="mt-2 text-sm text-brand-100">
                <Bi
                  en={`Expected around ${fmtFull(info.startMs)}, subject to moon sighting.`}
                  bn={`আনুমানিক ${fmtFull(info.startMs)}, চাঁদ দেখার ওপর নির্ভরশীল।`}
                />
              </p>
            </>
          )}

          <div className="mt-4">
            {info.preview ? (
              <button
                onClick={() => setPreview(false)}
                className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium hover:bg-white/25"
              >
                Preview: Day 15 · Exit preview / প্রিভিউ বন্ধ করুন
              </button>
            ) : (
              !info.inRamadan && (
                <button
                  onClick={() => setPreview(true)}
                  className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium hover:bg-white/25"
                >
                  Preview Ramadan mode / রমজান মোড প্রিভিউ
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* বাম কলাম */}
        <div className="space-y-6">
          <Card title="Today's fasting times / আজকের রোজার সময়">
            {error && (
              <p className="text-sm text-red-500">
                <Bi
                  en="Could not load prayer times. Please check your connection and refresh."
                  bn="নামাজের সময় আনা যায়নি। ইন্টারনেট দেখে পেজ রিফ্রেশ করুন।"
                />
              </p>
            )}
            {!error && !phase && (
              <div className="h-40 animate-pulse rounded-xl bg-brand-50 dark:bg-brand-800/40" />
            )}
            {phase && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-background p-4">
                    <p className="text-xs text-muted">
                      <Bi en="Suhoor ends (Fajr)" bn="সেহরি শেষ (ফজর)" />
                    </p>
                    <p className="mt-1 text-2xl font-bold tabular-nums">
                      {format12h(data.timings.Fajr)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-background p-4">
                    <p className="text-xs text-muted">
                      <Bi en="Iftar (Maghrib)" bn="ইফতার (মাগরিব)" />
                    </p>
                    <p className="mt-1 text-2xl font-bold tabular-nums">
                      {format12h(data.timings.Maghrib)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-brand-50 p-4 dark:bg-brand-800/50">
                  <p className="font-semibold text-brand-700 dark:text-brand-200">
                    <Bi en={phase.status.en} bn={phase.status.bn} />
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <span className="text-xs text-muted">
                      <Bi en={phase.label.en} bn={phase.label.bn} />
                    </span>
                    <span className="text-2xl font-bold tabular-nums">
                      {formatCountdown(phase.remaining)}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Bar value={phase.progress} />
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-muted">
                  <Bi
                    en={`Times for ${data.location}, calculated by the same method as the Prayer Times page. Local mosque or Islamic Foundation timetables may differ by a minute or two.${
                      info.inRamadan ? "" : " Outside Ramadan, this is useful for voluntary fasts."
                    }`}
                    bn={`${data.location} এর সময়, নামাজের সময় পেজের একই পদ্ধতিতে হিসাব করা। স্থানীয় মসজিদ বা ইসলামিক ফাউন্ডেশনের সময়সূচির সাথে এক-দুই মিনিটের তফাত হতে পারে।${
                      info.inRamadan ? "" : " রমজানের বাইরে নফল রোজার জন্য এটা কাজে লাগবে।"
                    }`}
                  />
                </p>
              </>
            )}
          </Card>

          <Card title="Fasting tracker / রোজা ট্র্যাকার">
            <p className="mb-3 text-sm text-muted">
              <Bi
                en={`Fasted: ${fasts.filter((d) => d <= info.length).length} of ${info.length} days`}
                bn={`রোজা রেখেছেন: ${info.length} দিনের মধ্যে ${fasts.filter((d) => d <= info.length).length} দিন`}
              />
            </p>
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
              {Array.from({ length: info.length }, (_, i) => i + 1).map((d) => {
                const done = fasts.includes(d);
                const future = d > info.day;
                const isToday = d === info.day;
                return (
                  <button
                    key={d}
                    disabled={future}
                    onClick={() => toggleFast(d)}
                    aria-pressed={done}
                    aria-label={`Day ${d}`}
                    className={`grid aspect-square place-items-center rounded-xl border text-sm font-semibold transition ${
                      done
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-border bg-background hover:border-brand-300"
                    } ${isToday ? "ring-2 ring-gold-400/60" : ""} ${
                      future ? "cursor-not-allowed opacity-40" : ""
                    }`}
                  >
                    {done ? <Check size={16} /> : d}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-muted">
              <Bi
                en="Saved on this device only. Tap a day to mark it."
                bn="শুধু এই ডিভাইসে সেভ থাকে। দিন চেপে চিহ্নিত করুন।"
              />
            </p>
          </Card>

          <Card title="Duas / দুয়া">
            <div className="space-y-5">
              {DUAS.map((d) => (
                <article key={d.id} className="rounded-xl bg-background p-4">
                  <h3 className="font-semibold">
                    <Bi en={d.en} bn={d.bn} />
                  </h3>
                  <p dir="rtl" className="font-arabic mt-3 text-right text-2xl leading-[2.2]">
                    {d.arabic}
                  </p>
                  <p className="mt-2 text-sm italic text-brand-600 dark:text-brand-300">
                    {d.translit}
                  </p>
                  <p className="mt-2 text-sm">
                    <Bi en={d.trEn} bn={d.trBn} />
                  </p>
                  <p className="mt-2 text-xs text-muted">{d.ref}</p>
                </article>
              ))}
            </div>
            <Link
              href="/dua/fasting"
              className="mt-4 inline-block text-sm font-semibold text-brand-600 dark:text-brand-300"
            >
              More fasting duas / আরও রোজার দুয়া →
            </Link>
          </Card>
        </div>

        {/* ডান কলাম */}
        <div className="space-y-6">
          <Card title="Quran progress / কুরআনের অগ্রগতি">
            <p className="text-3xl font-bold text-brand-600 dark:text-brand-300">
              {juz} <span className="text-base font-medium text-muted">/ 30 Juz</span>
            </p>
            <div className="mt-3">
              <Bar value={juz / 30} />
            </div>
            {juz >= 30 && (
              <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <Bi en="You completed the Quran! Alhamdulillah." bn="আপনি কুরআন খতম করেছেন! আলহামদুলিল্লাহ।" />
              </p>
            )}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setJuz(Math.max(0, juz - 1))}
                disabled={juz <= 0}
                aria-label="Decrease Juz"
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-brand-300 disabled:opacity-40"
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => setJuz(Math.min(30, juz + 1))}
                disabled={juz >= 30}
                aria-label="Increase Juz"
                className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
              <Link
                href="/quran"
                className="ml-auto text-sm font-semibold text-brand-600 dark:text-brand-300"
              >
                Continue reading / পড়তে থাকুন →
              </Link>
            </div>
          </Card>

          <Card title="Today's goals / আজকের লক্ষ্য">
            <p className="mb-3 text-sm text-muted">
              {goals.length} / {GOALS.length}
            </p>
            <div className="mb-4">
              <Bar value={goals.length / GOALS.length} />
            </div>
            <ul className="space-y-2">
              {GOALS.map((g) => {
                const done = goals.includes(g.id);
                return (
                  <li key={g.id}>
                    <button
                      onClick={() => toggleGoal(g.id)}
                      aria-pressed={done}
                      className="flex w-full items-start gap-3 rounded-xl border border-border p-3 text-left text-sm transition hover:border-brand-300"
                    >
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                          done
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-border"
                        }`}
                      >
                        {done && <Check size={14} />}
                      </span>
                      <span className={done ? "line-through opacity-60" : ""}>
                        <Bi en={g.en} bn={g.bn} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[11px] text-muted">
              <Bi
                en="Resets automatically every day. Saved on this device only."
                bn="প্রতিদিন নিজে থেকে নতুন হয়। শুধু এই ডিভাইসে সেভ থাকে।"
              />
            </p>
          </Card>

          <Card title="Hadith / হাদিস">
            <p dir="rtl" className="font-arabic text-right text-xl leading-[2.2]">
              {hadith.arabic}
            </p>
            <p className="mt-3 text-sm">
              <Bi en={hadith.en} bn={hadith.bn} />
            </p>
            <p className="mt-2 text-xs text-muted">{hadith.ref}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}