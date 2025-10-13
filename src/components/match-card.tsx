import { Geist_Mono } from "next/font/google";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatMatchDate, formatMatchTime } from "@/lib/utils";
import { Match } from "@/types/api";

const geistMono = Geist_Mono({ subsets: ["latin"] });

interface MatchCardProps {
  match: Match;
  type: "fixture" | "result";
}

export function MatchCard({ match, type }: MatchCardProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>{match.competition.name}</CardTitle>
        <CardDescription>
          <time dateTime={match.utcDate}>{formatMatchDate(match.utcDate)}</time>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 sm:gap-6">
        {/* Home Team */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <span className="hidden font-semibold sm:block">
            {match.homeTeam.shortName}
          </span>
          <Image
            src={match.homeTeam.crest}
            alt={match.homeTeam.name}
            width={200}
            height={200}
            className="size-12"
          />
        </div>

        {/* Score or Time */}
        <div
          className={`${geistMono.className} bg-muted flex items-center gap-2 rounded-lg px-3 py-2 text-xl font-semibold sm:px-4 sm:text-2xl`}>
          {type === "result" ? (
            <>
              {match.score.fullTime.home}
              <span className="text-muted-foreground">-</span>
              {match.score.fullTime.away}
            </>
          ) : (
            <time dateTime={match.utcDate}>
              {formatMatchTime(match.utcDate)}
            </time>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-1 items-center gap-4">
          <Image
            src={match.awayTeam.crest}
            alt={match.awayTeam.name}
            width={200}
            height={200}
            className="size-12"
          />
          <span className="hidden font-semibold sm:block">
            {match.awayTeam.shortName}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
