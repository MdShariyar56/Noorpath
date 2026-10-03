import categories from "@/data/dua/categories.json";
import subcategories from "@/data/dua/subcategories.json";
import duas from "@/data/dua/duas.json";

// এখন লোকাল JSON। ব্যাকএন্ড রেডি হলে শুধু এই ফাংশনগুলোর ভেতর বদলাব।

export async function getCategories() {
  return categories;
}

export async function getCategory(slug) {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;
  const subs = subcategories
    .filter((s) => s.category === slug)
    .map((s) => ({ ...s, count: s.duaIds.length }));
  return { category, subs };
}

export async function getSubCategory(id) {
  const sub = subcategories.find((s) => String(s.id) === String(id));
  if (!sub) return null;
  const category = categories.find((c) => c.slug === sub.category);
  const list = sub.duaIds.map((i) => duas[i]).filter(Boolean);
  return { sub, category, duas: list };
}