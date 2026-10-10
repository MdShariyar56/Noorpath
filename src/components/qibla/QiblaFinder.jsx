"use client";

import { useEffect, useRef, useState } from "react";
import { Compass, Crosshair, MapPin, Navigation } from "lucide-react";
import useCompass from "@/hooks/useCompass";
import {
  DHAKA,
  angleDiff,
  cardinal,
  distanceKm,
  qiblaBearing,
} from "@/lib/qibla";

const CARDINAL_BN = [
  "উত্তর",
  "উত্তর-পূর্ব",
  "পূর্ব",
  "দক্ষিণ-পূর্ব",
  "দক্ষিণ",
  "দক্ষিণ-পশ্চিম",
  "পশ্চিম",
  "উত্তর-পশ্চিম",
];

// ইংরেজি লেখা, তার নিচে বাংলা
function Bi({ en, bn }) {
  return (
    <>
      <span>{en}</span>
      <span className="block text-[0.92em] opacity-75">{bn}</span>
    </>
  );
}

function Dial({ rotation, bearing, aligned }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full"
      role="img"
      aria-label="Qibla compass"
    >
      {/* Rotating dial */}
      <g transform={`rotate(${rotation} 150 150)`}>
        <circle cx="150" cy="150" r="130" className="fill-card" />
        <circle
          cx="150"
          cy="150"
          r="130"
          fill="none"
          strokeWidth="4"
          className={
            aligned
              ? "stroke-emerald-500"
              : "stroke-brand-600 dark:stroke-brand-300"
          }
        />

        {Array.from({ length: 72 }).map((_, i) => {
          const a = i * 5;
          const major = a % 90 === 0;
          const mid = a % 45 === 0;
          const len = major ? 16 : mid ? 12 : 6;
          return (
            <line
              key={i}
              x1="150"
              y1="22"
              x2="150"
              y2={22 + len}
              strokeWidth={major ? 2.5 : 1}
              transform={`rotate(${a} 150 150)`}
              className="stroke-foreground/40"
            />
          );
        })}

        {[
          { l: "N", a: 0, red: true },
          { l: "E", a: 90 },
          { l: "S", a: 180 },
          { l: "W", a: 270 },
        ].map(({ l, a, red }) => (
          <text
            key={l}
            x="150"
            y="62"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            transform={`rotate(${a} 150 150)`}
            className={red ? "fill-red-500" : "fill-foreground"}
          >
            {l}
          </text>
        ))}

        {/* Kaaba direction */}
        <g transform={`rotate(${bearing} 150 150)`}>
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="112"
            strokeWidth="4"
            strokeLinecap="round"
            className="stroke-gold-500"
          />
          <text x="150" y="104" textAnchor="middle" fontSize="28">
            🕋
          </text>
        </g>
      </g>

      {/* Fixed pointer (front of the phone) */}
      <polygon
        points="150,4 141,18 159,18"
        className={
          aligned ? "fill-emerald-500" : "fill-brand-600 dark:fill-brand-300"
        }
      />
      <circle
        cx="150"
        cy="150"
        r="6"
        className="fill-brand-600 dark:fill-brand-300"
      />
    </svg>
  );
}

export default function QiblaFinder() {
  const [place, setPlace] = useState(DHAKA);
  const [geo, setGeo] = useState("idle"); // idle | loading | denied | error
  const { heading, status, start } = useCompass();

  const bearing = qiblaBearing(place.lat, place.lng);
  const distance = distanceKm(place.lat, place.lng);
  const cardIndex = Math.round(bearing / 45) % 8;

  const active = status === "active" && heading !== null;
  const diff = active ? angleDiff(bearing, heading) : 0;
  const aligned = active && Math.abs(diff) <= 4;

  // Vibrate once when the phone points at the Qibla
  const wasAligned = useRef(false);
  useEffect(() => {
    if (aligned && !wasAligned.current && navigator.vibrate) {
      navigator.vibrate(60);
    }
    wasAligned.current = aligned;
  }, [aligned]);

  const locate = () => {
    if (!navigator.geolocation) {
      setGeo("error");
      return;
    }
    setGeo("loading");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPlace({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          name: "Your location / আপনার অবস্থান",
        });
        setGeo("idle");
      },
      (err) => setGeo(err.code === 1 ? "denied" : "error"),
      { timeout: 10000 },
    );
  };

  const geoMsg = {
    denied: {
      en: "Location permission was denied. Allow it in your browser settings and try again.",
      bn: "লোকেশনের অনুমতি দেওয়া হয়নি। ব্রাউজারের সেটিংস থেকে অনুমতি দিয়ে আবার চেষ্টা করুন।",
    },
    error: {
      en: "Could not get your location. Please try again.",
      bn: "আপনার অবস্থান পাওয়া যায়নি। আবার চেষ্টা করুন।",
    },
  }[geo];

  const tips = [
    {
      en: "Hold your phone flat (parallel to the ground).",
      bn: "ফোন সমতলভাবে (মাটির সাথে সমান্তরালে) ধরুন।",
    },
    {
      en: "Stay away from metal, magnets and electronic devices.",
      bn: "লোহা, চুম্বক ও ইলেকট্রনিক যন্ত্র থেকে দূরে থাকুন।",
    },
    {
      en: "If the compass looks off, move your phone in a figure-8 motion a few times to calibrate it.",
      bn: "কম্পাস ঠিক না দেখালে ফোনটি কয়েকবার ইংরেজি ৮ আকারে ঘুরিয়ে ক্যালিব্রেট করুন।",
    },
    {
      en: "Phone sensors are not perfectly accurate. For prayer, cross-check with your local mosque's Qibla direction.",
      bn: "ফোনের সেন্সর সম্পূর্ণ নির্ভুল নয়। নামাজের জন্য স্থানীয় মসজিদের কিবলার দিকের সাথে মিলিয়ে নিন।",
    },
  ];

  return (
    <div className="space-y-6">
      <div className=" rounded-2xl flex items-center gap-4 text-2xl  bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4 text-white">
        <img
          src="https://imglink.cc/cdn/OboTUzdWPV.png"
          alt="Qibla Logo"
          className="h-17 w-17 rounded-full border-2 object-cover"
        />
        <div className="">
          <p className="font-bold text-2xl">Qibla Finder</p>
          <p className="mt-1 text-sm text-brand-100 flex items-center gap-2">
            Find the direction of the Kaaba from where you are
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Compass */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mx-auto max-w-sm">
            <Dial
              rotation={active ? -heading : 0}
              bearing={bearing}
              aligned={aligned}
            />
          </div>

          <div aria-live="polite" className="mt-4 text-center">
            {aligned && (
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                <Bi
                  en="✓ You are facing the Qibla"
                />
              </p>
            )}
            {active && !aligned && (
              <p className="font-medium">
                <Bi
                  en={`Turn ${Math.round(Math.abs(diff))}° ${diff > 0 ? "right" : "left"}`}
                />
              </p>
            )}
            {!active && status !== "unsupported" && (
              <button
                onClick={start}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                <Navigation size={16} /> Enable compass
              </button>
            )}
            {status === "denied" && (
              <p className="mt-2 text-sm text-red-500">
                <Bi
                  en="Compass permission was denied. Allow it and try again."
                />
              </p>
            )}
            {status === "unsupported" && (
              <p className="mx-auto max-w-sm text-sm text-muted">
                <Bi
                  en="No compass sensor was found on this device or browser (desktops usually don't have one). The dial is fixed with North (N) at the top, and the 🕋 marks the Qibla direction."
                />
              </p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted">Qibla direction</p>
            <p className="mt-1 text-3xl font-bold text-brand-600 dark:text-brand-300">
              {bearing.toFixed(1)}°
            </p>
            <p className="text-sm text-muted">
              {cardinal(bearing)}
            </p>
            <p className="text-[11px] text-muted">
              Measured from true north
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted">
              Distance to the Kaaba
            </p>
            <p className="mt-1 text-xl font-bold">
              {Math.round(distance).toLocaleString("en-US")} km
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="flex items-center gap-1 text-xs text-muted">
              <MapPin size={13} /> Location
            </p>
            <p className="mt-1 font-semibold">{place.name}</p>
            <p className="text-xs text-muted">
              {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
            </p>
            <button
              onClick={locate}
              disabled={geo === "loading"}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-600 px-4 py-1.5 text-sm font-medium text-brand-600 hover:bg-brand-50 disabled:opacity-60 dark:border-brand-300 dark:text-brand-300 dark:hover:bg-brand-800"
            >
              <Crosshair size={15} />
              {geo === "loading"
                ? "Locating..."
                : "Use my location"}
            </button>
            {geoMsg && (
              <p className="mt-2 text-xs text-red-500">
                <Bi en={geoMsg.en} bn={geoMsg.bn} />
              </p>
            )}
          </div>

          {active && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-muted">
                Your heading
              </p>
              <p className="mt-1 text-xl font-bold tabular-nums">
                {Math.round(heading)}°
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
        <p className="mb-2 font-semibold">For best results</p>
        <ul className="list-disc space-y-2 pl-5">
          {tips.map((t) => (
            <li key={t.en}>
              <Bi en={t.en}  />
            </li>
          ))}
        </ul>
        <p className="my-2 font-semibold">সর্বোত্তম ফলাফলের জন্য</p>
        <ul className="list-disc space-y-2 pl-5">
          {tips.map((t) => (
            <li key={t.en}>
              <Bi bn={t.bn} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
