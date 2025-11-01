import Image from "next/image";

import { ErrorCard, WarningCard } from "@/components/status-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStandings } from "@/lib/api";
import { TeamStanding } from "@/types/api";

export default async function StandingsTable() {
  let data;
  try {
    data = await getStandings();
  } catch {
    return <ErrorCard />;
  }

  if (data.length === 0) {
    return <WarningCard />;
  }

  return (
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
        {data.map((team: TeamStanding) => (
          <TableRow key={team.position}>
            <TableCell className="text-center">{team.position}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Image
                  src={team.team.crest}
                  alt={team.team.name}
                  width={200}
                  height={200}
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
  );
}

export async function CurrentRanking() {
  let data;
  try {
    data = await getStandings();
  } catch {
    return <ErrorCard />;
  }

  if (data.length === 0) {
    return <WarningCard />;
  }

  const psg = data.find((team: TeamStanding) => team.team.tla === "PSG");

  if (!psg) {
    return <ErrorCard />;
  }

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <span className="mr-2 text-2xl font-bold">{psg.position}</span>
            <Image
              src={psg.team.crest}
              alt={psg.team.name}
              width={200}
              height={200}
              className="size-12"
            />
            <div>
              <span className="font-semibold sm:hidden">{psg.team.tla}</span>
              <span className="hidden font-semibold sm:block">
                {psg.team.name}
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground uppercase">Points</span>
            <div className="text-2xl font-bold">{psg.points}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
