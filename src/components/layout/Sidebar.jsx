"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BookText,
  Calculator,
  CalendarDays,
  Clock,
  Compass,
  HandHeart,
  Home,
  Landmark,
  Lightbulb,
  Moon,
  Newspaper,
  Search,
  X,
} from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/quran", label: "Quran", icon: BookOpen },
  { href: "/hadith", label: "Hadith", icon: BookText },
  { href: "/dua", label: "Dua & Azkar", icon: HandHeart },
  { href: "/prayer-times", label: "Prayer Times", icon: Clock },
  { href: "/qibla", label: "Qibla", icon: Compass },
  { href: "/calendar", label: "Hijri Calendar", icon: CalendarDays },
  { href: "/zakat", label: "Zakat Calculator", icon: Calculator },
  { href: "/ramadan", label: "Ramadan", icon: Moon },
  { href: "/hajj-umrah", label: "Hajj & Umrah", icon: Landmark },
  { href: "/knowledge", label: "Islamic Knowledge", icon: Lightbulb },
  { href: "/articles", label: "Articles", icon: Newspaper },
  { href: "/search", label: "Search", icon: Search },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* মোবাইলে ব্যাকড্রপ */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r border-border bg-card p-3 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-20 lg:z-auto lg:h-[calc(100vh-6rem)] lg:w-56 lg:shrink-0 lg:translate-x-0 lg:rounded-2xl lg:border lg:self-start`}
      >
        <div className="mb-2 flex justify-end lg:hidden">
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-600 text-white"
                    : "text-foreground/80 hover:bg-brand-50 dark:hover:bg-brand-800"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 rounded-xl bg-gradient-to-b from-brand-700 to-brand-900 p-4 text-white">
          <p className="text-sm font-semibold leading-snug">
            Seek Allah&apos;s Guidance in every step of your life.
          </p>
        </div>
      </aside>
    </>
  );
}