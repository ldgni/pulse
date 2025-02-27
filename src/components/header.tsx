"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/results", label: "Results" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/standings", label: "Standings" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={`${
            pathname === "/"
              ? ""
              : "opacity-75 transition-opacity duration-300 hover:opacity-100"
          } font-semibold sm:text-2xl`}>
          Pulse
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex items-center justify-between gap-4 sm:gap-8">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "underline decoration-dark underline-offset-4 dark:decoration-light"
                      : "opacity-75 transition-opacity duration-300 hover:opacity-100"
                  } `}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Backdrop overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Slide-in Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-44 transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-900 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className="px-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    pathname === link.href
                      ? "underline decoration-dark underline-offset-4 dark:decoration-light"
                      : "opacity-75 transition-opacity duration-300 hover:opacity-100"
                  } block py-2 text-lg`}>
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
