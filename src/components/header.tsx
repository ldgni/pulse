"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", name: "Home" },
  { href: "/results", name: "Results" },
  { href: "/fixtures", name: "Fixtures" },
  { href: "/standings", name: "Standings" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mb-6 flex items-center justify-between">
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
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Menu */}
      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild>
                <Link href={link.href}>{link.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <ModeToggle />
    </header>
  );
}
