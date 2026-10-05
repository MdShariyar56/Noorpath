"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

// label ও error হলো [ইংরেজি, বাংলা]
export function TextField({ id, label, icon: Icon, error, right, ...props }) {
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label[0]} <span className="font-normal text-muted">/ {label[1]}</span>
      </label>
      <div
        className={`mt-1.5 flex items-center gap-2 rounded-xl border bg-background px-3 transition focus-within:ring-2 focus-within:ring-brand-500/30 ${
          error ? "border-red-500" : "border-border focus-within:border-brand-500"
        }`}
      >
        {Icon && <Icon size={16} className="shrink-0 text-muted" />}
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
          {...props}
        />
        {right}
      </div>
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-red-500">
          {error[0]}
          <span className="block opacity-80">{error[1]}</span>
        </p>
      )}
    </div>
  );
}

export function PasswordField({ id, label, error, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <TextField
      id={id}
      label={label}
      icon={Lock}
      error={error}
      type={show ? "text" : "password"}
      right={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:text-foreground"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
      {...props}
    />
  );
}

export function FormAlert({ tone = "error", text }) {
  const style =
    tone === "success"
      ? "border-emerald-500/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200"
      : "border-red-500/40 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-200";
  return (
    <div role="alert" className={`rounded-xl border px-4 py-3 text-sm ${style}`}>
      {text[0]}
      <span className="block text-[0.92em] opacity-80">{text[1]}</span>
    </div>
  );
}

export function SubmitButton({ busy, children, busyText }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
    >
      {busy ? busyText : children}
    </button>
  );
}

export function SocialButtons() {
  return (
    <div>
      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        or continue with / অথবা
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["Google", "Apple"].map((n) => (
          <button
            key={n}
            type="button"
            disabled
            title="Coming soon / শীঘ্রই আসছে"
            className="cursor-not-allowed rounded-xl border border-border py-2.5 text-sm font-medium opacity-50"
          >
            {n}
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-muted">
        Coming soon / শীঘ্রই আসছে
      </p>
    </div>
  );
}