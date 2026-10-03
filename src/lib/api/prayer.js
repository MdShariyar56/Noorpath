import { localDateParam } from "../prayer-utils";

const BASE = "https://api.aladhan.com/v1";

export const DEFAULT_LOCATION = { city: "Dhaka", country: "Bangladesh" };

// Method 1 = University of Islamic Sciences, Karachi (বাংলাদেশে বহুল প্রচলিত)
// School 1 = Hanafi (আসরের হিসাব)
const METHOD = 1;
const SCHOOL = 1;
export const METHOD_NAME = "Univ. of Islamic Sciences, Karachi";
export const SCHOOL_NAME = "Hanafi";

export async function getPrayerTimes({ city, country }) {
  const date = localDateParam();
  const url =
    `${BASE}/timingsByCity/${date}` +
    `?city=${encodeURIComponent(city)}` +
    `&country=${encodeURIComponent(country)}` +
    `&method=${METHOD}&school=${SCHOOL}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Prayer times request failed");

  const json = await res.json();
  const { timings, date: d, meta } = json.data;

  return {
    timings: {
      Fajr: timings.Fajr.slice(0, 5),
      Sunrise: timings.Sunrise.slice(0, 5),
      Dhuhr: timings.Dhuhr.slice(0, 5),
      Asr: timings.Asr.slice(0, 5),
      Maghrib: timings.Maghrib.slice(0, 5),
      Isha: timings.Isha.slice(0, 5),
    },
    hijri: {
      day: d.hijri.day,
      month: d.hijri.month.en,
      year: d.hijri.year,
    },
    timezone: meta.timezone,
    location: `${city}, ${country}`,
  };
}