import Link from "next/link";
import { notFound } from "next/navigation";
import Glossary from "@/components/knowledge/Glossary";
import TopicSections from "@/components/knowledge/TopicSections";
import { getGlossary, getTopic, getTopics } from "@/lib/api/knowledge";

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const t = await getTopic(topic);
  return { title: `${t ? t.title[0] : "Knowledge"} | NoorPath` };
}

export default async function TopicPage({ params }) {
  const { topic: slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) notFound();

  const [all, glossary] = await Promise.all([
    getTopics(),
    topic.kind === "glossary" ? getGlossary() : Promise.resolve(null),
  ]);
  const others = all.filter((t) => t.slug !== slug);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div
        className={`rounded-2xl bg-gradient-to-br p-6 text-white md:p-8 ${topic.bg}`}
      >
        <Link href="/knowledge" className="text-xs text-white/80 hover:underline">
          ← Islamic Knowledge / ইসলামিক জ্ঞান
        </Link>
        <p className="mt-4 text-5xl">{topic.icon}</p>
        <h1 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
          {topic.title[0]}
        </h1>
        <p className="mt-1 text-lg text-white/85">{topic.title[1]}</p>
        <p className="mt-4 text-sm text-white/90">{topic.intro[0]}</p>
        <p className="mt-1 text-sm text-white/75">{topic.intro[1]}</p>
      </div>

      {glossary ? (
        <Glossary terms={glossary} />
      ) : (
        <TopicSections sections={topic.sections} />
      )}

      {topic.refs?.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-2 font-bold">Sources / সূত্র</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/80">
            {topic.refs.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
        <p className="mb-1 font-semibold">Please note / জেনে রাখুন</p>
        <p>
          This is a general educational summary. For rulings on your specific
          situation, please consult a qualified scholar.
          <span className="block opacity-75">
            এটি একটি সাধারণ শিক্ষামূলক সারসংক্ষেপ। আপনার নির্দিষ্ট অবস্থার বিধানের জন্য
            একজন যোগ্য আলেমের পরামর্শ নিন।
          </span>
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-bold">More topics / আরও টপিক</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((t) => (
            <Link
              key={t.slug}
              href={`/knowledge/${t.slug}`}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-center text-sm leading-tight hover:border-brand-300"
            >
              {t.icon} {t.title[0]}
              <span className="block text-[11px] text-muted">{t.title[1]}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}