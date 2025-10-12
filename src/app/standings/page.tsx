import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStandings } from "@/lib/api";

export default async function StandingsPage() {
  const standings = await getStandings();

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Standings
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead>Club</TableHead>
            <TableHead className="text-center">MP</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">D</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-center font-bold">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((team) => (
            <TableRow key={team.position}>
              <TableCell className="text-center">{team.position}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={team.team.crest}
                    alt={team.team.name}
                    width={24}
                    height={24}
                    className="size-6"
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
