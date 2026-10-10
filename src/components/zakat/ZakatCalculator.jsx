"use client";

import { useMemo, useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";
import { BHORI_G, RATE, calculateZakat, num } from "@/lib/zakat";

// ২,৮০,০০০ (লাখ-কোটি) গ্রুপিং। ২৮০,০০০ চাইলে "en-US" দাও
const LOCALE = "en-IN";
const fmt = (n) =>
  "৳ " + n.toLocaleString(LOCALE, { maximumFractionDigits: 2 });

// শুধু সংখ্যা ও একটা দশমিক বিন্দু রাখে
const clean = (s) => s.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");

const EMPTY = {
  goldW: "",
  goldP: "",
  silverW: "",
  silverP: "",
  cash: "",
  business: "",
  invest: "",
  receivable: "",
  otherAsset: "",
  debts: "",
  otherLiab: "",
};

// ইংরেজি লেখা, তার নিচে বাংলা
function Bi({ en, bn }) {
  return (
    <>
      <span>{en}</span>
    </>
  );
}

function Section({ en, bn, children }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 font-bold">
        {en}
      </h2>
      {children}
    </section>
  );
}

function Segment({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-border bg-background p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            value === o.value
              ? "bg-brand-600 text-white"
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Field({ en, bn, hint, warn, value, onChange, prefix = "৳", suffix }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {en}
      </span>
      <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background px-3 focus-within:border-brand-500">
        {prefix && <span className="mr-2 text-sm text-muted">{prefix}</span>}
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(clean(e.target.value))}
          placeholder="0"
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
        />
        {suffix && (
          <span className="ml-2 shrink-0 text-xs text-muted">{suffix}</span>
        )}
      </div>
      {hint && <span className="mt-1 block text-[11px] text-muted">{hint}</span>}
      {warn && (
        <span className="mt-1 block text-[11px] text-amber-600 dark:text-amber-400">
          {warn}
        </span>
      )}
    </label>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 text-sm">
      <span className="text-brand-100">{label}</span>
      <span className={`tabular-nums ${strong ? "font-bold" : "font-medium"}`}>
        {value}
      </span>
    </div>
  );
}

export default function ZakatCalculator() {
  const [v, setV] = useState(EMPTY);
  const [unit, setUnit] = useState("gram"); // gram | bhori
  const [basis, setBasis] = useState("silver"); // silver | gold

  const set = (key) => (val) => setV((s) => ({ ...s, [key]: val }));

  // ইউনিট বদলালে ওজন ও দামও রূপান্তর করে দেয়
  const changeUnit = (next) => {
    if (next === unit) return;
    const wm = next === "bhori" ? 1 / BHORI_G : BHORI_G; // ওজনের গুণক
    const pm = 1 / wm; // দামের গুণক (উল্টো)
    const conv = (s, m) => {
      const n = parseFloat(s);
      return Number.isFinite(n) ? String(+(n * m).toFixed(3)) : "";
    };
    setV((s) => ({
      ...s,
      goldW: conv(s.goldW, wm),
      silverW: conv(s.silverW, wm),
      goldP: conv(s.goldP, pm),
      silverP: conv(s.silverP, pm),
    }));
    setUnit(next);
  };

  const r = useMemo(() => calculateZakat(v, { unit, basis }), [v, unit, basis]);

  const u = unit === "bhori" ? "bhori" : "g";
  const uLabel = unit === "bhori" ? "bhori" : "gram";
  const nisabBhori = Number((r.nisabGrams / BHORI_G).toFixed(2));
  const basisEn = basis === "gold" ? "gold" : "silver";

  const goldMissing = num(v.goldW) > 0 && num(v.goldP) === 0;
  const silverMissing = num(v.silverW) > 0 && num(v.silverP) === 0;
  const missingMsg = "Enter the price to include this";

  let status;
  if (!r.priceKnown) {
    status = {
      tone: "bg-amber-400/20 text-amber-100",
      en: `Enter the ${basisEn} price to check the nisab`,
    };
  } else if (r.due) {
    status = {
      tone: "bg-emerald-400/25 text-emerald-100",
      en: "Above nisab: zakat is due",
    };
  } else {
    status = {
      tone: "bg-white/15 text-white",
      en: "Below nisab: no zakat due",
    };
  }

  return (
    <div className="space-y-6">

    <div className=" rounded-2xl flex items-center gap-4 text-2xl  bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4 text-white">
        <img loading="lazy"
          src="https://imglink.cc/cdn/nVK8A1h5vi.png"
          alt="Zakat Calculator Logo"
          className="h-17 w-17 rounded-full border-2 object-cover"
        />
        <div className="">
          <p className="font-bold text-2xl">Zakat Calculator</p>
          <p className="mt-1 text-sm text-brand-100 flex items-center gap-2">
              Calculate your zakat easily
          </p>
        </div>
      </div>


     

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* ইনপুট */}
        <div className="space-y-5">
          <Section en="Settings">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">
                  Gold &amp; silver unit{" "}
                </p>
                <Segment
                  value={unit}
                  onChange={changeUnit}
                  options={[
                    { value: "gram", label: "Gram" },
                    { value: "bhori", label: "Bhori" },
                  ]}
                />
                <p className="mt-1.5 text-[11px] text-muted">
                  1 bhori (tola) = 11.664 g
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">
                  Nisab based on 
                </p>
                <Segment
                  value={basis}
                  onChange={setBasis}
                  options={[
                    { value: "silver", label: "Silver (52.5 bhori)" },
                    { value: "gold", label: "Gold  (7.5 bhori)" },
                  ]}
                />
                <p className="mt-1.5 text-[11px] text-muted">
                  Silver nisab is lower, gold nisab is higher. Scholars differ,
                  so follow the guidance you trust. 
                </p>
              </div>
            </div>
          </Section>

          <Section en="Gold & Silver" bn="সোনা ও রূপা">
            <p className="mb-4 text-xs text-muted">
              We don&apos;t fetch live prices. Enter today&apos;s market price
              (for gold, the price of your gold&apos;s purity, e.g. 22K).
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                en="Gold weight"
                prefix=""
                suffix={u}
                value={v.goldW}
                onChange={set("goldW")}
              />
              <Field
                en={`Gold price per ${unit}`}
                suffix={`/ ${u}`}
                value={v.goldP}
                onChange={set("goldP")}
                warn={goldMissing ? missingMsg : null}
              />
              <Field
                en="Silver weight"
                prefix=""
                suffix={u}
                value={v.silverW}
                onChange={set("silverW")}
              />
              <Field
                en={`Silver price per ${unit}`}
                suffix={`/ ${u}`}
                value={v.silverP}
                onChange={set("silverP")}
                warn={silverMissing ? missingMsg : null}
              />
            </div>
            <p className="mt-3 text-[11px] text-muted">
              Unit: {uLabel}. Rulings on jewellery differ between schools of
              thought.
            </p>
          </Section>

          <Section en="Other assets">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                en="Cash in hand & bank"
                value={v.cash}
                onChange={set("cash")}
              />
              <Field
                en="Business stock & trade goods"
                value={v.business}
                onChange={set("business")}
              />
              <Field
                en="Investments & shares"
                hint="Current market value"
                value={v.invest}
                onChange={set("invest")}
              />
              <Field
                en="Money owed to you"
                hint="Only what you expect to be repaid"
                value={v.receivable}
                onChange={set("receivable")}
              />
              <Field
                en="Other zakatable assets"
                value={v.otherAsset}
                onChange={set("otherAsset")}
              />
            </div>
          </Section>

          <Section en="Liabilities">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                en="Debts due"
                hint="Loans and bills that are due now"
                value={v.debts}
                onChange={set("debts")}
              />
              <Field
                en="Other liabilities"
                value={v.otherLiab}
                onChange={set("otherLiab")}
              />
            </div>
          </Section>
        </div>

        {/* ফল */}
        <aside className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600 p-5 text-white lg:sticky lg:top-20">
          <p className="text-sm text-brand-100">Zakat due</p>
          <p className="mt-1 text-4xl font-bold tabular-nums text-gold-400">
            {fmt(r.zakat)}
          </p>
          <p className="mt-1 text-xs text-brand-100">
            {(RATE * 100).toFixed(1)}% of net wealth 2.5%
          </p>

          <p className={`mt-4 rounded-xl px-3 py-2 text-sm font-medium ${status.tone}`}>
            <Bi en={status.en} bn={status.bn} />
          </p>

          <div className="mt-4 divide-y divide-white/15 border-t border-white/15">
            <Row
              label={<Bi en="Total assets"  />}
              value={fmt(r.assets)}
            />
            <Row
              label={<Bi en="Liabilities"  />}
              value={`− ${fmt(r.liabilities)}`}
            />
            <Row
              strong
              label={<Bi en="Net wealth"  />}
              value={fmt(r.net)}
            />
            <Row
              label={
                <>
                  <Bi
                    en={`Nisab (${basisEn})`}
                  />
                  <span className="block text-[11px] text-brand-200">
                    {r.nisabGrams} g = {nisabBhori} bhori
                  </span>
                </>
              }
              value={r.priceKnown ? fmt(r.nisabValue) : "—"}
            />
          </div>

          <button
            onClick={() => setV(EMPTY)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium hover:bg-white/25"
          >
            <RotateCcw size={14} /> Reset
          </button>

          <p className="mt-4 text-[11px] leading-relaxed text-brand-200">
            <Bi
              en="Zakat is due on wealth held for one full lunar year (hawl) that reaches the nisab."
            />
          </p>
        </aside>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
        <p className="mb-1 font-semibold">Please note</p>
        <p>
          <Bi
            en="This calculator gives an estimate to help you. Rulings can differ (for example the nisab basis, jewellery, shares and receivables), so please consult a qualified scholar for your situation."
          />
        </p>
      </div>
    </div>
  );
}