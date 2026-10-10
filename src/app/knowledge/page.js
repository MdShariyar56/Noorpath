import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { getTopics } from "@/lib/api/knowledge";

export const metadata = { title: "Islamic Knowledge | NoorPath" };

export default async function KnowledgePage() {
  const topics = await getTopics();

  return (
    <div className="space-y-6">
      <div className=" rounded-2xl flex items-center gap-4 text-2xl  bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4 text-white">
        <img
          src="https://imglink.cc/cdn/61_khtSBzN.png"
          alt="Hajj Umrah Logo"
          className="h-17 w-17 border-2 rounded-full bg-brand-700 object-cover"
        />
        <div className="">
          <p className="font-bold text-2xl">Islamic Knowledge</p>
          <p className="mt-1 text-sm text-brand-100 flex items-center gap-2">
            Learn the basics of Islam, step by step
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {topics.map((t) => (
          <Link
            key={t.slug}
            href={`/knowledge/${t.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={t.icon}
                alt={t.title[0]}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {/* Category Badge */}
              <div className="absolute bottom-2 left-3 rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
                <span>{t.kind === "glossary" ? "Glossary" : "Learning"}</span>
              </div>

              {/* Count */}
              <div className="absolute bottom-3 right-3">
                <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-md">
                  {t.count} {t.kind === "glossary" ? "terms" : "items"}
                </span>
              </div>
            </div>

            {/* Content */}

            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 text-sm font-semibold">
                {t.title[0]}
              </h3>

              <p className="mt-2 line-clamp-2 text-xs text-foreground/70">
                {t.desc[0]}
              </p>

              <p className="mt-3 text-[11px] text-muted">
                <span className="text-xs font-medium text-muted">
                  {t.count} {t.kind === "glossary" ? "terms" : "items"}
                </span>
              </p>

              <p className="mt-auto pt-3 text-xs font-semibold text-brand-600 dark:text-brand-300">
                Read More →
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-sm">
        <p className="mb-2 font-semibold">Keep learning</p>
        <div className="flex flex-wrap gap-2">
          {[
            ["/articles", "Articles"],
            ["/quran", "Quran"],
            ["/hadith", "Hadith"],
            ["/dua", "Dua"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-border px-4 py-1.5 hover:border-brand-300"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
