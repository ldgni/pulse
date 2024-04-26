import type { Metadata } from "next";

import MatchList from "@/components/MatchList";
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

  return (
    <main className="container flex flex-col items-center py-8">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Fixtures</h1>
      <MatchList matches={matches} showScores={false} />
    </main>
  );
}
