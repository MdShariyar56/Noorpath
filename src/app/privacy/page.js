import LegalPage from "@/components/legal/LegalPage";

export const metadata = { title: "Privacy Policy | NoorPath" };

const sections = [
  {
    h: ["Information we collect", "আমরা যে তথ্য সংগ্রহ করি"],
    p: [
      [
        "You can use most of NoorPath without an account, and we do not ask for personal information for that. If you create an account, we store:",
        "অ্যাকাউন্ট ছাড়াই নূরপাথের বেশিরভাগ অংশ ব্যবহার করা যায়, তার জন্য আমরা ব্যক্তিগত তথ্য চাই না। অ্যাকাউন্ট খুললে আমরা সংরক্ষণ করি:",
      ],
    ],
    list: [
      ["Your name and email address.", "আপনার নাম ও ইমেইল ঠিকানা।"],
      [
        "Your password, only as a one-way scrambled value (a hash), never as readable text.",
        "আপনার পাসওয়ার্ড, শুধু একমুখী এলোমেলো মান (হ্যাশ) হিসেবে, পড়ার মতো লেখা হিসেবে নয়।",
      ],
      [
        "Your bookmarks (Quran verses, hadiths and duas you save) and your last-read position in the Quran.",
        "আপনার বুকমার্ক (সংরক্ষিত কুরআনের আয়াত, হাদিস ও দুয়া) এবং কুরআনে শেষ পড়ার অবস্থান।",
      ],
      ["The date your account was created.", "অ্যাকাউন্ট খোলার তারিখ।"],
      [
        "Like most websites, our hosting provider may record technical information such as your IP address in server logs.",
        "বেশিরভাগ ওয়েবসাইটের মতো, আমাদের হোস্টিং সেবাদাতা সার্ভার লগে আপনার আইপি ঠিকানার মতো প্রযুক্তিগত তথ্য রেকর্ড করতে পারে।",
      ],
    ],
  },
  {
    h: ["How we use your information", "আপনার তথ্য কীভাবে ব্যবহার করি"],
    list: [
      [
        "To let you log in and stay signed in.",
        "আপনাকে লগইন করতে দেওয়া এবং লগইন অবস্থায় রাখা।",
      ],
      [
        "To save and show your bookmarks and reading position.",
        "আপনার বুকমার্ক ও পড়ার অবস্থান সংরক্ষণ করা ও দেখানো।",
      ],
      [
        "To protect the site from abuse, for example by limiting repeated login attempts.",
        "সাইটকে অপব্যবহার থেকে রক্ষা করা, যেমন বারবার লগইন চেষ্টা সীমিত করা।",
      ],
      [
        "Site administrators can view basic account information (name, email, join date, bookmark count and last-read position) to manage the site.",
        "সাইট পরিচালনার জন্য প্রশাসকরা অ্যাকাউন্টের মৌলিক তথ্য (নাম, ইমেইল, যোগদানের তারিখ, বুকমার্কের সংখ্যা ও শেষ পড়ার অবস্থান) দেখতে পারেন।",
      ],
      [
        "We do not use your information for advertising.",
        "আমরা আপনার তথ্য বিজ্ঞাপনের জন্য ব্যবহার করি না।",
      ],
    ],
  },
  {
    h: ["Cookies and storage on your device", "কুকি ও আপনার ডিভাইসে সংরক্ষণ"],
    list: [
      [
        "A login cookie keeps you signed in. It is HttpOnly, which means scripts on the page cannot read it. It lasts up to 7 days, or until you close the browser if you did not choose “Remember me”.",
        "একটি লগইন কুকি আপনাকে লগইন অবস্থায় রাখে। এটি HttpOnly, অর্থাৎ পেজের স্ক্রিপ্ট এটি পড়তে পারে না। এটি সর্বোচ্চ ৭ দিন থাকে, অথবা “Remember me” না বেছে নিলে ব্রাউজার বন্ধ করলেই চলে যায়।",
      ],
      [
        "Your device stores some preferences and progress locally: light or dark theme, cached prayer times, the Hijri date adjustment, Ramadan trackers and the Hajj checklist. This stays on your device and is not sent to us.",
        "আপনার ডিভাইসে কিছু পছন্দ ও অগ্রগতি স্থানীয়ভাবে জমা থাকে: হালকা বা গাঢ় থিম, ক্যাশ করা নামাজের সময়, হিজরি তারিখের সমন্বয়, রমজান ট্র্যাকার ও হজের চেকলিস্ট। এগুলো আপনার ডিভাইসেই থাকে, আমাদের কাছে পাঠানো হয় না।",
      ],
      [
        "We do not currently use advertising or analytics cookies.",
        "আমরা বর্তমানে বিজ্ঞাপন বা বিশ্লেষণের (অ্যানালিটিক্স) কুকি ব্যবহার করি না।",
      ],
    ],
  },
  {
    h: ["Third-party services", "তৃতীয় পক্ষের সেবা"],
    p: [
      [
        "To provide content, NoorPath uses public services. When you use the related features, your browser or our server contacts them, and they may see technical data such as an IP address. They have their own privacy policies.",
        "কন্টেন্ট দেওয়ার জন্য নূরপাথ কিছু উন্মুক্ত সেবা ব্যবহার করে। সংশ্লিষ্ট ফিচার ব্যবহার করলে আপনার ব্রাউজার বা আমাদের সার্ভার সেগুলোর সাথে যোগাযোগ করে, আর তারা আইপি ঠিকানার মতো প্রযুক্তিগত তথ্য দেখতে পারে। তাদের নিজস্ব গোপনীয়তা নীতি আছে।",
      ],
    ],
    list: [
      [
        "Prayer times and Hijri date: Aladhan (api.aladhan.com). The city used for the request is sent to it.",
        "নামাজের সময় ও হিজরি তারিখ: Aladhan (api.aladhan.com)। অনুরোধের জন্য শহরের নাম তাদের কাছে যায়।",
      ],
      [
        "Quran text and Quran search: Al Quran Cloud (api.alquran.cloud), requested by our server. The words you search for are sent to it. Recitation audio is played from the audio addresses it provides.",
        "কুরআনের লেখা ও কুরআনে সার্চ: Al Quran Cloud (api.alquran.cloud), আমাদের সার্ভার থেকে অনুরোধ করা হয়। আপনি যে শব্দ খোঁজেন তা তাদের কাছে যায়। তিলাওয়াতের অডিও তাদের দেওয়া অডিও ঠিকানা থেকে বাজে।",
      ],
      [
        "Hadith and dua data: datasets hosted on GitHub and delivered through the jsDelivr CDN (cdn.jsdelivr.net). Dua audio plays from this CDN in your browser.",
        "হাদিস ও দুয়ার তথ্য: GitHub-এ রাখা ডাটাসেট, jsDelivr CDN (cdn.jsdelivr.net) এর মাধ্যমে আসে। দুয়ার অডিও আপনার ব্রাউজারে এই CDN থেকে বাজে।",
      ],
      [
        "Qibla finder: if you allow location access, your location is used only inside your browser to calculate the direction. It is not sent to us.",
        "কিবলা ফাইন্ডার: আপনি অবস্থানের অনুমতি দিলে আপনার অবস্থান শুধু আপনার ব্রাউজারের ভেতরে দিক হিসাব করতে ব্যবহার হয়। এটি আমাদের কাছে পাঠানো হয় না।",
      ],
    ],
  },
  {
    h: ["Security", "নিরাপত্তা"],
    p: [
      [
        "We protect passwords by storing only a hash, and we keep the login cookie out of reach of page scripts. Connections to the site are encrypted with HTTPS. No system is perfectly secure, so we cannot guarantee absolute security.",
        "আমরা পাসওয়ার্ড শুধু হ্যাশ আকারে রেখে এবং লগইন কুকি পেজের স্ক্রিপ্টের নাগালের বাইরে রেখে সুরক্ষিত রাখি। সাইটের সাথে সংযোগ HTTPS দিয়ে এনক্রিপ্ট করা। কোনো ব্যবস্থাই সম্পূর্ণ নিরাপদ নয়, তাই আমরা নিখুঁত নিরাপত্তার নিশ্চয়তা দিতে পারি না।",
      ],
    ],
  },
  {
    h: ["Keeping and deleting your data", "তথ্য রাখা ও মুছে ফেলা"],
    p: [
      [
        "We keep your account information for as long as your account exists. To ask us to delete your account and its data, please contact us using the email below.",
        "আপনার অ্যাকাউন্ট থাকা পর্যন্ত আমরা অ্যাকাউন্টের তথ্য রাখি। অ্যাকাউন্ট ও তার তথ্য মুছে ফেলতে চাইলে নিচের ইমেইলে আমাদের জানান।",
      ],
    ],
  },
  {
    h: ["Changes to this policy", "এই নীতির পরিবর্তন"],
    p: [
      [
        "We may update this policy from time to time. The date at the top shows when it was last updated.",
        "আমরা সময়ে সময়ে এই নীতি হালনাগাদ করতে পারি। উপরের তারিখ দেখায় সর্বশেষ কবে হালনাগাদ হয়েছে।",
      ],
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title={["Privacy Policy", "গোপনীয়তা নীতি"]}
      intro={[
        "This page explains what information NoorPath collects, how it is used and the choices you have.",
        "এই পেজে বলা হয়েছে নূরপাথ কোন তথ্য সংগ্রহ করে, কীভাবে ব্যবহার করে এবং আপনার কী কী বিকল্প আছে।",
      ]}
      sections={sections}
    />
  );
}