"use client";

import { useState } from "react";

const dhikr = [
  { text: "SubhanAllah", target: 33 },
  { text: "Alhamdulillah", target: 33 },
  { text: "Allahu Akbar", target: 34 },
  { text: "La ilaha illallah", target: 100 },
];

export default function QuickTasbih() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const current = dhikr[index];
  const progress = Math.min(count / current.target, 1);

  const pick = (i) => {
    setIndex(i);
    setCount(0);
  };

  const tap = () => {
    setCount((c) => c + 1);
    if (navigator.vibrate) navigator.vibrate(15);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-gradient-to-b from-brand-600 to-brand-800 p-4 text-white">
      <h3 className="font-semibold">Quick Tasbih</h3>

      <div className="my-4 flex flex-1 flex-col items-center justify-center">
        <button
          onClick={tap}
          aria-label="Count"
          className="relative grid h-28 w-28 place-items-center rounded-full bg-white text-brand-700 shadow-lg transition active:scale-95"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#d2ece1"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#d4a64a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 * (1 - progress)}
              className="transition-all duration-200"
            />
          </svg>
          <span className="relative text-4xl font-bold">{count}</span>
        </button>

        <p className="mt-3 text-sm font-medium">{current.text}</p>
        <p className="text-[11px] text-brand-200">Target: {current.target}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {dhikr.map((d, i) => (
            <button
              key={d.text}
              onClick={() => pick(i)}
              aria-label={d.text}
              className={`h-2 w-2 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCount(0)}
          className="rounded-lg bg-white/15 px-3 py-1 text-xs font-medium hover:bg-white/25"
        >
          Reset
        </button>
      </div>
    </div>
  );
}