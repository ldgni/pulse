import type { Metadata } from "next";

import { fetchFromAPI } from "@/lib/utils";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MatchList from "@/components/MatchList";

export const metadata: Metadata = {
  title: "Results",
  description: "PSG's past results",
};

async function getResults() {
  const data = await fetchFromAPI("teams/524/matches?status=FINISHED");
  const sortedMatches = data.matches.sort((a: any, b: any) => {
    return new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime();
  });
  return sortedMatches;
}

export default async function Results() {
  const matches = await getResults();

  return (
    <>
      <Header />
      <main className="container flex grow flex-col items-center py-8">
        <h1 className="mb-4 text-center text-2xl font-bold">Results</h1>
        <MatchList matches={matches} showScores={true} />
      </main>
      <Footer />
    </>
  );
}
