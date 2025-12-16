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

type StandingsTableProps = {
  competition: string;
};

export default async function StandingsTable({
  competition,
}: StandingsTableProps) {
  const data = await getStandings(competition);

  return (
    <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
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
          {data.map((team) => (
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
              <TableCell className="text-center font-semibold">
                {team.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
