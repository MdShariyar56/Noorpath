import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import { safeNext } from "@/lib/auth-utils";

export const metadata = { title: "Login | NoorPath" };

export default async function LoginPage({ searchParams }) {
  const sp = await searchParams;

  return (
    <AuthShell
      title={["Login to NoorPath", "নূরপাথে লগইন করুন"]}
      subtitle={[
        "Continue your Islamic journey.",
        "আপনার ইসলামিক যাত্রা চালিয়ে যান।",
      ]}
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
            Register
          </Link>
          <span className="block text-xs">অ্যাকাউন্ট নেই? অ্যাকাউন্ট তৈরি করুন</span>
        </>
      }
    >
      <LoginForm next={safeNext(sp.next)} registered={sp.registered === "1"} />
    </AuthShell>
  );
}