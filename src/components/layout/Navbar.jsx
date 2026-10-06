"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Form from "next/form";
import UserMenu from "./UserMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/quran", label: "Quran" },
  { href: "/hadith", label: "Hadith" },
  { href: "/dua", label: "Dua & Azkar" },
  { href: "/prayer-times", label: "Prayer Times" },
  { href: "/qibla", label: "Qibla" },
  { href: "/calendar", label: "Calendar" },
];

export function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-xl text-white">
        🕌
      </span>
      <span className="leading-tight">
        <span
          className={`block text-xl font-bold ${
            light ? "text-white" : "text-brand-600 dark:text-brand-300"
          }`}
        >
          NoorPath
        </span>
        <span className={`block text-[11px] ${light ? "text-brand-200" : "text-muted"}`}>
          Islamic Companion
        </span>
      </span>
    </Link>
  );
}

export default function Navbar({ onMenuClick }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-lg hover:bg-brand-50 dark:hover:bg-brand-800 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <Logo />

        <nav className="ml-6 hidden items-center gap-1 xl:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3 py-5 text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-foreground/80 hover:text-brand-600 dark:hover:text-brand-300"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded bg-brand-600 dark:bg-brand-300" />
                )}
              </Link>
            );
          })}
          <button className="flex items-center gap-1 px-3 py-5 text-sm font-medium text-foreground/80 hover:text-brand-600">
            More <ChevronDown size={16} />
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Form
            action="/search"
            className="hidden items-center gap-2 rounded-full border border-border bg-background px-4 py-2 md:flex md:w-64 lg:w-80"
          >
            <Search size={16} className="text-muted" />
            <input
              type="search"
              name="q"
              required
              minLength={2}
              placeholder="Search Quran, Hadith, Dua, Articles..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </Form>

          <ThemeToggle />

          <button
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-brand-50 dark:hover:bg-brand-800"
          >
            <Bell size={20} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

                    <UserMenu />
        </div>
      </div>
    </header>
  );
}