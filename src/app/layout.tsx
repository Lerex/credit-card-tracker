import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

const plusJakarta = Plus_Jakarta_Sans({ variable: "--font-geist-sans", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Credit Card Benefit Tracker",
  description: "Track annual benefits and decide whether to renew",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Benefits",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-xl">
          <nav className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity duration-200">
              💳 Benefit Tracker
            </Link>
            <div className="hidden sm:flex items-center gap-5 text-sm">
              <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200">Dashboard</Link>
              <Link href="/cards/new" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200">Add Card</Link>
              <Link href="/settings" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200">Settings</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 w-full mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-8">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
