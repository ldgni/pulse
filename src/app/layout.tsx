import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Paris Saint-Germain FC Performance Tracker",
  description:
    "Track the fixtures, results and Ligue 1 standings of the french football club Paris Saint-Germain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-primary text-sm text-slate-200 antialiased sm:text-base`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
