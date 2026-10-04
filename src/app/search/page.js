import Link from "next/link";
import Form from "next/form";
import { Search } from "lucide-react";
import { searchAll } from "@/lib/search";
import {
  ArticleGroup,
  DuaGroup,
  HadithGroup,
  PageGroup,
  QuranGroup,
} from "@/components/search/ResultGroups";

const TABS = [
  { id: "all", en: "All", bn: "সব" },
  { id: "quran", en: "Quran", bn: "কুরআন" },
  { id: "hadith", en: "Hadith", bn: "হাদিস" },
  { id: "dua", en: "Dua", bn: "দুয়া" },
  { id: "articles", en: "Articles", bn: "আর্টিকেল" },
  { id: "pages", en: "Pages", bn: "পেজ" },
];

const SUGGESTIONS = ["mercy", "patience", "2:255", "zakat", "রমজান", "travel"];

const pick = (v) => (Array.isArray(v) ? v[0] : v) ?? "";

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const q = String(pick(sp.q)).trim();
  return { title: q ? `"${q}" | Search | NoorPath` : "Search | NoorPath" };
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = String(pick(sp.q)).trim().slice(0, 100);
  const t = String(pick(sp.type));
  const type = TABS.some((x) => x.id === t) ? t : "all";

  const ready = q.length >= 2;
  const r = ready ? await searchAll(q) : null;

  const show = (id) => type === "all" || type === id;
  const limit = type === "all" ? 4 : 30;
  const more = (id) =>
    type === "all" ? `/search?q=${encodeURIComponent(q)}&type=${id}` : undefined;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Search /> Search
          <span className="text-lg font-medium text-brand-100">· সার্চ</span>
        </h1>
        <p className="mt-1 text-sm text-brand-100">
          Quran, Hadith, Dua, Articles and more
          <span className="block opacity-75">কুরআন, হাদিস, দুয়া, আর্টিকেল ও আরও অনেক কিছু</span>
        </p>

        <Form
          action="/search"
          className="mt-4 flex max-w-2xl items-center rounded-xl bg-white p-1.5 shadow-lg"
        >
          <Search size={18} className="mx-3 shrink-0 text-gray-400" />
          <input
            type="search"
            name="q"
            defaultValue={q}
            autoFocus={!q}
            required
            minLength={2}
            placeholder="Search Quran, Hadith, Dua, Articles..."
            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
          >
            Search
          </button>
        </Form>
      </div>

      {!q && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-3 text-sm font-semibold">Try searching for / এগুলো খুঁজে দেখুন</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="rounded-full border border-border px-4 py-1.5 text-sm hover:border-brand-300"
              >
                {s}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            Tip: type a verse reference like 2:255 to jump straight to it. / টিপ: 2:255 এর
            মতো আয়াতের রেফারেন্স লিখলে সরাসরি ওই আয়াতে যাওয়া যাবে।
          </p>
        </div>
      )}

      {q && !ready && (
        <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted">
          Type at least 2 characters. / কমপক্ষে ২টি অক্ষর লিখুন।
        </p>
      )}

      {r && (
        <>
          <p className="text-sm text-muted">
            {r.counts.all} results for / এর জন্য ফলাফল:{" "}
            <span className="font-semibold text-foreground">&ldquo;{q}&rdquo;</span>
          </p>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {TABS.map((tab) => {
              const active = type === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/search?q=${encodeURIComponent(q)}${tab.id === "all" ? "" : `&type=${tab.id}`}`}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-center text-sm font-medium leading-tight transition ${
                    active
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-border bg-card text-foreground/70 hover:border-brand-300"
                  }`}
                >
                  {tab.en} ({r.counts[tab.id]})
                  <span className="block text-[11px] opacity-80">{tab.bn}</span>
                </Link>
              );
            })}
          </div>

          {r.counts.all === 0 && !r.quran.failed && (
            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <p className="font-semibold">No results found. / কোনো ফলাফল পাওয়া যায়নি।</p>
              <p className="mt-1 text-sm text-muted">
                Try a different spelling or fewer words. / অন্য বানানে বা কম শব্দে খুঁজে দেখুন।
              </p>
            </div>
          )}

          <div className="space-y-8">
            {show("quran") && (
              <QuranGroup data={r.quran} terms={r.terms} limit={limit} moreHref={more("quran")} />
            )}
            {show("hadith") && (
              <HadithGroup data={r.hadith} terms={r.terms} limit={limit} moreHref={more("hadith")} />
            )}
            {show("dua") && (
              <DuaGroup data={r.dua} terms={r.terms} limit={limit} moreHref={more("dua")} />
            )}
            {show("articles") && (
              <ArticleGroup items={r.articles} terms={r.terms} limit={limit} moreHref={more("articles")} />
            )}
            {show("pages") && (
              <PageGroup items={r.pages} limit={limit} moreHref={more("pages")} />
            )}
          </div>
        </>
      )}
    </div>
  );
}