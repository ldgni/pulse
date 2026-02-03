import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLigue1Standings } from "@/lib/api";
import { PSG_TEAM_ID } from "@/lib/constants";
import type { Standing } from "@/lib/types";

export default async function StandingsPage() {
  const standings = await getLigue1Standings();

  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Standings</h1>
        <p className="text-muted-foreground text-sm">
          Current league standings
        </p>
      </div>
      <Table>
        <TableCaption>Ligue 1</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead>Club</TableHead>
            <TableHead className="text-center">MP</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">D</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-center font-semibold">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((standing: Standing) => (
            <TableRow
              key={standing.team.id}
              className={
                standing.team.id === PSG_TEAM_ID
                  ? "bg-blue-50 dark:bg-blue-950"
                  : ""
              }>
              <TableCell className="text-center">{standing.position}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Image
                    src={standing.team.crest}
                    alt={standing.team.name}
                    width={24}
                    height={24}
                  />
                  <span className="sm:hidden">{standing.team.tla}</span>
                  <span className="hidden sm:inline">{standing.team.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {standing.playedGames}
              </TableCell>
              <TableCell className="text-center">{standing.won}</TableCell>
              <TableCell className="text-center">{standing.draw}</TableCell>
              <TableCell className="text-center">{standing.lost}</TableCell>
              <TableCell className="text-center font-semibold">
                {standing.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
