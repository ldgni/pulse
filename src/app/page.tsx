import Image from "next/image";

import githubLogo from "@/assets/images/github-white.svg";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container flex grow flex-col justify-center py-8 text-center">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Track Paris Saint-Germain
        </h1>
        <p className="mx-auto mb-6 max-w-2xl sm:text-lg md:text-xl lg:text-2xl">
          Stay updated with the upcoming fixtures, past results and current
          league standings of the french football club.
        </p>
        <a
          href="https://github.com/ldgni/pulse"
          className="inline-flex h-9 items-center gap-2 self-center rounded-md border border-slate-400 px-4 py-2 font-semibold shadow transition-colors hover:bg-primary"
          target="_blank">
          <Image src={githubLogo} alt="Github Logo" className="size-4" />
          GitHub
        </a>
      </main>
      <Footer />
    </>
  );
}
