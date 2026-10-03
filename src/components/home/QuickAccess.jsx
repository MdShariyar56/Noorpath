import Link from "next/link";
import {
  BookOpen,
  BookText,
  Calculator,
  Clock,
  Compass,
  HandHeart,
  Landmark,
  Moon,
} from "lucide-react";

const cards = [
  { href: "/quran", title: "Quran", sub: "Read & Listen", icon: BookOpen },
  { href: "/hadith", title: "Hadith", sub: "Learn & Explore", icon: BookText },
  { href: "/dua", title: "Dua & Azkar", sub: "Daily Supplication", icon: HandHeart },
  { href: "/prayer-times", title: "Prayer Times", sub: "Never Miss a Prayer", icon: Clock },
  { href: "/qibla", title: "Qibla", sub: "Find Direction", icon: Compass },
  { href: "/zakat", title: "Zakat", sub: "Calculate", icon: Calculator },
  { href: "/ramadan", title: "Ramadan", sub: "Special Section", icon: Moon },
  { href: "/hajj-umrah", title: "Hajj & Umrah", sub: "Complete Guide", icon: Landmark },
];

export default function QuickAccess() {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 2xl:grid-cols-8">
      {cards.map(({ href, title, sub, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="group flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-800 dark:text-brand-200">
            <Icon size={22} />
          </span>
          <span className="mt-3 text-sm font-semibold">{title}</span>
          <span className="mt-0.5 text-[11px] text-muted">{sub}</span>
        </Link>
      ))}
    </section>
  );
}