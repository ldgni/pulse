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
        <div className="rounded-lg bg-white py-12 text-center shadow">
          <p className="text-gray-500">No recent results found</p>
        </div>
      )}
    </>
  );
}
