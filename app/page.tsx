import Image from "next/image";

import githubLogo from "@/public/images/github-white.svg";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container flex grow flex-col justify-center gap-4 py-8 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl">
          Your ultimate PSG tracker
        </h1>
        <p className="text-lg text-secondary sm:text-xl">
          Stay updated with the latest PSG fixtures and league standings.
        </p>
        <a
          href="https://github.com/ldgni/psgoat"
          className="inline-flex h-9 items-center gap-2 self-center rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-800"
          target="_blank">
          <Image src={githubLogo} alt="Github Logo" className="size-4" />
          GitHub
        </a>
      </main>
      <Footer />
    </>
  );
}
