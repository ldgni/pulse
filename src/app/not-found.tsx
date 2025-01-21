import Image from "next/image";

import refereeFlag from "../../public/images/referee-flag.webp";

export default function NotFoundPage() {
  return (
    <main className="container flex grow flex-col items-center justify-center gap-4 py-8">
      <Image
        src={refereeFlag}
        alt="Referee flag"
        className="size-60"
        placeholder="blur"
        priority
      />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
        You&apos;re offside!
      </h1>
    </main>
  );
}
