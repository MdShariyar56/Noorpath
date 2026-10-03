import Hero from "@/components/home/Hero";
import QuickAccess from "@/components/home/QuickAccess";

export default function Home() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
      {/* মূল কলাম */}
      <div className="min-w-0 space-y-6">
        <Hero />
        <QuickAccess />
        {/* পর্ব ২: Ayah/Hadith/Dua of the Day, Tasbih, Articles, Tools */}
      </div>

      {/* ডান সাইডবার (পর্ব ২ এ ভরব) */}
      <aside className="hidden space-y-6 xl:block" />
    </div>
  );
}