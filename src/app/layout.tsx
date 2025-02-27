import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Container from "@/components/container";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    <html lang="en">
      <body
        className={`${inter.className} bg-light text-dark antialiased dark:bg-dark dark:text-light`}>
        <Container>
          <Header />
          <main>{children}</main>
        </Container>
      </body>
    </html>
  );
}
