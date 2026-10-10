import { HandHeart } from "lucide-react";
import CategoryGrid from "@/components/dua/CategoryGrid";
import { getCategories } from "@/lib/api/dua";
import Image from "next/image";
import SavedDuas from "@/components/dua/SavedDuas";

export const metadata = { title: "Dua & Azkar | NoorPath" };

export default async function DuaPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-5">
      <div className=" rounded-2xl flex items-center gap-4 text-2xl  bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4 text-white">
        <Image
          src="https://imglink.cc/cdn/miBs81bvXT.jpg"
          alt="Dua Logo"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="">
          <p className="font-bold text-2xl">Dua & Azkar</p>
          <p className="mt-1 text-sm text-brand-100 ">
            {categories.length} categories · Quran and authentic Hadith
          </p>
        </div>
      </div>
              <SavedDuas />
      <CategoryGrid categories={categories} />
    </div>
  );
}
