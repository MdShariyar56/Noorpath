import { ApiError } from "./auth";

const BASE = process.env.NEXT_PUBLIC_API_URL;

async function request(method, path, body) {
  if (!BASE) throw new ApiError("NOT_CONNECTED");

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      credentials: "include", // লগইনের কুকি সাথে পাঠায়
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("NETWORK");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError("REQUEST_FAILED", res.status);
  return data;
}

// আমার বুকমার্কের তালিকা
export async function listBookmarks(type) {
  const q = type ? `?type=${encodeURIComponent(type)}` : "";
  const data = await request("GET", `/me/bookmarks${q}`);
  return data.bookmarks ?? [];
}

// target এর উদাহরণ: "2:255" (সূরা:আয়াত)
export const addBookmark = (type, target, label = "") =>
  request("POST", "/me/bookmarks", { type, target, label });

export const removeBookmark = (type, target) =>
  request(
    "DELETE",
    `/me/bookmarks?type=${encodeURIComponent(type)}&target=${encodeURIComponent(target)}`
  );

// কুরআনে শেষ কোথায় ছিলাম। না থাকলে null
export async function getLastRead() {
  const data = await request("GET", "/me/last-read");
  return data.lastRead ?? null;
}

export const setLastRead = (surah, ayah) =>
  request("PUT", "/me/last-read", { surah, ayah });