import Image from "next/image";
import Link from "next/link";

import { StandingEntry } from "@/lib/types";

interface CurrentStandingProps {
  standing: StandingEntry | null | undefined;
}

export default function CurrentStanding({ standing }: CurrentStandingProps) {
  if (!standing) {
    return (
      <div className="rounded-lg border p-3 shadow-md sm:p-6">
        <h2 className="mb-4 font-semibold">League Position</h2>
        <p className="py-8 text-center text-gray-500">
          Standing information not available
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg border p-3 shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">League Position</h2>
        <Link
          href="/standings"
          className="hidden text-sm text-blue-600 hover:underline sm:inline">
          Full standings →
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4 rounded border p-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">{standing.position}</div>
          <div className="relative h-10 w-10">
            <Image
              src={standing.team.crest}
              alt={standing.team.name}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div className="font-medium">{standing.team.name}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{standing.points}</div>
          <div className="text-xs text-gray-500 sm:text-sm">points</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <div className="rounded border p-2">
          <div className="font-bold">{standing.playedGames}</div>
          <div className="text-xs text-gray-500 sm:text-sm">played</div>
        </div>
        <div className="rounded border p-2">
          <div className="font-bold">{standing.won}</div>
          <div className="text-xs text-gray-500 sm:text-sm">won</div>
        </div>
        <div className="rounded border p-2">
          <div className="font-bold">{standing.draw}</div>
          <div className="text-xs text-gray-500 sm:text-sm">drawn</div>
        </div>
        <div className="rounded border p-2">
          <div className="font-bold">{standing.lost}</div>
          <div className="text-xs text-gray-500 sm:text-sm">lost</div>
        </div>
      </div>
      <Link
        href="/standings"
        className="mt-4 text-center text-sm text-blue-600 hover:underline sm:hidden">
        Full standings →
      </Link>
    </div>
  );
}
