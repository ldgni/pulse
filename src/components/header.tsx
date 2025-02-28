"use client";

import { Calendar, ChartLine, House, Info, ListOrdered } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: <House size={20} /> },
  { href: "/results", label: "Results", icon: <ChartLine size={20} /> },
  { href: "/fixtures", label: "Fixtures", icon: <Calendar size={20} /> },
  { href: "/standings", label: "Standings", icon: <ListOrdered size={20} /> },
  { href: "/about", label: "About", icon: <Info size={20} /> },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-8 flex justify-center md:justify-normal">
      <nav>
        <ul className="flex gap-4">
          {navItems.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "rounded-lg bg-slate-200"
                    : "rounded-lg transition-colors duration-300 hover:bg-slate-200"
                } flex items-center px-2 py-1 sm:px-4 sm:py-2`}>
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
