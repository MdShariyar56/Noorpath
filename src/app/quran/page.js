import SurahList from "@/components/quran/SurahList";
import { getSurahList } from "@/lib/api/quran";
import ContinueReading from "@/components/quran/ContinueReading";
import Image from "next/image";

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
    <div className="space-y-5 ">
      <div className=" rounded-2xl flex items-center gap-4 text-2xl  bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4 text-white">
        <Image
          src="https://imglink.cc/cdn/BfO0OtjkG9.jpg"
          alt="Holy Quran Logo"
          width={60}
          height={60}
          loading="lazy"
          className="h-15 w-15 rounded-full border-2 object-cover"
        />
        <div className="">
          <p className="font-bold text-2xl">Holy Quran</p>
          <p className="mt-1 text-sm text-brand-100 ">
            114 Surahs · Read and listen
          </p>
        </div>
      </div>
      <ContinueReading
        surahs={surahs.map((s) => ({
          number: s.number,
          englishName: s.englishName,
          name: s.name,
        }))}
      />
      <SurahList surahs={surahs} />
    </div>
  );
}
