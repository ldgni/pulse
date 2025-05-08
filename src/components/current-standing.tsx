"use client";

import Image from "next/image";
import Link from "next/link";

import LoadingSpinner from "@/components/ui/loading-spinner";
import { usePsgStanding } from "@/lib/api";

export default function CurrentStanding() {
  const { standing, isLoading, isValidating } = usePsgStanding();
  const isRefreshing = isLoading || isValidating;

  if (isRefreshing && !standing) {
    return (
      <div className="rounded-md border border-zinc-500 p-3 shadow-md sm:p-6">
        <h2 className="mb-4 font-medium">League Position</h2>
        <LoadingSpinner />
      </div>
    );
  }

  if (!standing) {
    return (
      <div className="rounded-md border border-zinc-500 p-3 shadow-md sm:p-6">
        <h2 className="mb-4 font-medium">League Position</h2>
        <p className="py-8 text-center text-gray-500">
          Standing information not available
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col rounded-md border border-zinc-400 p-3 shadow-md sm:p-6">
      {isRefreshing && <LoadingSpinner />}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium">League Position</h2>
        <Link
          href="/standings"
          className="hidden text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:inline">
          Full standings →
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4 rounded border border-zinc-300 bg-gradient-to-bl from-zinc-50 to-sky-200 p-4">
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
        <div className="rounded border border-zinc-300 p-2">
          <div className="font-bold">{standing.playedGames}</div>
          <div className="text-xs text-gray-500 sm:text-sm">played</div>
        </div>
        <div className="rounded border border-zinc-300 p-2">
          <div className="font-bold">{standing.won}</div>
          <div className="text-xs text-gray-500 sm:text-sm">won</div>
        </div>
        <div className="rounded border border-zinc-300 p-2">
          <div className="font-bold">{standing.draw}</div>
          <div className="text-xs text-gray-500 sm:text-sm">drawn</div>
        </div>
        <div className="rounded border border-zinc-300 p-2">
          <div className="font-bold">{standing.lost}</div>
          <div className="text-xs text-gray-500 sm:text-sm">lost</div>
        </div>
      </div>
      <Link
        href="/standings"
        className="mt-4 text-center text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:hidden">
        Full standings →
      </Link>
    </div>
  );
}
