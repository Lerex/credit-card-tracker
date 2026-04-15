import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Credit Card Benefit Tracker",
  description: "Track annual benefits and decide whether to renew",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-[var(--border)] bg-[var(--card)]">
          <nav className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg tracking-tight">
              💳 Benefit Tracker
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">Dashboard</Link>
              <Link href="/cards/new" className="hover:underline">Add Card</Link>
              <Link href="/settings" className="hover:underline">Settings</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 w-full mx-auto max-w-5xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
