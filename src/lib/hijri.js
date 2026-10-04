export const DAY = 86400000;
export const WEEK_START = 1; // 0 = রবিবার, 1 = সোমবার, 6 = শনিবার

export const MONTHS = [
  { en: "Muharram", bn: "মুহাররম" },
  { en: "Safar", bn: "সফর" },
  { en: "Rabi' al-Awwal", bn: "রবিউল আউয়াল" },
  { en: "Rabi' al-Thani", bn: "রবিউস সানি" },
  { en: "Jumada al-Awwal", bn: "জমাদিউল আউয়াল" },
  { en: "Jumada al-Thani", bn: "জমাদিউস সানি" },
  { en: "Rajab", bn: "রজব" },
  { en: "Sha'ban", bn: "শা'বান" },
  { en: "Ramadan", bn: "রমজান" },
  { en: "Shawwal", bn: "শাওয়াল" },
  { en: "Dhul Qa'dah", bn: "জিলকদ" },
  { en: "Dhul Hijjah", bn: "জিলহজ" },
];

// m = হিজরি মাস (১-১২), d = দিন
export const EVENTS = [
  { m: 1, d: 1, en: "Islamic New Year", bn: "হিজরি নববর্ষ" },
  { m: 1, d: 10, en: "Day of Ashura", bn: "আশুরা" },
  {
    m: 3,
    d: 12,
    en: "Mawlid an-Nabi",
    bn: "মীলাদুন্নবী",
    noteEn: "Observed by many Muslims; scholars differ on its observance.",
    noteBn: "অনেকে পালন করেন; পালনের বিষয়ে আলেমদের মতভেদ আছে।",
  },
  {
    m: 7,
    d: 27,
    en: "Isra and Mi'raj",
    bn: "ইসরা ও মিরাজ",
    noteEn: "The commonly observed date; the exact date is not firmly established.",
    noteBn: "প্রচলিত তারিখ; সঠিক তারিখ নিশ্চিতভাবে প্রতিষ্ঠিত নয়।",
  },
  {
    m: 8,
    d: 15,
    en: "Shab-e-Barat",
    bn: "শবে বরাত",
    noteEn: "Commonly observed in South Asia; scholars differ on the authenticity of related reports.",
    noteBn: "দক্ষিণ এশিয়ায় প্রচলিত; এ সংক্রান্ত বর্ণনার বিশুদ্ধতা নিয়ে আলেমদের মতভেদ আছে।",
  },
  { m: 9, d: 1, en: "First day of Ramadan", bn: "রমজানের প্রথম দিন" },
  {
    m: 9,
    d: 27,
    en: "Laylat al-Qadr (commonly observed night)",
    bn: "লাইলাতুল কদর (প্রচলিত রাত)",
    noteEn: "Seek it in the odd nights of the last ten nights of Ramadan.",
    noteBn: "রমজানের শেষ দশকের বেজোড় রাতগুলোতে তালাশ করুন।",
  },
  { m: 10, d: 1, en: "Eid al-Fitr", bn: "ঈদুল ফিতর" },
  {
    m: 12,
    d: 9,
    en: "Day of Arafah",
    bn: "আরাফার দিন",
    noteEn: "Fasting is recommended for those who are not performing Hajj.",
    noteBn: "যারা হজে নেই, তাদের জন্য রোজা রাখা মুস্তাহাব।",
  },
  { m: 12, d: 10, en: "Eid al-Adha", bn: "ঈদুল আযহা" },
];

// ব্রাউজার বা Node এ Umm al-Qura ক্যালেন্ডার সাপোর্ট থাকলে true
export const HIJRI_SUPPORTED =
  new Intl.DateTimeFormat("en-u-ca-islamic-umalqura").resolvedOptions()
    .calendar === "islamic-umalqura";

const hijriFmt = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", {
  timeZone: "UTC",
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

// প্রতিটা দিন UTC দুপুর ১২টার টাইমস্ট্যাম্প হিসেবে রাখি, ফলে টাইমজোন ও DST ঝামেলা হয় না

export function todayMs() {
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 12);
}

// offset: -1, 0, +1 দিনের সমন্বয়
export function hijriOf(ms, offset = 0) {
  const parts = hijriFmt.formatToParts(new Date(ms + offset * DAY));
  const get = (t) => Number(parts.find((p) => p.type === t).value);
  return { day: get("day"), month: get("month"), year: get("year") };
}

export function monthStartOf(ms, offset) {
  return ms - (hijriOf(ms, offset).day - 1) * DAY;
}

// হিজরি মাস ২৯ বা ৩০ দিনের
export function nextMonthStart(start, offset) {
  for (let i = 29; i <= 31; i++) {
    const t = start + i * DAY;
    if (hijriOf(t, offset).day === 1) return t;
  }
  return start + 30 * DAY;
}

export function prevMonthStart(start, offset) {
  return monthStartOf(start - DAY, offset);
}

export function monthDays(start, offset) {
  const len = Math.round((nextMonthStart(start, offset) - start) / DAY);
  return Array.from({ length: len }, (_, i) => {
    const ms = start + i * DAY;
    const d = new Date(ms);
    return { ms, hDay: i + 1, g: d.getUTCDate(), dow: d.getUTCDay() };
  });
}

export function upcomingEvents(from, offset, count = 4) {
  const out = [];
  let start = monthStartOf(from, offset);
  for (let i = 0; i < 14 && out.length < count; i++) {
    const h = hijriOf(start, offset);
    for (const e of EVENTS) {
      if (e.m !== h.month) continue;
      const ms = start + (e.d - 1) * DAY;
      if (ms >= from) out.push({ ...e, ms, year: h.year });
    }
    start = nextMonthStart(start, offset);
  }
  return out.sort((a, b) => a.ms - b.ms).slice(0, count);
}

const f = (opts) => new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts });
const fFull = f({ weekday: "long", day: "numeric", month: "long", year: "numeric" });
const fShort = f({ day: "numeric", month: "short", year: "numeric" });
const fMon = f({ month: "short" });
const fMonthYear = f({ month: "long", year: "numeric" });

export const fmtFull = (ms) => fFull.format(new Date(ms));
export const fmtShort = (ms) => fShort.format(new Date(ms));
export const fmtMon = (ms) => fMon.format(new Date(ms));
export const fmtMonthYear = (ms) => fMonthYear.format(new Date(ms));

// আজকের পরের সবচেয়ে কাছের রমজানের প্রথম দিন
export function nextRamadan(from, offset) {
  let start = monthStartOf(from, offset);
  for (let i = 0; i < 14; i++) {
    const h = hijriOf(start, offset);
    if (h.month === 9 && start > from) return { ms: start, year: h.year };
    start = nextMonthStart(start, offset);
  }
  return null;
}