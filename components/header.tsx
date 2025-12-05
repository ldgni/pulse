"use client";

import { Github, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
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
    <header className="mb-8 flex items-center justify-between">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            className="sm:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <nav className="px-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className={pathname === link.href ? "font-semibold" : ""}>
                      {link.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Menu */}
      <nav className="hidden sm:block">
        <ul className="flex gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Button
                variant="ghost"
                asChild
                className={pathname === link.href ? "bg-accent" : ""}>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex h-4 items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com/ldgni/pulse"
            target="_blank"
            aria-label="View source on GitHub">
            <Github />
          </a>
        </Button>
        <Separator orientation="vertical" />
        <ModeToggle />
      </div>
    </header>
  );
}
