"use client";

import { CalendarDays, MapPin, Moon, Search } from "lucide-react";
import usePrayerTimes from "@/hooks/usePrayerTimes";
import { DEFAULT_LOCATION } from "@/lib/api/prayer";
import { formatToday } from "@/lib/prayer-utils";
import Form from "next/form";

export default function Hero() {
  const { data } = usePrayerTimes();

  const info = [
    {
      icon: CalendarDays,
      label: "Today",
      value: data ? formatToday(data.timezone) : "Loading...",
    },
    {
      icon: Moon,
      label: "Hijri Date",
      value: data
        ? `${data.hijri.day} ${data.hijri.month} ${data.hijri.year} AH`
        : "Loading...",
    },
    {
      icon: MapPin,
      label: "Location",
      value: `${DEFAULT_LOCATION.city}, ${DEFAULT_LOCATION.country}`,
    },
  ];
  return (
    <section
      className="relative overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat p-6 text-white md:p-10"
  style={{
    backgroundImage:
      "linear-gradient(to right, rgba(7,42,33,.92), rgba(7,42,33,.45)), url('https://imglink.cc/cdn/0WgB99MI-5.jpg')",
  }}
    >
      {/* সাজসজ্জার বৃত্ত */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            🌙 Assalamu Alaikum
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            Your <span className="text-gold-400">Islamic Journey</span>
            <br />
            Starts Here
          </h1>

          <p className="mt-3 text-sm text-brand-100 md:text-base">
            Quran · Hadith · Dua · Prayer Times · Islamic Tools
            <br />
            All in One Place
          </p>

          <Form
            action="/search"
            className="mt-6 flex max-w-xl items-center rounded-xl bg-white p-1.5 shadow-lg"
          >
            <Search size={18} className="mx-3 shrink-0 text-gray-400" />
            <input
              type="search"
              name="q"
              required
              minLength={2}
              placeholder="Search Quran, Hadith, Dua, Articles..."
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              aria-label="Search"
              className="grid h-10 w-12 shrink-0 place-items-center rounded-lg bg-brand-600 text-white hover:bg-brand-700"
            >
              <Search size={18} />
            </button>
          </Form>
        </div>

        {/* তারিখ/হিজরি/লোকেশন কার্ড */}
        <div className="space-y-4 self-center rounded-xl bg-black/25 p-5 backdrop-blur-sm">
          {info.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon size={20} className="mt-0.5 shrink-0 text-gold-400" />
              <div>
                <p className="text-xs text-brand-200">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}