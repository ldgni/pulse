import Link from "next/link";

import { ModeSwitcher } from "@/components/ui/mode-switcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { href: "/results", name: "Results" },
  { href: "/fixtures", name: "Fixtures" },
  { href: "/standings", name: "Standings" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">P</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild>
                <Link href={link.href}>{link.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ModeSwitcher />
    </header>
  );
}
