import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamStanding } from "@/types/api";

export default async function StandingsPage() {
  const response = await fetch(
    "https://api.football-data.org/v4/competitions/FL1/standings",
    {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "" },
      next: { revalidate: 300 },
    },
  );
  const { standings } = await response.json();
  const tableStandings: TeamStanding[] = standings[0].table;

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Standings
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Club</TableHead>
            <TableHead className="text-center">MP</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">D</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-center font-bold">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableStandings.map((team) => (
            <TableRow key={team.position}>
              <TableCell>{team.position}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={team.team.crest}
                    alt={team.team.name}
                    width={24}
                    height={24}
                  />
                  <span className="sm:hidden">{team.team.tla}</span>
                  <span className="hidden sm:block">{team.team.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">{team.playedGames}</TableCell>
              <TableCell className="text-center">{team.won}</TableCell>
              <TableCell className="text-center">{team.draw}</TableCell>
              <TableCell className="text-center">{team.lost}</TableCell>
              <TableCell className="text-center font-bold">
                {team.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
