export default function Highlight({ text, terms }) {
  const safe = (terms || [])
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!text || safe.length === 0) return <>{text}</>;

  const parts = String(text).split(new RegExp(`(${safe.join("|")})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-gold-400/30 px-0.5 text-inherit">
            {p}
          </mark>
        ) : (
          p
        )
      )}
    </>
  );
}