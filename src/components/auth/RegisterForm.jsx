"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Mail, User } from "lucide-react";
import {
  FormAlert,
  PasswordField,
  SocialButtons,
  SubmitButton,
  TextField,
} from "./fields";
import { authErrorText, register } from "@/lib/api/auth";
import {
  passwordStrength,
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/auth-utils";

const LEVELS = [
  null,
  { en: "Weak", bn: "দুর্বল", bar: "bg-red-500" },
  { en: "Fair", bn: "মোটামুটি", bar: "bg-amber-500" },
  { en: "Good", bn: "ভালো", bar: "bg-lime-500" },
  { en: "Strong", bn: "শক্তিশালী", bar: "bg-emerald-500" },
];

function PasswordHints({ value }) {
  const strength = passwordStrength(value);
  const level = LEVELS[strength];
  const rules = [
    { ok: value.length >= 8, text: "At least 8 characters / কমপক্ষে ৮টি অক্ষর" },
    {
      ok: /[A-Za-z]/.test(value) && /\d/.test(value),
      text: "A letter and a number / একটি অক্ষর ও একটি সংখ্যা",
    },
  ];

  return (
    <div className="space-y-2">
      {level && (
        <div>
          <div className="flex gap-1" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i <= strength ? level.bar : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-muted">
            Strength / শক্তি: {level.en} · {level.bn}
          </p>
        </div>
      )}
      <ul className="space-y-1 text-xs">
        {rules.map((r) => (
          <li
            key={r.text}
            className={`flex items-center gap-1.5 ${
              r.ok ? "text-emerald-600 dark:text-emerald-400" : "text-muted"
            }`}
          >
            <Check size={13} className={r.ok ? "" : "opacity-30"} />
            {r.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState(null);

  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirm: validateConfirm(password, confirm),
    agree: agree
      ? null
      : [
          "Please accept the terms to continue.",
          "এগিয়ে যেতে শর্তগুলো মেনে নিন।",
        ],
  };
  const shown = (k) => (touched[k] ? errors[k] : null);
  const touch = (k) => setTouched((t) => ({ ...t, [k]: true }));

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;

    const bad = Object.keys(errors).find((k) => errors[k]);
    if (bad) {
      setTouched({ name: true, email: true, password: true, confirm: true, agree: true });
      document.getElementById(`register-${bad}`)?.focus();
      return;
    }

    setBusy(true);
    setFormError(null);
    try {
      await register({ name: name.trim(), email: email.trim(), password });
      router.push("/login?registered=1");
    } catch (err) {
      setFormError(authErrorText(err, "register"));
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {formError && <FormAlert text={formError} />}

      <TextField
        id="register-name"
        label={["Full name", "পুরো নাম"]}
        icon={User}
        autoComplete="name"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => touch("name")}
        error={shown("name")}
      />

      <TextField
        id="register-email"
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

      <div className="space-y-2">
        <PasswordField
          id="register-password"
          label={["Password", "পাসওয়ার্ড"]}
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => touch("password")}
          error={shown("password")}
        />
        <PasswordHints value={password} />
      </div>

      <PasswordField
        id="register-confirm"
        label={["Confirm password", "পাসওয়ার্ড নিশ্চিত করুন"]}
        autoComplete="new-password"
        placeholder="Re-enter your password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        onBlur={() => touch("confirm")}
        error={shown("confirm")}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-2 text-sm">
          <input
            id="register-agree"
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            aria-invalid={!!shown("agree")}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-brand-600 hover:underline dark:text-brand-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-brand-600 hover:underline dark:text-brand-300">
              Privacy Policy
            </Link>
            <span className="block text-xs text-muted">
              আমি সেবার শর্তাবলি ও গোপনীয়তা নীতিতে সম্মত
            </span>
          </span>
        </label>
        {shown("agree") && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.agree[0]}
            <span className="block opacity-80">{errors.agree[1]}</span>
          </p>
        )}
      </div>

      <SubmitButton busy={busy} busyText="Creating account... / অ্যাকাউন্ট তৈরি হচ্ছে...">
        Register / অ্যাকাউন্ট তৈরি করুন
      </SubmitButton>

      <SocialButtons />
    </form>
  );
}