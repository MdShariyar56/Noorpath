import { Inter, Amiri, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const bengali = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
});

export const metadata = {
  title: "NoorPath | Islamic Companion",
  description:
    "Quran, Hadith, Dua, Prayer Times and Islamic tools, all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${amiri.variable} ${bengali.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
                <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        </body>
    </html>
  );
}
