import { mkdir, writeFile } from "node:fs/promises";

const BOOKS = ["bukhari", "muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah"];
const SOURCES = [
  "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/info.json",
  "https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/info.json",
];

async function load() {
  for (const url of SOURCES) {
    try {
      console.log("Downloading", url);
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      console.log("Failed:", e.message);
    }
  }
  throw new Error("Could not download info.json");
}

const info = await load();
const out = {};

for (const id of BOOKS) {
  const meta = info[id]?.metadata;
  if (!meta) {
    console.warn(`! "${id}" not found in info.json`);
    continue;
  }

  const sections = [];
  for (const [secId, name] of Object.entries(meta.sections)) {
    if (secId === "0" || !name) continue;
    const d = meta.section_details?.[secId];
    const first = d?.hadithnumber_first ?? 0;
    const last = d?.hadithnumber_last ?? 0;
    sections.push({
      id: secId,
      name,
      count: first && last ? last - first + 1 : 0,
    });
  }

  out[id] = { name: meta.name, lastHadith: meta.last_hadithnumber, sections };
  console.log(`${id}: ${sections.length} sections`);
}

await mkdir("src/data", { recursive: true });
await writeFile("src/data/hadith-sections.json", JSON.stringify(out));
console.log("Saved src/data/hadith-sections.json");