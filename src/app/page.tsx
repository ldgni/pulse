"use client";

import Image from "next/image";
import useSWR from "swr";

import CardError from "@/components/card-error";
import CardMatch from "@/components/card-match";
import CardSkeleton from "@/components/card-skeleton";
import CardWarning from "@/components/card-warning";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamStanding } from "@/types/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const {
    data: results,
    error: errorResults,
    isLoading: isLoadingResults,
  } = useSWR("/api/results", fetcher);
  const {
    data: fixtures,
    error: errorFixtures,
    isLoading: isLoadingFixtures,
  } = useSWR("/api/fixtures", fetcher);
  const {
    data: standings,
    error: errorStandings,
    isLoading: isLoadingStandings,
  } = useSWR("/api/standings", fetcher);

  const latestResult = results?.[0];
  const nextFixture = fixtures?.[0];
  const clubStanding = standings?.find(
    (team: TeamStanding) => team.team.tla === "PSG",
  );

  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Welcome to Pulse</h1>
        <p className="text-muted-foreground">Paris Saint-Germain FC Tracker</p>
      </div>
      <div className="space-y-8">
        {/* Latest result */}
        <h2 className="mb-4 text-xl font-semibold">Latest result</h2>
        {isLoadingResults ? (
          <CardSkeleton count={1} />
        ) : errorResults ? (
          <CardError />
        ) : !latestResult ? (
          <CardWarning />
        ) : (
          <CardMatch match={latestResult} type="result" />
        )}

        {/* Next fixture */}
        <h2 className="mb-4 text-xl font-semibold">Next fixture</h2>
        {isLoadingFixtures ? (
          <CardSkeleton count={1} />
        ) : errorFixtures ? (
          <CardError />
        ) : !nextFixture ? (
          <CardWarning />
        ) : (
          <CardMatch match={nextFixture} type="fixture" />
        )}

        {/* League standing */}
        <h2 className="mb-4 text-xl font-semibold">Current ranking</h2>
        {isLoadingStandings ? (
          <Skeleton className="h-[106px] w-full rounded-xl shadow-sm" />
        ) : errorStandings ? (
          <CardError />
        ) : !clubStanding ? (
          <CardWarning />
        ) : (
          <Card>
            <CardContent>
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <span className="mr-2 text-2xl font-bold">
                    {clubStanding.position}
                  </span>
                  <Image
                    src={clubStanding.team.crest}
                    alt={clubStanding.team.name}
                    width={200}
                    height={200}
                    className="size-12"
                  />
                  <div>
                    <span className="font-semibold sm:hidden">
                      {clubStanding.team.tla}
                    </span>
                    <span className="hidden font-semibold sm:block">
                      {clubStanding.team.name}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-muted-foreground uppercase">
                    Points
                  </span>
                  <div className="text-2xl font-bold">
                    {clubStanding.points}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
