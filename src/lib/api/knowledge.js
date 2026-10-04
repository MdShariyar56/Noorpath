import { GLOSSARY, TOPICS } from "@/data/knowledge";

const countOf = (t) =>
  t.kind === "glossary"
    ? GLOSSARY.length
    : t.sections.reduce((n, s) => n + s.items.length, 0);

// এখন লোকাল ডাটা। ব্যাকএন্ড রেডি হলে শুধু এই ফাংশনগুলোর ভেতরটা বদলাব।

export async function getTopics() {
  return TOPICS.map((t) => ({
    slug: t.slug,
    icon: t.icon,
    bg: t.bg,
    title: t.title,
    desc: t.desc,
    kind: t.kind || "guide",
    count: countOf(t),
  }));
}

export async function getTopic(slug) {
  return TOPICS.find((t) => t.slug === slug) ?? null;
}

export async function getGlossary() {
  return [...GLOSSARY].sort((a, b) => a.t[0].localeCompare(b.t[0], "en"));
}