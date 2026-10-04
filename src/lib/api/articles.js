import { ARTICLES, CATEGORIES } from "@/data/articles";

// ইংরেজি লেখার শব্দসংখ্যা থেকে পড়ার সময় (মিনিট)
const minutes = (a) =>
  Math.max(
    1,
    Math.ceil(a.body.map((p) => p[0]).join(" ").split(/\s+/).length / 200)
  );

// তালিকার জন্য হালকা রূপ (পুরো লেখা ছাড়া)
const summary = (a) => ({
  slug: a.slug,
  cat: a.cat,
  date: a.date,
  icon: a.icon,
  bg: a.bg,
  title: a.title,
  excerpt: a.excerpt,
  minutes: minutes(a),
});

const byNewest = (a, b) => b.date.localeCompare(a.date);

// এখন লোকাল ডাটা। ব্যাকএন্ড রেডি হলে শুধু এই ফাংশনগুলোর ভেতরটা বদলাব।

export async function getCategories() {
  return CATEGORIES.map((c) => ({
    ...c,
    count: ARTICLES.filter((a) => a.cat === c.id).length,
  })).filter((c) => c.count > 0);
}

export async function getArticles() {
  return [...ARTICLES].sort(byNewest).map(summary);
}

export async function getArticle(slug) {
  const a = ARTICLES.find((x) => x.slug === slug);
  return a ? { ...a, minutes: minutes(a) } : null;
}

export async function getRelated(slug, count = 3) {
  const current = ARTICLES.find((x) => x.slug === slug);
  const others = ARTICLES.filter((x) => x.slug !== slug).sort(byNewest);
  const same = others.filter((x) => x.cat === current?.cat);
  const rest = others.filter((x) => x.cat !== current?.cat);
  return [...same, ...rest].slice(0, count).map(summary);
}