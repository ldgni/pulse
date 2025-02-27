import Link from "next/link";

import MatchCard from "@/components/match-card";
import { Match } from "@/lib/types";

interface NextFixtureProps {
  match: Match | null;
}

export default function NextFixture({ match }: NextFixtureProps) {
  if (!match) {
    return (
      <div className="rounded-lg border p-3 shadow-md sm:p-6">
        <h2 className="mb-4 font-semibold">Next Fixture</h2>
        <p className="py-8 text-center text-gray-500">
          No upcoming match found
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg border p-3 shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Next Fixture</h2>
        <Link
          href="/fixtures"
          className="hidden text-sm text-blue-600 hover:underline sm:inline">
          View all fixtures →
        </Link>
      </div>
      <MatchCard match={match} />
      <Link
        href="/fixtures"
        className="mt-4 text-center text-sm text-blue-600 hover:underline sm:hidden">
        View all fixtures →
      </Link>
    </div>
  );
}
