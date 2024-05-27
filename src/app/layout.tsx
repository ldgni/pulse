import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Pulse",
    template: "%s | Pulse",
  },
  description: "Paris Saint-Germain Performance Tracker",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen w-screen flex-col overflow-x-hidden bg-radial-gradient text-sm text-slate-200 antialiased sm:text-base`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
