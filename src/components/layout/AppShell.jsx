"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// এই পেজগুলোতে নেভবার, সাইডবার ও ফুটার দেখাব না
const BARE = ["/login", "/register", "/forgot-password"];

export default function AppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  if (BARE.includes(pathname)) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onMenuClick={() => setMenuOpen(true)} />

      <div className="mx-auto flex w-full  flex-1 gap-6 px-4 py-6">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <Footer />
    </div>
  );
}