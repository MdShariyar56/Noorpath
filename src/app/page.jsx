export default function Home() {
  return (
    <main className="p-10 space-y-6">
      <h1 className="text-3xl font-bold text-brand-600">NoorPath</h1>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="font-arabic text-3xl text-right">رَبِّ زِدْنِي عِلْمًا</p>
        <p className="mt-2 text-muted">O my Lord, increase me in knowledge.</p>
        <p className="mt-1">আমার প্রভু, আমার জ্ঞান বৃদ্ধি করে দিন।</p>
      </div>

      <button className="rounded-xl bg-brand-600 px-5 py-2.5 text-white hover:bg-brand-700">
        Button
      </button>
    </main>
  );
}