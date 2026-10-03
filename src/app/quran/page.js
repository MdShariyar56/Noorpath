import { BookOpen } from "lucide-react";
import SurahList from "@/components/quran/SurahList";
import { getSurahList } from "@/lib/api/quran";

export const metadata = { title: "Quran | NoorPath" };

export default async function QuranPage() {
  let surahs;
  try {
    surahs = await getSurahList();
  } catch {
    return (
      <p className="rounded-2xl border border-border bg-card p-6 text-red-500">
        Could not load the Quran right now. Please try again later.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <BookOpen className="text-brand-600 dark:text-brand-300" /> Holy Quran
        </h1>
        <p className="mt-1 text-sm text-muted">114 Surahs · Read and listen</p>
      </div>
      <SurahList surahs={surahs} />
    </div>
  );
}