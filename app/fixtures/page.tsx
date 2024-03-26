import type { Metadata } from "next";
import Image from "next/image";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Fixtures",
  description: "All the upcoming PSG fixtures",
};

async function getFixtures() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!apiToken) {
    throw new Error("API token is not set");
  }

  const res = await fetch(
    `https://api.football-data.org/v4/teams/524/matches?status=SCHEDULED`,
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

export default async function Fixtures() {
  const matches = await getFixtures();

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container py-8">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Upcoming Fixtures
        </h1>
        <ul className="mx-auto flex max-w-screen-sm flex-col gap-4 uppercase">
          {matches.map((match: any) => (
            <li
              key={match.id}
              className="flex flex-col gap-2 rounded-lg border border-[#093e62] bg-[#eaeaea] p-4 shadow-md sm:flex-col-reverse sm:gap-4">
              <div className="flex flex-col gap-2 font-semibold sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 sm:flex-1 sm:flex-row-reverse">
                  <Image
                    src={match.homeTeam.crest}
                    width={100}
                    height={100}
                    style={{ width: "30px", height: "auto" }}
                    alt={`${match.homeTeam.name} logo`}
                  />
                  <p>{match.homeTeam.shortName}</p>
                </div>
                <span className="hidden sm:block">-</span>
                <div className="flex items-center gap-2 sm:flex-1">
                  <Image
                    src={match.awayTeam.crest}
                    width={100}
                    height={100}
                    style={{ width: "30px", height: "auto" }}
                    alt={`${match.awayTeam.name} logo`}
                  />
                  <p>{match.awayTeam.shortName}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:items-center">
                <p className="font-medium">
                  {new Date(match.utcDate)
                    .toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .replace(/,/g, "")}
                </p>
                <p className="text-muted-foreground">
                  {match.competition.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
