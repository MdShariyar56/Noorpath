"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { addBookmark, listBookmarks, removeBookmark } from "@/lib/api/bookmarks";

// type: "hadith" বা "dua"। prefix: এই পেজের বুকমার্ক চেনার শুরুর অংশ
export default function useBookmarks(type, { prefix = "" } = {}) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [marked, setMarked] = useState(() => new Set());
  const [pending, setPending] = useState(() => new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setMarked(new Set());
      return;
    }
    let cancelled = false;
    listBookmarks(type)
      .then((list) => {
        if (cancelled) return;
        setMarked(
          new Set(list.map((b) => b.target).filter((t) => t.startsWith(prefix)))
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user?.id, type, prefix]);

  const toggle = async (target, label, nextUrl) => {
    if (loading || pending.has(target)) return;

    const goLogin = () =>
      router.push(`/login?next=${encodeURIComponent(nextUrl)}`);
    if (!user) return goLogin();

    const was = marked.has(target);
    setError(null);
    setPending((p) => new Set(p).add(target));
    // সাথে সাথে দেখাই, ব্যর্থ হলে ফিরিয়ে নিই
    setMarked((m) => {
      const n = new Set(m);
      if (was) n.delete(target);
      else n.add(target);
      return n;
    });

    try {
      if (was) await removeBookmark(type, target);
      else await addBookmark(type, target, label);
    } catch (err) {
      setMarked((m) => {
        const n = new Set(m);
        if (was) n.add(target);
        else n.delete(target);
        return n;
      });
      if (err?.status === 401) {
        goLogin();
      } else if (err?.code === "NOT_CONNECTED") {
        setError([
          "The server is not connected yet.",
          "সার্ভার এখনো সংযুক্ত হয়নি।",
        ]);
      } else {
        setError([
          "Could not update the bookmark. Please try again.",
          "বুকমার্ক আপডেট করা যায়নি। আবার চেষ্টা করুন।",
        ]);
      }
    } finally {
      setPending((p) => {
        const n = new Set(p);
        n.delete(target);
        return n;
      });
    }
  };

  return { marked, pending, error, loggedIn: !!user, toggle };
}