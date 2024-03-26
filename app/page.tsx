import Image from "next/image";
import Link from "next/link";
import sportShoes from "@/public/images/sport-shoes.png";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="sr-only">PSGuide</h1>
      <Image
        src={sportShoes}
        style={{ width: "200px", height: "auto" }}
        alt="PSG logo"
        priority
      />
      <div className="flex gap-4">
        <Link
          href="/fixtures"
          className={`${buttonVariants({ variant: "default" })} uppercase tracking-tighter`}>
          Fixtures
        </Link>
        <Link
          href="/standings"
          className={`${buttonVariants({ variant: "default" })} uppercase tracking-tighter`}>
          Standings
        </Link>
      </div>
    </main>
  );
}
