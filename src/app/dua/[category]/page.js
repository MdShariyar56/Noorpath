import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/api/dua";
import SavedDuas from "@/components/dua/SavedDuas";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const data = await getCategory(category);
  return { title: `${data ? data.category.nameEn || data.category.name : "Dua"} | NoorPath` };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const data = await getCategory(category);
  if (!data) notFound();

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <Link href="/dua" className="text-xs text-brand-100 hover:underline">
          ← All categories
        </Link>
        <h1 className="mt-2 text-xl font-bold">{data.category.nameEn}</h1>
        <p className="text-md text-brand-100">
          {data.category.name}
        </p>
      </div>
                <SavedDuas category={category} />
      <div className="grid gap-3 sm:grid-cols-2">
        {data.subs.map((s) => (
          <Link
            key={s.id}
            href={`/dua/${category}/${s.id}`}
            className="rounded-2xl border border-border bg-card p-4 transition hover:border-brand-300 hover:shadow-md"
          >
                        <span className="line-clamp-2 text-sm font-semibold">{s.titleEn}</span>
            {s.title && (
              <span className="mt-0.5 line-clamp-1 block text-[11px] text-muted">
                {s.title}
              </span>
            )}
            <span className="mt-1 block text-xs text-brand-600 dark:text-brand-300">
              {s.count} duas
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}