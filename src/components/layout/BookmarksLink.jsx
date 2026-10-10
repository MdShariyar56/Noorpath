"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function BookmarksLink() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const active = pathname === "/bookmarks";

  return (
    <Link
      href="/bookmarks"
      aria-label="My Bookmarks"
      title="My Bookmarks / আমার বুকমার্ক"
      className={`grid h-10 w-10 place-items-center rounded-full hover:bg-brand-50 dark:hover:bg-brand-800 ${
        active ? "text-brand-600 dark:text-brand-300" : ""
      }`}
    >
      <Bookmark size={20} fill={active ? "currentColor" : "none"} />
    </Link>
  );
}