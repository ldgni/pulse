import Link from "next/link";

import MatchCard from "@/components/match-card";
import { Match } from "@/lib/types";

interface LatestResultProps {
  match: Match | null;
}

export default function LatestResult({ match }: LatestResultProps) {
  if (!match) {
    return (
      <div className="rounded-md border border-zinc-400 p-3 shadow-md sm:p-6">
        <h2 className="mb-4 font-medium">Latest Result</h2>
        <p className="py-8 text-center text-gray-500">No recent match found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-md border border-zinc-400 p-3 shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium">Latest Result</h2>
        <Link
          href="/results"
          className="hidden text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:inline">
          View all results →
        </Link>
      </div>
      <MatchCard match={match} />
      <Link
        href="/results"
        className="mt-4 text-center text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:hidden">
        View all results →
      </Link>
    </div>
  );
}
