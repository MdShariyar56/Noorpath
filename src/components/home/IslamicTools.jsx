import Link from "next/link";
import { Calculator, CalendarDays, ChevronRight, Compass, Fingerprint } from "lucide-react";

const tools = [
  { href: "/tasbih", title: "Tasbih", sub: "Count Your Dhikr", icon: Fingerprint },
  { href: "/zakat", title: "Zakat Calculator", sub: "Calculate Zakat", icon: Calculator },
  { href: "/qibla", title: "Qibla Finder", sub: "Find Qibla Direction", icon: Compass },
  { href: "/calendar", title: "Hijri Calendar", sub: "Islamic Calendar", icon: CalendarDays },
];

export default function IslamicTools() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <h2 className="mb-3 text-base font-bold">Islamic Tools</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {tools.map(({ href, title, sub, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-800/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-800 dark:text-brand-200">
              <Icon size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{title}</span>
              <span className="block truncate text-[11px] text-muted">{sub}</span>
            </span>
            <ChevronRight size={16} className="text-muted" />
          </Link>
        ))}
      </div>
    </section>
  );
}