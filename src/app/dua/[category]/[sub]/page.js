import Link from "next/link";
import { notFound } from "next/navigation";
import DuaList from "@/components/dua/DuaList";
import { getSubCategory } from "@/lib/api/dua";

export async function generateMetadata({ params }) {
  const { sub } = await params;
  const data = await getSubCategory(sub);
  return { title: `${data ? data.sub.titleEn || data.sub.title : "Dua"} | NoorPath` };
}

export default async function SubCategoryPage({ params }) {
  const { category, sub } = await params;
  const data = await getSubCategory(sub);
  if (!data || data.sub.category !== category) notFound();

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <Link
          href={`/dua/${category}`}
          className="text-xs text-brand-100 hover:underline"
        >
           ← {data.category?.name}
          {data.category?.nameEn && ` / ${data.category.nameEn}`}
        </Link>
            <h1 className="mt-2 text-xl font-bold">{data.sub.title}</h1>
        {data.sub.titleEn && (
          <p className="text-sm text-brand-100">{data.sub.titleEn}</p>
        )}
        <p className="mt-1 text-xs text-brand-200">{data.duas.length} duas</p>
      </div>

      <DuaList duas={data.duas} />
    </div>
  );
}