import Link from "next/link";
import { getArticles, getCategories } from "@/lib/api/articles";
import { fmtDate } from "@/lib/date";
import Image from "next/image";

export default async function FeaturedArticles() {
  const [all, categories] = await Promise.all([getArticles(), getCategories()]);
  const articles = all.slice(0, 4);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Featured Articles</h2>
        <Link
          href="/articles"
          className="text-xs font-semibold text-brand-600 dark:text-brand-300"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {articles.map((a) => {
          const cat = categories.find((c) => c.id === a.cat);
          return (
            <Link
  key={a.slug}
  href={`/articles/${a.slug}`}
  className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
>
  <div className="relative h-32 overflow-hidden">
    <Image
  src={a.icon}
  alt={a.title[0]}
  width={400}
  height={200}
  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
/>

    <span className="absolute bottom-2 left-3 rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
      {cat?.en}
    </span>
  </div>

  <div className="p-3">
    <h3 className="line-clamp-2 text-sm font-semibold">
      {a.title[0]}
    </h3>

    <p className="mt-1 text-[11px] text-muted">
      {fmtDate(a.date)}
    </p>

    <p className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-300">
      Read More →
    </p>
  </div>
</Link>
          );
        })}
      </div>
    </section>
  );
}