"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SectionList({ bookId, sections }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const filtered = sections.filter(
    (s) => s.name.toLowerCase().includes(query) || s.id === query
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
        <Search size={18} className="text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search chapter by name or number..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-muted">No chapter found.</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((s) => (
          <Link
            key={s.id}
            href={`/hadith/${bookId}/${s.id}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-brand-300 hover:shadow-md"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-600 dark:bg-brand-800 dark:text-brand-200">
              {s.id}
            </span>
            <span className="min-w-0 flex-1">
              <span className="line-clamp-2 text-sm font-semibold">{s.name}</span>
              {s.count > 0 && (
                <span className="mt-0.5 block text-xs text-muted">
                  {s.count} Hadiths
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}