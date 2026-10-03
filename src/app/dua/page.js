import { HandHeart } from "lucide-react";
import CategoryGrid from "@/components/dua/CategoryGrid";
import { getCategories } from "@/lib/api/dua";

export const metadata = { title: "Dua & Azkar | NoorPath" };

export default async function DuaPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <HandHeart /> Dua & Azkar
        </h1>
        <p className="mt-1 text-sm text-brand-100">
          {categories.length} categories · Quran and authentic Hadith
        </p>
      </div>

      <CategoryGrid categories={categories} />
    </div>
  );
}