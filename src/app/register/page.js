import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Register | NoorPath" };

export default function RegisterPage() {
  return (
    <AuthShell
      title={["Create your account", "আপনার অ্যাকাউন্ট তৈরি করুন"]}
      subtitle={[
        "Join the NoorPath community.",
        "নূরপাথ কমিউনিটিতে যোগ দিন।",
      ]}
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
            Login
          </Link>
          <span className="block text-xs">আগেই অ্যাকাউন্ট আছে? লগইন করুন</span>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}