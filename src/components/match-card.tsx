import { format } from "date-fns";
import Image from "next/image";

import { Match } from "@/lib/types";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const isFinished = match.status === "FINISHED";
  const matchDate = new Date(match.utcDate);
  const PSG_TEAM_ID = 524;

  return (
    <div className="rounded border p-3 sm:p-4">
      <div className="mb-2 text-center text-xs text-gray-500">
        {match.competition.name}
        <span className="mx-2">•</span>
        {format(matchDate, "MMM d, yyyy")}
      </div>

      <div className="flex items-center justify-center">
        {/* Home Team */}
        <div className="flex min-w-0 flex-1 items-center justify-end px-2">
          <span className="mr-2 truncate text-sm font-medium sm:text-base">
            {match.homeTeam.shortName}
          </span>
          <div className="relative h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10">
            <Image
              src={match.homeTeam.crest}
              alt={match.homeTeam.name}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Score/Time */}
        <div className="flex-shrink-0 px-2 text-center">
          {isFinished ? (
            <div className="rounded-md px-2 py-1 text-base font-bold sm:text-lg">
              <span
                className={`rounded px-2 py-1 ${match.homeTeam.id === PSG_TEAM_ID ? "bg-blue-200" : "bg-gray-200"}`}>
                {match.score.fullTime.home}
              </span>
              <span className="px-1">-</span>
              <span
                className={`rounded px-2 py-1 ${match.awayTeam.id === PSG_TEAM_ID ? "bg-blue-200" : "bg-gray-200"}`}>
                {match.score.fullTime.away}
              </span>
            </div>
          ) : (
            <div className="text-sm font-medium text-gray-500">
              {format(matchDate, "HH:mm")}
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex min-w-0 flex-1 items-center justify-start px-2">
          <div className="relative mr-2 h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10">
            <Image
              src={match.awayTeam.crest}
              alt={match.awayTeam.name}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <span className="truncate text-sm font-medium sm:text-base">
            {match.awayTeam.shortName}
          </span>
        </div>
      </div>
    </div>
  );
}
