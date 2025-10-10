import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Match } from "@/types/api";

export default async function FixturesPage() {
  const response = await fetch(
    "https://api.football-data.org/v4/teams/524/matches?status=SCHEDULED",
    {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "" },
      next: { revalidate: 300 },
    },
  );
  const { matches } = await response.json();

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Fixtures
      </h1>
      <div className="space-y-4">
        {matches.map((match: Match) => (
          <Card key={match.id}>
            <CardHeader className="text-center">
              <CardTitle>{match.competition.name}</CardTitle>
              <CardDescription>
                <time dateTime={match.utcDate}>
                  {new Date(match.utcDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 sm:gap-6">
              {/* Home Team */}
              <div className="flex flex-1 items-center justify-end gap-4">
                <span className="hidden font-medium sm:block">
                  {match.homeTeam.tla}
                </span>
                <Image
                  src={match.homeTeam.crest}
                  alt={match.homeTeam.name}
                  width={40}
                  height={40}
                />
              </div>

              {/* Time */}
              <div className="bg-muted flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-semibold sm:text-2xl">
                <time dateTime={match.utcDate}>
                  {new Date(match.utcDate).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              {/* Away Team */}
              <div className="flex flex-1 items-center gap-4">
                <Image
                  src={match.awayTeam.crest}
                  alt={match.awayTeam.name}
                  width={40}
                  height={40}
                />
                <span className="hidden font-medium sm:block">
                  {match.awayTeam.tla}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
