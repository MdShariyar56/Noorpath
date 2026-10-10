"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { listBookmarks, removeBookmark } from "@/lib/api/bookmarks";
import { fmtDate } from "@/lib/date";

const TABS = [
  { id: "all", en: "All", bn: "সব" },
  { id: "quran", en: "Quran", bn: "কুরআন" },
  { id: "hadith", en: "Hadith", bn: "হাদিস" },
  { id: "dua", en: "Dua", bn: "দুয়া" },
];

const TYPE_LABEL = {
  quran: "Quran · কুরআন",
  hadith: "Hadith · হাদিস",
  dua: "Dua · দুয়া",
};

const EMPTY_LINK = {
  all: ["/quran", "Read the Quran / কুরআন পড়ুন"],
  quran: ["/quran", "Read the Quran / কুরআন পড়ুন"],
  hadith: ["/hadith", "Browse Hadith / হাদিস দেখুন"],
  dua: ["/dua", "Browse Duas / দুয়া দেখুন"],
};

function Skeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-2xl bg-brand-50 dark:bg-brand-800/40"
        />
      ))}
    </div>
  );
}

function Notice({ children }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      {children}
    </div>
  );
}

// বুকমার্কের target থেকে দেখানোর তথ্য ও লিংক বানাই। বোঝা না গেলে null
function describe(b, surahs) {
  const parts = b.target.split(":");

  if (b.type === "quran" && parts.length === 2) {
    const surah = Number(parts[0]);
    const ayah = Number(parts[1]);
    if (!Number.isInteger(surah) || !Number.isInteger(ayah)) return null;
    const info = surahs.get(surah);
    return {
      title: `${info ? info.englishName : `Surah ${surah}`} · Ayah ${ayah}`,
      sub: `${surah}:${ayah} · সূরা ${surah}, আয়াত ${ayah}`,
      arabic: info ? info.name.replace("সূরা", "").replace("سُورَةُ ", "") : null,
      href: `/quran/${surah}#ayah-${ayah}`,
      order: surah * 1000 + ayah,
    };
  }

  if (b.type === "hadith" && parts.length === 3) {
    const [book, section, num] = parts;
    const [en, bn] = (b.label || "").split(" | ");
    return {
      title: en || `Hadith ${num} · ${book}`,
      sub: bn || `${book} · অধ্যায় ${section}`,
      arabic: null,
      href: `/hadith/${book}/${section}#hadith-${num}`,
    };
  }

  if (b.type === "dua" && parts.length === 3) {
    const [cat, sub, id] = parts;
    const [en, bn] = (b.label || "").split(" | ");
    return {
      title: en || "Dua",
      sub: bn || `দুয়া ${id}`,
      arabic: null,
      href: `/dua/${cat}/${sub}#dua-${id}`,
    };
  }

  return null;
}

export default function BookmarksList({ surahs }) {
  const { user, loading } = useAuth();
  const [items, setItems] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [actionError, setActionError] = useState(false);
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("new");
  const [removing, setRemoving] = useState(() => new Set());

  useEffect(() => {
    if (!user) {
      setItems(null);
      return;
    }
    let cancelled = false;
    setLoadError(false);
    listBookmarks()
      .then((list) => {
        if (!cancelled) setItems(list);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const all = useMemo(() => {
    if (!items) return [];
    const map = new Map(surahs.map((s) => [s.number, s]));
    return items
      .map((b) => {
        const d = describe(b, map);
        return d ? { ...b, ...d } : null;
      })
      .filter(Boolean);
  }, [items, surahs]);

  const counts = useMemo(() => {
    const c = { all: all.length, quran: 0, hadith: 0, dua: 0 };
    for (const r of all) c[r.type] += 1;
    return c;
  }, [all]);

  const rows = useMemo(() => {
    const list = tab === "all" ? [...all] : all.filter((r) => r.type === tab);
    list.sort((a, b) =>
      sort === "new"
        ? b.createdAt.localeCompare(a.createdAt)
        : a.createdAt.localeCompare(b.createdAt)
    );
    return list;
  }, [all, tab, sort]);

  const remove = async (row) => {
    if (removing.has(row.id)) return;
    setActionError(false);
    setRemoving((s) => new Set(s).add(row.id));
    // সাথে সাথে সরাই, সার্ভারে ব্যর্থ হলে ফিরিয়ে আনি
    setItems((cur) => (cur ? cur.filter((b) => b.id !== row.id) : cur));

    try {
      await removeBookmark(row.type, row.target);
    } catch {
      setItems((cur) =>
        cur
          ? [
              ...cur,
              {
                id: row.id,
                type: row.type,
                target: row.target,
                label: row.label,
                createdAt: row.createdAt,
              },
            ]
          : cur
      );
      setActionError(true);
    } finally {
      setRemoving((s) => {
        const n = new Set(s);
        n.delete(row.id);
        return n;
      });
    }
  };

  if (loading || (user && items === null && !loadError)) return <Skeleton />;

  if (!user) {
    return (
      <Notice>
        <p className="font-semibold">Login to see your bookmarks</p>
        <p className="text-sm text-muted">বুকমার্ক দেখতে লগইন করুন</p>
        <Link
          href="/login?next=%2Fbookmarks"
          className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Login / লগইন
        </Link>
      </Notice>
    );
  }

  if (loadError) {
    return (
      <Notice>
        <p className="text-red-500">
          Could not load your bookmarks.
          <span className="block text-sm opacity-80">আপনার বুকমার্ক আনা যায়নি।</span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Try again / আবার চেষ্টা করুন
        </button>
      </Notice>
    );
  }

  const chip = (active) =>
    `shrink-0 rounded-full border px-4 py-1.5 text-center text-sm font-medium leading-tight transition ${
      active
        ? "border-brand-600 bg-brand-600 text-white"
        : "border-border bg-card text-foreground/70 hover:border-brand-300"
    }`;

  return (
    <div className="space-y-4">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={chip(tab === t.id)}
          >
            {t.en} ({counts[t.id]})
            <span className="block text-[11px] opacity-80">{t.bn}</span>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <Notice>
          <p className="font-semibold">No bookmarks here yet</p>
          <p className="text-sm text-muted">এখানে এখনো কোনো বুকমার্ক নেই</p>
          <p className="mt-2 text-sm text-foreground/75">
            Tap the bookmark icon to save something here.
            <span className="block opacity-75">
              বুকমার্ক আইকনে চাপলে এখানে জমা হবে।
            </span>
          </p>
          <Link
            href={EMPTY_LINK[tab][0]}
            className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {EMPTY_LINK[tab][1]}
          </Link>
        </Notice>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              {rows.length} bookmarks / {rows.length}টি বুকমার্ক
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort bookmarks"
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none"
            >
              <option value="new">Newest first / নতুন আগে</option>
              <option value="old">Oldest first / পুরনো আগে</option>
            </select>
          </div>

          {actionError && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-200"
            >
              Could not remove the bookmark. Please try again.
              <span className="block opacity-80">
                বুকমার্ক সরানো যায়নি। আবার চেষ্টা করুন।
              </span>
            </p>
          )}

          <ul className="space-y-3">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card transition hover:border-brand-300"
              >
                <Link
                  href={r.href}
                  className="flex min-w-0 flex-1 items-center gap-4 p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400/20 text-gold-500">
                    <Bookmark size={18} fill="currentColor" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold text-brand-600 dark:text-brand-300">
                      {TYPE_LABEL[r.type]}
                    </span>
                    <span className="block font-semibold">{r.title}</span>
                    <span className="block text-xs text-muted">
                      {r.sub} · {fmtDate(r.createdAt.slice(0, 10))}
                    </span>
                  </span>

                  {r.arabic && (
                    <span className="font-arabic hidden text-2xl text-brand-600 sm:block dark:text-brand-300">
                      {r.arabic}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => remove(r)}
                  disabled={removing.has(r.id)}
                  aria-label={`Remove bookmark ${r.title}`}
                  title="Remove / সরান"
                  className="mr-3 grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}