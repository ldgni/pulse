import Image from "next/image";

import NavLink from "./ui/NavLink";

export default function Navbar() {
  return (
    <header className="border-b border-slate-400 bg-primary">
      <nav className="container py-4">
        <ul className="flex items-center gap-4 text-slate-400 sm:gap-8">
          <li>
            <NavLink href="/" className="flex gap-2">
              <Image
                src={`/images/psg-logo.png`}
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
