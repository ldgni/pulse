import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pulse - Track Paris Saint-Germain FC's performances",
    template: "Pulse - %s",
  },
  description:
    "Pulse is a web app that helps you keep track of Paris Saint-Germain FC's latest results, upcoming fixtures and current league standings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning>
      <body className="overflow-y-scroll font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Separator orientation="horizontal" />
            <main className="mx-auto w-full max-w-2xl grow px-4 py-8">
              {children}
            </main>
            <Separator orientation="horizontal" />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
