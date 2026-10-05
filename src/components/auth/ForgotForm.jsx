"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { FormAlert, SubmitButton, TextField } from "./fields";
import { authErrorText, forgotPassword } from "@/lib/api/auth";
import { validateEmail } from "@/lib/auth-utils";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState(null);

  const error = validateEmail(email);

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    if (error) {
      setTouched(true);
      document.getElementById("forgot-email")?.focus();
      return;
    }

    setBusy(true);
    setFormError(null);
    try {
      await forgotPassword({ email: email.trim() });
      setSent(true);
    } catch (err) {
      setFormError(authErrorText(err, "forgot"));
    } finally {
      setBusy(false);
    }
  }

  // ইমেইল আছে কি নেই, তা না জানিয়ে সবসময় একই বার্তা দেখাই
  if (sent) {
    return (
      <FormAlert
        tone="success"
        text={[
          "If an account exists for this email, we have sent a link to reset your password.",
          "এই ইমেইলে অ্যাকাউন্ট থাকলে পাসওয়ার্ড রিসেটের একটি লিংক পাঠানো হয়েছে।",
        ]}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {formError && <FormAlert text={formError} />}

      <TextField
        id="forgot-email"
        label={["Email", "ইমেইল"]}
        icon={Mail}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        error={touched ? error : null}
      />

      <SubmitButton busy={busy} busyText="Sending... / পাঠানো হচ্ছে...">
        Send reset link / রিসেট লিংক পাঠান
      </SubmitButton>
    </form>
  );
}