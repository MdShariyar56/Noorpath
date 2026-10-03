import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Ayah of the Day",
    icon: "📖",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    text: "My Lord, increase me in knowledge.",
    ref: "Quran 20:114",
    href: "/quran",
    bg: "bg-brand-50 dark:bg-brand-800/40",
  },
  {
    title: "Hadith of the Day",
    icon: "📜",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَىٰ كُلِّ مُسْلِمٍ",
    text: "The seeking of knowledge is obligatory upon every Muslim.",
    ref: "Sunan Ibn Majah (224)",
    href: "/hadith",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    title: "Dua of the Day",
    icon: "🤲",
    arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ",
    text: "O Allah, guide me among those You have guided.",
    ref: "Reference",
    href: "/dua",
    bg: "bg-sky-50 dark:bg-sky-900/20",
  },
];

export default function DailyCards() {
  return (
    <>
      {cards.map((c) => (
        <div
          key={c.title}
          className={`flex flex-col rounded-2xl border border-border p-4 ${c.bg}`}
        >
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>{c.icon}</span>
            {c.title}
          </div>

          <p className="font-arabic mt-3 text-center text-2xl leading-loose">
            {c.arabic}
          </p>
          <p className="mt-2 text-sm text-foreground/80">{c.text}</p>
          <p className="mt-1 text-xs text-muted">— {c.ref}</p>

          <Link
            href={c.href}
            className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-brand-600 dark:text-brand-300"
          >
            Read More <ArrowRight size={14} />
          </Link>
        </div>
      ))}
    </>
  );
}