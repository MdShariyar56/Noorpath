"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Pause, Play } from "lucide-react";
import { audioUrl } from "@/lib/dua-config";
import useBookmarks from "@/hooks/useBookmarks";
import BookmarkButton, { BookmarkError } from "@/components/bookmarks/BookmarkButton";

function DuaCard({ dua, show, playing, failed, onToggle, bookmark }) {
  const [copied, setCopied] = useState(false);

  // বাংলা চালু থাকলে বাংলা উচ্চারণ, English চালু থাকলে ইংরেজি উচ্চারণ
  const picked = [
    ...new Set([show.bn && dua.trBn, show.en && dua.tr].filter(Boolean)),
  ];
  const translits = picked.length ? picked : [dua.trBn || dua.tr].filter(Boolean);

  const refText =
    [...new Set([show.bn && dua.ref, show.en && dua.refEn].filter(Boolean))].join(
      "  |  "
    ) || dua.ref;

  const benefitsBn = dua.benefits || [];
  const benefitsEn = dua.benefitsEn || [];

  const copy = async () => {
    const parts = [
      dua.title,
      dua.arabic,
      ...(show.tr ? translits : []),
      show.bn && dua.bn,
      show.en && dua.en,
      refText && `— ${refText}`,
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(parts.join("\n\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <article
      id={`dua-${dua.id}`}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <h3 className="font-semibold">{dua.title}</h3>
          {show.en && dua.titleEn && (
            <p className="mt-0.5 text-xs text-muted">{dua.titleEn}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <BookmarkButton
            marked={bookmark.marked}
            busy={bookmark.busy}
            loggedIn={bookmark.loggedIn}
            onClick={bookmark.onToggle}
          />
          <button
            onClick={copy}
            aria-label="Copy dua"
            className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-800"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {show.bn && dua.intro && (
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          {dua.intro}
        </p>
      )}
      {show.en && dua.introEn && (
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          {dua.introEn}
        </p>
      )}

      {dua.arabic && (
        <p
          dir="rtl"
          className="font-arabic mt-4 whitespace-pre-line text-right text-2xl leading-[2.2] sm:text-3xl"
        >
          {dua.arabic}
        </p>
      )}

      {show.tr &&
        translits.map((t, i) => (
          <p
            key={i}
            className="mt-3 whitespace-pre-line text-sm italic text-brand-600 dark:text-brand-300"
          >
            {t}
          </p>
        ))}

      {show.bn && dua.bn && (
        <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed">
          {dua.bn}
        </p>
      )}
      {show.en && dua.en && (
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
          {dua.en}
        </p>
      )}

      {((show.bn && benefitsBn.length > 0) ||
        (show.en && benefitsEn.length > 0)) && (
        <details className="mt-3 rounded-lg bg-background px-3 py-2 text-sm">
          <summary className="cursor-pointer font-medium text-brand-600 dark:text-brand-300">
            ফজিলত ও উপকারিতা / Benefits
          </summary>

          {show.bn && benefitsBn.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/80">
              {benefitsBn.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          {show.en && benefitsEn.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground/70">
              {benefitsEn.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </details>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">{refText}</p>

        {dua.audio && (
          <div className="flex items-center gap-2">
            {failed && (
              <span className="text-xs text-red-500">Audio unavailable</span>
            )}
            <button
              onClick={() => onToggle(dua.id)}
              className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              {playing ? <Pause size={15} /> : <Play size={15} />}
              {playing ? "Stop" : "Listen"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function DuaList({ duas, category, subId }) {
  const [show, setShow] = useState({ tr: true, bn: true, en: true });
  const [playing, setPlaying] = useState(null);
  const [failed, setFailed] = useState(null);
  const audioRef = useRef(null);

  const bm = useBookmarks("dua", { prefix: `${category}:${subId}:` });

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlaying(null);
  };

  const toggle = (id) => {
    if (playing === id) return stop();
    audioRef.current?.pause();

    const audio = new Audio(audioUrl(id));
    audioRef.current = audio;
    setPlaying(id);
    setFailed(null);

    const fail = () => {
      audioRef.current = null;
      setPlaying(null);
      setFailed(id);
    };
    audio.onended = () => {
      audioRef.current = null;
      setPlaying(null);
    };
    audio.onerror = fail;
    audio.play().catch(fail);
  };

  useEffect(() => () => audioRef.current?.pause(), []);

  const toggles = [
    { key: "tr", label: "Transliteration" },
    { key: "bn", label: "বাংলা" },
    { key: "en", label: "English" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {toggles.map((t) => (
          <button
            key={t.key}
            onClick={() => setShow((s) => ({ ...s, [t.key]: !s[t.key] }))}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              show[t.key]
                ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-800 dark:text-brand-200"
                : "border-border bg-card text-foreground/60"
            }`}
          >
            {show[t.key] ? "✓ " : ""}
            {t.label}
          </button>
        ))}
      </div>

      <BookmarkError error={bm.error} />

      {duas.map((d) => {
        const target = `${category}:${subId}:${d.id}`;
        // তালিকায় দেখানোর নাম: "ইংরেজি | বাংলা"
        const label = (d.titleEn ? `${d.titleEn} | ${d.title}` : d.title).slice(0, 140);

        return (
          <DuaCard
            key={d.id}
            dua={d}
            show={show}
            playing={playing === d.id}
            failed={failed === d.id}
            onToggle={toggle}
            bookmark={{
              marked: bm.marked.has(target),
              busy: bm.pending.has(target),
              loggedIn: bm.loggedIn,
              onToggle: () =>
                bm.toggle(target, label, `/dua/${category}/${subId}#dua-${d.id}`),
            }}
          />
        );
      })}
    </div>
  );
}