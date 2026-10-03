import { mkdir, writeFile } from "node:fs/promises";

const REPO = "islamicapi/masnun-dua";
const BASES = [
  `https://raw.githubusercontent.com/${REPO}/main`,
  `https://cdn.jsdelivr.net/gh/${REPO}@main`,
];

async function getJson(path) {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}/${path}`);
      if (res.ok) return await res.json();
    } catch {}
  }
  return null;
}

async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx]);
      }
    })
  );
  return out;
}

const arr = (j) => (Array.isArray(j) ? j : j?.data || []);
const unwrap = (j) => (j && j.data && !Array.isArray(j.data) ? j.data : j);
const str = (v) =>
  Array.isArray(v)
    ? v.filter(Boolean).join("\n")
    : typeof v === "string"
    ? v.trim()
    : "";

// ১. ক্যাটাগরি ও সাব-ক্যাটাগরি
console.log("Loading categories...");
const [catBn, catEn, subBn, subEn] = await Promise.all([
  getJson("categories/bn.json"),
  getJson("categories/en.json"),
  getJson("sub-categories/bn.json"),
  getJson("sub-categories/en.json"),
]);
if (!catBn || !subBn) {
  console.error("Could not load categories / sub-categories");
  process.exit(1);
}

const enSub = new Map(arr(subEn).map((s) => [s.id, s]));
const subcategories = arr(subBn).map((s) => ({
  id: s.id,
  title: s.title,
  titleEn: enSub.get(s.id)?.title || "",
  category: s.category,
  duaIds: s["dua-ids"] || [],
}));

const enCat = new Map(arr(catEn).map((c) => [c.url, c]));
const categories = arr(catBn).map((c) => ({
  slug: c.url,
  name: c.name,
  nameEn: enCat.get(c.url)?.name || "",
  subCount: subcategories.filter((s) => s.category === c.url).length,
}));

// ২. কোন দুয়ার অডিও আছে
const audioIds = new Set();
try {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/git/trees/main?recursive=1`,
    { headers: { "User-Agent": "noorpath-script" } }
  );
  const tree = await res.json();
  for (const t of tree.tree) {
    const m = t.path.match(/^audio\/(\d+)\.mp3$/);
    if (m) audioIds.add(Number(m[1]));
  }
} catch {
  console.warn("! Could not read audio list, audio will be disabled");
}
console.log("Audio files:", audioIds.size);

// ৩. প্রতিটা দুয়া (বাংলা + ইংরেজি)
const ids = [...new Set(subcategories.flatMap((s) => s.duaIds))].sort(
  (a, b) => a - b
);
console.log(`Downloading ${ids.length} duas (bn + en)...`);

let done = 0;
const results = await pool(ids, 16, async (id) => {
  const [bn, en] = await Promise.all([
    getJson(`translation/bn/dua_${id}.json`),
    getJson(`translation/en/dua_${id}.json`),
  ]);
  if (++done % 100 === 0) console.log(`  ${done}/${ids.length}`);
  return { id, bn: unwrap(bn), en: unwrap(en) };
});

const duas = {};
const failed = [];
for (const { id, bn, en } of results) {
  if (!bn && !en) {
    failed.push(id);
    continue;
  }
  duas[id] = {
    id,
    title: str(bn?.title) || str(en?.title),
    intro: str(bn?.introduction),
    introEn: str(en?.introduction),
    titleEn: str(en?.title),
    arabic: str(bn?.arabic) || str(en?.arabic),
    tr: str(en?.transliteration),
    trBn: str(bn?.transliteration),
    bn: str(bn?.translation),
    en: str(en?.translation),
    ref: str(bn?.reference) || str(en?.reference),
    refEn: str(en?.reference) || str(bn?.reference),
    benefits: Array.isArray(bn?.benefits?.points) ? bn.benefits.points : [],
    benefitsEn: Array.isArray(en?.benefits?.points) ? en.benefits.points : [],
    audio: audioIds.has(id),
  };
}

// ৪. সেভ
await mkdir("src/data/dua", { recursive: true });
const files = { categories, subcategories, duas };
for (const [name, data] of Object.entries(files)) {
  const text = JSON.stringify(data);
  await writeFile(`src/data/dua/${name}.json`, text);
  console.log(`Saved src/data/dua/${name}.json (${(text.length / 1024).toFixed(0)} KB)`);
}

// ৫. যাচাই
const all = Object.values(duas);
console.log("\n--- Check ---");
console.log("Duas saved:", all.length, "| failed:", failed.length, failed.slice(0, 10));
console.log("Empty arabic:", all.filter((d) => !d.arabic).length);
console.log("Empty bangla:", all.filter((d) => !d.bn).length);
console.log("Empty english:", all.filter((d) => !d.en).length);
console.log("With audio:", all.filter((d) => d.audio).length);
console.log("\nSample:");
console.log(JSON.stringify(all[2], null, 2).slice(0, 1500));