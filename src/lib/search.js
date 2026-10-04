import duasData from "@/data/dua/duas.json";
import subs from "@/data/dua/subcategories.json";
import cats from "@/data/dua/categories.json";
import hadithIndex from "@/data/hadith-sections.json";
import { ARTICLES, CATEGORIES as ARTICLE_CATS } from "@/data/articles";
import { BOOKS } from "@/lib/api/hadith";
import { getSurahList } from "@/lib/api/quran";

const AR = /[\u0600-\u06FF]/;
const BN = /[\u0980-\u09FF]/;
const REF = /^(\d{1,3})\s*[:.\-]\s*(\d{1,3})$/;

// তুলনার জন্য লেখা সরল করা: হরকত, টান, অ্যাকসেন্ট, হাইফেন ও এপোস্ট্রফি বাদ
export function norm(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u0640\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/\u0671/g, "\u0627")
    .replace(/\u0649/g, "\u064A")
    .replace(/[-_]/g, " ")
    .replace(/['\u2019\u2018`\u02BF\u02BE\u02BB]/g, "")
    .toLowerCase();
}

function parse(q) {
  return {
    rawTerms: q.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6),
    terms: norm(q).split(/\s+/).filter(Boolean).slice(0, 6),
  };
}

// মিলে যাওয়া অংশের আশপাশের লেখা
function snippet(text, rawTerms, len = 170) {
  const t = String(text || "");
  const low = t.toLowerCase();
  let at = -1;
  for (const r of rawTerms) {
    const i = low.indexOf(r);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return t.length > len ? t.slice(0, len).trimEnd() + "…" : t;
  const from = Math.max(0, at - 50);
  const to = Math.min(t.length, from + len);
  return (from > 0 ? "…" : "") + t.slice(from, to).trim() + (to < t.length ? "…" : "");
}

/* ---------- কুরআন ---------- */

async function quranSearch(q) {
  const edition = AR.test(q) ? "quran-simple" : BN.test(q) ? "bn.bengali" : "en.sahih";
  const url = `https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/${edition}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return { ayahs: [], count: 0, failed: res.status >= 500 };
    const json = await res.json();
    const matches = Array.isArray(json?.data?.matches) ? json.data.matches : [];
    return {
      count: json?.data?.count ?? matches.length,
      failed: false,
      ayahs: matches.slice(0, 30).map((m) => ({
        surah: m.surah?.number,
        surahName: m.surah?.englishName,
        ayah: m.numberInSurah,
        text: m.text,
      })),
    };
  } catch {
    return { ayahs: [], count: 0, failed: true };
  }
}

function searchSurahs(list, terms) {
  return list
    .filter((s) => {
      const h = norm(`${s.englishName} ${s.englishNameTranslation} ${s.name}`);
      return terms.every((t) => h.includes(t) || t === String(s.number));
    })
    .slice(0, 8)
    .map((s) => ({
      number: s.number,
      englishName: s.englishName,
      translation: s.englishNameTranslation,
      name: s.name,
      numberOfAyahs: s.numberOfAyahs,
    }));
}

/* ---------- হাদিস (গ্রন্থ ও অধ্যায়ের নাম) ---------- */

function searchHadith(terms) {
  const out = [];
  for (const b of BOOKS) {
    const h = norm(`${b.name} ${b.bn} ${b.arabic}`);
    if (terms.every((t) => h.includes(t))) {
      out.push({ href: `/hadith/${b.id}`, title: b.name, sub: `${b.bn} · Book / গ্রন্থ` });
    }
  }
  for (const b of BOOKS) {
    const meta = hadithIndex[b.id];
    if (!meta) continue;
    for (const s of meta.sections) {
      const h = norm(s.name);
      if (terms.every((t) => h.includes(t))) {
        out.push({
          href: `/hadith/${b.id}/${s.id}`,
          title: s.name,
          sub: `${b.name} · Chapter ${s.id}${s.count ? ` · ${s.count} hadiths` : ""}`,
        });
      }
    }
  }
  return out;
}

/* ---------- দুয়া ---------- */

const DUA_FIELDS = [
  ["title", 6],
  ["titleEn", 6],
  ["arabic", 3],
  ["tr", 3],
  ["trBn", 3],
  ["bn", 2],
  ["en", 2],
  ["intro", 1],
  ["introEn", 1],
  ["ref", 1],
];

let DUA_INDEX = null;

// একবার বানিয়ে মেমোরিতে রাখি (প্রতি সার্চে নতুন করে হিসাব লাগে না)
function duaIndex() {
  if (DUA_INDEX) return DUA_INDEX;
  const where = new Map();
  for (const s of subs) {
    for (const id of s.duaIds) {
      if (!where.has(id)) where.set(id, { cat: s.category, sub: s.id });
    }
  }
  const entries = [];
  for (const d of Object.values(duasData)) {
    const loc = where.get(d.id);
    if (!loc) continue;
    const f = {};
    let all = "";
    for (const [k] of DUA_FIELDS) {
      f[k] = norm(d[k]);
      all += f[k] + " | ";
    }
    entries.push({ d, loc, f, all });
  }
  DUA_INDEX = entries;
  return entries;
}

function searchDuas(terms, rawTerms) {
  const hits = [];
  for (const e of duaIndex()) {
    if (!terms.every((t) => e.all.includes(t))) continue;
    let score = 0;
    for (const [k, w] of DUA_FIELDS) {
      for (const t of terms) if (e.f[k].includes(t)) score += w;
    }
    hits.push({ e, score });
  }
  hits.sort((a, b) => b.score - a.score || a.e.d.id - b.e.d.id);

  return {
    total: hits.length,
    items: hits.slice(0, 30).map(({ e }) => {
      const d = e.d;
      const matched = [d.bn, d.en, d.tr, d.trBn, d.intro, d.introEn].find(
        (t) => t && rawTerms.some((r) => t.toLowerCase().includes(r))
      );
      return {
        id: d.id,
        title: d.title,
        titleEn: d.titleEn,
        ref: d.ref,
        audio: d.audio,
        snippet: snippet(matched || d.bn || d.en || d.intro || "", rawTerms),
        href: `/dua/${e.loc.cat}/${e.loc.sub}#dua-${d.id}`,
      };
    }),
  };
}

function searchDuaSections(terms) {
  const out = [];
  for (const c of cats) {
    const h = norm(`${c.name} ${c.nameEn}`);
    if (terms.every((t) => h.includes(t))) {
      out.push({ href: `/dua/${c.slug}`, title: c.name, sub: c.nameEn, kind: "Category / ক্যাটাগরি" });
    }
  }
  for (const s of subs) {
    const h = norm(`${s.title} ${s.titleEn}`);
    if (terms.every((t) => h.includes(t))) {
      out.push({
        href: `/dua/${s.category}/${s.id}`,
        title: s.title,
        sub: s.titleEn,
        kind: `Section / সেকশন · ${s.duaIds.length} duas`,
      });
    }
  }
  return out;
}

/* ---------- আর্টিকেল ---------- */

function searchArticles(terms, rawTerms) {
  const out = [];
  for (const a of ARTICLES) {
    const cat = ARTICLE_CATS.find((c) => c.id === a.cat);
    const title = norm(`${a.title.join(" ")} ${cat ? `${cat.en} ${cat.bn}` : ""}`);
    const excerpt = norm(a.excerpt.join(" "));
    const body = norm(a.body.map((p) => p.join(" ")).join(" "));
    const all = `${title} ${excerpt} ${body}`;
    if (!terms.every((t) => all.includes(t))) continue;

    let score = 0;
    for (const t of terms) {
      if (title.includes(t)) score += 5;
      if (excerpt.includes(t)) score += 2;
      if (body.includes(t)) score += 1;
    }
    const para = a.body.flat().find((t) => rawTerms.some((r) => t.toLowerCase().includes(r)));
    out.push({
      score,
      slug: a.slug,
      icon: a.icon,
      bg: a.bg,
      date: a.date,
      cat,
      title: a.title,
      snippet: snippet(para || a.excerpt[0], rawTerms),
    });
  }
  return out.sort((x, y) => y.score - x.score);
}

/* ---------- পেজ ও টুল ---------- */

const PAGES = [
  { href: "/quran", en: "Quran", bn: "কুরআন", d: ["Read and listen to all 114 surahs", "১১৪টি সূরা পড়ুন ও শুনুন"], kw: "quran koran surah ayah recitation কুরআন কোরআন সূরা আয়াত তিলাওয়াত" },
  { href: "/hadith", en: "Hadith Library", bn: "হাদিস", d: ["Six major hadith collections", "ছয়টি প্রধান হাদিস গ্রন্থ"], kw: "hadith bukhari muslim tirmidhi sunnah হাদিস বুখারি মুসলিম তিরমিজি সুন্নাহ" },
  { href: "/dua", en: "Dua & Azkar", bn: "দুয়া ও আযকার", d: ["Daily supplications by category", "ক্যাটাগরি অনুযায়ী দৈনন্দিন দুয়া"], kw: "dua azkar adhkar supplication দুয়া দোয়া আযকার" },
  { href: "/prayer-times", en: "Prayer Times", bn: "নামাজের সময়", d: ["Today's prayer times and countdown", "আজকের নামাজের সময় ও কাউন্টডাউন"], kw: "prayer salah salat namaz fajr dhuhr asr maghrib isha সালাত নামাজ ফজর যোহর আসর মাগরিব এশা" },
  { href: "/qibla", en: "Qibla Finder", bn: "কিবলা ফাইন্ডার", d: ["Find the direction of the Kaaba", "কাবার দিক খুঁজে নিন"], kw: "qibla kiblah direction compass kaaba কিবলা দিক কম্পাস কাবা" },
  { href: "/calendar", en: "Hijri Calendar", bn: "হিজরি ক্যালেন্ডার", d: ["Islamic dates and important days", "ইসলামি তারিখ ও গুরুত্বপূর্ণ দিন"], kw: "hijri islamic calendar date muharram eid হিজরি ক্যালেন্ডার তারিখ ঈদ" },
  { href: "/zakat", en: "Zakat Calculator", bn: "জাকাত ক্যালকুলেটর", d: ["Calculate your zakat", "আপনার জাকাতের হিসাব করুন"], kw: "zakat zakah nisab charity জাকাত যাকাত নিসাব" },
  { href: "/ramadan", en: "Ramadan", bn: "রমজান", d: ["Fasting times, trackers and duas", "রোজার সময়, ট্র্যাকার ও দুয়া"], kw: "ramadan ramzan fasting roza iftar suhoor sehri রমজান রোজা ইফতার সেহরি" },
  { href: "/hajj-umrah", en: "Hajj & Umrah Guide", bn: "হজ ও উমরা গাইড", d: ["Steps, duas and checklist", "ধাপ, দুয়া ও চেকলিস্ট"], kw: "hajj umrah ihram tawaf sai arafah হজ উমরা ইহরাম তাওয়াফ সাঈ আরাফা" },
  { href: "/articles", en: "Islamic Articles", bn: "ইসলামিক আর্টিকেল", d: ["Read and learn about Islam", "পড়ুন এবং ইসলাম সম্পর্কে জানুন"], kw: "articles blog reading আর্টিকেল প্রবন্ধ" },
];

function searchPages(terms) {
  return PAGES.filter((p) => {
    const h = norm(`${p.en} ${p.bn} ${p.kw}`);
    return terms.every((t) => h.includes(t));
  });
}

/* ---------- সব একসাথে ---------- */

export async function searchAll(q) {
  const { terms, rawTerms } = parse(q);
  const surahList = await getSurahList().catch(() => []);

  // "2:255" ধরনের সরাসরি আয়াতের রেফারেন্স
  let direct = null;
  const m = q.match(REF);
  if (m) {
    const s = surahList.find((x) => x.number === Number(m[1]));
    if (s && Number(m[2]) >= 1 && Number(m[2]) <= s.numberOfAyahs) {
      direct = { surah: s.number, ayah: Number(m[2]), name: s.englishName };
    }
  }

  const quran = direct
    ? { ayahs: [], count: 0, failed: false }
    : await quranSearch(q);
  const surahs = direct ? [] : searchSurahs(surahList, terms);
  const hadith = searchHadith(terms);
  const duaSections = searchDuaSections(terms);
  const duas = searchDuas(terms, rawTerms);
  const articles = searchArticles(terms, rawTerms);
  const pages = searchPages(terms);

  const counts = {
    quran: (direct ? 1 : 0) + surahs.length + quran.count,
    hadith: hadith.length,
    dua: duaSections.length + duas.total,
    articles: articles.length,
    pages: pages.length,
  };
  counts.all = Object.values(counts).reduce((a, b) => a + b, 0);

  return {
    terms: rawTerms,
    counts,
    quran: { direct, surahs, ayahs: quran.ayahs, count: quran.count, failed: quran.failed, arabic: AR.test(q) },
    hadith: { items: hadith.slice(0, 30), total: hadith.length },
    dua: { sections: duaSections.slice(0, 8), duas: duas.items, total: duas.total },
    articles,
    pages,
  };
}