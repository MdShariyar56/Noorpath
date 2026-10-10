"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getLastRead } from "@/lib/api/bookmarks";

export default function ContinueReading({ surahs }) {
  const { user } = useAuth();
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!user) {
      setPos(null);
      return;
    }

    let cancelled = false;

    getLastRead()
      .then((p) => {
        if (!cancelled) setPos(p);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const s = pos && surahs.find((x) => x.number === pos.surah);

  if (!s) return null;

  return (
    <div className="rounded-2xl border border-brand-300 bg-brand-50 p-4 dark:border-brand-700 dark:bg-brand-800/40">
      {/* Card Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-200">
          <BookOpen size={16} fill="currentColor" />
          Continue reading Quran
        </h2>

        <Link
          href="/quran"
          className="text-xs font-semibold text-brand-600 dark:text-brand-300"
        >
          View Quran →
        </Link>
      </div>

      {/* Quran Content */}
      <Link
        href={`/quran/${pos.surah}#ayah-${pos.ayah}`}
        className="flex items-center gap-4 rounded-xl border border-brand-200 bg-white p-4 dark:border-brand-700 dark:bg-brand-900/30"
      >
        {/* Quran Icon */}
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
          <BookOpen size={22} />
        </span>

        {/* Surah Information */}
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-brand-600 dark:text-brand-300">
            Continue reading
          </span>

          <span className="block truncate font-semibold">
            {s.englishName}
          </span>

          <span className="block text-xs text-muted">
            Ayah {pos.ayah} · Surah {s.number}
          </span>
        </span>

        {/* Arabic Surah Name */}
        <span className="hidden font-arabic text-2xl text-brand-600 sm:block dark:text-brand-300">
          {s.name.replace("سُورَةُ ", "")}
        </span>

        {/* Arrow */}
        <ArrowRight
          size={18}
          className="shrink-0 text-brand-600 dark:text-brand-300"
        />
      </Link>
    </div>
  );
}