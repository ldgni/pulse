"use client";

import { Calendar, ChartLine, House, ListOrdered } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: <House size={20} /> },
  { href: "/results", label: "Results", icon: <ChartLine size={20} /> },
  { href: "/fixtures", label: "Fixtures", icon: <Calendar size={20} /> },
  { href: "/standings", label: "Standings", icon: <ListOrdered size={20} /> },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-8 flex justify-center sm:justify-normal">
      <nav>
        <ul className="flex gap-4">
          {navItems.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "rounded-lg bg-slate-100"
                    : "rounded-lg transition-colors duration-300 hover:bg-slate-100"
                } flex items-center px-4 py-2`}>
                <span className="sm:mr-2">{link.icon}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
