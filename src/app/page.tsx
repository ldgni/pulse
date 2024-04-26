"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="container flex grow flex-col justify-center py-8 text-center">
      <motion.h1
        className="mb-2 text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        Track Paris Saint-Germain
      </motion.h1>
      <motion.p
        className="mx-auto mb-6 max-w-2xl sm:text-lg md:text-xl lg:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}>
        Stay updated with the upcoming fixtures, past results and current league
        standings of the french football club.
      </motion.p>
      <motion.a
        href="https://github.com/ldgni/pulse"
        className="inline-flex h-9 items-center gap-2 self-center rounded-md border border-slate-400 px-4 py-2 font-semibold shadow transition-colors hover:bg-primary"
        target="_blank"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}>
        <Github size={18} />
        GitHub
      </motion.a>
    </main>
  );
}
