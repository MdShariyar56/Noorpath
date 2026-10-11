import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import ForgotForm from "@/components/auth/ForgotForm";

export const metadata = { title: "Forgot password | NoorPath" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title={["Forgot your password?", "পাসওয়ার্ড ভুলে গেছেন?"]}
      subtitle={[
        "Enter your email and we will send you a reset link.",
        "আপনার ইমেইল দিন, আমরা একটি রিসেট লিংক পাঠাব।",
      ]}
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
            Back to login
          </Link>
          <span className="block text-xs">মনে পড়েছে? লগইনে ফিরুন</span>
        </>
      }
    >
      <ForgotForm />
    </AuthShell>
  );
}