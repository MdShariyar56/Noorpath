import { Newspaper } from "lucide-react";
import ArticleBrowser from "@/components/articles/ArticleBrowser";
import { getArticles, getCategories } from "@/lib/api/articles";
import Image from "next/image";

export const metadata = { title: "Articles | NoorPath" };

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return (
    <div className="space-y-5">
      <div className=" rounded-2xl flex items-center gap-4 text-2xl  bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4 text-white">
        <Image
          src="https://imglink.cc/cdn/EbF87lRR_m.jpg"
          alt="Hajj Umrah Logo"
          width={68}
          height={68}
          loading="lazy"
          className="h-17 w-17 rounded-full border-2 bg-brand-700 object-cover"
        />
        <div className="">
          <p className="font-bold text-2xl">Islamic Articles</p>
          <p className="mt-1 text-sm text-brand-100 flex items-center gap-2">
            Read and learn about Islam
          </p>
        </div>
      </div>

      <ArticleBrowser articles={articles} categories={categories} />
    </div>
  );
}
