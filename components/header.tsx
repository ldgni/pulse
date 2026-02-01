import { Github } from "lucide-react";
import { Menu } from "lucide-react";
import Link from "next/link";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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

export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger className="sm:hidden" asChild>
          <Button variant="ghost" size="icon" aria-label="Toggle menu">
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
      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.url}>
              <NavigationMenuLink asChild>
                <Link href={item.url}>{item.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

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
