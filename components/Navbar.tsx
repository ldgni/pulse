"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import goat from "@/public/images/goat.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="border-b border-slate-700 bg-secondary font-medium text-slate-400">
      <nav className="container py-4">
        <ul className="flex items-center gap-8 text-sm sm:text-base">
          <li>
            <Link href="/">
              <Image src={goat} alt="Goat" className="size-6" />
            </Link>
          </li>
          <div className="flex gap-4 sm:gap-6">
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
          </div>
        </ul>
      </nav>
    </div>
  );
}
