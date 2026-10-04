"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ArticleCard from "./ArticleCard";

export default function ArticleBrowser({ articles, categories }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("new");

  const query = q.trim().toLowerCase();
  const list = articles
    .filter((a) => {
      if (cat !== "all" && a.cat !== cat) return false;
      if (!query) return true;
      return (
        a.title[0].toLowerCase().includes(query) ||
        a.excerpt[0].toLowerCase().includes(query) ||
        a.title[1].includes(q.trim()) ||
        a.excerpt[1].includes(q.trim())
      );
    })
    .sort((a, b) =>
      sort === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );

  const chip = (active) =>
    `shrink-0 rounded-full border px-4 py-1.5 text-center text-sm font-medium leading-tight transition ${
      active
        ? "border-brand-600 bg-brand-600 text-white"
        : "border-border bg-card text-foreground/70 hover:border-brand-300"
    }`;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
          <Search size={18} className="text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles / আর্টিকেল খুঁজুন..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort articles"
          className="rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none"
        >
          <option value="new">Latest / সর্বশেষ</option>
          <option value="old">Oldest / পুরনো</option>
        </select>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <button onClick={() => setCat("all")} className={chip(cat === "all")}>
          All / সব ({articles.length})
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={chip(cat === c.id)}
          >
            {c.en}
            <span className="block text-[11px] opacity-80">{c.bn}</span>
          </button>
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-10 text-center text-muted">
          No article found. / কোনো আর্টিকেল পাওয়া যায়নি।
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => (
          <ArticleCard key={a.slug} a={a} categories={categories} />
        ))}
      </div>
    </div>
  );
}