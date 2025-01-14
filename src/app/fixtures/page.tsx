import type { Metadata } from "next";
import { Suspense } from "react";

import { getFromAPI } from "@/api";
import MatchList from "@/components/match-list";
import LoadingSpinner from "@/components/ui/loading-spinner";
import RefreshMessage from "@/components/ui/refresh-message";

export const metadata: Metadata = {
  title: "Fixtures",
  description: "PSG's fixtures",
};

async function getFixtures() {
  const data = await getFromAPI("teams/524/matches?status=SCHEDULED");
  return data.matches;
}

export default async function FixturesPage() {
  const matches = await getFixtures();

  const content =
    matches.length === 0 ? (
      <div className="flex flex-col gap-4 text-center sm:text-lg md:text-xl lg:text-2xl">
        <p>The season has ended.</p>
        <p>
          This page will automatically update once the new calendar is
          available.
        </p>
      </div>
    ) : (
      <Suspense fallback={<LoadingSpinner />}>
        <MatchList matches={matches} showScores={false} />
      </Suspense>
    );

  return (
    <main className="container flex flex-col items-center py-8">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Fixtures</h1>
      <RefreshMessage />
      {content}
    </main>
  );
}
