"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/fixtures",
    label: "Fixtures",
  },
  {
    href: "/results",
    label: "Results",
  },
  {
    href: "/standings",
    label: "Standings",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 bg-primary">
      <div className="container flex max-w-screen-lg gap-4 py-4 sm:gap-12">
        <Link href="/" className="flex gap-2">
          <Image
            src="/images/psg-logo.webp"
            className="size-6"
            width={24}
            height={24}
            alt="Paris Saint-Germain logo"
          />
          <span className="hidden font-bold sm:block">Pulse</span>
        </Link>
        <nav>
          <ul className="flex items-center justify-between gap-4 text-slate-400 sm:justify-normal sm:gap-12">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href ? "text-slate-100" : ""
                  } font-medium transition-colors hover:text-slate-100`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
