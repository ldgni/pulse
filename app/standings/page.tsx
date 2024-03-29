import type { Metadata } from "next";
import Image from "next/image";

import { Standing, StandingsTable } from "@/types/standings";
import { fetchFromAPI } from "@/lib/utils";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Standings",
  description: "Ligue 1 standings",
};

async function getStandings() {
  const data = await fetchFromAPI("competitions/FL1/standings");
  return data.standings;
}

export default async function Standings() {
  const standings: StandingsTable[] = await getStandings();

  return (
    <>
      <Header />
      <main className="container flex grow flex-col py-8">
        <h1 className="sr-only">Standings</h1>
        <table className="w-full divide-y divide-primary text-xs sm:text-sm md:text-base">
          <caption className="mb-4 text-2xl font-bold">
            Ligue 1 Standings
          </caption>
          <thead className="bg-secondary">
            <tr className="text-left">
              <th className="p-3">#</th>
              <th className="p-3">Team</th>
              <th className="p-3">PL</th>
              <th className="hidden p-3 sm:table-cell">W</th>
              <th className="hidden p-3 sm:table-cell">D</th>
              <th className="hidden p-3 sm:table-cell">L</th>
              <th className="p-3">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            {standings[0].table.map((team: Standing) => (
              <tr
                key={team.team.id}
                className={
                  team.team.name === "Paris Saint-Germain FC"
                    ? "bg-slate-700"
                    : ""
                }>
                <td className="p-3">{team.position}</td>
                <td className="flex items-center gap-2 p-3 font-bold">
                  <Image
                    src={team.team.crest}
                    width={50}
                    height={50}
                    style={{ width: "30px", height: "auto" }}
                    alt={`${team.team.name} logo`}
                  />
                  {team.team.shortName}
                </td>
                <td className="p-3">{team.playedGames}</td>
                <td className="hidden p-3 sm:table-cell">{team.won}</td>
                <td className="hidden p-3 sm:table-cell">{team.draw}</td>
                <td className="hidden p-3 sm:table-cell">{team.lost}</td>
                <td className="p-3 font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
}
