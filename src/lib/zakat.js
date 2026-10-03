export const RATE = 0.025; // ২.৫%
export const GOLD_NISAB_G = 87.48; // ৭.৫ ভরি
export const SILVER_NISAB_G = 612.36; // ৫২.৫ ভরি
export const BHORI_G = 11.664; // ১ ভরি (তোলা) = ১১.৬৬৪ গ্রাম

// ইনপুটের লেখা থেকে নিরাপদে সংখ্যা বের করা
export const num = (s) => {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function calculateZakat(v, { unit, basis }) {
  // ওজন ও দাম একই ইউনিটে, তাই গুণ করলেই মূল্য
  const goldValue = num(v.goldW) * num(v.goldP);
  const silverValue = num(v.silverW) * num(v.silverP);

  const assets =
    goldValue +
    silverValue +
    num(v.cash) +
    num(v.business) +
    num(v.invest) +
    num(v.receivable) +
    num(v.otherAsset);

  const liabilities = num(v.debts) + num(v.otherLiab);
  const net = Math.max(0, assets - liabilities);

  const factor = unit === "bhori" ? BHORI_G : 1;
  const nisabGrams = basis === "gold" ? GOLD_NISAB_G : SILVER_NISAB_G;
  const price = basis === "gold" ? num(v.goldP) : num(v.silverP);

  const priceKnown = price > 0;
  const nisabValue = priceKnown ? (nisabGrams / factor) * price : 0;
  const due = priceKnown && net > 0 && net >= nisabValue;

  return {
    goldValue,
    silverValue,
    assets,
    liabilities,
    net,
    nisabGrams,
    nisabValue,
    priceKnown,
    due,
    zakat: due ? net * RATE : 0,
  };
}