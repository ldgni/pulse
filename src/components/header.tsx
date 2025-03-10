"use client";

import { Calendar, ChartLine, House, Info, ListOrdered } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: <House /> },
  { href: "/results", label: "Results", icon: <ChartLine /> },
  { href: "/fixtures", label: "Fixtures", icon: <Calendar /> },
  { href: "/standings", label: "Standings", icon: <ListOrdered /> },
  { href: "/about", label: "About", icon: <Info /> },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-8 flex justify-center">
      <nav>
        <ul className="flex gap-4">
          {navItems.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "bg-sky-100"
                    : "transition-colors hover:bg-sky-100"
                } flex items-center rounded-lg px-3 py-2`}>
                <span className="md:mr-2">{link.icon}</span>
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
