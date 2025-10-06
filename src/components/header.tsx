import Link from "next/link";

import { ModeSwitcher } from "@/components/ui/mode-switcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { href: "/", name: "Home" },
  { href: "/results", name: "Results" },
  { href: "/fixtures", name: "Fixtures" },
  { href: "/standings", name: "Standings" },
];

export default function Header() {
  return (
    <header className="mb-6 flex items-center justify-between">
      <NavigationMenu>
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
      <ModeSwitcher />
    </header>
  );
}
