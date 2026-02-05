import { Metadata } from "next";

import EmptyState from "@/components/empty-state";
import MatchCard from "@/components/match-card";
import { getPSGResults } from "@/lib/api";

export const metadata: Metadata = {
  title: "Results",
};

export default async function ResultsPage() {
  const results = await getPSGResults();

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Results</h1>
        <p className="text-muted-foreground text-sm">All matches played</p>
      </div>
      {results.length === 0 ? (
        <EmptyState variant="result" />
      ) : (
        <div className="space-y-4">
          {results.map((match) => (
            <MatchCard key={match.id} match={match} variant="result" />
          ))}
        </div>
      )}
    </>
  );
}
