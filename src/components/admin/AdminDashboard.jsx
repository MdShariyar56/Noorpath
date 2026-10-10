"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { Bookmark, Search, ShieldCheck, UserPlus, Users } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getAdminStats } from "@/lib/api/admin";
import { fmtDate } from "@/lib/date";

function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl bg-brand-50 dark:bg-brand-800/40"
          />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-2xl bg-brand-50 dark:bg-brand-800/40" />
    </div>
  );
}

function StatCard({ icon: Icon, label, labelBn, value, note }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {label}
          <span className="block text-[11px]">{labelBn}</span>
        </p>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-800 dark:text-brand-200">
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums">{value}</p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  );
}

function SignupChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const total = data.reduce((n, d) => n + d.count, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-bold">
          New users, last 14 days
          <span className="block text-xs font-normal text-muted">
            গত ১৪ দিনে নতুন ইউজার
          </span>
        </h2>
        <p className="text-sm text-muted">
          Total {total} / মোট {total}
        </p>
      </div>

      <div className="flex h-44 items-end gap-1.5">
        {data.map((d) => (
          <div
            key={d.date}
            className="group flex h-full flex-1 flex-col items-center justify-end"
            title={`${d.date}: ${d.count}`}
          >
            <span className="mb-1 text-[10px] tabular-nums text-muted">
              {d.count > 0 ? d.count : ""}
            </span>
            <div
              className={`w-full rounded-t-md ${
                d.count > 0 ? "bg-brand-600" : "bg-brand-100 dark:bg-brand-800"
              }`}
              style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between text-[10px] text-muted">
        <span>{data[0]?.date.slice(5)}</span>
        <span>{data[data.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    let cancelled = false;
    getAdminStats()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err) => {
        if (!cancelled) setFailed(err?.status === 404 ? "hidden" : true);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, user?.role]);

  const users = useMemo(() => {
    if (!data) return [];
    const s = q.trim().toLowerCase();
    return s
      ? data.users.filter(
          (u) =>
            u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
        )
      : data.users;
  }, [data, q]);

  if (loading) return <Skeleton />;

  // অ্যাডমিন না হলে পেজটা "নেই" বলে দেখাই
  if (!user || user.role !== "admin" || failed === "hidden") notFound();

  if (failed) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-red-500">
          Could not load the dashboard.
          <span className="block text-sm opacity-80">
            ড্যাশবোর্ড আনা যায়নি।
          </span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Try again / আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (!data) return <Skeleton />;

  const t = data.totals;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck /> Dashboard
          <span className="text-lg font-medium text-brand-100">· ড্যাশবোর্ড</span>
        </h1>
        <p className="mt-1 text-sm text-brand-100">
          Overview of your NoorPath community
          <span className="block opacity-75">আপনার নূরপাথ কমিউনিটির সারসংক্ষেপ</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total users"
          labelBn="মোট ইউজার"
          value={t.users}
        />
        <StatCard
          icon={UserPlus}
          label="New (7 days)"
          labelBn="নতুন (৭ দিনে)"
          value={t.newUsers7}
        />
        <StatCard
          icon={Bookmark}
          label="Bookmarks"
          labelBn="বুকমার্ক"
          value={t.bookmarks}
          note={`${t.usersWithBookmarks} users / ${t.usersWithBookmarks} জন ইউজার`}
        />
        <StatCard
          icon={ShieldCheck}
          label="Using last-read"
          labelBn="শেষ পড়া ব্যবহার করেছে"
          value={t.usersWithLastRead}
          note="Quran / কুরআন"
        />
      </div>

      <SignupChart data={data.signups} />

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-bold">
            Users
            <span className="block text-xs font-normal text-muted">
              ইউজার তালিকা · latest {data.users.length}
            </span>
          </h2>
          <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 sm:w-64">
            <Search size={16} className="text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or email..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs text-muted">
              <tr className="border-b border-border">
                <th className="py-2 pr-3 font-medium">Name / নাম</th>
                <th className="py-2 pr-3 font-medium">Email / ইমেইল</th>
                <th className="py-2 pr-3 font-medium">Joined / যোগ দিয়েছেন</th>
                <th className="py-2 pr-3 text-right font-medium">Bookmarks</th>
                <th className="py-2 font-medium">Last read / শেষ পড়া</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border/60 last:border-0">
                  <td className="py-2.5 pr-3 font-medium">{u.name}</td>
                  <td className="py-2.5 pr-3 text-foreground/80">{u.email}</td>
                  <td className="py-2.5 pr-3 text-foreground/80">
                    {fmtDate(u.createdAt.slice(0, 10))}
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">
                    {u.bookmarks}
                  </td>
                  <td className="py-2.5 text-foreground/80">
                    {u.lastRead ? `${u.lastRead.surah}:${u.lastRead.ayah}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">
            No users found. / কোনো ইউজার পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}