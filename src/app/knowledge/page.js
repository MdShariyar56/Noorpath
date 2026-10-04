import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { getTopics } from "@/lib/api/knowledge";

export const metadata = { title: "Islamic Knowledge | NoorPath" };

export default async function KnowledgePage() {
  const topics = await getTopics();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Lightbulb /> Islamic Knowledge
          <span className="text-lg font-medium text-brand-100">· ইসলামিক জ্ঞান</span>
        </h1>
        <p className="mt-1 text-sm text-brand-100">
          Learn the basics of Islam, step by step
          <span className="block opacity-75">ইসলামের মৌলিক বিষয়গুলো ধাপে ধাপে শিখুন</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {topics.map((t) => (
          <Link
            key={t.slug}
            href={`/knowledge/${t.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
          >
            <div
              className={`grid h-28 place-items-center bg-gradient-to-br text-5xl ${t.bg}`}
            >
              <span className="transition group-hover:scale-110">{t.icon}</span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="font-semibold">{t.title[0]}</h2>
              <p className="text-xs text-muted">{t.title[1]}</p>
              <p className="mt-2 text-sm text-foreground/75">{t.desc[0]}</p>
              <p className="text-sm text-foreground/60">{t.desc[1]}</p>
              <p className="mt-auto flex items-center justify-between pt-3 text-xs">
                <span className="text-muted">
                  {t.count} {t.kind === "glossary" ? "terms / শব্দ" : "items / বিষয়"}
                </span>
                <span className="font-semibold text-brand-600 dark:text-brand-300">
                  Start / শুরু করুন →
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-sm">
        <p className="mb-2 font-semibold">Keep learning / আরও শিখুন</p>
        <div className="flex flex-wrap gap-2">
          {[
            ["/articles", "Articles / আর্টিকেল"],
            ["/quran", "Quran / কুরআন"],
            ["/hadith", "Hadith / হাদিস"],
            ["/dua", "Dua / দুয়া"],
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