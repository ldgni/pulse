import Image from "next/image";

import githubLogo from "@/public/images/github-white.svg";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container flex grow flex-col justify-center gap-4 py-8 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Your ultimate PSG tracker
        </h1>
        <p className="text-secondary sm:text-lg md:text-xl">
          Stay updated with the latest fixtures, past results and league
          standings.
        </p>
        <a
          href="https://github.com/ldgni/psgoat"
          className="inline-flex h-9 items-center gap-2 self-center rounded-md border border-slate-700 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-secondary"
          target="_blank">
          <Image src={githubLogo} alt="Github Logo" className="size-4" />
          GitHub
        </a>
      </main>
      <Footer />
    </>
  );
}
