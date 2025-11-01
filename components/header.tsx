"use client";

import { Github, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
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
    href: "/results",
    label: "Results",
  },
  {
    href: "/fixtures",
    label: "Fixtures",
  },
  {
    href: "/standings",
    label: "Standings",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mb-6 flex items-center justify-between sm:mb-8">
      {/* Mobile Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
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
          <nav className="flex flex-col gap-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Menu */}
      <nav className="hidden gap-2 sm:flex">
        {navLinks.map((link) => (
          <Button key={link.href} variant="ghost" size="sm" asChild>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
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
