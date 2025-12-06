"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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

export default function NavMenu() {
  const pathname = usePathname();
  const [clientPathname, setClientPathname] = useState("");

  useEffect(() => {
    setClientPathname(pathname);
  }, [pathname]);

  return (
    <>
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
                    <Link href={link.href}>{link.label}</Link>
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
                className={clientPathname === link.href ? "bg-accent" : ""}>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
