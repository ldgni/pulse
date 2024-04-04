"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import psgLogo from "@/assets/images/psg-white.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-400 bg-primary">
      <nav className="container py-4">
        <ul className="flex items-center gap-4 text-slate-400 sm:gap-8">
          <li>
            <Link
              href="/"
              className={`${pathname === "/" ? "font-semibold text-slate-100" : ""} flex gap-2 transition-colors hover:text-slate-200`}>
              <Image
                src={psgLogo}
                alt="Paris Saint-Germain logo"
                className="size-6"
              />
              <span className="hidden sm:block">Pulse</span>
            </Link>
          </li>
          <li>
            <Link
              href="/fixtures"
              className={`${pathname === "/fixtures" ? "font-semibold text-slate-100" : ""} transition-colors hover:text-slate-200`}>
              Fixtures
            </Link>
          </li>
          <li>
            <Link
              href="/results"
              className={`${pathname === "/results" ? "font-semibold text-slate-100" : ""} transition-colors hover:text-slate-200`}>
              Results
            </Link>
          </li>
          <li>
            <Link
              href="/standings"
              className={`${pathname === "/standings" ? "font-semibold text-slate-100" : ""} transition-colors hover:text-slate-200`}>
              Standings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
