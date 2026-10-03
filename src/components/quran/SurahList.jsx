"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SurahList({ surahs }) {
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const filtered = surahs.filter(
    (s) =>
      s.englishName.toLowerCase().includes(query) ||
      s.englishNameTranslation.toLowerCase().includes(query) ||
      s.name.includes(q.trim()) ||
      String(s.number) === query
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
        <Search size={18} className="text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search surah by name or number..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-muted">No surah found.</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
        {filtered.map((s) => (
          <Link
            key={s.number}
            href={`/quran/${s.number}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-brand-300 hover:shadow-md"
          >
            <span className="grid h-11 w-11 shrink-0 rotate-45 place-items-center rounded-lg bg-brand-50 dark:bg-brand-800">
              <span className="-rotate-45 text-sm font-bold text-brand-600 dark:text-brand-200">
                {s.number}
              </span>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{s.englishName}</span>
              <span className="block truncate text-xs text-muted">
                {s.englishNameTranslation} · {s.numberOfAyahs} Ayahs ·{" "}
                {s.revelationType}
              </span>
            </span>

            <span className="font-arabic text-2xl text-brand-600 dark:text-brand-300">
              {s.name.replace("سُورَةُ ", "")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}