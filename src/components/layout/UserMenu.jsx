"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function UserMenu() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // বাইরে ক্লিক বা Escape চাপলে মেনু বন্ধ
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (loading) {
    return (
      <div className="h-9 w-20 animate-pulse rounded-full bg-brand-50 dark:bg-brand-800/50" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Login
      </Link>
    );
  }

  const initial = (user.name || "U").trim().charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700"
      >
        {initial}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 z-50 w-64 rounded-2xl border border-border bg-card p-2 shadow-lg"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
            {user.role === "admin" && (
              <span className="mt-1 inline-block rounded-full bg-gold-400/20 px-2 py-0.5 text-[10px] font-semibold text-gold-500">
                Admin
              </span>
            )}
          </div>
          <div className="my-1 h-px bg-border" />
          <button
            role="menuitem"
            onClick={async () => {
              setOpen(false);
              await logout();
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-brand-50 dark:hover:bg-brand-800"
          >
            <LogOut size={16} /> Logout / লগআউট
          </button>
        </div>
      )}
    </div>
  );
}