import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SWRProvider from "@/components/swr-provider";
import ThemeProvider from "@/components/theme-provider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pulse - Track Paris Saint-Germain FC's performances",
  description: "Track Paris Saint-Germain's FC results, fixtures and standings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="overflow-y-scroll antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <SWRProvider>
            <div className="mx-auto flex min-h-screen max-w-2xl flex-col p-4">
              <Header />
              <main className="grow">{children}</main>
              <Footer />
            </div>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
