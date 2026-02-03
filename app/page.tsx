import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLigue1Standings, getPSGFixtures, getPSGResults } from "@/lib/api";
import { PSG_TEAM_ID } from "@/lib/constants";
import { formatMatchDate, formatMatchTime } from "@/lib/utils";

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
        <div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            Next fixture
          </h2>
          {nextFixture && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>{nextFixture.competition.name}</CardTitle>
                <CardDescription>
                  <time dateTime={nextFixture.utcDate}>
                    {formatMatchDate(nextFixture.utcDate)}
                  </time>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                {/* Home Team */}
                <div className="flex flex-1 items-center justify-end gap-4">
                  <span className="hidden font-semibold sm:inline">
                    {nextFixture.homeTeam.shortName}
                  </span>
                  <Image
                    src={nextFixture.homeTeam.crest}
                    alt={nextFixture.homeTeam.name}
                    width={48}
                    height={48}
                  />
                </div>

                {/* Time */}
                <time
                  dateTime={nextFixture.utcDate}
                  className="bg-accent rounded-xl px-4 py-2 font-mono text-xl font-bold">
                  {formatMatchTime(nextFixture.utcDate)}
                </time>

                {/* Away Team */}
                <div className="flex flex-1 items-center gap-4">
                  <Image
                    src={nextFixture.awayTeam.crest}
                    alt={nextFixture.awayTeam.name}
                    width={48}
                    height={48}
                  />
                  <span className="hidden font-semibold sm:inline">
                    {nextFixture.awayTeam.shortName}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            Previous result
          </h2>
          {previousResult && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>{previousResult.competition.name}</CardTitle>
                <CardDescription>
                  <time dateTime={previousResult.utcDate}>
                    {formatMatchDate(previousResult.utcDate)}
                  </time>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                {/* Home Team */}
                <div className="flex flex-1 items-center justify-end gap-4">
                  <span className="hidden font-semibold sm:inline">
                    {previousResult.homeTeam.shortName}
                  </span>
                  <Image
                    src={previousResult.homeTeam.crest}
                    alt={previousResult.homeTeam.name}
                    width={48}
                    height={48}
                  />
                </div>

                {/* Score */}
                <div className="bg-accent rounded-xl px-4 py-2 font-mono text-xl font-bold">
                  {previousResult.score.fullTime.home} -{" "}
                  {previousResult.score.fullTime.away}
                </div>

                {/* Away Team */}
                <div className="flex flex-1 items-center gap-4">
                  <Image
                    src={previousResult.awayTeam.crest}
                    alt={previousResult.awayTeam.name}
                    width={48}
                    height={48}
                  />
                  <span className="hidden font-semibold sm:inline">
                    {previousResult.awayTeam.shortName}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div>
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
        </div>
      </div>
    </>
  );
}
