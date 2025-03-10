import type { Metadata } from "next";

import MatchCard from "@/components/match-card";
import { getResults } from "@/lib/api";

export const metadata: Metadata = {
  title: "Results",
};

export default async function ResultsPage() {
  const results = await getResults();

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-semibold">Results</h1>
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((match) => (
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
