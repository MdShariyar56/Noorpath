"use client";

import { useState } from "react";

export default function ArticleBody({ body }) {
  const [show, setShow] = useState({ en: true, bn: true });

  // দুটোই বন্ধ করা যাবে না
  const toggle = (key) => {
    const next = { ...show, [key]: !show[key] };
    if (!next.en && !next.bn) return;
    setShow(next);
  };

  const toggles = [
    { key: "en", label: "English" },
    { key: "bn", label: "বাংলা" },
  ];

  return (
    <div>
      <div className="mb-5 flex gap-2">
        {toggles.map((t) => (
          <button
            key={t.key}
            onClick={() => toggle(t.key)}
            aria-pressed={show[t.key]}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              show[t.key]
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border bg-card text-foreground/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {body.map((p) => (
          <div key={p[0]} className="space-y-2">
            {show.en && <p className="text-[15px] leading-8">{p[0]}</p>}
            {show.bn && (
              <p
                className={`text-[15px] leading-8 ${
                  show.en ? "text-foreground/75" : ""
                }`}
              >
                {p[1]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}