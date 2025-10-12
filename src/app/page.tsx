import Image from "next/image";

import { MatchCard } from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getFixtures, getResults, getStandings } from "@/lib/api";

export default async function HomePage() {
  const [results, fixtures, standings] = await Promise.all([
    getResults(),
    getFixtures(),
    getStandings(),
  ]);

  const latestResult = results[0];
  const nextFixture = fixtures[0];
  const clubStanding = standings.find((team) => team.team.tla === "PSG");

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">Pulse</h1>
      <div className="space-y-8">
        {/* Latest result */}
        <h2 className="mb-4 text-xl font-semibold">Latest result</h2>
        <MatchCard match={latestResult} type="result" />

        {/* Next fixture */}
        <h2 className="mb-4 text-xl font-semibold">Next fixture</h2>
        <MatchCard match={nextFixture} type="fixture" />

        {/* League standing */}
        <h2 className="mb-4 text-xl font-semibold">Current ranking</h2>
        {clubStanding && (
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
