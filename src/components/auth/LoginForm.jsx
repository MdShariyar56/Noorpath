"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import {
  FormAlert,
  PasswordField,
  SocialButtons,
  SubmitButton,
  TextField,
} from "./fields";
import { useAuth } from "./AuthProvider";
import { authErrorText, login } from "@/lib/api/auth";
import { validateEmail } from "@/lib/auth-utils";

export default function LoginForm({ next = "/", registered = false }) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState(null);

  const errors = {
    email: validateEmail(email),
    password: password ? null : ["Enter your password.", "আপনার পাসওয়ার্ড লিখুন।"],
  };
  const shown = (k) => (touched[k] ? errors[k] : null);
  const touch = (k) => setTouched((t) => ({ ...t, [k]: true }));

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;

    const bad = Object.keys(errors).find((k) => errors[k]);
    if (bad) {
      setTouched({ email: true, password: true });
      document.getElementById(`login-${bad}`)?.focus();
      return;
    }

    setBusy(true);
    setFormError(null);
    try {
      const data = await login({ email: email.trim(), password, remember });
      setUser(data.user ?? null);
      router.push(next);
      router.refresh();
    } catch (err) {
      setFormError(authErrorText(err, "login"));
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {registered && (
        <FormAlert
          tone="success"
          text={[
            "Account created. Please log in.",
            "অ্যাকাউন্ট তৈরি হয়েছে। এবার লগইন করুন।",
          ]}
        />
      )}
      {formError && <FormAlert text={formError} />}

      <TextField
        id="login-email"
        label={["Email", "ইমেইল"]}
        icon={Mail}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => touch("email")}
        error={shown("email")}
      />

      <PasswordField
        id="login-password"
        label={["Password", "পাসওয়ার্ড"]}
        autoComplete="current-password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => touch("password")}
        error={shown("password")}
      />

      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 accent-brand-600"
          />
          Remember me / মনে রাখুন
        </label>
        <Link
          href="/forgot-password"
          className="font-medium text-brand-600 hover:underline dark:text-brand-300"
        >
          Forgot password? / পাসওয়ার্ড ভুলে গেছেন?
        </Link>
      </div>

      <SubmitButton busy={busy} busyText="Signing in... / প্রবেশ করছি...">
        Login / লগইন
      </SubmitButton>

      <SocialButtons />
    </form>
  );
}