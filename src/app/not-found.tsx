import Image from "next/image";

export default function NotFound() {
  return (
    <main className="container flex grow flex-col items-center justify-center gap-4 py-8">
      <Image
        src="/images/referee-flag.webp"
        alt="Referee flag"
        className="size-40"
        width={160}
        height={160}
        priority
      />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
        You&apos;re offside!
      </h1>
    </main>
  );
}
