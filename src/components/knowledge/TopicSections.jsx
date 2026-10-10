import Link from "next/link";
import { ArrowRight } from "lucide-react";

// t = ["English", "বাংলা"]
function Bi({ t }) {
  return (
    <>
      <span>{t[0]}</span>
      <span className="block text-[0.92em] opacity-75">{t[1]}</span>
    </>
  );
}

function Item({ it, n }) {
  return (
    <li className="rounded-2xl border border-border bg-card p-4">
      <div className="flex gap-3">
        {n && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
            {n}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">
            <Bi t={it.title} />
          </h3>

          {it.text && (
            <p className="mt-1.5 text-sm text-foreground/80">
              <Bi t={it.text} />
            </p>
          )}

          {it.ar && (
            <p dir="rtl" className="font-arabic mt-3 text-right text-2xl leading-[2.2]">
              {it.ar}
            </p>
          )}
          {it.tr && (
            <p className="mt-1 text-sm italic text-brand-600 dark:text-brand-300">
              {it.tr}
            </p>
          )}

          {it.href && (
            <Link
              href={it.href}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300"
            >
              {it.cta[0]}  <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export default function TopicSections({ sections }) {
  return (
    <div className="space-y-8">
      {sections.map((s, i) => (
        <section key={i}>
          {(s.heading || s.note) && (
            <div className="mb-3">
              {s.heading && (
                <h2 className="text-lg font-bold">
                  {s.heading[0]}{" "}
                  <span className="font-medium text-muted">/ {s.heading[1]}</span>
                </h2>
              )}
              {s.note && (
                <p className="mt-1 text-xs text-muted">
                  <Bi t={s.note} />
                </p>
              )}
            </div>
          )}

          {s.variant === "chips" ? (
            <div className="flex flex-wrap gap-2">
              {s.items.map((it) => (
                <span
                  key={it.title[0]}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-center text-sm"
                >
                  <span className="font-medium">{it.title[0]}</span>
                  <span className="block text-[11px] text-muted">{it.title[1]}</span>
                </span>
              ))}
            </div>
          ) : s.variant === "steps" ? (
            <ol className="space-y-3">
              {s.items.map((it, n) => (
                <Item key={it.title[0]} it={it} n={n + 1} />
              ))}
            </ol>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.items.map((it) => (
                <Item key={it.title[0]} it={it} />
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}