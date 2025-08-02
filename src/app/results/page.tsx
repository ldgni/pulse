"use client";

import MatchCard from "@/components/match-card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useResults } from "@/lib/api";
import { Match } from "@/lib/types";

export default function ResultsPage() {
  const { matches, isLoading, isValidating } = useResults();
  const isRefreshing = isLoading || isValidating;

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-semibold">Results</h1>

      {isRefreshing && matches.length === 0 ? (
        <LoadingSpinner />
      ) : matches.length > 0 ? (
        <div className="relative space-y-4">
          {isRefreshing && <LoadingSpinner />}
          {matches.map((match: Match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="rounded border border-zinc-300 bg-gradient-to-br from-zinc-50 to-sky-100 p-3 sm:p-4">
          <p className="py-4 text-center text-sm text-zinc-600 sm:text-base">
            No recent results found
          </p>
        </div>
      )}
    </>
  );
}
