export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// প্রতিটা এরর [ইংরেজি, বাংলা] জোড়া। সঠিক হলে null।
export function validateEmail(v) {
  const t = v.trim();
  if (!t) return ["Enter your email.", "আপনার ইমেইল লিখুন।"];
  if (!EMAIL_RE.test(t) || t.length > 254)
    return ["Enter a valid email address.", "সঠিক ইমেইল ঠিকানা লিখুন।"];
  return null;
}

export function validateName(v) {
  const t = v.trim();
  if (!t) return ["Enter your full name.", "আপনার পুরো নাম লিখুন।"];
  if (t.length < 2) return ["Name is too short.", "নামটি খুব ছোট।"];
  if (t.length > 60) return ["Name is too long.", "নামটি খুব বড়।"];
  return null;
}

export function validatePassword(v) {
  if (!v) return ["Enter a password.", "একটি পাসওয়ার্ড লিখুন।"];
  if (v.length < 8)
    return ["Use at least 8 characters.", "কমপক্ষে ৮টি অক্ষর ব্যবহার করুন।"];
  if (v.length > 128) return ["Password is too long.", "পাসওয়ার্ড খুব বড়।"];
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v))
    return [
      "Include at least one letter and one number.",
      "কমপক্ষে একটি অক্ষর ও একটি সংখ্যা রাখুন।",
    ];
  return null;
}

export function validateConfirm(p, c) {
  if (!c) return ["Confirm your password.", "পাসওয়ার্ডটি আবার লিখুন।"];
  if (p !== c) return ["Passwords do not match.", "পাসওয়ার্ড দুটি মিলছে না।"];
  return null;
}

// 0 থেকে 4
export function passwordStrength(v) {
  if (!v) return 0;
  let s = 0;
  if (v.length >= 8) s++;
  if (v.length >= 12) s++;
  if (/[A-Za-z]/.test(v) && /\d/.test(v)) s++;
  if ((/[a-z]/.test(v) && /[A-Z]/.test(v)) || /[^A-Za-z0-9]/.test(v)) s++;
  return s;
}

// লগইনের পর কোথায় যাবে, শুধু সাইটের ভেতরের পাথ চলবে (বাইরের লিংকে পাঠানো বন্ধ)
export function safeNext(v) {
  const s = Array.isArray(v) ? v[0] : v;
  return typeof s === "string" && s.startsWith("/") && !s.startsWith("//") && !s.includes("\\")
    ? s
    : "/";
}