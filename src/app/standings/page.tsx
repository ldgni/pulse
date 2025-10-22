"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";

import CardError from "@/components/card-error";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamStanding } from "@/types/api";

export default function StandingsPage() {
  const { data, error, isLoading } = useSWR("/api/standings");

  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Standings</h1>
        <p className="text-muted-foreground">Current Ligue 1 rankings</p>
      </div>
      {isLoading ? (
        <Loader className="mx-auto animate-spin" />
      ) : error ? (
        <CardError />
      ) : (
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
                <TableCell className="text-center">
                  {team.playedGames}
                </TableCell>
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
      )}
    </>
  );
}
