"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Landmark, RotateCcw } from "lucide-react";
import {
  DAY,
  HIJRI_SUPPORTED,
  fmtFull,
  nextMonthOf,
  todayMs,
} from "@/lib/hijri";
import {
  CHECKLIST,
  DUAS,
  HAJJ_INFO,
  HAJJ_STEPS,
  HAJJ_TYPES,
  HEALTH_TIPS,
  TRAVEL_TIPS,
  UMRAH_INFO,
  UMRAH_STEPS,
} from "@/data/hajj";

const TABS = [
  { id: "hajj", en: "Hajj", bn: "হজ" },
  { id: "umrah", en: "Umrah", bn: "উমরা" },
  { id: "duas", en: "Duas", bn: "দুয়া" },
  { id: "checklist", en: "Checklist", bn: "চেকলিস্ট" },
  { id: "tips", en: "Health & Travel", bn: "স্বাস্থ্য ও ভ্রমণ" },
];

const TOTAL_ITEMS = CHECKLIST.reduce((n, g) => n + g.items.length, 0);

// t = ["English", "বাংলা"]
function Bi({ t }) {
  return (
    <>
      <span>{t[0]}</span>
      <span className="block text-[0.92em] opacity-75">{t[1]}</span>
    </>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card p-5 ${className}`}
    >
      {title && <h2 className="mb-3 font-bold">{title}</h2>}
      {children}
    </section>
  );
}

function Bullets({ items }) {
  return (
    <ul className="space-y-2.5 text-sm">
      {items.map((t) => (
        <li key={t[0]} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
          <span>
            <Bi t={t} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ steps }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={s.id}>
          <details
            open
            className="group rounded-2xl border border-border bg-card p-4"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">
                  <Bi t={s.title} />
                </span>
                <span className="mt-0.5 block text-xs text-brand-600 dark:text-brand-300">
                  {s.when[0]} · {s.when[1]}
                </span>
              </span>
              <ChevronDown
                size={18}
                className="shrink-0 text-muted transition group-open:rotate-180"
              />
            </summary>
            <div className="mt-3 border-t border-border pt-3">
              <Bullets items={s.points} />
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

export default function HajjUmrahGuide() {
  const [tab, setTab] = useState("hajj");
  const [today, setToday] = useState(null);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    setToday(todayMs());
    try {
      const raw = localStorage.getItem("hajj-checklist");
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
  }, []);

  // হজের তারিখ সৌদির হিসাব ধরে (স্থানীয় সমন্বয় ছাড়া)
  const hajj = useMemo(() => {
    if (today === null || !HIJRI_SUPPORTED) return null;
    let m = nextMonthOf(today, 0, 12);
    if (m && today > m.ms + 13 * DAY) m = nextMonthOf(m.ms + 40 * DAY, 0, 12);
    if (!m) return null;
    const at = (n) => m.ms + (n - 1) * DAY;
    return {
      year: m.year,
      start: at(8),
      arafah: at(9),
      eid: at(10),
      daysTo: Math.round((at(8) - today) / DAY),
      underway: today >= at(8) && today <= at(13),
    };
  }, [today]);

  const save = (next) => {
    setChecked(next);
    try {
      localStorage.setItem("hajj-checklist", JSON.stringify(next));
    } catch {}
  };
  const toggle = (id) =>
    save(
      checked.includes(id) ? checked.filter((x) => x !== id) : [...checked, id],
    );

  const tabClass = (active) =>
    `shrink-0 rounded-full border px-4 py-2 text-center text-sm font-medium leading-tight transition ${
      active
        ? "border-brand-600 bg-brand-600 text-white"
        : "border-border bg-card text-foreground/70 hover:border-brand-300"
    }`;

  return (
    <div className="space-y-6">
      <div className=" rounded-2xl flex items-center gap-4 text-2xl  bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4 text-white">
        <img
          src="https://imglink.cc/cdn/utNUdJza6Q.png"
          alt="Hajj Umrah Logo"
          className="h-17 w-17 border-1 rounded-full  object-cover"
        />
        <div className="">
          <p className="font-bold text-2xl">Hajj &amp; Umrah Guide</p>
          <p className="mt-1 text-sm text-brand-100 flex items-center gap-2">
            A step-by-step guide for your spiritual journey
          </p>
        </div>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={tabClass(tab === t.id)}
          >
            {t.en}
          </button>
        ))}
      </div>

      {/* হজ */}
      {tab === "hajj" && (
        <div className="space-y-6">
          {hajj && (
            <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600 p-5 text-white">
              <p className="text-xs text-brand-100">
                Hajj {hajj.year} AH · হজ {hajj.year} হিজরি
              </p>
              {hajj.underway ? (
                <p className="mt-1 text-2xl font-bold text-gold-400">
                  Hajj is underway
                </p>
              ) : (
                <p className="mt-1 text-2xl font-bold text-gold-400">
                  Expected in {hajj.daysTo} days
                </p>
              )}
              <p className="mt-2 text-sm text-brand-100">
                Day of Arafah ≈ {fmtFull(hajj.arafah)}
                <br />
                Eid al-Adha ≈ {fmtFull(hajj.eid)}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-brand-200">
                <Bi
                  t={[
                    "Estimated from the Umm al-Qura calendar. The actual dates follow Saudi Arabia's moon-sighting announcement. Eid in Bangladesh may fall a day later.",
                  ]}
                />
              </p>
            </div>
          )}

          <Card title="Overview">
            <Bullets items={HAJJ_INFO} />
          </Card>

          <Card title="Types of Hajj ">
            <div className="grid gap-3 md:grid-cols-3">
              {HAJJ_TYPES.map((t) => (
                <div key={t.name[0]} className="rounded-xl bg-background p-4">
                  <p className="font-semibold text-brand-600 dark:text-brand-300">
                    {t.name[0]}
                  </p>
                  <p className="mt-2 text-sm">
                    <Bi t={t.text} />
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <div>
            <h2 className="mb-3 font-bold">Steps of Hajj </h2>
            <Steps steps={HAJJ_STEPS} />
          </div>
        </div>
      )}

      {/* উমরা */}
      {tab === "umrah" && (
        <div className="space-y-6">
          <Card title="Overview ">
            <Bullets items={UMRAH_INFO} />
          </Card>
          <div>
            <h2 className="mb-3 font-bold">Steps of Umrah </h2>
            <Steps steps={UMRAH_STEPS} />
          </div>
        </div>
      )}

      {/* দুয়া */}
      {tab === "duas" && (
        <div className="grid gap-4 xl:grid-cols-2">
          {DUAS.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h2 className="font-bold">
                <Bi t={d.title} />
              </h2>
              <p
                dir="rtl"
                className="font-arabic mt-4 text-right text-2xl leading-[2.2] sm:text-3xl"
              >
                {d.arabic}
              </p>
              <p className="mt-3 text-sm italic text-brand-600 dark:text-brand-300">
                {d.translit}
              </p>
              <p className="mt-3 text-sm">
                <Bi t={d.meaning} />
              </p>
              <p className="mt-3 text-xs text-muted">{d.ref}</p>
            </article>
          ))}
        </div>
      )}

      {/* চেকলিস্ট */}
      {tab === "checklist" && (
        <div className="space-y-5">
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">
                  {checked.length}{" "}
                  <span className="text-base font-medium text-muted">
                    / {TOTAL_ITEMS}
                  </span>
                </p>
                <p className="text-xs text-muted">Packed</p>
              </div>
              <button
                onClick={() => save([])}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:border-brand-300"
              >
                <RotateCcw size={14} /> Reset 
              </button>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-50 dark:bg-brand-800">
              <div
                className="h-full rounded-full bg-brand-600 transition-all"
                style={{ width: `${(checked.length / TOTAL_ITEMS) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-muted">
              <Bi
                t={["Saved on this device only."]}
              />
            </p>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {CHECKLIST.map((g) => (
              <Card key={g.id} title={`${g.title[0]}`}>
                <ul className="space-y-2">
                  {g.items.map((it) => {
                    const done = checked.includes(it.id);
                    return (
                      <li key={it.id}>
                        <button
                          onClick={() => toggle(it.id)}
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
                          <span
                            className={done ? "line-through opacity-60" : ""}
                          >
                            <Bi t={it.text} />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* স্বাস্থ্য ও ভ্রমণ */}
      {tab === "tips" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Health & safety ">
            <Bullets items={HEALTH_TIPS} />
          </Card>
          <Card title="Travel tips">
            <Bullets items={TRAVEL_TIPS} />
          </Card>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
        <p className="mb-1 font-semibold">Please note</p>
        <p>
          <Bi
            t={[
              "This guide is a general summary to help you prepare. Rulings can differ between schools of thought and individual circumstances. Please follow the guidance of a qualified scholar or your Hajj group's scholar, and check official sources for current regulations.",
            ]}
          />
        </p>
      </div>
    </div>
  );
}
