"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { listBookmarks } from "@/lib/api/bookmarks";

// book দিলে শুধু ওই গ্রন্থের হাদিস দেখায়
export default function SavedHadiths({ book }) {
  const { user } = useAuth();
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!user) {
      setItems(null);
      return;
    }
    let cancelled = false;
    listBookmarks("hadith")
      .then((list) => {
        if (!cancelled) setItems(list);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const all = (items || []).filter((b) => !book || b.target.startsWith(`${book}:`));
  if (all.length === 0) return null;

  const shown = all.slice(0, 1);

  return (
    <section className="rounded-2xl border border-brand-300 bg-brand-50 p-4 dark:border-brand-700 dark:bg-brand-800/40">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-200">
          <Bookmark size={16} fill="currentColor" />
          Your saved hadiths
        </h2>
        <Link
          href="/bookmarks"
          className="text-xs font-semibold text-brand-600 dark:text-brand-300"
        >
          View all ({all.length}) →
        </Link>
      </div>

      <ul className="space-y-2">
        {shown.map((b) => {
          const [bk, section, num] = b.target.split(":");
          const [en, bn] = (b.label || "").split(" | ");
          return (
            <li key={b.id}>
              <Link
                href={`/hadith/${bk}/${section}#hadith-${num}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-brand-300"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {en || `Hadith ${num} · ${bk}`}
                  </span>
                  {bn && <span className="block text-xs text-muted">{bn}</span>}
                </span>
                <ArrowRight size={16} className="shrink-0 text-brand-600 dark:text-brand-300" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}