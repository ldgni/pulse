import type { Metadata } from "next";
import { Suspense } from "react";

import { getFromAPI } from "@/api";
import StandingsList from "@/components/standings-list";
import LoadingSpinner from "@/components/ui/loading-spinner";

export const metadata: Metadata = {
  title: "Standings",
  description: "Ligue 1 standings",
};

async function getStandings() {
  const data = await getFromAPI("competitions/FL1/standings");
  return data.standings;
}

export default async function StandingsPage() {
  const standings = await getStandings();

  return (
    <main className="container flex max-w-screen-sm flex-col py-8">
      <h1 className="mb-4 text-center text-3xl font-extrabold tracking-tight">
        Standings
      </h1>
      <Suspense fallback={<LoadingSpinner />}>
        <StandingsList standings={standings} />
      </Suspense>
    </main>
  );
}
