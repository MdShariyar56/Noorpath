import Link from "next/link";
import { notFound } from "next/navigation";
import SectionList from "@/components/hadith/SectionList";
import { getBook } from "@/lib/api/hadith";
import index from "@/data/hadith-sections.json";

export async function generateMetadata({ params }) {
  const { book } = await params;
  const b = getBook(book);
  return { title: `${b ? b.name : "Hadith"} | NoorPath` };
}

export default async function BookPage({ params }) {
  const { book } = await params;
  const b = getBook(book);
  const meta = index[book];
  if (!b || !meta) notFound();

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <Link href="/hadith" className="text-xs text-brand-100 hover:underline">
          ← All books
        </Link>
        <p className="font-arabic mt-2 text-3xl">{b.arabic}</p>
        <h1 className="mt-1 text-xl font-bold">{b.name}</h1>
        <p className="text-sm text-brand-100">
          {b.bn} · {meta.sections.length} chapters
        </p>
      </div>

      <SectionList bookId={b.id} sections={meta.sections} />
    </div>
  );
}