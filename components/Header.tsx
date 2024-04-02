"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import psgLogo from "@/public/images/psg-white.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-700 bg-secondary font-medium text-slate-400">
      <nav className="container py-4">
        <ul className="flex items-center gap-4 text-sm sm:gap-8 sm:text-base">
          <li>
            <Link
              href="/"
              className={`${pathname === "/" ? "text-primary" : ""} flex gap-2 transition-colors hover:text-primary`}>
              <Image
                src={psgLogo}
                alt="Paris Saint-Germain logo"
                className="size-6"
              />
              <span className="hidden font-bold sm:block">Pulse</span>
            </Link>
          </li>
          <li>
            <Link
              href="/fixtures"
              className={`${pathname === "/fixtures" ? "text-primary" : ""} transition-colors hover:text-primary`}>
              Fixtures
            </Link>
          </li>
          <li>
            <Link
              href="/results"
              className={`${pathname === "/results" ? "text-primary" : ""} transition-colors hover:text-primary`}>
              Results
            </Link>
          </li>
          <li>
            <Link
              href="/standings"
              className={`${pathname === "/standings" ? "text-primary" : ""} transition-colors hover:text-primary`}>
              Standings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
