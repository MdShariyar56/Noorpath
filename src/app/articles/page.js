import { Newspaper } from "lucide-react";
import ArticleBrowser from "@/components/articles/ArticleBrowser";
import { getArticles, getCategories } from "@/lib/api/articles";

export const metadata = { title: "Articles | NoorPath" };

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Newspaper /> Islamic Articles
          <span className="text-lg font-medium text-brand-100">· ইসলামিক আর্টিকেল</span>
        </h1>
        <p className="mt-1 text-sm text-brand-100">
          Read and learn about Islam
          <span className="block opacity-75">পড়ুন এবং ইসলাম সম্পর্কে জানুন</span>
        </p>
      </div>

      <ArticleBrowser articles={articles} categories={categories} />
    </div>
  );
}