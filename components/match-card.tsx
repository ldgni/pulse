import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Match } from "@/lib/types";
import { formatMatchDate, formatMatchTime } from "@/lib/utils";

interface MatchCardProps {
  match: Match;
  variant: "fixture" | "result";
}

export default function MatchCard({ match, variant }: MatchCardProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>{match.competition.name}</CardTitle>
        <CardDescription>
          <time dateTime={match.utcDate}>{formatMatchDate(match.utcDate)}</time>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        {/* Home Team */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <span className="hidden font-semibold sm:inline">
            {match.homeTeam.shortName}
          </span>
          {match.homeTeam.crest ? (
            <Image
              src={match.homeTeam.crest}
              alt={match.homeTeam.name}
              width={48}
              height={48}
            />
          ) : (
            <div className="bg-muted size-12 rounded-full" />
          )}
        </div>

        {/* Time or Score */}
        <time
          dateTime={match.utcDate}
          className="bg-accent rounded-xl px-4 py-2 font-mono text-xl font-bold">
          {variant === "fixture"
            ? formatMatchTime(match.utcDate)
            : `${match.score.fullTime.home} - ${match.score.fullTime.away}`}
        </time>

        {/* Away Team */}
        <div className="flex flex-1 items-center gap-4">
          {match.awayTeam.crest ? (
            <Image
              src={match.awayTeam.crest}
              alt={match.awayTeam.name}
              width={48}
              height={48}
            />
          ) : (
            <div className="bg-muted size-12 rounded-full" />
          )}
          <span className="hidden font-semibold sm:inline">
            {match.awayTeam.shortName}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
