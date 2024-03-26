"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="border-b bg-[#1a2434] uppercase tracking-tighter text-white">
      <nav className="container py-4">
        <ul className="flex items-center justify-between">
          <li>
            <Link href="/" className="transition-opacity hover:opacity-75">
              <ArrowLeft />
            </Link>
          </li>
          <div className="flex gap-8">
            <li>
              <Link
                href="/fixtures"
                className={`${pathname === "/fixtures" ? "underline underline-offset-2" : ""} transition-opacity hover:opacity-75`}>
                Fixtures
              </Link>
            </li>
            <li>
              <Link
                href="/standings"
                className={`${pathname === "/standings" ? "underline underline-offset-2" : ""} transition-opacity hover:opacity-75`}>
                Standings
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
