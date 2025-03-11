import Link from "next/link";

import MatchCard from "@/components/match-card";
import { Match } from "@/lib/types";

interface NextFixtureProps {
  match: Match | null;
}

export default function NextFixture({ match }: NextFixtureProps) {
  if (!match) {
    return (
      <div className="rounded-md border border-zinc-400 p-3 shadow-md sm:p-6">
        <h2 className="mb-4 font-medium">Next Fixture</h2>
        <p className="py-8 text-center text-gray-500">
          No upcoming match found
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-md border border-zinc-400 p-3 shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium">Next Fixture</h2>
        <Link
          href="/fixtures"
          className="hidden text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:inline">
          View all fixtures →
        </Link>
      </div>
      <MatchCard match={match} />
      <Link
        href="/fixtures"
        className="mt-4 text-center text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:hidden">
        View all fixtures →
      </Link>
    </div>
  );
}
