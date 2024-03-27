import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Results",
  description: "PSG's past results",
};

async function getResults() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!apiToken) {
    throw new Error("API token is not set");
  }

  const res = await fetch(
    `https://api.football-data.org/v4/teams/524/matches?status=FINISHED`,
    {
      headers: {
        "X-Auth-Token": apiToken,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.matches;
}

export default async function Results() {
  let matches = await getResults();

  matches = matches.sort(
    (a: any, b: any) =>
      new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()
  );

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container flex grow flex-col items-center py-8">
        <h1 className="mb-4 text-center text-2xl font-bold">Results</h1>
        <ul className="flex w-full max-w-screen-sm flex-col gap-8 uppercase">
          {matches.map((match: any) => (
            <li
              key={match.id}
              className="flex flex-col gap-2 rounded-md border border-slate-700 p-4 shadow-md sm:flex-col-reverse">
              <div className="flex flex-col gap-2 font-semibold sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-2 sm:flex-1 sm:flex-row-reverse">
                  <Image
                    src={match.homeTeam.crest}
                    width={100}
                    height={100}
                    style={{ width: "30px", height: "auto" }}
                    alt={`${match.homeTeam.name} logo`}
                  />
                  <div className="flex w-full justify-between sm:flex-row-reverse">
                    <p>{match.homeTeam.shortName}</p>
                    <p className="sm:hidden">{match.score.fullTime.home}</p>
                  </div>
                </div>
                <p className="hidden font-medium sm:block">
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </p>
                <div className="flex items-center gap-2 sm:flex-1">
                  <Image
                    src={match.awayTeam.crest}
                    width={100}
                    height={100}
                    style={{ width: "30px", height: "auto" }}
                    alt={`${match.awayTeam.name} logo`}
                  />
                  <div className="flex w-full justify-between">
                    <p>{match.awayTeam.shortName}</p>
                    <p className="sm:hidden">{match.score.fullTime.away}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-[0.9rem] sm:items-center">
                <p className="font-semibold">
                  {new Date(match.utcDate)
                    .toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .replace(/,/g, "")}
                </p>
                <div className="flex gap-1 text-secondary">
                  <p>{match.competition.name}</p>
                  {match.competition.name === "Ligue 1" && (
                    <p>- Matchweek {match.matchday}</p>
                  )}
                  {match.competition.name === "UEFA Champions League" && (
                    <p className="hidden sm:block">
                      - {match.stage.replace("_", " ")}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
