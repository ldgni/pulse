import type { Metadata } from "next";
import { Suspense } from "react";

import { getFromAPI } from "@/api";
import MatchList from "@/components/match-list";
import LoadingSpinner from "@/components/ui/loading-spinner";
import RefreshMessage from "@/components/ui/refresh-message";

export const metadata: Metadata = {
  title: "Results",
  description: "PSG's past results",
};

async function getResults() {
  const data = await getFromAPI("teams/524/matches?status=FINISHED");
  const sortedMatches = data.matches.sort(
    (a: { utcDate: string }, b: { utcDate: string }) => {
      return new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime();
    },
  );
  return sortedMatches;
}

export default async function Results() {
  const matches = await getResults();

  return (
    <main className="container flex flex-col items-center py-8">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Results</h1>
      <RefreshMessage />
      <Suspense fallback={<LoadingSpinner />}>
        <MatchList matches={matches} showScores={true} />
      </Suspense>
    </main>
  );
}
