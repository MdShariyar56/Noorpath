export const PRAYER_ORDER = [
  { key: "Fajr", label: "Fajr", prayer: true },
  { key: "Sunrise", label: "Sunrise", prayer: false },
  { key: "Dhuhr", label: "Dhuhr", prayer: true },
  { key: "Asr", label: "Asr", prayer: true },
  { key: "Maghrib", label: "Maghrib", prayer: true },
  { key: "Isha", label: "Isha", prayer: true },
];

const pad = (n) => String(n).padStart(2, "0");

// "04:32" -> সেকেন্ডে (মধ্যরাত থেকে)
export function toSeconds(hhmm) {
  const [h, m] = String(hhmm).slice(0, 5).split(":").map(Number);
  return h * 3600 + m * 60;
}

// "16:32" -> "04:32 PM"
export function format12h(hhmm) {
  const [h, m] = String(hhmm).slice(0, 5).split(":").map(Number);
  return `${pad(h % 12 || 12)}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
}

export function formatCountdown(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

// নির্দিষ্ট টাইমজোনে এখন মধ্যরাত থেকে কত সেকেন্ড
export function nowSecondsInZone(timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => Number(parts.find((p) => p.type === t).value);
  return get("hour") * 3600 + get("minute") * 60 + get("second");
}

export function formatToday(timeZone) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

// API এর জন্য আজকের তারিখ: DD-MM-YYYY
export function localDateParam() {
  const d = new Date();
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

// এখন কোন ওয়াক্ত চলছে, পরের নামাজ কোনটা, আর কত সময় বাকি
export function getPrayerState(timings, nowSec) {
  const list = PRAYER_ORDER.map((p) => ({
    ...p,
    time: timings[p.key],
    sec: toSeconds(timings[p.key]),
  }));

  let currentKey = "Isha"; // ফজরের আগে হলে আগের দিনের ইশা
  for (const p of list) if (p.sec <= nowSec) currentKey = p.key;

  let next = list.find((p) => p.prayer && p.sec > nowSec);
  let remaining;
  if (next) {
    remaining = next.sec - nowSec;
  } else {
    next = list[0]; // ইশার পর পরের নামাজ আগামীকালের ফজর
    remaining = next.sec + 86400 - nowSec;
  }

  return { list, currentKey, next, remaining };
}