"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import useBookmarks from "@/hooks/useBookmarks";
import BookmarkButton, { BookmarkError } from "@/components/bookmarks/BookmarkButton";


const TONES = {
  good: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  mid: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  bad: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
  neutral: "bg-brand-50 text-brand-700 dark:bg-brand-800 dark:text-brand-200",
};

function getGrade(grades, bookId) {
  // ছোট লেবেল বেছে নিই (আল-আলবানি আগে)
  const short = grades.filter((g) => g.grade && g.grade.length <= 20);
  const g = short.find((x) => x.name === "Al-Albani") || short[0];

  if (!g) {
    return bookId === "bukhari" || bookId === "muslim"
      ? { label: "Sahih", tone: "good" }
      : null;
  }

  let tone = "neutral";
  if (/daif|munkar|maudu|mawdu|shadh/i.test(g.grade)) tone = "bad";
  else if (/sahih/i.test(g.grade)) tone = "good";
  else if (/hasan/i.test(g.grade)) tone = "mid";

  return { label: g.grade, tone, by: g.name };
}

export default function HadithReader({ book, section, hadiths, prev, next }) {
  const hasBn = hadiths.some((h) => h.bn);
  const [showBn, setShowBn] = useState(true);
  const [showEn, setShowEn] = useState(true);
  const [copied, setCopied] = useState(null);
  const bm = useBookmarks("hadith", { prefix: `${book.id}:${section.id}:` });
  const tgt = (h) => `${book.id}:${section.id}:${h.number}`;

  const copy = async (h) => {
    const parts = [
      h.ar,
      showBn && h.bn,
      showEn && h.en,
      `— ${book.name}, Hadith ${h.number}`,
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(parts.join("\n\n"));
      setCopied(h.number);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const toggles = [
    ...(hasBn ? [{ label: "বাংলা", on: showBn, set: setShowBn }] : []),
    { label: "English", on: showEn, set: setShowEn },
  ];

  return (
    <div className="space-y-5">
      {/* হেডার */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <Link
          href={`/hadith/${book.id}`}
          className="text-xs text-brand-100 hover:underline"
        >
          ← {book.name}
        </Link>
        <p className="font-arabic mt-2 text-3xl">{book.arabic}</p>
        <h1 className="mt-1 text-lg font-bold">
          Chapter {section.id}: {section.name}
        </h1>
        <p className="text-sm text-brand-100">{hadiths.length} Hadiths</p>
      </div>

      {/* টগল */}
      <div className="flex gap-2">
        {toggles.map((t) => (
          <button
            key={t.label}
            onClick={() => t.set(!t.on)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              t.on
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border bg-card text-foreground/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <BookmarkError error={bm.error} />
      {/* হাদিস তালিকা */}
      <div className="space-y-4">
        {hadiths.map((h) => {
          const grade = getGrade(h.grades, book.id);
          return (
                        <article
              key={h.number}
              id={`hadith-${h.number}`}
              className="scroll-mt-24 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
                  Hadith {h.number}
                </span>
                {h.ref && (
                  <span className="text-xs text-muted">
                    Book {h.ref.book}, Hadith {h.ref.hadith}
                  </span>
                )}
                {grade && (
                  <span
                    title={grade.by ? `Graded by ${grade.by}` : "Grade"}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TONES[grade.tone]}`}
                  >
                    {grade.label}
                  </span>
                )}
                                <div className="ml-auto flex items-center gap-1">
                  <BookmarkButton
                    marked={bm.marked.has(tgt(h))}
                    busy={bm.pending.has(tgt(h))}
                    loggedIn={bm.loggedIn}
                    onClick={() =>
                      bm.toggle(
                        tgt(h),
                        `${book.name} · Hadith ${h.number} | ${book.bn} · হাদিস ${h.number}`,
                        `/hadith/${book.id}/${section.id}#hadith-${h.number}`
                      )
                    }
                  />
                  <button
                    onClick={() => copy(h)}
                    aria-label="Copy hadith"
                    className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-800"
                  >
                    {copied === h.number ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {h.ar && (
                <p
                  dir="rtl"
                  className="font-arabic mt-4 whitespace-pre-line text-right text-2xl leading-[2.2]"
                >
                  {h.ar}
                </p>
              )}
              {showBn && h.bn && (
                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed">
                  {h.bn}
                </p>
              )}
              {showEn && h.en && (
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
                  {h.en}
                </p>
              )}
            </article>
          );
        })}
      </div>

      {/* আগের / পরের অধ্যায় */}
      <div className="flex justify-between pt-2">
        {prev ? (
          <Link
            href={`/hadith/${book.id}/${prev}`}
            className="flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2 text-sm hover:border-brand-300"
          >
            <ChevronLeft size={16} /> Previous chapter
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/hadith/${book.id}/${next}`}
            className="flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2 text-sm hover:border-brand-300"
          >
            Next chapter <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}