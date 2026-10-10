"use client";

import { Bookmark } from "lucide-react";

export default function BookmarkButton({ marked, busy, loggedIn, onClick, size = 16 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      aria-pressed={marked}
      aria-label={marked ? "Remove bookmark" : "Add bookmark"}
      title={
        loggedIn
          ? marked
            ? "Remove bookmark / বুকমার্ক সরান"
            : "Bookmark / বুকমার্ক করুন"
          : "Login to bookmark / বুকমার্ক করতে লগইন করুন"
      }
      className={`grid h-8 w-8 place-items-center rounded-full transition disabled:opacity-60 ${
        marked
          ? "bg-gold-400/25 text-gold-500"
          : "text-muted hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-800"
      }`}
    >
      <Bookmark size={size} fill={marked ? "currentColor" : "none"} />
    </button>
  );
}

export function BookmarkError({ error }) {
  if (!error) return null;
  return (
    <p
      role="alert"
      className="rounded-xl border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-200"
    >
      {error[0]}
      <span className="block opacity-80">{error[1]}</span>
    </p>
  );
}