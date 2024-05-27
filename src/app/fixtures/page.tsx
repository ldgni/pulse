import type { Metadata } from "next";

import MatchList from "@/components/matchList";
import { getFromAPI } from "@/services";

export const metadata: Metadata = {
  title: "Fixtures",
  description: "PSG's fixtures",
};

async function getFixtures() {
  const data = await getFromAPI("teams/524/matches?status=SCHEDULED");
  return data.matches;
}

export default async function Fixtures() {
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
      <MatchList matches={matches} showScores={false} />
    );

  return (
    <main className="container flex flex-col items-center py-8">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Fixtures</h1>
      {content}
    </main>
  );
}
