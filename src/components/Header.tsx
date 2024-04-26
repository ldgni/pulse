import Image from "next/image";

import NavLink from "@/components/ui/NavLink";

export default function Header() {
  return (
    <header className="sticky top-0 bg-primary">
      <nav className="container max-w-screen-lg py-4">
        <ul className="flex items-center justify-between gap-4 text-slate-400 sm:justify-normal sm:gap-12">
          <li>
            <NavLink href="/" className="flex gap-2">
              <Image
                src={`/images/psg-logo.webp`}
                width={24}
                height={24}
                alt="Paris Saint-Germain logo"
              />
              <span className="hidden sm:block">Pulse</span>
            </NavLink>
          </li>
          <li>
            <NavLink href="/fixtures">Fixtures</NavLink>
          </li>
          <li>
            <NavLink href="/results">Results</NavLink>
          </li>
          <li>
            <NavLink href="/standings">Standings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
