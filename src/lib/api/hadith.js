const CDN = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";
const RAW = "https://raw.githubusercontent.com/fawazahmed0/hadith-api/1";
const DAY = 60 * 60 * 24;

export const BOOKS = [
  { id: "bukhari", name: "Sahih al-Bukhari", bn: "সহিহ বুখারি", arabic: "صحيح البخاري", bg: "from-brand-900 to-brand-600" },
  { id: "muslim", name: "Sahih Muslim", bn: "সহিহ মুসলিম", arabic: "صحيح مسلم", bg: "from-emerald-900 to-teal-600" },
  { id: "abudawud", name: "Sunan Abu Dawud", bn: "সুনান আবু দাউদ", arabic: "سنن أبي داود", bg: "from-slate-800 to-brand-600" },
  { id: "tirmidhi", name: "Jami at-Tirmidhi", bn: "জামে আত-তিরমিজি", arabic: "جامع الترمذي", bg: "from-indigo-900 to-brand-500" },
  { id: "nasai", name: "Sunan an-Nasa'i", bn: "সুনান আন-নাসাঈ", arabic: "سنن النسائي", bg: "from-amber-900 to-brand-600" },
  { id: "ibnmajah", name: "Sunan Ibn Majah", bn: "সুনান ইবনে মাজাহ", arabic: "سنن ابن ماجه", bg: "from-cyan-900 to-brand-600" },
];

export function getBook(id) {
  return BOOKS.find((b) => b.id === id);
}

// CDN ব্যর্থ হলে পরপর ফলব্যাক URL চেষ্টা করবে
async function fetchJson(path) {
  const urls = [
    `${CDN}${path}.min.json`,
    `${CDN}${path}.json`,
    `${RAW}${path}.min.json`,
    `${RAW}${path}.json`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { next: { revalidate: DAY } });
      if (res.ok) return await res.json();
    } catch {}
  }
  throw new Error(`Failed to load ${path}`);
}

// একটা অধ্যায়ের সব হাদিস: আরবি + ইংরেজি + বাংলা একসাথে জুড়ে
export async function getSection(bookId, sectionId) {
  const [ara, eng, ben] = await Promise.allSettled(
    ["ara", "eng", "ben"].map((lang) =>
      fetchJson(`/editions/${lang}-${bookId}/sections/${sectionId}`)
    )
  );

  if (ara.status === "rejected" && eng.status === "rejected") {
    throw new Error("Failed to load section");
  }

  const toMap = (r) =>
    r.status === "fulfilled"
      ? new Map(r.value.hadiths.map((h) => [h.hadithnumber, h]))
      : new Map();

  const a = toMap(ara);
  const e = toMap(eng);
  const b = toMap(ben);

  const base =
    eng.status === "fulfilled" ? eng.value.hadiths : ara.value.hadiths;

  return base.map((h) => {
    const n = h.hadithnumber;
    const grades = h.grades?.length ? h.grades : a.get(n)?.grades || [];
    return {
      number: n,
      ref: h.reference || null,
      grades,
      ar: a.get(n)?.text || "",
      en: e.get(n)?.text || "",
      bn: b.get(n)?.text || "",
    };
  });
}