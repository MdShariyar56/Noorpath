import { ApiError } from "./auth";

const BASE = process.env.NEXT_PUBLIC_API_URL;

// শুধু অ্যাডমিন পাবে। সাধারণ ইউজার বা লগইন ছাড়া ব্যর্থ হবে
export async function getAdminStats() {
  if (!BASE) throw new ApiError("NOT_CONNECTED");

  let res;
  try {
    res = await fetch(`${BASE}/admin/stats`, { credentials: "include" });
  } catch {
    throw new ApiError("NETWORK");
  }

  if (!res.ok) throw new ApiError("REQUEST_FAILED", res.status);
  return res.json();
}