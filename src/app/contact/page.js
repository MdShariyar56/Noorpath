import { Mail } from "lucide-react";
import { SITE } from "@/data/site";

export const metadata = { title: "Contact | NoorPath" };

const topics = [
  {
    key: "error",
    subject: "Content error report",
    en: "Report an error",
    bn: "ভুল জানান",
    tip: [
      "Tell us the page address, what is wrong and, if you know it, what it should say.",
      "পেজের ঠিকানা, কী ভুল এবং জানলে সঠিকটা কী হবে তা লিখুন।",
    ],
  },
  {
    key: "delete",
    subject: "Account deletion request",
    en: "Delete my account",
    bn: "আমার অ্যাকাউন্ট মুছুন",
    tip: [
      "Write from the email address you registered with, so we can find your account.",
      "যে ইমেইল দিয়ে রেজিস্টার করেছেন সেটা থেকে লিখুন, যাতে আমরা আপনার অ্যাকাউন্ট খুঁজে পাই।",
    ],
  },
  {
    key: "feedback",
    subject: "Feedback",
    en: "Feedback or question",
    bn: "মতামত বা প্রশ্ন",
    tip: [
      "Suggestions, questions or anything else are welcome.",
      "পরামর্শ, প্রশ্ন বা অন্য যেকোনো কিছু জানাতে পারেন।",
    ],
  },
];

export default function ContactPage() {
  const email = SITE.contactEmail;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Mail /> Contact
        </h1>
        <p className="text-brand-100">যোগাযোগ</p>
        <p className="mt-3 text-sm text-brand-100">
          We would like to hear from you.
          <span className="block opacity-75">আপনার কথা শুনতে আমরা আগ্রহী।</span>
        </p>
      </div>

      {process.env.NODE_ENV !== "production" && !email && (
        <p className="rounded-xl border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          Developer note: set <code>contactEmail</code> in <code>src/data/site.js</code>{" "}
          before launch. (This note is hidden on the live site.)
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {topics.map((t) => {
          const href = email
            ? `mailto:${email}?subject=${encodeURIComponent(`NoorPath: ${t.subject}`)}`
            : null;
          return (
            <section
              key={t.key}
              className="flex flex-col rounded-2xl border border-border bg-card p-5"
            >
              <h2 className="font-bold">{t.en}</h2>
              <p className="text-xs text-muted">{t.bn}</p>
              <p className="mt-3 flex-1 text-sm text-foreground/80">
                {t.tip[0]}
                <span className="block opacity-75">{t.tip[1]}</span>
              </p>
              {href ? (
                <a
                  href={href}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  <Mail size={15} /> Email us / ইমেইল করুন
                </a>
              ) : (
                <span className="mt-4 inline-block rounded-full border border-border px-4 py-2 text-center text-sm text-muted">
                  —
                </span>
              )}
            </section>
          );
        })}
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 text-sm">
        <h2 className="font-bold">
          Email <span className="font-medium text-muted">/ ইমেইল</span>
        </h2>
        <p className="mt-2">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="font-semibold text-brand-600 hover:underline dark:text-brand-300"
            >
              {email}
            </a>
          ) : (
            <span className="text-muted">—</span>
          )}
        </p>
        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          Please never send your password in an email. We will never ask for it.
          <span className="block opacity-80">
            ইমেইলে কখনো আপনার পাসওয়ার্ড পাঠাবেন না। আমরা কখনো তা চাইব না।
          </span>
        </p>
      </section>
    </div>
  );
}