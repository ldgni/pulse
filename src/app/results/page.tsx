import type { Metadata } from "next";
import { Suspense } from "react";

import MatchList from "@/components/matchList";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import RefreshMessage from "@/components/ui/refreshMessage";
import { getFromAPI } from "@/services";

export const metadata: Metadata = {
  title: "Results",
  description: "PSG's past results",
};

async function getResults() {
  const data = await getFromAPI("teams/524/matches?status=FINISHED");
  const sortedMatches = data.matches.sort((a: any, b: any) => {
    return new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime();
  });
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
