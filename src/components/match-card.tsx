import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import Image from "next/image";

import { Match } from "@/lib/types";

// PSG_TEAM_ID constant
const PSG_TEAM_ID = 524;

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const isFinished = match.status === "FINISHED";
  const matchDate = new Date(match.utcDate);

  // Format time in French time zone (Europe/Paris) instead of UTC
  const formattedTime = formatInTimeZone(matchDate, "Europe/Paris", "HH:mm");

  // Use this formatted time display logic instead of the current time display
  const displayTime =
    formattedTime === "01:00" || formattedTime === "02:00"
      ? "TBA"
      : formattedTime;

  return (
    <div className="rounded border p-3 sm:p-4">
      <div className="mb-2 text-center text-xs text-gray-500">
        {match.competition.name}
        <span className="mx-2">•</span>
        {format(matchDate, "MMM d, yyyy")}
      </div>

      <div className="flex items-center justify-center">
        {/* Home Team */}
        <div className="flex min-w-0 flex-1 items-center justify-end">
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
        <div className="mx-4">
          {isFinished ? (
            <div className="rounded-md text-base font-bold sm:text-lg">
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
            <div className="rounded bg-gray-200 px-2 py-1 text-sm font-medium text-gray-500">
              {displayTime}
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex min-w-0 flex-1 items-center justify-start">
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
