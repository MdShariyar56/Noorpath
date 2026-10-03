import Hero from "@/components/home/Hero";
import QuickAccess from "@/components/home/QuickAccess";
import DailyCards from "@/components/home/DailyCards";
import QuickTasbih from "@/components/home/QuickTasbih";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import IslamicTools from "@/components/home/IslamicTools";
import RightSidebar from "@/components/home/RightSidebar";

export default function Home() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
      <div className="min-w-0 space-y-6">
        <Hero />
        <QuickAccess />

        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          <DailyCards />
          <QuickTasbih />
        </section>

        <FeaturedArticles />
        <IslamicTools />
      </div>

      <RightSidebar />
    </div>
  );
}