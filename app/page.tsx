import Image from "next/image";

import EmptyState from "@/components/empty-state";
import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getLigue1Standings, getPSGFixtures, getPSGResults } from "@/lib/api";
import { PSG_TEAM_ID } from "@/lib/constants";

export default async function HomePage() {
  const [fixtures, results, standings] = await Promise.all([
    getPSGFixtures(),
    getPSGResults(),
    getLigue1Standings(),
  ]);

  const nextFixture = fixtures[0];
  const previousResult = results[0];
  const currentRanking = standings.find((s) => s.team.id === PSG_TEAM_ID);

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Pulse</h1>
        <p className="text-muted-foreground text-sm italic">
          &quot;Ici c&apos;est Paris&quot;
        </p>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            Next fixture
          </h2>
          {nextFixture ? (
            <MatchCard match={nextFixture} variant="fixture" />
          ) : (
            <EmptyState variant="fixture" />
          )}
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            Previous result
          </h2>
          {previousResult ? (
            <MatchCard match={previousResult} variant="result" />
          ) : (
            <EmptyState variant="result" />
          )}
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            Current ranking
          </h2>
          {currentRanking && (
            <Card>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold">
                    {currentRanking.position}
                  </span>
                  <Image
                    src={currentRanking.team.crest}
                    alt={currentRanking.team.name}
                    width={48}
                    height={48}
                  />
                  <span className="font-semibold sm:hidden">
                    {currentRanking.team.shortName}
                  </span>
                  <span className="hidden font-semibold sm:inline">
                    {currentRanking.team.name}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground uppercase">
                    Points
                  </span>
                  <span className="text-xl font-semibold">
                    {currentRanking.points}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </>
  );
}
