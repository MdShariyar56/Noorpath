const P = (en, bn) => ({ title: [`${en} (AS)`, `${bn} (আ.)`] });
const S = (en, bn, extra = "") => ({ title: [`${en} (RA)`, `${bn} (রা.)`], ...extra });

export const TOPICS = [
  {
    slug: "five-pillars",
    icon: "🕌",
    bg: "from-brand-800 to-brand-500",
    title: ["The Five Pillars of Islam", "ইসলামের পাঁচ স্তম্ভ"],
    desc: [
      "The foundations of a Muslim's faith and practice.",
      "একজন মুসলমানের ঈমান ও আমলের ভিত্তি।",
    ],
    intro: [
      "The Prophet ﷺ said that Islam is built on five things. These pillars shape a Muslim's daily and yearly life.",
      "নবী ﷺ বলেছেন, ইসলাম পাঁচটি বিষয়ের ওপর প্রতিষ্ঠিত। এই স্তম্ভগুলো একজন মুসলমানের দৈনন্দিন ও বার্ষিক জীবনকে গড়ে তোলে।",
    ],
    sections: [
      {
        variant: "steps",
        items: [
          {
            title: ["Shahadah (Declaration of faith)", "শাহাদাহ (ঈমানের সাক্ষ্য)"],
            text: [
              "Testifying that there is no god but Allah and that Muhammad ﷺ is His servant and Messenger. It is the entrance to Islam and the foundation of everything else.",
              "সাক্ষ্য দেওয়া যে আল্লাহ ছাড়া কোনো ইলাহ নেই এবং মুহাম্মদ ﷺ তাঁর বান্দা ও রাসূল। এটি ইসলামে প্রবেশের দরজা এবং বাকি সবকিছুর ভিত্তি।",
            ],
            ar: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
            tr: "Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan rasulullah.",
          },
          {
            title: ["Salah (Prayer)", "সালাত (নামাজ)"],
            text: [
              "Praying five times a day: Fajr, Dhuhr, Asr, Maghrib and Isha.",
              "দিনে পাঁচবার নামাজ আদায়: ফজর, যোহর, আসর, মাগরিব ও এশা।",
            ],
            href: "/prayer-times",
            cta: ["Check prayer times", "নামাজের সময় দেখুন"],
          },
          {
            title: ["Zakat (Obligatory charity)", "জাকাত (ফরজ দান)"],
            text: [
              "Giving a fixed share, generally 2.5%, of wealth that reaches the nisab and has been held for a lunar year, to those entitled to it.",
              "নিসাব পরিমাণ ও এক চান্দ্র বছর ধরে থাকা সম্পদের একটি নির্দিষ্ট অংশ, সাধারণত ২.৫%, হকদারদের দেওয়া।",
            ],
            href: "/zakat",
            cta: ["Open the Zakat calculator", "জাকাত ক্যালকুলেটর খুলুন"],
          },
          {
            title: ["Sawm (Fasting in Ramadan)", "সাওম (রমজানের রোজা)"],
            text: [
              "Fasting from dawn until sunset every day of Ramadan.",
              "রমজানের প্রতিদিন ফজর থেকে সূর্যাস্ত পর্যন্ত রোজা রাখা।",
            ],
            href: "/ramadan",
            cta: ["Open the Ramadan dashboard", "রমজান ড্যাশবোর্ড খুলুন"],
          },
          {
            title: ["Hajj (Pilgrimage)", "হজ (তীর্থযাত্রা)"],
            text: [
              "Making the pilgrimage to the Kaaba in Makkah once in a lifetime, for those who are able.",
              "সক্ষম ব্যক্তির জন্য জীবনে একবার মক্কায় কাবার হজ করা।",
            ],
            href: "/hajj-umrah",
            cta: ["Open the Hajj & Umrah guide", "হজ ও উমরা গাইড খুলুন"],
          },
        ],
      },
    ],
    refs: ["Sahih al-Bukhari 8; Sahih Muslim 16", "Quran 2:183; 3:97"],
  },

  {
    slug: "articles-of-faith",
    icon: "✨",
    bg: "from-indigo-900 to-brand-500",
    title: ["The Six Articles of Faith", "ঈমানের ছয় রুকন"],
    desc: [
      "What a Muslim believes: Allah, angels, books, messengers, the Last Day and divine decree.",
      "একজন মুসলমান যা বিশ্বাস করেন: আল্লাহ, ফেরেশতা, কিতাব, রাসূল, আখিরাত ও তাকদির।",
    ],
    intro: [
      "Iman is belief in the heart, declared by the tongue and shown through action. When the angel Jibril asked the Prophet ﷺ about iman, he answered with these six articles.",
      "ঈমান হলো অন্তরের বিশ্বাস, যা মুখে স্বীকার করা হয় এবং আমলে প্রকাশ পায়। ফেরেশতা জিবরিল (আ.) যখন নবী ﷺ কে ঈমান সম্পর্কে জিজ্ঞাসা করেন, তিনি এই ছয়টি বিষয়ের কথা বলেন।",
    ],
    sections: [
      {
        variant: "steps",
        items: [
          {
            title: ["Belief in Allah", "আল্লাহর প্রতি ঈমান"],
            text: [
              "That He is One, the Creator and Sustainer of everything, who alone deserves worship and has no partner.",
              "তিনি এক, সবকিছুর স্রষ্টা ও পালনকর্তা, একমাত্র তিনিই ইবাদতের যোগ্য এবং তাঁর কোনো শরিক নেই।",
            ],
          },
          {
            title: ["Belief in the Angels", "ফেরেশতাদের প্রতি ঈমান"],
            text: [
              "Honoured beings created from light who obey Allah completely, such as Jibril, who brought the revelation.",
              "নূর থেকে সৃষ্ট সম্মানিত সৃষ্টি, যাঁরা সম্পূর্ণরূপে আল্লাহর আনুগত্য করেন, যেমন জিবরিল (আ.), যিনি ওহি নিয়ে এসেছেন।",
            ],
          },
          {
            title: ["Belief in the Books", "কিতাবসমূহের প্রতি ঈমান"],
            text: [
              "That Allah revealed scripture to His messengers, such as the Tawrat, the Zabur, the Injil and the Quran, which is the final revelation and is preserved.",
              "আল্লাহ তাঁর রাসূলদের ওপর কিতাব নাজিল করেছেন, যেমন তাওরাত, জাবুর, ইনজিল ও কুরআন। কুরআন শেষ ও সংরক্ষিত ওহি।",
            ],
          },
          {
            title: ["Belief in the Messengers", "রাসূলগণের প্রতি ঈমান"],
            text: [
              "That Allah sent messengers to every people, from Adam to Muhammad ﷺ, the last of the prophets.",
              "আল্লাহ প্রতিটি জাতির কাছে রাসূল পাঠিয়েছেন, আদম (আ.) থেকে মুহাম্মদ ﷺ পর্যন্ত, যিনি নবীদের শেষ।",
            ],
            href: "/knowledge/prophets",
            cta: ["Learn about the prophets", "নবীগণ সম্পর্কে জানুন"],
          },
          {
            title: ["Belief in the Last Day", "আখিরাতের প্রতি ঈমান"],
            text: [
              "That this life will end, all people will be resurrected and judged, and the final home is Paradise or Hell.",
              "এই জীবন শেষ হবে, সব মানুষকে পুনরুত্থিত করে বিচার করা হবে এবং চূড়ান্ত ঠিকানা জান্নাত অথবা জাহান্নাম।",
            ],
          },
          {
            title: ["Belief in Divine Decree (Qadar)", "তাকদিরের প্রতি ঈমান"],
            text: [
              "That everything happens with Allah's knowledge and will, while people still have free choice and are responsible for their actions.",
              "সবকিছু আল্লাহর জ্ঞান ও ইচ্ছায় ঘটে, তবু মানুষের ইচ্ছার স্বাধীনতা আছে এবং নিজের কাজের দায় তারই।",
            ],
          },
        ],
      },
    ],
    refs: ["Quran 2:285; 4:136; 54:49", "Sahih Muslim 8"],
  },

  {
    slug: "prophets",
    icon: "🕊️",
    bg: "from-amber-900 to-brand-600",
    title: ["The Prophets in the Quran", "কুরআনে বর্ণিত নবীগণ"],
    desc: [
      "The 25 prophets named in the Quran and the five messengers of firm resolve.",
      "কুরআনে নামসহ উল্লেখিত ২৫ নবী এবং দৃঢ়প্রতিজ্ঞ পাঁচ রাসূল।",
    ],
    intro: [
      "Muslims believe Allah sent prophets to every community to call people to worship Him alone. Twenty-five are mentioned by name in the Quran, and others are not named (Quran 40:78). Muslims believe in all of them without distinction (Quran 2:285).",
      "মুসলমানরা বিশ্বাস করেন, আল্লাহ প্রতিটি জাতির কাছে নবী পাঠিয়েছেন, যাতে মানুষ একমাত্র তাঁরই ইবাদত করে। কুরআনে ২৫ জনের নাম উল্লেখ আছে, আরও অনেকের নাম বলা হয়নি (কুরআন ৪০:৭৮)। মুসলমানরা পার্থক্য না করে সবার প্রতি ঈমান রাখেন (কুরআন ২:২৮৫)।",
    ],
    sections: [
      {
        heading: ["Prophets named in the Quran", "কুরআনে নামসহ উল্লেখিত নবীগণ"],
        variant: "chips",
        items: [
          P("Adam", "আদম"),
          P("Idris", "ইদরিস"),
          P("Nuh (Noah)", "নূহ"),
          P("Hud", "হুদ"),
          P("Salih", "সালিহ"),
          P("Ibrahim (Abraham)", "ইবরাহিম"),
          P("Lut (Lot)", "লূত"),
          P("Ismail (Ishmael)", "ইসমাইল"),
          P("Ishaq (Isaac)", "ইসহাক"),
          P("Yaqub (Jacob)", "ইয়াকুব"),
          P("Yusuf (Joseph)", "ইউসুফ"),
          P("Ayyub (Job)", "আইয়ুব"),
          P("Shu'ayb", "শুআইব"),
          P("Musa (Moses)", "মূসা"),
          P("Harun (Aaron)", "হারুন"),
          P("Dhul-Kifl", "যুল-কিফল"),
          P("Dawud (David)", "দাউদ"),
          P("Sulayman (Solomon)", "সুলাইমান"),
          P("Ilyas (Elijah)", "ইলিয়াস"),
          P("Al-Yasa' (Elisha)", "আল-ইয়াসা"),
          P("Yunus (Jonah)", "ইউনুস"),
          P("Zakariyya (Zechariah)", "যাকারিয়া"),
          P("Yahya (John)", "ইয়াহইয়া"),
          P("Isa (Jesus)", "ঈসা"),
          { title: ["Muhammad ﷺ", "মুহাম্মদ ﷺ"] },
        ],
      },
      {
        heading: [
          "The five messengers of firm resolve (Ulul-Azm)",
          "দৃঢ়প্রতিজ্ঞ পাঁচ রাসূল (উলুল আযম)",
        ],
        note: [
          "Commonly identified by scholars from Quran 33:7 and 42:13.",
          "কুরআনের ৩৩:৭ ও ৪২:১৩ আয়াত থেকে আলেমরা সাধারণত এই পাঁচজনকে চিহ্নিত করেন।",
        ],
        variant: "list",
        items: [
          {
            title: ["Nuh (Noah)", "নূহ (আ.)"],
            text: [
              "Called his people to Allah for 950 years (Quran 29:14) and built the ark.",
              "৯৫০ বছর ধরে তাঁর জাতিকে আল্লাহর দিকে ডেকেছেন (কুরআন ২৯:১৪) এবং নৌকা বানিয়েছেন।",
            ],
          },
          {
            title: ["Ibrahim (Abraham)", "ইবরাহিম (আ.)"],
            text: [
              "Known as the friend of Allah (Khalilullah). With his son Ismail he raised the foundations of the Kaaba (Quran 2:127).",
              "আল্লাহর বন্ধু (খলিলুল্লাহ) হিসেবে পরিচিত। পুত্র ইসমাইলের সাথে কাবার ভিত্তি উত্তোলন করেছেন (কুরআন ২:১২৭)।",
            ],
          },
          {
            title: ["Musa (Moses)", "মূসা (আ.)"],
            text: [
              "Allah spoke to him directly (Quran 4:164). He was sent to Pharaoh and the Children of Israel and was given the Tawrat.",
              "আল্লাহ তাঁর সাথে সরাসরি কথা বলেছেন (কুরআন ৪:১৬৪)। তাঁকে ফেরাউন ও বনি ইসরাইলের কাছে পাঠানো হয়েছিল এবং তাওরাত দেওয়া হয়।",
            ],
          },
          {
            title: ["Isa (Jesus)", "ঈসা (আ.)"],
            text: [
              "Born miraculously to Maryam. He was a messenger to the Children of Israel and was given the Injil.",
              "মারইয়ামের গর্ভে অলৌকিকভাবে জন্ম। তিনি বনি ইসরাইলের রাসূল ছিলেন এবং তাঁকে ইনজিল দেওয়া হয়।",
            ],
          },
          {
            title: ["Muhammad ﷺ", "মুহাম্মদ ﷺ"],
            text: [
              "The final Messenger, sent to all mankind, with the Quran (Quran 33:40; 34:28).",
              "শেষ রাসূল, সমগ্র মানবজাতির জন্য প্রেরিত, কুরআনসহ (কুরআন ৩৩:৪০; ৩৪:২৮)।",
            ],
            href: "/articles/life-of-prophet-muhammad",
            cta: ["Read his life story", "তাঁর জীবনী পড়ুন"],
          },
        ],
      },
    ],
    refs: ["Quran 2:285; 33:7; 40:78"],
  },

  {
    slug: "ten-promised-paradise",
    icon: "🛡️",
    bg: "from-slate-800 to-brand-600",
    title: ["The Ten Given Glad Tidings of Paradise", "জান্নাতের সুসংবাদপ্রাপ্ত দশ সাহাবি"],
    desc: [
      "The ten companions the Prophet ﷺ named as people of Paradise.",
      "নবী ﷺ যে দশজন সাহাবিকে নাম ধরে জান্নাতের সুসংবাদ দিয়েছেন।",
    ],
    intro: [
      "The Prophet ﷺ gave glad tidings of Paradise to ten of his companions by name. They are known as al-'Asharah al-Mubashsharun. This does not mean other companions are excluded: Allah is pleased with the early believers as a whole (Quran 9:100).",
      "নবী ﷺ দশজন সাহাবিকে নাম ধরে জান্নাতের সুসংবাদ দিয়েছেন। তাঁরা আল-আশারাহ আল-মুবাশশারূন নামে পরিচিত। এর অর্থ এই নয় যে অন্য সাহাবিরা বাদ পড়েছেন: আল্লাহ প্রথম যুগের মুমিনদের সবার প্রতি সন্তুষ্ট (কুরআন ৯:১০০)।",
    ],
    sections: [
      {
        variant: "steps",
        items: [
          {
            title: ["Abu Bakr as-Siddiq (RA)", "আবু বকর সিদ্দিক (রা.)"],
            text: [
              "The Prophet's closest companion and the first caliph. He accompanied the Prophet ﷺ during the Hijrah.",
              "নবী ﷺ এর সবচেয়ে ঘনিষ্ঠ সাহাবি ও প্রথম খলিফা। হিজরতের সময় তিনি নবী ﷺ এর সঙ্গী ছিলেন।",
            ],
          },
          {
            title: ["Umar ibn al-Khattab (RA)", "উমর ইবনুল খাত্তাব (রা.)"],
            text: [
              "The second caliph, known for his justice. The Muslim state expanded widely during his time.",
              "দ্বিতীয় খলিফা, ন্যায়বিচারের জন্য পরিচিত। তাঁর সময়ে মুসলিম রাষ্ট্রের ব্যাপক বিস্তার ঘটে।",
            ],
          },
          {
            title: ["Uthman ibn Affan (RA)", "উসমান ইবনু আফফান (রা.)"],
            text: [
              "The third caliph, known for his modesty and generosity. During his caliphate the Quran was copied into standard volumes.",
              "তৃতীয় খলিফা, লজ্জাশীলতা ও দানশীলতার জন্য পরিচিত। তাঁর খিলাফতকালে কুরআনের প্রমিত কপি তৈরি করা হয়।",
            ],
          },
          {
            title: ["Ali ibn Abi Talib (RA)", "আলি ইবনু আবি তালিব (রা.)"],
            text: [
              "The cousin and son-in-law of the Prophet ﷺ and the fourth caliph, known for his knowledge and courage.",
              "নবী ﷺ এর চাচাতো ভাই ও জামাতা এবং চতুর্থ খলিফা, জ্ঞান ও সাহসিকতার জন্য পরিচিত।",
            ],
          },
          {
            title: ["Talha ibn Ubaydillah (RA)", "তালহা ইবনু উবাইদুল্লাহ (রা.)"],
            text: [
              "An early Muslim known for his generosity, who defended the Prophet ﷺ at the Battle of Uhud.",
              "প্রথম দিকের মুসলমান, দানশীলতার জন্য পরিচিত। উহুদের যুদ্ধে তিনি নবী ﷺ কে রক্ষা করেছিলেন।",
            ],
          },
          {
            title: ["Az-Zubayr ibn al-Awwam (RA)", "যুবাইর ইবনুল আওয়াম (রা.)"],
            text: [
              "A cousin of the Prophet ﷺ (the son of his aunt Safiyyah), among the earliest to accept Islam and known for his bravery.",
              "নবী ﷺ এর ফুফাতো ভাই (ফুফু সাফিয়্যাহর পুত্র), সর্বপ্রথম ইসলাম গ্রহণকারীদের একজন এবং সাহসিকতার জন্য পরিচিত।",
            ],
          },
          {
            title: ["Abdur-Rahman ibn Awf (RA)", "আবদুর রহমান ইবনু আউফ (রা.)"],
            text: [
              "A successful trader known for spending generously in the cause of Allah.",
              "একজন সফল ব্যবসায়ী, আল্লাহর পথে উদারভাবে ব্যয় করার জন্য পরিচিত।",
            ],
          },
          {
            title: ["Sa'd ibn Abi Waqqas (RA)", "সা'দ ইবনু আবি ওয়াক্কাস (রা.)"],
            text: [
              "An early Muslim and skilled archer who later led Muslim armies, including at Qadisiyyah.",
              "প্রথম দিকের মুসলমান ও দক্ষ তিরন্দাজ, পরে কাদিসিয়্যাহসহ বিভিন্ন যুদ্ধে মুসলিম বাহিনীর নেতৃত্ব দেন।",
            ],
          },
          {
            title: ["Sa'id ibn Zayd (RA)", "সাঈদ ইবনু যায়েদ (রা.)"],
            text: [
              "An early Muslim and the brother-in-law of Umar ibn al-Khattab.",
              "প্রথম দিকের মুসলমান এবং উমর ইবনুল খাত্তাবের (রা.) ভগ্নিপতি।",
            ],
          },
          {
            title: ["Abu Ubaydah ibn al-Jarrah (RA)", "আবু উবাইদাহ ইবনুল জাররাহ (রা.)"],
            text: [
              "Called by the Prophet ﷺ the trustworthy one of this Ummah.",
              "নবী ﷺ তাঁকে এই উম্মাহর আমানতদার বলে অভিহিত করেছেন।",
            ],
          },
        ],
      },
    ],
    refs: [
      "Sunan Abi Dawud and Jami at-Tirmidhi (the hadith naming the ten)",
      "Quran 9:100",
    ],
  },

  {
    slug: "wudu-and-salah",
    icon: "🧎",
    bg: "from-cyan-900 to-brand-500",
    title: ["How to Perform Wudu and Salah", "অজু ও নামাজের নিয়ম"],
    desc: [
      "A basic step-by-step outline of wudu, the prayer and the number of rak'ahs.",
      "অজু, নামাজ ও রাকাত সংখ্যার মৌলিক ধাপে ধাপে রূপরেখা।",
    ],
    intro: [
      "Prayer requires purity. This is a basic outline for beginners. Details such as hand placement, what is recited and sitting posture differ slightly between schools of thought, so please learn the prayer from a qualified teacher.",
      "নামাজের জন্য পবিত্রতা জরুরি। এটি নতুনদের জন্য একটি মৌলিক রূপরেখা। হাত রাখার স্থান, কী পড়তে হবে ও বসার ধরনের মতো খুঁটিনাটিতে মাযহাবভেদে সামান্য পার্থক্য আছে, তাই যোগ্য শিক্ষকের কাছ থেকে নামাজ শিখুন।",
    ],
    sections: [
      {
        heading: ["Wudu (ablution)", "অজু"],
        note: [
          "The obligatory parts (Quran 5:6) are washing the face and the arms up to the elbows, wiping the head, and washing the feet up to the ankles. The other steps are sunnah. Schools of thought differ slightly in some details.",
          "অজুর ফরজ অংশ (কুরআন ৫:৬): মুখ ধোয়া, কনুই পর্যন্ত হাত ধোয়া, মাথা মাসেহ করা এবং টাখনু পর্যন্ত পা ধোয়া। বাকি ধাপগুলো সুন্নাহ। কিছু খুঁটিনাটিতে মাযহাবভেদে সামান্য পার্থক্য আছে।",
        ],
        variant: "steps",
        items: [
          {
            title: ["Intention and Bismillah", "নিয়ত ও বিসমিল্লাহ"],
            text: [
              "Intend in your heart to perform wudu and say Bismillah.",
              "অন্তরে অজুর নিয়ত করুন এবং বিসমিল্লাহ বলুন।",
            ],
            ar: "بِسْمِ اللَّهِ",
          },
          {
            title: ["Wash the hands", "হাত ধোয়া"],
            text: [
              "Wash both hands up to the wrists, 3 times.",
              "দুই হাত কবজি পর্যন্ত ৩ বার ধুয়ে নিন।",
            ],
          },
          {
            title: ["Rinse the mouth", "কুলি করা"],
            text: ["Rinse the mouth, 3 times.", "৩ বার কুলি করুন।"],
          },
          {
            title: ["Clean the nose", "নাক পরিষ্কার করা"],
            text: [
              "Sniff water into the nose and blow it out, 3 times.",
              "নাকে পানি দিয়ে ঝেড়ে ফেলুন, ৩ বার।",
            ],
          },
          {
            title: ["Wash the face", "মুখ ধোয়া"],
            text: [
              "Wash the whole face, from the hairline to the chin and from ear to ear, 3 times.",
              "কপালের চুলের গোড়া থেকে থুতনি পর্যন্ত এবং এক কান থেকে অন্য কান পর্যন্ত পুরো মুখ ৩ বার ধুয়ে নিন।",
            ],
          },
          {
            title: ["Wash the arms", "কনুই পর্যন্ত হাত ধোয়া"],
            text: [
              "Wash the arms up to and including the elbows, right then left, 3 times each.",
              "ডান ও বাম হাত কনুইসহ ৩ বার করে ধুয়ে নিন, আগে ডান।",
            ],
          },
          {
            title: ["Wipe the head", "মাথা মাসেহ করা"],
            text: [
              "Wipe the head once with wet hands, then wipe the ears.",
              "ভেজা হাতে একবার মাথা মাসেহ করুন, তারপর কান মাসেহ করুন।",
            ],
          },
          {
            title: ["Wash the feet", "পা ধোয়া"],
            text: [
              "Wash the feet up to and including the ankles, right then left, 3 times each.",
              "ডান ও বাম পা টাখনুসহ ৩ বার করে ধুয়ে নিন, আগে ডান।",
            ],
          },
          {
            title: ["Dua after wudu", "অজুর পরের দুয়া"],
            text: ["Recite the testimony of faith.", "শাহাদাহ পাঠ করুন।"],
            ar: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
            tr: "Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
          },
        ],
      },
      {
        heading: ["What breaks wudu", "যা অজু ভঙ্গ করে"],
        variant: "list",
        items: [
          {
            title: ["Anything that comes out of the front or back passage", "সামনে বা পেছনের পথ দিয়ে কিছু বের হওয়া"],
            text: [
              "Such as urine, stool and passing wind.",
              "যেমন প্রস্রাব, পায়খানা ও বায়ু নির্গমন।",
            ],
          },
          {
            title: ["Deep sleep or loss of consciousness", "গভীর ঘুম বা অজ্ঞান হওয়া"],
          },
          {
            title: ["Other matters", "অন্যান্য বিষয়"],
            text: [
              "Schools of thought differ on some matters, such as bleeding or touching the private parts. Follow the guidance of your school or scholar.",
              "কিছু বিষয়ে (যেমন রক্ত বের হওয়া বা লজ্জাস্থান স্পর্শ) মাযহাবভেদে মতভেদ আছে। আপনার মাযহাব বা আলেমের নির্দেশনা অনুসরণ করুন।",
            ],
          },
        ],
      },
      {
        heading: ["Salah (prayer)", "সালাত (নামাজ)"],
        variant: "steps",
        items: [
          {
            title: ["Prepare", "প্রস্তুতি"],
            text: [
              "Be in wudu, with clean clothes and a clean place, and face the Qiblah.",
              "অজু অবস্থায়, পরিষ্কার পোশাক ও স্থানে কিবলামুখী হোন।",
            ],
            href: "/qibla",
            cta: ["Find the Qiblah", "কিবলা খুঁজুন"],
          },
          {
            title: ["Intention and Takbir", "নিয়ত ও তাকবির"],
            text: [
              "Intend the prayer in your heart, raise your hands and say “Allahu Akbar”.",
              "অন্তরে নামাজের নিয়ত করে হাত তুলে “আল্লাহু আকবার” বলুন।",
            ],
            ar: "اللَّهُ أَكْبَرُ",
          },
          {
            title: ["Standing (Qiyam)", "দাঁড়ানো (কিয়াম)"],
            text: [
              "Recite Surah Al-Fatihah in every rak'ah. In the first two rak'ahs of the obligatory prayers, also recite another portion of the Quran.",
              "প্রতি রাকাতে সূরা ফাতিহা পড়ুন। ফরজ নামাজের প্রথম দুই রাকাতে কুরআনের আরও কিছু অংশ পড়ুন।",
            ],
            href: "/quran/1",
            cta: ["Read Surah Al-Fatihah", "সূরা ফাতিহা পড়ুন"],
          },
          {
            title: ["Bowing (Ruku)", "রুকু"],
            text: [
              "Bow with your back straight and say “Subhana Rabbiyal-Azim” three times.",
              "পিঠ সোজা রেখে রুকুতে গিয়ে তিনবার “সুবহানা রাব্বিয়াল আযিম” বলুন।",
            ],
            ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
          },
          {
            title: ["Rising from ruku", "রুকু থেকে ওঠা"],
            text: [
              "Rise saying “Sami'allahu liman hamidah”, then “Rabbana wa lakal-hamd”.",
              "“সামিআল্লাহু লিমান হামিদাহ” বলে সোজা হোন, তারপর “রাব্বানা ওয়া লাকাল হামদ” বলুন।",
            ],
            ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ",
          },
          {
            title: ["Prostration (Sujud)", "সিজদা"],
            text: [
              "Go down with the forehead, nose, both palms, both knees and the toes on the ground, and say “Subhana Rabbiyal-A'la” three times.",
              "কপাল, নাক, দুই হাতের তালু, দুই হাঁটু ও পায়ের আঙুল মাটিতে রেখে সিজদা করুন এবং তিনবার “সুবহানা রাব্বিয়াল আ'লা” বলুন।",
            ],
            ar: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ",
          },
          {
            title: ["Sitting and second prostration", "বসা ও দ্বিতীয় সিজদা"],
            text: [
              "Sit up briefly, say “Rabbighfir li” (My Lord, forgive me), then prostrate a second time. This completes one rak'ah.",
              "অল্প সময় সোজা হয়ে বসে “রাব্বিগফিরলি” (হে আমার রব, আমাকে ক্ষমা করুন) বলুন, তারপর দ্বিতীয় সিজদা করুন। এভাবে এক রাকাত পূর্ণ হয়।",
            ],
            ar: "رَبِّ اغْفِرْ لِي",
          },
          {
            title: ["Tashahhud", "তাশাহহুদ"],
            text: [
              "After the second rak'ah, and at the end of the prayer, sit and recite the Tashahhud. In the final sitting, also send blessings on the Prophet ﷺ (Salawat) and make dua.",
              "দ্বিতীয় রাকাতের পর এবং নামাজের শেষে বসে তাশাহহুদ পড়ুন। শেষ বৈঠকে নবী ﷺ এর ওপর দরূদ পড়ে দুয়া করুন।",
            ],
          },
          {
            title: ["Salam", "সালাম"],
            text: [
              "Finish by turning your face to the right, then to the left, saying “Assalamu alaykum wa rahmatullah”.",
              "ডানে ও তারপর বামে মুখ ঘুরিয়ে “আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ” বলে নামাজ শেষ করুন।",
            ],
            ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
          },
        ],
      },
      {
        heading: ["Rak'ahs in the obligatory prayers", "ফরজ নামাজের রাকাত সংখ্যা"],
        variant: "list",
        items: [
          { title: ["Fajr", "ফজর"], text: ["2 rak'ahs", "২ রাকাত"] },
          { title: ["Dhuhr", "যোহর"], text: ["4 rak'ahs", "৪ রাকাত"] },
          { title: ["Asr", "আসর"], text: ["4 rak'ahs", "৪ রাকাত"] },
          { title: ["Maghrib", "মাগরিব"], text: ["3 rak'ahs", "৩ রাকাত"] },
          { title: ["Isha", "এশা"], text: ["4 rak'ahs", "৪ রাকাত"] },
          {
            title: ["Jumu'ah (Friday)", "জুমুআ (শুক্রবার)"],
            text: [
              "2 rak'ahs after the sermon, in place of Dhuhr for those who attend.",
              "খুতবার পর ২ রাকাত, যাঁরা উপস্থিত হন তাঁদের জন্য যোহরের পরিবর্তে।",
            ],
          },
        ],
      },
    ],
    refs: ["Quran 5:6", "Sahih Muslim 234 (dua after wudu)"],
  },

  {
    slug: "glossary",
    kind: "glossary",
    icon: "📖",
    bg: "from-emerald-900 to-amber-500",
    title: ["Islamic Terms Glossary", "ইসলামি পরিভাষা"],
    desc: [
      "Simple meanings of common Islamic words, with search.",
      "প্রচলিত ইসলামি শব্দের সহজ অর্থ, সার্চসহ।",
    ],
    intro: [
      "Short definitions of words you will often hear. Search by English or Bangla.",
      "যেসব শব্দ প্রায়ই শোনা যায় তার সংক্ষিপ্ত অর্থ। ইংরেজি বা বাংলায় খুঁজুন।",
    ],
  },
];

// t = পরিভাষা [ইংরেজি, বাংলা], d = অর্থ [ইংরেজি, বাংলা]
export const GLOSSARY = [
  { t: ["Adhan", "আযান"], d: ["The call to prayer, announcing that the prayer time has begun.", "নামাজের ওয়াক্ত শুরু হয়েছে জানিয়ে দেওয়া আহ্বান।"] },
  { t: ["Iqamah", "ইকামত"], d: ["The second call, given just before the congregational prayer begins.", "জামাত শুরুর ঠিক আগে দেওয়া দ্বিতীয় আহ্বান।"] },
  { t: ["Fard", "ফরজ"], d: ["Obligatory. Neglecting it without excuse is a sin.", "অবশ্যকরণীয়। ওজর ছাড়া ছেড়ে দিলে গুনাহ হয়।"] },
  { t: ["Wajib", "ওয়াজিব"], d: ["A necessary act ranking just below fard, a term used mainly in the Hanafi school.", "ফরজের ঠিক নিচের স্তরের আবশ্যক আমল। পরিভাষাটি মূলত হানাফি মাযহাবে ব্যবহৃত।"] },
  { t: ["Sunnah", "সুন্নাহ"], d: ["The way of the Prophet ﷺ. Also used for recommended acts that he did regularly.", "নবী ﷺ এর পথ ও আদর্শ। তিনি নিয়মিত করতেন এমন অনুসরণীয় আমলের জন্যও ব্যবহৃত হয়।"] },
  { t: ["Nafl", "নফল"], d: ["Voluntary extra worship.", "ঐচ্ছিক অতিরিক্ত ইবাদত।"] },
  { t: ["Mustahabb", "মুস্তাহাব"], d: ["Recommended. Rewarded if done, no sin if left.", "পছন্দনীয়। করলে সওয়াব, না করলে গুনাহ নেই।"] },
  { t: ["Mubah", "মুবাহ"], d: ["Permissible, neither rewarded nor sinful in itself.", "বৈধ। নিজে নিজে সওয়াবও নয়, গুনাহও নয়।"] },
  { t: ["Makruh", "মাকরুহ"], d: ["Disliked. Better to avoid it.", "অপছন্দনীয়। এড়িয়ে চলা উত্তম।"] },
  { t: ["Halal", "হালাল"], d: ["Permitted in Islam.", "ইসলামে অনুমোদিত।"] },
  { t: ["Haram", "হারাম"], d: ["Forbidden in Islam.", "ইসলামে নিষিদ্ধ।"] },
  { t: ["Niyyah", "নিয়ত"], d: ["Intention, which is in the heart.", "অন্তরের সংকল্প।"] },
  { t: ["Islam", "ইসলাম"], d: ["Submission to Allah alone.", "একমাত্র আল্লাহর কাছে আত্মসমর্পণ।"] },
  { t: ["Iman", "ঈমান"], d: ["Faith: belief in the heart, declaration by the tongue and action by the limbs.", "বিশ্বাস: অন্তরে বিশ্বাস, মুখে স্বীকার ও আমলে প্রকাশ।"] },
  { t: ["Ihsan", "ইহসান"], d: ["Excellence in worship: to worship Allah as if you see Him, for even if you do not see Him, He sees you.", "ইবাদতে পরিপূর্ণতা: এমনভাবে আল্লাহর ইবাদত করা যেন আপনি তাঁকে দেখছেন; আপনি না দেখলেও তিনি আপনাকে দেখছেন।"] },
  { t: ["Taqwa", "তাকওয়া"], d: ["God-consciousness: guarding yourself from what displeases Allah.", "আল্লাহভীতি: আল্লাহ যা অপছন্দ করেন তা থেকে নিজেকে রক্ষা করা।"] },
  { t: ["Tawakkul", "তাওয়াক্কুল"], d: ["Relying on Allah after taking the means.", "চেষ্টা করার পর আল্লাহর ওপর ভরসা করা।"] },
  { t: ["Sabr", "সবর"], d: ["Patience and steadfastness.", "ধৈর্য ও অবিচলতা।"] },
  { t: ["Shukr", "শুকর"], d: ["Gratitude to Allah, by heart, tongue and action.", "অন্তর, মুখ ও আমলে আল্লাহর প্রতি কৃতজ্ঞতা।"] },
  { t: ["Tawbah", "তওবা"], d: ["Repentance: stopping the sin, regretting it and resolving not to return to it.", "অনুতাপ: গুনাহ ছেড়ে দেওয়া, তার জন্য অনুতপ্ত হওয়া এবং আর না করার সংকল্প।"] },
  { t: ["Istighfar", "ইস্তিগফার"], d: ["Asking Allah for forgiveness, such as by saying “Astaghfirullah”.", "“আসতাগফিরুল্লাহ” বলে আল্লাহর কাছে ক্ষমা চাওয়া।"] },
  { t: ["Dhikr", "জিকির"], d: ["Remembrance of Allah.", "আল্লাহকে স্মরণ করা।"] },
  { t: ["Dua", "দুয়া"], d: ["Supplication: calling upon Allah and asking Him.", "আল্লাহকে ডাকা ও তাঁর কাছে চাওয়া।"] },
  { t: ["Sadaqah", "সদকা"], d: ["Voluntary charity given for Allah's sake.", "আল্লাহর সন্তুষ্টির জন্য ঐচ্ছিক দান।"] },
  { t: ["Zakat", "জাকাত"], d: ["Obligatory yearly charity from wealth that reaches the nisab.", "নিসাব পরিমাণ সম্পদের ওপর বছরে একবার ফরজ দান।"] },
  { t: ["Nisab", "নিসাব"], d: ["The minimum amount of wealth on which zakat becomes due.", "যে ন্যূনতম সম্পদের ওপর জাকাত ফরজ হয়।"] },
  { t: ["Fitrah", "ফিতরা"], d: ["Charity given before the Eid al-Fitr prayer, at the end of Ramadan.", "রমজানের শেষে ঈদুল ফিতরের নামাজের আগে দেওয়া দান।"] },
  { t: ["Qiblah", "কিবলা"], d: ["The direction of the Kaaba in Makkah, which Muslims face in prayer.", "মক্কায় কাবার দিক, যেদিকে মুখ করে মুসলমানরা নামাজ পড়েন।"] },
  { t: ["Masjid", "মসজিদ"], d: ["Mosque: a place of prostration and worship.", "সিজদা ও ইবাদতের স্থান।"] },
  { t: ["Imam", "ইমাম"], d: ["The one who leads the prayer. The word is also used for a scholar or leader.", "নামাজের নেতৃত্বদানকারী। আলেম বা নেতার জন্যও শব্দটি ব্যবহৃত হয়।"] },
  { t: ["Jamaat", "জামাত"], d: ["Congregation: praying together behind an imam.", "ইমামের পেছনে একসাথে নামাজ আদায়।"] },
  { t: ["Jumu'ah", "জুমুআ"], d: ["The Friday congregational prayer, with a sermon.", "খুতবাসহ শুক্রবারের জামাতের নামাজ।"] },
  { t: ["Tarawih", "তারাবি"], d: ["The special night prayers performed in Ramadan.", "রমজানে রাতে পড়া বিশেষ নামাজ।"] },
  { t: ["Janazah", "জানাযা"], d: ["The funeral prayer for a deceased Muslim.", "মৃত মুসলমানের জন্য জানাযার নামাজ।"] },
  { t: ["Ummah", "উম্মাহ"], d: ["The worldwide community of Muslims.", "বিশ্বব্যাপী মুসলিম সম্প্রদায়।"] },
  { t: ["Hadith", "হাদিস"], d: ["A report of the words, actions or approvals of the Prophet ﷺ.", "নবী ﷺ এর কথা, কাজ ও সমর্থনের বর্ণনা।"] },
  { t: ["Sahih", "সহিহ"], d: ["Authentic. A grade given to a well-authenticated hadith.", "বিশুদ্ধ। সুপ্রমাণিত হাদিসকে দেওয়া মান।"] },
  { t: ["Tafsir", "তাফসির"], d: ["Explanation and interpretation of the Quran.", "কুরআনের ব্যাখ্যা ও বিশ্লেষণ।"] },
  { t: ["Fiqh", "ফিকহ"], d: ["Islamic jurisprudence: understanding the rulings of the religion from its sources.", "ইসলামি আইনশাস্ত্র: উৎস থেকে দীনের বিধান বোঝা।"] },
  { t: ["Madhhab", "মাযহাব"], d: ["A school of jurisprudence, such as Hanafi, Maliki, Shafi'i and Hanbali.", "ফিকহের একটি ধারা, যেমন হানাফি, মালিকি, শাফিঈ ও হাম্বলি।"] },
  { t: ["Fatwa", "ফতোয়া"], d: ["A reasoned religious ruling given by a qualified scholar in answer to a question.", "প্রশ্নের জবাবে যোগ্য আলেমের দেওয়া দলিলভিত্তিক শরিয়তের বিধান।"] },
  { t: ["Hijrah", "হিজরত"], d: ["Migration, especially the Prophet's ﷺ migration from Makkah to Madinah, from which the Hijri calendar begins.", "দেশত্যাগ, বিশেষ করে নবী ﷺ এর মক্কা থেকে মদিনায় হিজরত, যা থেকে হিজরি সন শুরু।"] },
  { t: ["Akhirah", "আখিরাত"], d: ["The Hereafter: the life after death.", "পরকাল: মৃত্যুর পরের জীবন।"] },
  { t: ["Barzakh", "বারযাখ"], d: ["The stage between death and the Day of Resurrection.", "মৃত্যু থেকে কিয়ামতের দিন পর্যন্ত মধ্যবর্তী অবস্থা।"] },
  { t: ["Jannah", "জান্নাত"], d: ["Paradise, the final reward of the believers.", "জান্নাত, মুমিনদের চূড়ান্ত প্রতিদান।"] },
  { t: ["Suhoor", "সেহরি"], d: ["The pre-dawn meal before fasting.", "রোজা রাখার জন্য ভোরের আগে খাওয়া খাবার।"] },
  { t: ["Iftar", "ইফতার"], d: ["The meal that breaks the fast at sunset.", "সূর্যাস্তের সময় রোজা ভাঙার খাবার।"] },
  { t: ["Wudu", "অজু"], d: ["Ritual washing before prayer.", "নামাজের আগে নির্দিষ্ট নিয়মে ধোয়া।"] },
  { t: ["Ghusl", "গোসল"], d: ["The full-body ritual bath.", "সম্পূর্ণ শরীর ধোয়ার শরয়ি গোসল।"] },
];