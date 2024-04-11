"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const activeClass = `${pathname === href ? "font-semibold text-slate-100" : ""} transition-colors hover:text-slate-200`;

  return (
    <Link href={href} className={`${activeClass} ${className}`}>
      {children}
    </Link>
  );
}
