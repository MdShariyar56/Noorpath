import Link from "next/link";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* ব্র্যান্ড প্যানেল (বড় স্ক্রিনে) */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-400/20 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-2xl">
            🕌
          </span>
          <span className="leading-tight">
            <span className="block text-2xl font-bold">NoorPath</span>
            <span className="block text-xs text-brand-100">
              Faith · Knowledge · Peace
            </span>
          </span>
        </Link>

        <figure className="relative">
          <p dir="rtl" className="font-arabic text-4xl leading-[1.9]">
            أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
          </p>
          <blockquote className="mt-4 text-lg text-brand-50">
            Verily, in the remembrance of Allah do hearts find rest.
            <span className="mt-1 block text-base opacity-80">
              জেনে রাখো, আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি লাভ করে।
            </span>
          </blockquote>
          <figcaption className="mt-3 text-sm text-gold-400">Quran 13:28</figcaption>
        </figure>

        <p className="relative text-xs text-brand-200">
          © {new Date().getFullYear()} NoorPath
        </p>
      </aside>

      {/* ফর্ম */}
      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-lg text-white">
                🕌
              </span>
              <span className="font-bold text-brand-600 dark:text-brand-300">
                NoorPath
              </span>
            </Link>
            <Link
              href="/"
              className="ml-auto text-xs font-medium text-muted hover:text-foreground"
            >
              ← Back to home / হোমে ফিরুন
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold">{title[0]}</h1>
            <p className="text-sm text-muted">{title[1]}</p>
            <p className="mt-2 text-sm text-foreground/75">
              {subtitle[0]}
              <span className="block opacity-75">{subtitle[1]}</span>
            </p>

            <div className="mt-6">{children}</div>
          </div>

          {footer && (
            <p className="mt-5 text-center text-sm text-muted">{footer}</p>
          )}
        </div>
      </main>
    </div>
  );
}