import Link from "next/link";
import { notFound } from "next/navigation";
import Glossary from "@/components/knowledge/Glossary";
import TopicSections from "@/components/knowledge/TopicSections";
import { getGlossary, getTopic, getTopics } from "@/lib/api/knowledge";
import Image from "next/image";

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
        className="relative overflow-hidden rounded-2xl bg-cover bg-center p-6 text-white shadow-sm md:p-8"
        style={{
          backgroundImage: `linear-gradient(
      90deg,
      rgba(7, 42, 33, 0.95),
      rgba(7, 42, 33, 0.75),
      rgba(7, 42, 33, 0.35)
    ), url(${topic.icon})`,
        }}
      >
        <div className="relative">
          {/* Back Link */}
          <Link
            href="/knowledge"
            className="inline-flex items-center text-xs font-medium text-white/80 transition hover:text-white"
          >
            ← Islamic Knowledge
          </Link>

          {/* Content */}
          <div className="mt-6 max-w-2xl">
            <h1 className="text-2xl font-bold leading-tight md:text-3xl">
              {topic.title[0]}
            </h1>

            <p className="mt-1 text-lg font-medium text-white/85">
              {topic.title[1]}
            </p>

            <div className="mt-4 space-y-1">
              <p className="text-sm leading-6 text-white/90">
                {topic.intro[0]}
              </p>

              <p className="text-sm leading-6 text-white/70">
                {topic.intro[1]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {glossary ? (
        <Glossary terms={glossary} />
      ) : (
        <TopicSections sections={topic.sections} />
      )}

      {topic.refs?.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-2 font-bold">Sources </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/80">
            {topic.refs.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
        <p className="mb-1 font-semibold">Please note</p>
        <p>
          This is a general educational summary. For rulings on your specific
          situation, please consult a qualified scholar.
          <span className="block opacity-75">
            এটি একটি সাধারণ শিক্ষামূলক সারসংক্ষেপ। আপনার নির্দিষ্ট অবস্থার
            বিধানের জন্য একজন যোগ্য আলেমের পরামর্শ নিন।
          </span>
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-bold">More topics</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((t) => (
            <Link
              key={t.slug}
              href={`/knowledge/${t.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors duration-300 hover:border-brand-300"
            >
              {/* Topic Image */}
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={t.icon}
                  alt={t.title[0]}
                  width={400}
                  height={200}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Topic Info */}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {t.title[0]}
                </p>

                <span className="mt-0.5 block truncate text-[11px] text-muted">
                  {t.title[1]}
                </span>
              </div>

              {/* Arrow */}
              <span className="ml-auto shrink-0 text-sm text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-600 dark:group-hover:text-brand-300">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
