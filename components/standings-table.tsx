"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";

import { ErrorCard } from "@/components/status-card";
import { WarningCard } from "@/components/status-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamStanding } from "@/types/api";

export default function StandingsTable() {
  const { data, error, isLoading } = useSWR("/api/standings");

  if (isLoading) {
    return <Loader className="mx-auto animate-spin" />;
  }

  if (error) {
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

export function CurrentRanking() {
  const { data, error, isLoading } = useSWR("/api/standings");

  if (isLoading) {
    return (
      <Skeleton className="h-[106px] w-full rounded-xl border shadow-sm" />
    );
  }

  if (error) {
    return <ErrorCard />;
  }

  if (data.length === 0) {
    return <WarningCard />;
  }

  const psg = data.find((team: TeamStanding) => team.team.tla === "PSG");

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
