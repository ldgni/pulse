import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import Container from "@/components/container";
import Header from "@/components/header";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Paris Saint-Germain FC Performance Tracker",
  description:
    "Track the upcoming fixtures, last results and current league standing of PSG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <body className={`${geist.className} bg-slate-50`}>
        <Container>
          <Header />
          <main>{children}</main>
        </Container>
      </body>
    </html>
  );
}
