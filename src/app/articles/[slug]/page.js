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
  return { title: `${a ? a.title[0] : "Article"} | NoorPath` };
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
      <div
        className={`rounded-2xl bg-gradient-to-br p-6 text-white md:p-8 ${article.bg}`}
      >
        <Link href="/articles" className="text-xs text-white/80 hover:underline">
          ← All articles / সব আর্টিকেল
        </Link>
        <p className="mt-4 text-5xl">{article.icon}</p>
        {cat && (
          <span className="mt-3 inline-block rounded-full bg-black/25 px-3 py-0.5 text-xs font-medium">
            {cat.en} · {cat.bn}
          </span>
        )}
        <h1 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
          {article.title[0]}
        </h1>
        <p className="mt-1 text-lg text-white/85">{article.title[1]}</p>
        <p className="mt-3 text-xs text-white/75">
          {fmtDate(article.date)} · {article.minutes} min read /{" "}
          {article.minutes} মিনিট
        </p>
      </div>

      <ArticleBody body={article.body} />

      {article.cta && (
        <Link
          href={article.cta.href}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
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

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
        <p className="mb-1 font-semibold">Please note / জেনে রাখুন</p>
        <p>
          This article is a general educational summary. For rulings on your
          specific situation, please consult a qualified scholar.
          <span className="block opacity-75">
            এই আর্টিকেল একটি সাধারণ শিক্ষামূলক সারসংক্ষেপ। আপনার নির্দিষ্ট অবস্থার
            বিধানের জন্য একজন যোগ্য আলেমের পরামর্শ নিন।
          </span>
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-bold">More to read / আরও পড়ুন</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.slug} a={a} categories={categories} />
          ))}
        </div>
      </section>
    </div>
  );
}