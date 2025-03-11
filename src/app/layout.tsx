import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import Header from "@/components/header";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "PSG Performance Tracker",
  description:
    "Track the last results, upcoming fixtures and current league standing of PSG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} min-h-screen bg-gradient-to-b from-zinc-100 to-sky-100 text-zinc-900`}>
        <div className="container max-w-3xl">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
