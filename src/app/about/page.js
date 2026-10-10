import LegalPage from "@/components/legal/LegalPage";

export const metadata = { title: "About | NoorPath" };

const sections = [
  {
    h: ["What is NoorPath", "নূরপাথ কী"],
    p: [
      [
        "NoorPath is a free website that brings everyday Islamic information and tools into one place, in English and Bangla.",
        "নূরপাথ একটি বিনামূল্যের ওয়েবসাইট, যেখানে দৈনন্দিন ইসলামি তথ্য ও টুলস এক জায়গায় পাওয়া যায়, ইংরেজি ও বাংলায়।",
      ],
    ],
  },
  {
    h: ["What you will find here", "এখানে যা পাবেন"],
    list: [
      [
        "The Quran with Arabic text, Bangla and English translations, and audio recitation.",
        "আরবি লেখা, বাংলা ও ইংরেজি অনুবাদ এবং অডিও তিলাওয়াতসহ কুরআন।",
      ],
      [
        "Six major hadith collections: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i and Ibn Majah.",
        "ছয়টি প্রধান হাদিস গ্রন্থ: বুখারি, মুসলিম, আবু দাউদ, তিরমিজি, নাসাঈ ও ইবনে মাজাহ।",
      ],
      [
        "Duas and azkar by category, with transliteration, translation and audio.",
        "ক্যাটাগরি অনুযায়ী দুয়া ও আযকার, উচ্চারণ, অনুবাদ ও অডিওসহ।",
      ],
      [
        "Prayer times, a Qibla finder, a Hijri calendar and a zakat calculator.",
        "নামাজের সময়, কিবলা ফাইন্ডার, হিজরি ক্যালেন্ডার ও জাকাত ক্যালকুলেটর।",
      ],
      [
        "A Ramadan dashboard, a Hajj and Umrah guide, articles and basic Islamic knowledge.",
        "রমজান ড্যাশবোর্ড, হজ ও উমরা গাইড, আর্টিকেল এবং মৌলিক ইসলামি জ্ঞান।",
      ],
      [
        "Search across it all, and, with a free account, bookmarks and your last-read position in the Quran.",
        "সবকিছুতে সার্চ, আর বিনামূল্যের অ্যাকাউন্ট থাকলে বুকমার্ক ও কুরআনে শেষ পড়ার অবস্থান।",
      ],
    ],
  },
  {
    h: ["Where our content comes from", "আমাদের কন্টেন্টের উৎস"],
    p: [
      [
        "We build on public datasets and services, and we are grateful to the people who maintain them:",
        "আমরা উন্মুক্ত ডাটাসেট ও সেবার ওপর ভিত্তি করে কাজ করি, এবং যাঁরা এগুলো রক্ষণাবেক্ষণ করেন তাঁদের প্রতি কৃতজ্ঞ:",
      ],
    ],
    list: [
      [
        "Prayer times and Hijri dates: Aladhan.",
        "নামাজের সময় ও হিজরি তারিখ: Aladhan।",
      ],
      [
        "Quran text, translations and recitation audio: Al Quran Cloud.",
        "কুরআনের লেখা, অনুবাদ ও তিলাওয়াতের অডিও: Al Quran Cloud।",
      ],
      [
        "Hadith collections: the open hadith-api dataset by fawazahmed0, delivered through jsDelivr.",
        "হাদিস গ্রন্থ: fawazahmed0 এর উন্মুক্ত hadith-api ডাটাসেট, jsDelivr এর মাধ্যমে।",
      ],
      [
        "Dua data and audio: the open Masnun Dua dataset by IslamicAPI.",
        "দুয়ার তথ্য ও অডিও: IslamicAPI এর উন্মুক্ত Masnun Dua ডাটাসেট।",
      ],
      [
        "Our articles, knowledge pages and the Hajj, Ramadan and zakat guidance are written by us as general summaries.",
        "আমাদের আর্টিকেল, জ্ঞানের পেজ এবং হজ, রমজান ও জাকাতের নির্দেশনা আমরা নিজেরা সাধারণ সারসংক্ষেপ হিসেবে লিখেছি।",
      ],
    ],
  },
  {
    h: ["A note on accuracy", "নির্ভুলতা নিয়ে একটি কথা"],
    p: [
      [
        "We try hard to be accurate, but mistakes can happen, especially in translations and in material from third-party datasets. NoorPath is for learning and is not a source of fatwa. For rulings that apply to your situation, please ask a qualified scholar. If you spot an error, we would be glad to hear from you.",
        "আমরা নির্ভুল হওয়ার চেষ্টা করি, তবু ভুল হতে পারে, বিশেষ করে অনুবাদে এবং তৃতীয় পক্ষের ডাটাসেটের তথ্যে। নূরপাথ শেখার জন্য, এটি ফতোয়ার উৎস নয়। আপনার অবস্থার জন্য প্রযোজ্য বিধান যোগ্য আলেমের কাছ থেকে জেনে নিন। কোনো ভুল চোখে পড়লে আমাদের জানালে আমরা খুশি হব।",
      ],
    ],
  },
  {
    h: ["Free to use", "বিনামূল্যে ব্যবহারযোগ্য"],
    p: [
      [
        "NoorPath is free to use and does not show advertising.",
        "নূরপাথ বিনামূল্যে ব্যবহার করা যায় এবং এখানে কোনো বিজ্ঞাপন দেখানো হয় না।",
      ],
    ],
  },
];

export default function AboutPage() {
  return (
    <LegalPage
      title={["About NoorPath", "নূরপাথ সম্পর্কে"]}
      intro={[
        "Faith, knowledge and peace, all in one place.",
        "ঈমান, জ্ঞান ও প্রশান্তি, এক জায়গায়।",
      ]}
      sections={sections}
    />
  );
}