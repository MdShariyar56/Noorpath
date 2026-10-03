"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const ICONS = {
  "morning-and-evening": "🌅",
  sleep: "🌙",
  cloths: "👕",
  home: "🏠",
  toilet: "🚽",
  "adhaan-and-iqamah": "📢",
  "ablution-and-bath": "💧",
  mosque: "🕌",
  salah: "🧎",
  fasting: "🌛",
  travel: "✈️",
  "hajj-and-umrah": "🕋",
  sacrifice: "🐑",
  "evil-protection": "🛡️",
  forgiveness: "🤲",
  marriage: "💍",
  family: "👨‍👩‍👧",
  debt: "💰",
  anxiety: "💭",
  food: "🍽️",
  animals: "🐪",
  rainnature: "🌧️",
  sickness: "🩺",
  "quranic-dua": "📖",
  eid: "🎉",
  "40-rabbana-duas": "🤲",
};

export default function CategoryGrid({ categories }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.nameEn.toLowerCase().includes(query)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
        <Search size={18} className="text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search category (e.g. travel, সফর)..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-muted">No category found.</p>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            href={`/dua/${c.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-2xl dark:bg-brand-800">
              {ICONS[c.slug] || "📿"}
            </span>
            <span className="mt-3 text-sm font-semibold">{c.name}</span>
            {c.nameEn && (
              <span className="text-[11px] text-muted">{c.nameEn}</span>
            )}
            <span className="mt-1 text-[11px] text-brand-600 dark:text-brand-300">
              {c.subCount} sections
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}