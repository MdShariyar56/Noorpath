const BASE = "https://api.alquran.cloud/v1";
const DAY = 60 * 60 * 24;

// সব ১১৪ সূরার তালিকা
export async function getSurahList() {
  const res = await fetch(`${BASE}/surah`, { next: { revalidate: DAY } });
  if (!res.ok) throw new Error("Failed to load surah list");
  const json = await res.json();
  return json.data;
}

// একটা সূরা: আরবি + বাংলা + ইংরেজি + অডিও (আলাফাসি)
export async function getSurah(id) {
  const editions = "quran-uthmani,bn.bengali,en.sahih,ar.alafasy";
  const res = await fetch(`${BASE}/surah/${id}/editions/${editions}`, {
    next: { revalidate: DAY },
  });
  if (!res.ok) throw new Error("Failed to load surah");
  const json = await res.json();
  const [arabic, bn, en, audio] = json.data;

  const BISMILLAH_WORDS = 4;
  const hasBismillah = Number(id) !== 1 && Number(id) !== 9;

  return {
    number: arabic.number,
    name: arabic.name,
    englishName: arabic.englishName,
    englishNameTranslation: arabic.englishNameTranslation,
    revelationType: arabic.revelationType,
    numberOfAyahs: arabic.numberOfAyahs,
    ayahs: arabic.ayahs.map((a, i) => {
      let text = a.text;
      // প্রতি সূরার ১ম আয়াতের সাথে বিসমিল্লাহ জুড়ে আসে, আলাদা করে দেখাব
      if (hasBismillah && a.numberInSurah === 1) {
        text = text.split(" ").slice(BISMILLAH_WORDS).join(" ");
      }
      return {
        number: a.numberInSurah,
        arabic: text,
        bn: bn.ayahs[i].text,
        en: en.ayahs[i].text,
        audio: audio.ayahs[i].audio,
      };
    }),
  };
}