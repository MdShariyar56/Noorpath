"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function SurahReader({ surah }) {
  const [playing, setPlaying] = useState(null); // চলমান আয়াত নম্বর
  const [showBn, setShowBn] = useState(true);
  const [showEn, setShowEn] = useState(true);
  const audioRef = useRef(null);

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaying(null);
  };

  const play = (index) => {
    const ayah = surah.ayahs[index];
    if (!ayah) return stop();

    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(ayah.audio);
    audioRef.current = audio;
    setPlaying(ayah.number);

    audio.onended = () => play(index + 1);
    audio.onerror = () => stop();
    audio.play().catch(() => stop());

    document
      .getElementById(`ayah-${ayah.number}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const toggle = (index) => {
    if (playing === surah.ayahs[index].number) stop();
    else play(index);
  };

  // পেজ ছাড়লে অডিও বন্ধ
  useEffect(() => () => audioRef.current?.pause(), []);

  const prev = surah.number > 1 ? surah.number - 1 : null;
  const next = surah.number < 114 ? surah.number + 1 : null;
  const showBismillah = surah.number !== 1 && surah.number !== 9;

  return (
    <div className="space-y-5">
      {/* হেডার */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-center text-white">
        <p className="font-arabic text-4xl">{surah.name}</p>
        <h1 className="mt-2 text-xl font-bold">
          {surah.number}. {surah.englishName}
        </h1>
        <p className="text-sm text-brand-100">
          {surah.englishNameTranslation} · {surah.numberOfAyahs} Ayahs ·{" "}
          {surah.revelationType}
        </p>
      </div>

      {/* কন্ট্রোল */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {[
            { label: "বাংলা", on: showBn, set: setShowBn },
            { label: "English", on: showEn, set: setShowEn },
          ].map((t) => (
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

        <button
          onClick={() => (playing ? stop() : play(0))}
          className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          {playing ? "Stop" : "Play full surah"}
        </button>
      </div>

      {showBismillah && (
        <p className="font-arabic py-2 text-center text-3xl text-brand-600 dark:text-brand-300">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      )}

      {/* আয়াত তালিকা */}
      <div className="space-y-3">
        {surah.ayahs.map((a, i) => {
          const active = playing === a.number;
          return (
            <div
              key={a.number}
              id={`ayah-${a.number}`}
              className={`rounded-2xl border p-4 transition ${
                active
                  ? "border-brand-400 bg-brand-50 dark:bg-brand-800/40"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-600 dark:bg-brand-800 dark:text-brand-200">
                    {a.number}
                  </span>
                  <button
                    onClick={() => toggle(i)}
                    aria-label={active ? "Pause" : "Play"}
                    className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-white hover:bg-brand-700"
                  >
                    {active ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <p dir="rtl" className="font-arabic text-right text-3xl leading-[2.2]">
                    {a.arabic}
                  </p>
                  {showBn && <p className="mt-3 text-[15px]">{a.bn}</p>}
                  {showEn && (
                    <p className="mt-2 text-sm text-foreground/70">{a.en}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* আগের / পরের সূরা */}
      <div className="flex justify-between pt-2">
        {prev ? (
          <Link
            href={`/quran/${prev}`}
            className="flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2 text-sm hover:border-brand-300"
          >
            <ChevronLeft size={16} /> Previous
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/quran/${next}`}
            className="flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2 text-sm hover:border-brand-300"
          >
            Next <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}