export const HAJJ_INFO = [
  [
    "Hajj is obligatory once in a lifetime for every Muslim who is an adult, of sound mind, and able (financially and physically). (Quran 3:97)",
    "প্রাপ্তবয়স্ক, সুস্থ বিবেকসম্পন্ন এবং আর্থিক ও শারীরিকভাবে সক্ষম প্রত্যেক মুসলমানের ওপর জীবনে একবার হজ ফরজ। (কুরআন ৩:৯৭)",
  ],
  [
    "Hajj has fixed days. The main rites take place from 8 to 13 Dhul Hijjah.",
    "হজের নির্দিষ্ট দিন আছে। মূল আমলগুলো ৮ থেকে ১৩ জিলহজের মধ্যে হয়।",
  ],
  [
    "Pillars of Hajj (majority view): the ihram intention, standing at Arafah, Tawaf al-Ifadah and Sa'i. Some schools classify Sa'i as obligatory instead.",
    "হজের রুকন (অধিকাংশের মতে): ইহরামের নিয়ত, আরাফায় অবস্থান, তাওয়াফে ইফাদা ও সাঈ। কোনো কোনো মাযহাবে সাঈ ওয়াজিব হিসেবে গণ্য।",
  ],
];

export const HAJJ_TYPES = [
  {
    name: ["Tamattu"],
    text: [
      "Perform Umrah first, leave ihram, then enter ihram for Hajj on 8 Dhul Hijjah. A sacrifice (hady) is required. Common for pilgrims travelling from abroad.",
      "প্রথমে উমরা করে ইহরাম খুলুন, তারপর ৮ জিলহজ হজের ইহরাম বাঁধুন। কুরবানি (হাদি) দিতে হয়। বিদেশ থেকে আসা হাজীদের মধ্যে প্রচলিত।",
    ],
  },
  {
    name: ["Qiran"],
    text: [
      "Enter ihram for Umrah and Hajj together and stay in ihram until the Eid-day rites. A sacrifice is required.",
      "উমরা ও হজের জন্য একসাথে ইহরাম বাঁধুন এবং ঈদের দিনের আমল পর্যন্ত ইহরামে থাকুন। কুরবানি (হাদি) দিতে হয়।",
    ],
  },
  {
    name: ["Ifrad"],
    text: [
      "Perform Hajj only. The sacrifice is not required (it is voluntary).",
      "শুধু হজ করা। হাদি বাধ্যতামূলক নয় (ঐচ্ছিক)।",
    ],
  },
];

export const HAJJ_STEPS = [
  {
    id: "ihram",
    title: ["Ihram"],
    when: ["Before the rites begin · 8 Dhul Hijjah for Tamattu"],
    points: [
      [
        "Take a bath (ghusl), then wear ihram: for men two white unstitched sheets; for women ordinary modest clothing (no niqab or gloves).",
        "গোসল করে ইহরাম পরুন: পুরুষদের জন্য দুটি সাদা সেলাইবিহীন কাপড়; নারীদের জন্য সাধারণ শালীন পোশাক (নেকাব ও হাতমোজা নয়)।",
      ],
      [
        "Make the intention for Hajj, say “Labbayk Hajjan”, then recite the Talbiyah often.",
        "হজের নিয়ত করে “লাব্বাইক হাজ্জান” বলুন, তারপর বেশি বেশি তালবিয়া পড়ুন।",
      ],
      [
        "While in ihram avoid: cutting hair or nails, perfume, marital relations, hunting, arguing and sinning. Men also avoid stitched clothes and covering the head.",
        "ইহরামে এসব থেকে বিরত থাকুন: চুল-নখ কাটা, সুগন্ধি, স্বামী-স্ত্রীর মিলন, শিকার, ঝগড়া ও গুনাহ। পুরুষেরা সেলাই করা কাপড় পরা ও মাথা ঢাকা থেকেও বিরত থাকবেন।",
      ],
    ],
  },
  {
    id: "mina",
    title: ["Mina"],
    when: ["8 Dhul Hijjah (Yawm at-Tarwiyah)"],
    points: [
      [
        "Go to Mina and stay there. Pray each prayer at its time, with the four-rak'ah prayers shortened to two (not combined), from Dhuhr until the next Fajr.",
        "মিনায় গিয়ে অবস্থান করুন। যোহর থেকে পরের ফজর পর্যন্ত প্রতিটি নামাজ নিজ ওয়াক্তে পড়ুন, চার রাকাতের নামাজ কসর করে দুই রাকাত (জমা না করে)।",
      ],
      [
        "Spend the time in dhikr, dua, Quran and rest.",
        "জিকির, দুয়া, কুরআন তিলাওয়াত ও বিশ্রামে সময় কাটান।",
      ],
      [
        "Details differ slightly between schools of thought, so follow your group's scholar.",
        "মাযহাবভেদে সামান্য পার্থক্য আছে, তাই আপনার দলের আলেমের নির্দেশনা অনুসরণ করুন।",
      ],
    ],
  },
  {
    id: "arafah",
    title: ["Standing at Arafah"],
    when: ["9 Dhul Hijjah"],
    points: [
      [
        "This is the most important rite of Hajj. Whoever misses standing at Arafah altogether has missed Hajj.",
        "এটি হজের সবচেয়ে গুরুত্বপূর্ণ আমল। যে ব্যক্তি আরাফার অবস্থান পুরোপুরি ছেড়ে দেয়, তার হজ হয় না।",
      ],
      [
        "After sunrise, go to Arafah. Make sure you are inside its boundaries, and stay from after midday until sunset.",
        "সূর্যোদয়ের পর আরাফায় যান। নিশ্চিত হোন যে আপনি এর সীমার ভেতরে আছেন, এবং দুপুরের পর থেকে সূর্যাস্ত পর্যন্ত থাকুন।",
      ],
      [
        "Pray Dhuhr and Asr together, shortened, as the Prophet ﷺ did (details vary between schools).",
        "নবী ﷺ এর আমল অনুযায়ী যোহর ও আসর একসাথে কসর করে পড়ুন (মাযহাবভেদে বিস্তারিত পার্থক্য আছে)।",
      ],
      [
        "Spend the rest of the day in dua, dhikr and istighfar, facing the Qiblah. Do not leave before sunset.",
        "বাকি সময় কিবলামুখী হয়ে দুয়া, জিকির ও ইস্তিগফারে কাটান। সূর্যাস্তের আগে বের হবেন না।",
      ],
    ],
  },
  {
    id: "muzdalifah",
    title: ["Muzdalifah"],
    when: ["Night of 9–10 Dhul Hijjah"],
    points: [
      [
        "After sunset, leave Arafah calmly for Muzdalifah.",
        "সূর্যাস্তের পর শান্তভাবে আরাফা থেকে মুজদালিফার দিকে রওনা হোন।",
      ],
      [
        "Pray Maghrib and Isha together on arrival (Isha shortened), then rest.",
        "পৌঁছে মাগরিব ও এশা একসাথে পড়ুন (এশা কসর), তারপর বিশ্রাম নিন।",
      ],
      [
        "Pray Fajr early, then make dhikr and dua facing the Qiblah until the sky is bright.",
        "ফজর শুরুতেই পড়ুন, তারপর আকাশ ফর্সা না হওয়া পর্যন্ত কিবলামুখী হয়ে জিকির ও দুয়া করুন।",
      ],
      [
        "Collect small pebbles (about the size of a chickpea) for stoning. You can also collect them elsewhere.",
        "কঙ্কর সংগ্রহ করুন (ছোলার দানার মতো ছোট)। অন্য জায়গা থেকেও সংগ্রহ করা যায়।",
      ],
      [
        "Those who are elderly, weak, or caring for them may be allowed to leave after midnight. Follow your scholar's guidance.",
        "বয়স্ক, দুর্বল বা তাঁদের দেখাশোনাকারীদের জন্য মধ্যরাতের পর রওনা হওয়ার অনুমতি থাকতে পারে। আপনার আলেমের নির্দেশনা অনুসরণ করুন।",
      ],
    ],
  },
  {
    id: "eid-day",
    title: ["Rites of Eid day"],
    when: ["10 Dhul Hijjah (Yawm an-Nahr)"],
    points: [
      [
        "Stone Jamrat al-Aqabah (the large Jamarah) with 7 pebbles, saying “Allahu Akbar” with each. Stop the Talbiyah when you begin.",
        "জামরাতুল আকাবায় (বড় জামরা) ৭টি কঙ্কর মারুন, প্রতিটির সাথে “আল্লাহু আকবার” বলুন। কঙ্কর মারা শুরু করলে তালবিয়া বন্ধ করুন।",
      ],
      [
        "Offer the sacrifice (hady) if you perform Tamattu' or Qiran. Most pilgrims arrange it through an authorised service.",
        "তামাত্তু বা কিরান করলে কুরবানি (হাদি) দিন। বেশিরভাগ হাজী অনুমোদিত সেবার মাধ্যমে এর ব্যবস্থা করেন।",
      ],
      [
        "Shave your head (Halq) or trim your hair (Taqsir). Shaving is better for men; women trim a fingertip's length.",
        "মাথা মুণ্ডন (হালক) করুন বা চুল ছাঁটুন (তাকসির)। পুরুষদের জন্য মুণ্ডন উত্তম; নারীরা আঙুলের এক গিরা পরিমাণ ছাঁটবেন।",
      ],
      [
        "After stoning and shaving or trimming, most ihram restrictions are lifted, except marital relations.",
        "কঙ্কর মারা ও চুল কাটার পর স্বামী-স্ত্রীর মিলন ছাড়া ইহরামের প্রায় সব নিষেধাজ্ঞা উঠে যায়।",
      ],
      [
        "Go to Makkah for Tawaf al-Ifadah (a pillar of Hajj), and Sa'i if you have not already performed the Hajj Sa'i. After this, all restrictions are lifted.",
        "মক্কায় গিয়ে তাওয়াফে ইফাদা (হজের রুকন) করুন; হজের সাঈ আগে না করে থাকলে সাঈও করুন। এরপর সব নিষেধাজ্ঞা উঠে যায়।",
      ],
      [
        "Some flexibility in the order of these acts is permitted for those who forget or find it difficult. Ask your guide.",
        "ভুলে গেলে বা কঠিন হলে এই আমলগুলোর ক্রমে কিছুটা শিথিলতা আছে। আপনার গাইডকে জিজ্ঞাসা করুন।",
      ],
    ],
  },
  {
    id: "tashreeq",
    title: ["Days of Tashreeq"],
    when: ["11, 12 and 13 Dhul Hijjah"],
    points: [
      [
        "Stay in Mina, remembering Allah and making takbir.",
        "মিনায় অবস্থান করুন, আল্লাহর জিকির ও তাকবির করুন।",
      ],
      [
        "After midday each day, stone the three Jamarat in order: the small, the middle, then the large (al-Aqabah), 7 pebbles each with takbir.",
        "প্রতিদিন দুপুরের পর তিনটি জামরায় পর্যায়ক্রমে কঙ্কর মারুন: ছোট, মধ্যম, তারপর বড় (আকাবা), প্রতিটিতে ৭টি করে, তাকবিরসহ।",
      ],
      [
        "You may leave Mina on the 12th before sunset after stoning. Staying for the 13th is better. If sunset comes while you are still in Mina on the 12th, stay and stone again on the 13th.",
        "১২ তারিখে কঙ্কর মারার পর সূর্যাস্তের আগে মিনা ছাড়তে পারেন। ১৩ তারিখ থাকা উত্তম। ১২ তারিখে মিনায় থাকা অবস্থায় সূর্যাস্ত হয়ে গেলে থেকে যান এবং ১৩ তারিখেও কঙ্কর মারুন।",
      ],
    ],
  },
  {
    id: "farewell",
    title: ["Farewell Tawaf"],
    when: ["Before leaving Makkah"],
    points: [
      [
        "Perform Tawaf al-Wada' as the last act before you leave Makkah.",
        "মক্কা ছাড়ার আগে শেষ আমল হিসেবে তাওয়াফুল বিদা করুন।",
      ],
      [
        "Women in menstruation or postnatal bleeding are excused from it.",
        "হায়েজ বা নিফাসগ্রস্ত নারীদের জন্য এটি মাফ।",
      ],
      [
        "Leave Makkah soon after, without lingering.",
        "এরপর বেশি দেরি না করে মক্কা ত্যাগ করুন।",
      ],
    ],
  },
];

export const UMRAH_INFO = [
  [
    "Umrah is a lesser pilgrimage that can be performed at any time of the year, subject to current Saudi regulations.",
    "উমরা একটি ছোট তীর্থযাত্রা, যা বর্তমান সৌদি নিয়ম সাপেক্ষে বছরের যেকোনো সময় করা যায়।",
  ],
  [
    "Its main acts are Ihram, Tawaf, Sa'i, and shaving or trimming the hair. Scholars differ on which are pillars and which are obligatory.",
    "প্রধান আমল: ইহরাম, তাওয়াফ, সাঈ এবং মাথা মুণ্ডন বা চুল ছাঁটা। কোনটি রুকন আর কোনটি ওয়াজিব, তা নিয়ে আলেমদের মতভেদ আছে।",
  ],
];

export const UMRAH_STEPS = [
  {
    id: "u-ihram",
    title: ["Ihram at the Miqat"],
    when: ["Before entering Makkah"],
    points: [
      [
        "Take a bath (ghusl) and wear ihram: for men two white unstitched sheets; for women ordinary modest clothing (no niqab or gloves).",
        "গোসল করে ইহরাম পরুন: পুরুষদের জন্য দুটি সাদা সেলাইবিহীন কাপড়; নারীদের জন্য সাধারণ শালীন পোশাক (নেকাব ও হাতমোজা নয়)।",
      ],
      [
        "Make the intention at or before the Miqat and say “Labbayk Umratan”. Then recite the Talbiyah often.",
        "মীকাতে বা এর আগে নিয়ত করে “লাব্বাইক উমরাতান” বলুন। তারপর বেশি বেশি তালবিয়া পড়ুন।",
      ],
      [
        "Air travellers usually enter ihram before boarding or when announced. Follow your airline and group guidance.",
        "বিমানযাত্রীরা সাধারণত ওঠার আগে বা ঘোষণা অনুযায়ী ইহরাম বাঁধেন। এয়ারলাইন ও দলের নির্দেশনা অনুসরণ করুন।",
      ],
      [
        "Avoid the prohibitions of ihram: cutting hair or nails, perfume, marital relations, hunting, arguing. Men also avoid stitched clothes and covering the head.",
        "ইহরামের নিষেধাজ্ঞা থেকে বিরত থাকুন: চুল-নখ কাটা, সুগন্ধি, স্বামী-স্ত্রীর মিলন, শিকার, ঝগড়া। পুরুষেরা সেলাই করা কাপড় পরা ও মাথা ঢাকা থেকেও বিরত থাকবেন।",
      ],
    ],
  },
  {
    id: "u-tawaf",
    title: ["Tawaf"],
    when: ["At the Kaaba"],
    points: [
      [
        "Be in a state of wudu. Stop the Talbiyah when you begin Tawaf.",
        "অজু অবস্থায় থাকুন। তাওয়াফ শুরু করলে তালবিয়া বন্ধ করুন।",
      ],
      [
        "Start at the Black Stone line and make 7 circuits keeping the Kaaba on your left. Touch or kiss the Stone if easy, otherwise point to it. Never push others.",
        "হাজরে আসওয়াদের সোজা থেকে শুরু করে কাবাকে বামে রেখে ৭ চক্কর দিন। সহজ হলে পাথর স্পর্শ বা চুম্বন করুন, নয়তো ইশারা করুন। কাউকে ধাক্কা দেবেন না।",
      ],
      [
        "Men uncover the right shoulder (idtiba') for this Tawaf and walk briskly in the first three circuits if possible (raml).",
        "পুরুষরা এই তাওয়াফে ডান কাঁধ খোলা রাখবেন (ইযতিবা) এবং সম্ভব হলে প্রথম তিন চক্করে দ্রুত হাঁটবেন (রমল)।",
      ],
      [
        "Between the Yemeni corner and the Black Stone, recite “Rabbana atina...” (see the Duas tab). At other times make any dua or dhikr.",
        "রুকনে ইয়ামানি ও হাজরে আসওয়াদের মাঝে “রাব্বানা আতিনা...” পড়ুন (Duas ট্যাব দেখুন)। বাকি সময় যেকোনো দুয়া বা জিকির করতে পারেন।",
      ],
      [
        "After 7 circuits, cover your shoulder again.",
        "৭ চক্করের পর কাঁধ আবার ঢেকে নিন।",
      ],
    ],
  },
  {
    id: "u-prayer",
    title: ["Two rak'ah and Zamzam"],
    when: ["After Tawaf"],
    points: [
      [
        "Pray two rak'ah behind Maqam Ibrahim if possible; if it is crowded, pray anywhere in the Haram.",
        "সম্ভব হলে মাকামে ইবরাহিমের পেছনে দুই রাকাত নামাজ পড়ুন; ভিড় থাকলে হারামের যেকোনো স্থানে পড়ুন।",
      ],
      ["Drink Zamzam and make dua.", "জমজম পান করে দুয়া করুন।"],
    ],
  },
  {
    id: "u-sai",
    title: ["Sa'i"],
    when: ["Between Safa and Marwa"],
    points: [
      [
        "Start at Safa. Going from Safa to Marwa counts as one, and back as two, so the 7th ends at Marwa.",
        "সাফা থেকে শুরু করুন। সাফা থেকে মারওয়া এক, ফিরে আসা দুই, এভাবে ৭ম চক্কর মারওয়ায় শেষ হবে।",
      ],
      [
        "At Safa, face the Kaaba, say takbir and make dua (see the Duas tab). Repeat at Marwa.",
        "সাফায় কাবার দিকে মুখ করে তাকবির ও দুয়া করুন (Duas ট্যাব দেখুন)। মারওয়ায়ও একইভাবে করুন।",
      ],
      [
        "Men jog lightly between the two green markers; women walk normally.",
        "দুই সবুজ চিহ্নের মাঝে পুরুষরা হালকা দৌড়ে চলবেন; নারীরা স্বাভাবিকভাবে হাঁটবেন।",
      ],
    ],
  },
  {
    id: "u-halq",
    title: ["Shave or trim"],
    when: ["Final step", "শেষ ধাপ"],
    points: [
      [
        "Men shave the head (better) or trim all of the hair. Women trim a fingertip's length from the ends.",
        "পুরুষরা মাথা মুণ্ডন (উত্তম) করবেন বা সব চুল ছাঁটবেন। নারীরা চুলের আগা থেকে আঙুলের এক গিরা পরিমাণ ছাঁটবেন।",
      ],
      [
        "If you will perform Hajj shortly after (Tamattu'), many trim now and keep shaving for Hajj.",
        "অল্প পরেই হজ (তামাত্তু) করলে অনেকে এখন ছাঁটেন এবং মুণ্ডন হজের জন্য রাখেন।",
      ],
      [
        "Your Umrah is now complete and the restrictions of ihram are lifted.",
        "আপনার উমরা এখন সম্পূর্ণ এবং ইহরামের নিষেধাজ্ঞা উঠে গেছে।",
      ],
    ],
  },
];

export const DUAS = [
  {
    id: "talbiyah",
    title: ["The Talbiyah"],
    arabic:
      "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
    translit:
      "Labbayk Allahumma labbayk, labbayka la sharika laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.",
    meaning: [
      "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace and sovereignty belong to You. You have no partner.",
      "আমি হাজির, হে আল্লাহ, আমি হাজির। আমি হাজির, আপনার কোনো শরিক নেই, আমি হাজির। নিশ্চয়ই সমস্ত প্রশংসা, নিয়ামত ও রাজত্ব আপনারই। আপনার কোনো শরিক নেই।",
    ],
    ref: "Sahih al-Bukhari 1549; Sahih Muslim 1184",
  },
  {
    id: "tawaf",
    title: ["During Tawaf (between the Yemeni corner and the Black Stone)"],
    arabic:
      "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translit:
      "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
    meaning: [
      "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
      "হে আমাদের রব, আমাদের দুনিয়াতে কল্যাণ দিন, আখিরাতেও কল্যাণ দিন এবং আমাদের জাহান্নামের আযাব থেকে রক্ষা করুন।",
    ],
    ref: "Quran 2:201",
  },
  {
    id: "maqam",
    title: ["Approaching Maqam Ibrahim"],
    arabic: "وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى",
    translit: "Wattakhidhu min maqami Ibrahima musalla.",
    meaning: [
      "And take the standing place of Abraham as a place of prayer.",
      "আর তোমরা ইবরাহিমের দাঁড়ানোর স্থানকে সালাতের স্থান হিসেবে গ্রহণ করো।",
    ],
    ref: "Quran 2:125",
  },
  {
    id: "safa-verse",
    title: ["When approaching Safa"],
    arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
    translit: "Innas-Safa wal-Marwata min sha'a'irillah.",
    meaning: [
      "Indeed, Safa and Marwa are among the symbols of Allah.",
      "নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্গত।",
    ],
    ref: "Quran 2:158",
  },
  {
    id: "safa-dhikr",
    title: ["Dhikr at Safa and Marwa"],
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ أَنْجَزَ وَعْدَهُ وَنَصَرَ عَبْدَهُ وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
    translit:
      "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. La ilaha illallahu wahdah, anjaza wa'dah, wa nasara 'abdah, wa hazamal-ahzaba wahdah.",
    meaning: [
      "There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He has power over all things. There is no god but Allah alone. He fulfilled His promise, helped His servant, and defeated the confederates alone.",
      "আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব ও প্রশংসা তাঁরই, তিনি সবকিছুর ওপর ক্ষমতাবান। আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক। তিনি তাঁর প্রতিশ্রুতি পূর্ণ করেছেন, তাঁর বান্দাকে সাহায্য করেছেন এবং একাই সম্মিলিত শত্রুবাহিনীকে পরাজিত করেছেন।",
    ],
    ref: "Sahih Muslim 1218",
  },
  {
    id: "arafah",
    title: ["Best dua on the Day of Arafah"],
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    translit:
      "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir.",
    meaning: [
      "There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He has power over all things.",
      "আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই, প্রশংসাও তাঁরই, আর তিনি সবকিছুর ওপর ক্ষমতাবান।",
    ],
    ref: "Jami at-Tirmidhi 3585",
  },
  {
    id: "jamarat",
    title: ["With each pebble at the Jamarat"],
    arabic: "اللَّهُ أَكْبَرُ",
    translit: "Allahu Akbar.",
    meaning: ["Allah is the Greatest.", "আল্লাহ সবচেয়ে বড়।"],
    ref: "Sahih Muslim 1218",
  },
];

export const CHECKLIST = [
  {
    id: "docs",
    title: ["Documents"],
    items: [
      { id: "passport", text: ["Passport with enough validity", "পর্যাপ্ত মেয়াদসহ পাসপোর্ট"] },
      { id: "visa", text: ["Visa and Hajj or Umrah permit confirmation", "ভিসা এবং হজ বা উমরার অনুমতির নিশ্চিতকরণ"] },
      { id: "tickets", text: ["Flight tickets", "বিমানের টিকিট"] },
      { id: "vaccine", text: ["Required vaccination certificates", "প্রয়োজনীয় টিকার সনদ"] },
      { id: "hotel", text: ["Accommodation details and group leader's contact", "থাকার ঠিকানা ও দলনেতার যোগাযোগ নম্বর"] },
      { id: "copies", text: ["Copies of all documents (paper and phone photos)", "সব ডকুমেন্টের কপি (কাগজে ও ফোনে ছবি)"] },
      { id: "emergency", text: ["Emergency contacts and a medical information card", "জরুরি যোগাযোগ নম্বর ও স্বাস্থ্যতথ্যের কার্ড"] },
    ],
  },
  {
    id: "clothing",
    title: ["Clothing"],
    items: [
      { id: "ihram", text: ["Ihram sheets, two sets (men)", "ইহরামের কাপড়, দুই সেট (পুরুষ)"] },
      { id: "modest", text: ["Comfortable, modest clothing", "আরামদায়ক ও শালীন পোশাক"] },
      { id: "sandals", text: ["Comfortable walking sandals or shoes", "হাঁটার জন্য আরামদায়ক স্যান্ডেল বা জুতা"] },
      { id: "pouch", text: ["Small pouch or belt bag for essentials", "প্রয়োজনীয় জিনিসের জন্য ছোট পাউচ বা বেল্ট ব্যাগ"] },
    ],
  },
  {
    id: "health",
    title: ["Health"],
    items: [
      { id: "meds", text: ["Personal medicines with prescriptions", "নিজের ওষুধ ও প্রেসক্রিপশন"] },
      { id: "firstaid", text: ["First aid: plasters, pain relief, oral rehydration salts", "প্রাথমিক চিকিৎসা: ব্যান্ডেজ, ব্যথার ওষুধ, খাবার স্যালাইন"] },
      { id: "unscented", text: ["Unscented sunscreen, soap and lip balm", "সুগন্ধিহীন সানস্ক্রিন, সাবান ও লিপ বাম"] },
      { id: "masks", text: ["Face masks and hand sanitiser", "মাস্ক ও হ্যান্ড স্যানিটাইজার"] },
      { id: "bottle", text: ["Reusable water bottle", "বারবার ব্যবহারযোগ্য পানির বোতল"] },
    ],
  },
  {
    id: "worship",
    title: ["Worship"],
    items: [
      { id: "quran", text: ["Pocket Quran or Quran app", "পকেট কুরআন বা কুরআন অ্যাপ"] },
      { id: "duabook", text: ["Dua book or this guide saved offline", "দুয়ার বই বা অফলাইনে সেভ করা এই গাইড"] },
      { id: "mat", text: ["Small prayer mat", "ছোট জায়নামাজ"] },
      { id: "tasbih", text: ["Tasbih", "তসবিহ"] },
      { id: "notebook", text: ["Notebook with your personal dua list", "নিজের দুয়ার তালিকাসহ নোটবুক"] },
    ],
  },
  {
    id: "money",
    title: ["Money and gadgets"],
    items: [
      { id: "cash", text: ["Some Saudi riyal cash and a card", "কিছু সৌদি রিয়াল নগদ ও একটি কার্ড"] },
      { id: "powerbank", text: ["Power bank and charger", "পাওয়ার ব্যাংক ও চার্জার"] },
      { id: "adapter", text: ["Travel plug adapter", "ট্রাভেল প্লাগ অ্যাডাপ্টার"] },
      { id: "sim", text: ["Phone data plan or local SIM", "ফোনের ডাটা প্ল্যান বা স্থানীয় সিম"] },
      { id: "umbrella", text: ["Umbrella and small backpack", "ছাতা ও ছোট ব্যাকপ্যাক"] },
    ],
  },
];

export const HEALTH_TIPS = [
  [
    "Drink water regularly, even if you do not feel thirsty.",
    "তৃষ্ণা না লাগলেও নিয়মিত পানি পান করুন।",
  ],
  [
    "Avoid the midday sun when you can. Rest in the shade and use an umbrella.",
    "সম্ভব হলে দুপুরের রোদ এড়িয়ে চলুন। ছায়ায় বিশ্রাম নিন ও ছাতা ব্যবহার করুন।",
  ],
  [
    "Know the signs of heat exhaustion (dizziness, heavy sweating, nausea, headache) and seek medical help early.",
    "গরমজনিত ক্লান্তির লক্ষণ (মাথা ঘোরা, অতিরিক্ত ঘাম, বমি বমি ভাব, মাথাব্যথা) চিনে রাখুন এবং দ্রুত চিকিৎসা নিন।",
  ],
  [
    "Wear comfortable footwear and look after your feet to avoid blisters.",
    "আরামদায়ক জুতা পরুন এবং ফোসকা এড়াতে পায়ের যত্ন নিন।",
  ],
  [
    "Wash your hands often and consider a mask in crowded places.",
    "ঘন ঘন হাত ধুন এবং ভিড়ের জায়গায় মাস্ক পরার কথা ভাবুন।",
  ],
  [
    "Stay calm in crowds. Do not push at the Black Stone or the Jamarat. Worship should not harm anyone.",
    "ভিড়ে শান্ত থাকুন। হাজরে আসওয়াদ বা জামরায় ধাক্কাধাক্কি করবেন না। ইবাদতের কারণে কারও ক্ষতি হওয়া উচিত নয়।",
  ],
];

export const TRAVEL_TIPS = [
  [
    "Book only through licensed, registered agencies, and verify them with the official authorities.",
    "শুধু লাইসেন্সপ্রাপ্ত, নিবন্ধিত এজেন্সির মাধ্যমে বুকিং করুন এবং সরকারি কর্তৃপক্ষের কাছে যাচাই করে নিন।",
  ],
  [
    "Visa, vaccine, permit and quota rules change often. Check the latest requirements from official sources before you plan.",
    "ভিসা, টিকা, অনুমতি ও কোটার নিয়ম প্রায়ই বদলায়। পরিকল্পনার আগে সরকারি উৎস থেকে সর্বশেষ নিয়ম দেখে নিন।",
  ],
  [
    "Save your group leader's number and carry a card with your hotel address.",
    "দলনেতার নম্বর সেভ করে রাখুন এবং হোটেলের ঠিকানাসহ একটি কার্ড সাথে রাখুন।",
  ],
  [
    "Do not carry large amounts of cash. Label your luggage clearly.",
    "বেশি নগদ টাকা সাথে রাখবেন না। লাগেজে স্পষ্ট করে নাম লিখুন।",
  ],
  [
    "Learn the rites before you travel by attending a training session or reading a trusted guide.",
    "যাওয়ার আগে প্রশিক্ষণে অংশ নিয়ে বা নির্ভরযোগ্য গাইড পড়ে আমলগুলো শিখে নিন।",
  ],
  [
    "Visiting the Prophet's Mosque in Madinah is not part of Hajj, but many pilgrims include it in their trip.",
    "মদিনায় মসজিদে নববি জিয়ারত হজের অংশ নয়, তবে অনেক হাজী সফরে এটি যোগ করেন।",
  ],
];