"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const navItems = [
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

export default function NavLinks() {
  const pathname = usePathname();

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
              {navItems.map((item) => (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className={pathname === item.href ? "font-semibold" : ""}>
                      {item.label}
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
          {navItems.map((item) => (
            <li key={item.href}>
              <Button
                variant="ghost"
                asChild
                className={pathname === item.href ? "bg-accent" : ""}>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
