import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { MainNav } from "@/components/main-nav";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn English with AI",
  description: "Premium AI-powered English learning platform with tutors, speaking practice, dashboards, and smart lessons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${syne.variable}`}>
        <div className="site-shell">
          <MainNav />
          <ThemeToggle />
          {children}
        </div>
      </body>
    </html>
  );
}
