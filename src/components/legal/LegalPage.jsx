import { SITE } from "@/data/site";

// t = ["English", "বাংলা"]
function Bi({ t }) {
  return (
    <>
      <span>{t[0]}</span>
      <span className="block text-[0.95em] opacity-75">{t[1]}</span>
    </>
  );
}

export default function LegalPage({ title, intro, sections }) {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="text-2xl font-bold">{title[0]}</h1>
        <p className="text-brand-100">{title[1]}</p>
        <p className="mt-3 text-xs text-brand-200">
          Last updated: {SITE.updated} / সর্বশেষ হালনাগাদ: {SITE.updated}
        </p>
      </div>

      {process.env.NODE_ENV !== "production" && !SITE.contactEmail && (
        <p className="rounded-xl border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          Developer note: set <code>contactEmail</code> in <code>src/data/site.js</code>{" "}
          before launch. (This note is hidden on the live site.)
        </p>
      )}

      {intro && (
        <p className="text-sm leading-relaxed">
          <Bi t={intro} />
        </p>
      )}

      {sections.map((s, i) => (
        <section key={i} className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold">
            {i + 1}. {s.h[0]}{" "}
            <span className="font-medium text-muted">/ {s.h[1]}</span>
          </h2>

          {s.p?.map((p, j) => (
            <p key={j} className="mt-3 text-sm leading-relaxed">
              <Bi t={p} />
            </p>
          ))}

          {s.list && (
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed">
              {s.list.map((t, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  <span>
                    <Bi t={t} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-bold">
          Contact <span className="font-medium text-muted">/ যোগাযোগ</span>
        </h2>
        <p className="mt-3 text-sm">
          {SITE.contactEmail ? (
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="font-semibold text-brand-600 hover:underline dark:text-brand-300"
            >
              {SITE.contactEmail}
            </a>
          ) : (
            <span className="text-muted">—</span>
          )}
        </p>
      </section>
    </div>
  );
}