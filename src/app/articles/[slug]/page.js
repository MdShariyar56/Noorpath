import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import ArticleBody from "@/components/articles/ArticleBody";
import ArticleCard from "@/components/articles/ArticleCard";
import { getArticle, getCategories, getRelated } from "@/lib/api/articles";
import { fmtDate } from "@/lib/date";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await getArticle(slug);

  return {
    title: `${a ? a.title[0] : "Article"} | NoorPath`,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) notFound();

  const [categories, related] = await Promise.all([
    getCategories(),
    getRelated(slug, 3),
  ]);

  const cat = categories.find((c) => c.id === article.cat);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Article Header */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Header Image */}
        <img
          src={article.icon}
          alt={article.title[0]}
          className="h-64 w-full object-cover md:h-80"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Header Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white md:p-8">
          <Link
            href="/articles"
            className="absolute left-6 top-6 text-xs text-white/80 hover:underline md:left-8 md:top-8"
          >
            ← All articles 
          </Link>

          {cat && (
            <span className="mb-3 w-fit rounded-full bg-black/30 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {cat.en} · {cat.bn}
            </span>
          )}

          <h1 className="text-2xl font-bold leading-tight md:text-3xl">
            {article.title[0]}
          </h1>

          <p className="mt-1 text-lg text-white/85">
            {article.title[1]}
          </p>

          <p className="mt-3 text-xs text-white/75">
            {fmtDate(article.date)} · {article.minutes} min read /{" "}
            {article.minutes} মিনিট
          </p>
        </div>
      </div>

      {/* Article Body */}
      <ArticleBody body={article.body} />

      {/* CTA */}
      {article.cta && (
        <Link
          href={article.cta.href}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          <span>
            {article.cta.label[0]}
            <span className="block text-[11px] opacity-80">
              {article.cta.label[1]}
            </span>
          </span>

          <ArrowRight size={16} />
        </Link>
      )}

      {/* Sources */}
      {article.refs?.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-2 font-bold">Sources / সূত্র</h2>

          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/80">
            {article.refs.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
        <p className="mb-1 font-semibold">Please note / জেনে রাখুন</p>

        <p>
          This article is a general educational summary. For rulings on your
          specific situation, please consult a qualified scholar.

          
        </p>
      </div>

      {/* Related Articles */}
      <section>
        <h2 className="mb-3 text-lg font-bold">
          More to read 
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <ArticleCard
              key={a.slug}
              a={a}
              categories={categories}
            />
          ))}
        </div>
      </section>
    </div>
  );
}