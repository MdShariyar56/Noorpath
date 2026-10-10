"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function Glossary({ terms }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const list = terms.filter(
    (x) =>
      !query ||
      x.t[0].toLowerCase().includes(query) ||
      x.d[0].toLowerCase().includes(query) ||
      x.t[1].includes(q.trim()) ||
      x.d[1].includes(q.trim())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
        <Search size={18} className="text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      <p className="text-xs text-muted">
        {list.length} of {terms.length} terms
      </p>

      {list.length === 0 && (
        <p className="py-10 text-center text-muted">
          No term found.
        </p>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {list.map((x) => (
          <article
            key={x.t[0]}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <h3 className="font-semibold">
              {x.t[0]}{" "}
              <span className="font-medium text-brand-600 dark:text-brand-300">
                · {x.t[1]}
              </span>
            </h3>
            <p className="mt-1.5 text-sm text-foreground/80">{x.d[0]}</p>
            <p className="mt-1 text-sm text-foreground/65">{x.d[1]}</p>
          </article>
        ))}
      </div>
    </div>
  );
}