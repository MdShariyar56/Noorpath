// ব্যাকএন্ডের ঠিকানা। .env.local এ NEXT_PUBLIC_API_URL=http://localhost:5000/api দিলে চালু হবে
const BASE = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(code, status = 0) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

async function post(path, body) {
  if (!BASE) throw new ApiError("NOT_CONNECTED");

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // টোকেন থাকবে httpOnly কুকিতে, JS দিয়ে পড়া যাবে না
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError("NETWORK");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError("REQUEST_FAILED", res.status);
  return data;
}

export const login = (body) => post("/auth/login", body);
export const register = (body) => post("/auth/register", body);
export const forgotPassword = (body) => post("/auth/forgot-password", body);

// ব্যবহারকারীকে দেখানোর বার্তা [ইংরেজি, বাংলা]
export function authErrorText(err, kind) {
  if (err?.code === "NOT_CONNECTED")
    return [
      "The server is not connected yet. Account features will work once the backend is ready.",
      "সার্ভার এখনো সংযুক্ত হয়নি। ব্যাকএন্ড প্রস্তুত হলে অ্যাকাউন্টের সুবিধা কাজ করবে।",
    ];
  if (err?.code === "NETWORK")
    return [
      "Could not reach the server. Please check your connection and try again.",
      "সার্ভারে পৌঁছানো যায়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন।",
    ];
  if (err?.status === 401 && kind === "login")
    return ["Incorrect email or password.", "ইমেইল বা পাসওয়ার্ড ভুল।"];
  if (err?.status === 409 && kind === "register")
    return [
      "An account with this email already exists.",
      "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা আছে।",
    ];
  if (err?.status === 429)
    return [
      "Too many attempts. Please wait a few minutes and try again.",
      "অনেকবার চেষ্টা করা হয়েছে। কয়েক মিনিট অপেক্ষা করে আবার চেষ্টা করুন।",
    ];
  return ["Something went wrong. Please try again.", "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।"];
}