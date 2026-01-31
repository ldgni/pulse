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
    url: "/",
    name: "Home",
  },
  {
    url: "/fixtures",
    name: "Fixtures",
  },
  {
    url: "/results",
    name: "Results",
  },
  {
    url: "/standings",
    name: "Standings",
  },
];

export default function NavMenu() {
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
            <SheetTitle>Pulse</SheetTitle>
            <SheetDescription>Menu</SheetDescription>
          </SheetHeader>
          <nav className="px-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.url}>
                  <SheetClose asChild>
                    <Link href={item.url}>{item.name}</Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Menu */}
      <nav className="hidden sm:block">
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.url}>
              <Button
                variant="ghost"
                className={pathname === item.url ? "bg-accent" : ""}
                asChild>
                <Link href={item.url}>{item.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
