import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BookText,
  HandHeart,
  LayoutGrid,
  Newspaper,
} from "lucide-react";
import Highlight from "./Highlight";
import { fmtDate } from "@/lib/date";
import Image from "next/image";

const card =
  "block rounded-2xl border border-border bg-card p-4 transition hover:border-brand-300 hover:shadow-md";
const label = "text-xs font-semibold text-brand-600 dark:text-brand-300";

function Group({ icon: Icon, title, count, limit, moreHref, note, children }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-bold">
          <Icon size={18} className="text-brand-600 dark:text-brand-300" />
          {title}
          <span className="text-sm font-normal text-muted">({count})</span>
        </h2>
        {moreHref && count > limit && (
          <Link href={moreHref} className={label}>
            See all →
          </Link>
        )}
      </div>
      {note && <p className="text-[11px] text-muted">{note}</p>}
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

export function QuranGroup({ data, terms, limit, moreHref }) {
  const { direct, surahs, ayahs, count, failed, arabic } = data;
  const total = (direct ? 1 : 0) + surahs.length + count;
  if (!total && !failed) return null;

  const items = [
    ...(direct ? [{ k: "direct", ...direct }] : []),
    ...surahs.map((s) => ({ k: "surah", ...s })),
    ...ayahs.map((a) => ({ k: "ayah", ...a })),
  ].slice(0, limit);

  return (
    <Group
      icon={BookOpen}
      title="Quran"
      count={total}
      limit={limit}
      moreHref={moreHref}
      note={
        count > ayahs.length && limit > 4
          ? `Showing the first ${ayahs.length} of ${count} verses.`
          : undefined
      }
    >
      {failed && (
        <p className="rounded-xl border border-border bg-card p-3 text-sm text-red-500">
          Quran text search is unavailable right now.
        </p>
      )}
      {items.map((it) => {
        if (it.k === "direct") {
          return (
            <Link
              key="direct"
              href={`/quran/${it.surah}#ayah-${it.ayah}`}
              className={card}
            >
              <p className={label}>Go to verse</p>
              <p className="mt-1 flex items-center gap-2 font-semibold">
                Surah {it.surah} ({it.name}), Ayah {it.ayah}
                <ArrowRight size={16} />
              </p>
            </Link>
          );
        }
        if (it.k === "surah") {
          return (
            <Link
              key={`s${it.number}`}
              href={`/quran/${it.number}`}
              className={card}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={label}>Surah : {it.number}</p>
                  <p className="font-semibold">
                    <Highlight text={it.englishName} terms={terms} />
                  </p>
                  <p className="text-xs text-muted">
                    {it.translation} · {it.numberOfAyahs} ayahs
                  </p>
                </div>
                <span className="font-arabic text-2xl text-brand-600 dark:text-brand-300">
                  {it.name.replace("سُورَةُ", " ")}
                </span>
              </div>
            </Link>
          );
        }
        return (
          <Link
            key={`a${it.surah}:${it.ayah}`}
            href={`/quran/${it.surah}#ayah-${it.ayah}`}
            className={card}
          >
            <p className={label}>
              {it.surahName} · {it.surah}:{it.ayah}
            </p>
            <p
              dir={arabic ? "rtl" : undefined}
              className={
                arabic
                  ? "font-arabic mt-1.5 text-right text-xl leading-[2.2]"
                  : "mt-1.5 text-sm leading-relaxed"
              }
            >
              <Highlight text={it.text} terms={terms} />
            </p>
          </Link>
        );
      })}
    </Group>
  );
}

export function HadithGroup({ data, terms, limit, moreHref }) {
  if (!data.total) return null;
  return (
    <Group
      icon={BookText}
      title="Hadith"
      count={data.total}
      limit={limit}
      moreHref={moreHref}
    >
      {data.items.slice(0, limit).map((h) => (
        <Link key={h.href} href={h.href} className={card}>
          <p className="font-semibold">
            <Highlight text={h.title} terms={terms} />
          </p>
        </Link>
      ))}
    </Group>
  );
}

export function DuaGroup({ data, terms, limit, moreHref }) {
  const total = data.sections.length + data.total;
  if (!total) return null;

  const items = [
    ...data.sections.map((s) => ({ k: "section", ...s })),
    ...data.duas.map((d) => ({ k: "dua", ...d })),
  ].slice(0, limit);

  return (
    <Group
      icon={HandHeart}
      title="Dua "
      count={total}
      limit={limit}
      moreHref={moreHref}
    >
      {items.map((it) =>
        it.k === "section" ? (
          <Link key={it.href} href={it.href} className={card}>
            <p className="font-semibold">
              <Highlight text={it.title} terms={terms} />
            </p>
            {it.sub && <p className="text-xs text-muted">{it.sub}</p>}
          </Link>
        ) : (
          <Link key={`d${it.id}`} href={it.href} className={card}>
            <p className="font-semibold">
              <Highlight text={it.title} terms={terms} />
            </p>

            {it.snippet && (
              <p className="mt-2 text-sm text-foreground/75">
                <Highlight text={it.snippet} terms={terms} />
              </p>
            )}
            {it.ref && <p className="mt-2 text-[11px] text-muted">{it.ref}</p>}
          </Link>
        ),
      )}
    </Group>
  );
}

export function ArticleGroup({ items, terms, limit, moreHref }) {
  if (!items.length) return null;
  return (
    <Group
      icon={Newspaper}
      title="Articles"
      count={items.length}
      limit={limit}
      moreHref={moreHref}
    >
      {items.slice(0, limit).map((a) => (
        <Link
          key={a.slug}
          href={`/articles/${a.slug}`}
          className={`${card} flex gap-4`}
        >
          <Image
            src={a.icon}
            alt="Articles Logo"
            width={68}
            height={68}
            className="rounded-xl object-cover"
          />

          <span className="min-w-0">
            <span className="block font-bold ">
              <Highlight text={a.title[0]} terms={terms} />
            </span>
            <span className="mt-1.5 block text-sm text-foreground/75">
              <Highlight text={a.snippet} terms={terms} />
            </span>
          </span>
        </Link>
      ))}
    </Group>
  );
}

export function PageGroup({ items, limit, moreHref }) {
  if (!items.length) return null;
  return (
    <Group
      icon={LayoutGrid}
      title="Pages & tools"
      count={items.length}
      limit={limit}
      moreHref={moreHref}
    >
      {items.slice(0, limit).map((p) => (
        <Link key={p.href} href={p.href} className={card}>
          <p className="flex items-center justify-between font-semibold">
            <span>{p.en}</span>
            <ArrowRight size={16} />
          </p>
          <p className="mt-1 text-xs text-muted">{p.d[0]}</p>
        </Link>
      ))}
    </Group>
  );
}
