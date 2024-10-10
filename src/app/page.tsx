import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="container flex grow flex-col items-center justify-center py-8 text-center">
      <h1 className="mb-2 text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
        Track Paris Saint-Germain
      </h1>
      <p className="mx-auto mb-4 max-w-2xl sm:text-lg md:text-xl lg:text-2xl">
        Stay updated with the upcoming fixtures, past results and current league
        standings of the french football club.
      </p>
      <a
        href="https://github.com/ldgni/pulse"
        className="inline-flex h-9 items-center gap-2 self-center rounded-md border border-slate-400 px-4 py-2 font-semibold shadow transition hover:scale-105 hover:bg-secondary"
        target="_blank">
        <Github size={18} />
        GitHub
      </a>
    </main>
  );
}
