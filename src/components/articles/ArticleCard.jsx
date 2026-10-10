import Link from "next/link";
import { fmtDate } from "@/lib/date";
import Image from "next/image";

export default function ArticleCard({ a, categories }) {
  const cat = categories.find((c) => c.id === a.cat);

  return (
    <Link
      href={`/articles/${a.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
    >
      {/* Article Image */}
      <div className="relative h-36 overflow-hidden">
        <Image
          src={a.icon}
          alt={a.title[0]}
          width={400}
          height={200}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Category */}
        {cat && (
          <span className="absolute bottom-2 left-3 rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
            {cat.en}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold">{a.title[0]}</h3>

        <p className="mt-2 line-clamp-2 text-xs text-foreground/70">
          {a.excerpt[0]}
        </p>

        <p className="mt-3 text-[11px] text-muted">
          {fmtDate(a.date)} · {a.minutes} min read.
        </p>

        <p className="mt-auto pt-3 text-xs font-semibold text-brand-600 dark:text-brand-300">
          Read More →
        </p>
      </div>
    </Link>
  );
}
