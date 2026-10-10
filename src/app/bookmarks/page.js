import { Bookmark } from "lucide-react";
import BookmarksList from "@/components/bookmarks/BookmarksList";
import { getSurahList } from "@/lib/api/quran";

export const metadata = { title: "My Bookmarks | NoorPath" };

export default async function BookmarksPage() {
  let surahs = [];
  try {
    surahs = await getSurahList();
  } catch {}

  // ব্রাউজারে শুধু দরকারি ঘরগুলো পাঠাই
  const lite = surahs.map((s) => ({
    number: s.number,
    englishName: s.englishName,
    name: s.name,
  }));

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Bookmark /> My Bookmarks
          <span className="text-lg font-medium text-brand-100">· আমার বুকমার্ক</span>
        </h1>
        <p className="mt-1 text-sm text-brand-100">
          Your saved Quran verses
          <span className="block opacity-75">আপনার সংরক্ষিত কুরআনের আয়াত</span>
        </p>
      </div>

      <BookmarksList surahs={lite} />
    </div>
  );
}