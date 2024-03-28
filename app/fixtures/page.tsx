import type { Metadata } from "next";
import Image from "next/image";

import { fetchFromAPI } from "@/lib/utils";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MatchList from "@/components/MatchList";

export const metadata: Metadata = {
  title: "Fixtures",
  description: "PSG's fixtures",
};

async function getFixtures() {
  const data = await fetchFromAPI("teams/524/matches?status=SCHEDULED");
  return data.matches;
}

export default async function Fixtures() {
  const matches = await getFixtures();

  return (
    <>
      <Header />
      <main className="container flex grow flex-col items-center py-8">
        <h1 className="mb-4 text-center text-2xl font-bold">Fixtures</h1>
        <MatchList matches={matches} showScores={false} />
      </main>
      <Footer />
    </>
  );
}
