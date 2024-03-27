import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "PSGoat",
    template: "%s | PSGoat",
  },
  description: "Stuff about PSG",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
        className={`${GeistSans.className} flex min-h-screen flex-col bg-primary text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
