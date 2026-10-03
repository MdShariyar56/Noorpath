import { notFound } from "next/navigation";
import SurahReader from "@/components/quran/SurahReader";
import { getSurah } from "@/lib/api/quran";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `Surah ${id} | NoorPath` };
}

export default async function SurahPage({ params }) {
  const { id } = await params;
  const n = Number(id);
  if (!Number.isInteger(n) || n < 1 || n > 114) notFound();

  let surah;
  try {
    surah = await getSurah(n);
  } catch {
    return (
      <p className="rounded-2xl border border-border bg-card p-6 text-red-500">
        Could not load this surah right now. Please try again later.
      </p>
    );
  }

  return <SurahReader surah={surah} />;
}