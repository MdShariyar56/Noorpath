import { notFound } from "next/navigation";
import HadithReader from "@/components/hadith/HadithReader";
import { getBook, getSection } from "@/lib/api/hadith";
import index from "@/data/hadith-sections.json";

export async function generateMetadata({ params }) {
  const { book, section } = await params;
  const b = getBook(book);
  return { title: `${b ? b.name : "Hadith"}, Chapter ${section} | NoorPath` };
}

export default async function SectionPage({ params }) {
  const { book, section } = await params;
  const b = getBook(book);
  const meta = index[book];
  if (!b || !meta) notFound();

  const i = meta.sections.findIndex((s) => s.id === section);
  if (i === -1) notFound();

  let hadiths;
  try {
    hadiths = await getSection(book, section);
  } catch {
    return (
      <p className="rounded-2xl border border-border bg-card p-6 text-red-500">
        Could not load this chapter right now. Please try again later.
      </p>
    );
  }

  return (
    <HadithReader
      book={b}
      section={meta.sections[i]}
      hadiths={hadiths}
      prev={meta.sections[i - 1]?.id ?? null}
      next={meta.sections[i + 1]?.id ?? null}
    />
  );
}