import Link from "next/link";

const articles = [
  {
    tag: "Salah",
    title: "The Importance of Salah in Islam",
    date: "Apr 20, 2025",
    icon: "🕌",
    bg: "from-brand-800 to-brand-500",
  },
  {
    tag: "Ramadan",
    title: "Ramadan: A Month of Blessings",
    date: "Apr 18, 2025",
    icon: "🌙",
    bg: "from-indigo-900 to-amber-600",
  },
  {
    tag: "Hajj",
    title: "Hajj: The Journey of Faith",
    date: "Apr 15, 2025",
    icon: "🕋",
    bg: "from-slate-800 to-sky-500",
  },
  {
    tag: "Islamic Knowledge",
    title: "The Life of Prophet Muhammad (PBUH)",
    date: "Apr 12, 2025",
    icon: "📚",
    bg: "from-emerald-900 to-amber-500",
  },
];

export default function FeaturedArticles() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Featured Articles</h2>
        <Link href="/articles" className="text-xs font-semibold text-brand-600 dark:text-brand-300">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {articles.map((a) => (
          <Link
            key={a.title}
            href="/articles"
            className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
          >
            <div
              className={`relative grid h-32 place-items-center bg-gradient-to-br text-5xl ${a.bg}`}
            >
              <span className="transition group-hover:scale-110">{a.icon}</span>
              <span className="absolute bottom-2 left-3 rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
                {a.tag}
              </span>
            </div>
            <div className="p-3">
              <h3 className="line-clamp-2 text-sm font-semibold">{a.title}</h3>
              <p className="mt-1 text-[11px] text-muted">{a.date}</p>
              <p className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-300">
                Read More →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}