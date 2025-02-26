"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import psgLogo from "../../public/images/psg-logo.webp";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 bg-secondary">
      <div className="container flex max-w-screen-lg items-center justify-between gap-4 py-4 sm:gap-12">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={psgLogo}
              alt="Paris Saint-Germain logo"
              className="size-6"
            />
            <span className="font-bold">Pulse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-12 text-slate-400">
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

        {/* Hamburger Menu Button */}
        <button
          className="relative z-50 text-white sm:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
            onClick={toggleMenu}
          />
        )}

        {/* Mobile Menu Sidebar */}
        <div
          className={`fixed right-0 top-0 z-40 h-full w-1/2 transform bg-secondary pt-16 transition-transform duration-300 ease-in-out sm:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <nav className="p-4">
            <ul className="flex flex-col space-y-4 text-slate-400">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${
                      pathname === link.href ? "text-slate-100" : ""
                    } block py-2 font-medium transition-colors hover:text-slate-100`}
                    onClick={toggleMenu}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
