import Link from "next/link";

import MatchCard from "@/components/match-card";
import { Match } from "@/lib/types";

interface LatestResultProps {
  match: Match | null;
}

export default function LatestResult({ match }: LatestResultProps) {
  if (!match) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold">Latest Result</h2>
        <p className="py-8 text-center text-gray-500">No recent match found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Latest Result</h2>
        <Link
          href="/results"
          className="hidden text-sm text-blue-600 hover:underline sm:inline dark:text-blue-400">
          View all results →
        </Link>
      </div>
      <MatchCard match={match} />
      <Link
        href="/results"
        className="mt-4 text-center text-sm text-blue-600 hover:underline sm:hidden dark:text-blue-400">
        View all results →
      </Link>
    </div>
  );
}
