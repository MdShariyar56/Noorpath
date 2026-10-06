"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { addBookmark, listBookmarks, removeBookmark } from "@/lib/api/bookmarks";

export default function SurahReader({ surah }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [playing, setPlaying] = useState(null); // চলমান আয়াত নম্বর
  const [showBn, setShowBn] = useState(true);
  const [showEn, setShowEn] = useState(true);
  const audioRef = useRef(null);

  const [marked, setMarked] = useState(() => new Set());
  const [pending, setPending] = useState(() => new Set());
  const [bmError, setBmError] = useState(null);

  /* ---------- অডিও ---------- */

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

  /* ---------- বুকমার্ক ---------- */

  // লগইন করা থাকলে এই সূরার বুকমার্কগুলো আনি
  useEffect(() => {
    if (!user) {
      setMarked(new Set());
      return;
    }
    let cancelled = false;
    listBookmarks("quran")
      .then((list) => {
        if (cancelled) return;
        const prefix = `${surah.number}:`;
        setMarked(
          new Set(
            list
              .filter((b) => b.target.startsWith(prefix))
              .map((b) => Number(b.target.slice(prefix.length)))
          )
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user?.id, surah.number]);

  const goLogin = (ayahNo) =>
    router.push(
      `/login?next=${encodeURIComponent(`/quran/${surah.number}#ayah-${ayahNo}`)}`
    );

  const toggleBookmark = async (ayahNo) => {
    if (loading || pending.has(ayahNo)) return;
    if (!user) return goLogin(ayahNo);

    const target = `${surah.number}:${ayahNo}`;
    const was = marked.has(ayahNo);

    setBmError(null);
    setPending((p) => new Set(p).add(ayahNo));
    // সাথে সাথে দেখাই, ব্যর্থ হলে ফিরিয়ে নিই
    setMarked((m) => {
      const n = new Set(m);
      if (was) n.delete(ayahNo);
      else n.add(ayahNo);
      return n;
    });

    try {
      if (was) await removeBookmark("quran", target);
      else await addBookmark("quran", target);
    } catch (err) {
      setMarked((m) => {
        const n = new Set(m);
        if (was) n.add(ayahNo);
        else n.delete(ayahNo);
        return n;
      });
      if (err?.status === 401) {
        goLogin(ayahNo);
      } else if (err?.code === "NOT_CONNECTED") {
        setBmError([
          "The server is not connected yet.",
          "সার্ভার এখনো সংযুক্ত হয়নি।",
        ]);
      } else {
        setBmError([
          "Could not update the bookmark. Please try again.",
          "বুকমার্ক আপডেট করা যায়নি। আবার চেষ্টা করুন।",
        ]);
      }
    } finally {
      setPending((p) => {
        const n = new Set(p);
        n.delete(ayahNo);
        return n;
      });
    }
  };

  /* ---------- দেখানো ---------- */

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

      {bmError && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-200"
        >
          {bmError[0]}
          <span className="block opacity-80">{bmError[1]}</span>
        </p>
      )}

      {showBismillah && (
        <p className="font-arabic py-2 text-center text-3xl text-brand-600 dark:text-brand-300">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      )}

      {/* আয়াত তালিকা */}
      <div className="space-y-3">
        {surah.ayahs.map((a, i) => {
          const active = playing === a.number;
          const isMarked = marked.has(a.number);
          return (
            <div
              key={a.number}
              id={`ayah-${a.number}`}
              className={`scroll-mt-24 rounded-2xl border p-4 transition ${
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
                  <button
                    onClick={() => toggleBookmark(a.number)}
                    disabled={pending.has(a.number)}
                    aria-pressed={isMarked}
                    aria-label={isMarked ? "Remove bookmark" : "Bookmark this ayah"}
                    title={
                      user
                        ? isMarked
                          ? "Remove bookmark / বুকমার্ক সরান"
                          : "Bookmark / বুকমার্ক করুন"
                        : "Login to bookmark / বুকমার্ক করতে লগইন করুন"
                    }
                    className={`grid h-8 w-8 place-items-center rounded-full transition disabled:opacity-60 ${
                      isMarked
                        ? "bg-gold-400/25 text-gold-500"
                        : "text-muted hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-800"
                    }`}
                  >
                    <Bookmark size={16} fill={isMarked ? "currentColor" : "none"} />
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