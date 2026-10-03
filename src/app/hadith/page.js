import Link from "next/link";
import { BookText } from "lucide-react";
import { BOOKS } from "@/lib/api/hadith";
import index from "@/data/hadith-sections.json";

export const metadata = { title: "Hadith | NoorPath" };

export default function HadithPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <BookText className="text-brand-600 dark:text-brand-300" /> Hadith Library
        </h1>
        <p className="mt-1 text-sm text-muted">
          Six major collections · Arabic, Bangla and English
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {BOOKS.map((b) => {
          const meta = index[b.id];
          return (
            <Link
              key={b.id}
              href={`/hadith/${b.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
            >
              <div
                className={`grid h-28 place-items-center bg-gradient-to-br ${b.bg}`}
              >
                <span className="font-arabic text-3xl text-white transition group-hover:scale-105">
                  {b.arabic}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-bold">{b.name}</h2>
                <p className="text-sm text-muted">{b.bn}</p>
                {meta && (
                  <p className="mt-2 text-xs text-muted">
                    {meta.sections.length} chapters · {meta.lastHadith.toLocaleString()} hadiths
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}