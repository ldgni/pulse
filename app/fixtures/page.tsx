import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPSGFixtures } from "@/lib/api";
import type { Match } from "@/lib/types";
import { formatMatchDate, formatMatchTime } from "@/lib/utils";

export default async function FixturesPage() {
  const fixtures = await getPSGFixtures();

  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Fixtures</h1>
        <p className="text-muted-foreground text-sm">All upcoming matches</p>
      </div>
      <div className="space-y-4">
        {fixtures.map((match: Match) => {
          return (
            <Card key={match.id}>
              <CardHeader className="text-center">
                <CardTitle>{match.competition.name}</CardTitle>
                <CardDescription>
                  <time dateTime={match.utcDate}>
                    {formatMatchDate(match.utcDate)}
                  </time>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                {/* Home Team */}
                <div className="flex flex-1 items-center justify-end gap-4">
                  <span className="hidden font-semibold sm:inline">
                    {match.homeTeam.shortName}
                  </span>
                  <Image
                    src={match.homeTeam.crest}
                    alt={match.homeTeam.name}
                    width={48}
                    height={48}
                  />
                </div>

                {/* Time */}
                <time
                  dateTime={match.utcDate}
                  className="bg-accent rounded-xl px-4 py-2 font-mono text-xl font-bold">
                  {formatMatchTime(match.utcDate)}
                </time>

                {/* Away Team */}
                <div className="flex flex-1 items-center gap-4">
                  <Image
                    src={match.awayTeam.crest}
                    alt={match.awayTeam.name}
                    width={48}
                    height={48}
                  />
                  <span className="hidden font-semibold sm:inline">
                    {match.awayTeam.shortName}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
