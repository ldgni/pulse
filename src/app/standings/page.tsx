import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getFromAPI } from "@/services";
import { Standing, StandingsTable } from "@/types/standings";

export const metadata: Metadata = {
  title: "Standings",
  description: "Ligue 1 standings",
};

async function getStandings() {
  const data = await getFromAPI("competitions/FL1/standings");
  return data.standings;
}

export default async function Standings() {
  const standings: StandingsTable[] = await getStandings();

  return (
    <>
      <Header />
      <main className="container flex max-w-screen-md flex-col py-8">
        <h1 className="sr-only">Standings</h1>
        <table className="mb-4 border bg-secondary">
          <caption className="mb-4 text-3xl font-extrabold tracking-tight">
            Ligue 1 Standings
          </caption>
          <thead className="bg-primary">
            <tr className="text-left">
              <th className="p-2 sm:p-4">#</th>
              <th className="p-2 sm:p-4">Team</th>
              <th className="p-2 sm:p-4">PL</th>
              <th className="hidden p-4 sm:table-cell">W</th>
              <th className="hidden p-4 sm:table-cell">D</th>
              <th className="hidden p-4 sm:table-cell">L</th>
              <th className="p-2 sm:p-4">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {standings[0].table.map((team: Standing, index, array) => (
              <tr
                key={team.team.id}
                className={
                  index < 3
                    ? "bg-blue-500/60"
                    : index === 3
                      ? "bg-orange-500/60"
                      : index === 4
                        ? "bg-green-500/60"
                        : index === array.length - 3
                          ? "bg-yellow-500/60"
                          : index >= array.length - 2
                            ? "bg-red-500/60"
                            : ""
                }>
                <td className="p-2 sm:p-4">{team.position}</td>
                <td className="flex items-center gap-4 p-2 font-semibold sm:p-4">
                  <Image
                    src={team.team.crest}
                    width={96}
                    height={96}
                    className="h-auto w-8"
                    alt={`${team.team.name} logo`}
                  />
                  {team.team.shortName}
                </td>
                <td className="p-2 sm:p-4">{team.playedGames}</td>
                <td className="hidden p-4 sm:table-cell">{team.won}</td>
                <td className="hidden p-4 sm:table-cell">{team.draw}</td>
                <td className="hidden p-4 sm:table-cell">{team.lost}</td>
                <td className="p-2 font-semibold sm:p-4">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="mb-2 text-lg font-semibold tracking-tight sm:text-xl">
          Qualification/Relegation
        </h2>
        <div className="flex flex-col gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-blue-500/60"></div>
            <p>UEFA Champions League group stage</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-orange-500/60"></div>
            <p>UEFA Champions League qualifiers</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-green-500/60"></div>
            <p>Europa League group stage</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-yellow-500/60"></div>
            <p>Relegation play-offs</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-red-500/60"></div>
            <p>Relegation</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
