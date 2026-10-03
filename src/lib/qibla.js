const KAABA = { lat: 21.4225, lng: 39.8262 };

export const DHAKA = { lat: 23.8103, lng: 90.4125, name: "Dhaka, Bangladesh" };

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

// উত্তর থেকে ঘড়ির কাঁটার দিকে কত ডিগ্রি ঘুরলে কাবা (0-360)
export function qiblaBearing(lat, lng) {
  const φ1 = rad(lat);
  const φ2 = rad(KAABA.lat);
  const Δλ = rad(KAABA.lng - lng);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (deg(Math.atan2(y, x)) + 360) % 360;
}

// কাবা পর্যন্ত দূরত্ব (কিমি)
export function distanceKm(lat, lng) {
  const R = 6371;
  const dφ = rad(KAABA.lat - lat);
  const dλ = rad(KAABA.lng - lng);
  const a =
    Math.sin(dφ / 2) ** 2 +
    Math.cos(rad(lat)) * Math.cos(rad(KAABA.lat)) * Math.sin(dλ / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// target ও current এর পার্থক্য, -180 থেকে +180 (ধনাত্মক = ডানে ঘুরতে হবে)
export function angleDiff(target, current) {
  return ((target - current + 540) % 360) - 180;
}

export function cardinal(d) {
  const names = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];
  return names[Math.round(d / 45) % 8];
}