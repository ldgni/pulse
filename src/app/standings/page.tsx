import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StandingsList from "@/components/StandingsList";
import { getFromAPI } from "@/services";

export const metadata: Metadata = {
  title: "Standings",
  description: "Ligue 1 standings",
};

async function getStandings() {
  const data = await getFromAPI("competitions/FL1/standings");
  return data.standings;
}

export default async function Standings() {
  const standings = await getStandings();

  return (
    <>
      <Header />
      <main className="container flex max-w-screen-sm flex-col py-8">
        <h1 className="mb-4 text-center text-3xl font-extrabold tracking-tight">
          Standings
        </h1>
        <StandingsList standings={standings} />
      </main>
      <Footer />
    </>
  );
}
