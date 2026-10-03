import Link from "next/link";
import { Logo } from "./Navbar";

const links = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
];

const socials = ["f", "X", "▶", "ig"];

export default function Footer() {
  return (
    <footer className="mt-10 bg-brand-900 text-white">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-5 px-4 py-6 md:flex-row md:justify-between">
        <Logo light />

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-brand-100">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-brand-200">Follow Us</span>
          {socials.map((s) => (
            <a
              key={s}
              href="#"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-bold hover:bg-white/20"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      <p className="border-t border-white/10 py-3 text-center text-xs text-brand-200">
        © {new Date().getFullYear()} NoorPath. All rights reserved.
      </p>
    </footer>
  );
}