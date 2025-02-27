import { format } from "date-fns";
import Image from "next/image";

import { Match } from "@/lib/types";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const isFinished = match.status === "FINISHED";
  const matchDate = new Date(match.utcDate);

  return (
    <div className="mb-4 rounded-lg bg-white p-3 shadow-md sm:p-4">
      <div className="mb-2 text-center text-xs text-gray-500">
        {match.competition.name}
        <span className="mx-2">•</span>
        {format(matchDate, "MMM d, yyyy")}
      </div>

      <div className="flex items-center justify-between">
        {/* Home Team */}
        <div className="flex min-w-0 flex-1 items-center">
          <div className="relative mr-2 h-8 w-8 flex-shrink-0 sm:mr-2 sm:h-10 sm:w-10">
            <Image
              src={match.homeTeam.crest}
              alt={match.homeTeam.name}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <span className="truncate text-sm font-medium sm:text-base">
            {match.homeTeam.shortName}
          </span>
        </div>

        {/* Score/Time */}
        <div className="flex-shrink-0 px-2 text-center sm:px-4">
          {isFinished ? (
            <div className="text-base font-bold sm:text-lg">
              {match.score.fullTime.home} - {match.score.fullTime.away}
            </div>
          ) : (
            <div className="text-sm font-medium text-gray-500">
              {format(matchDate, "HH:mm")}
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex min-w-0 flex-1 items-center justify-end">
          <span className="truncate text-right text-sm font-medium sm:text-base">
            {match.awayTeam.shortName}
          </span>
          <div className="relative ml-2 h-8 w-8 flex-shrink-0 sm:ml-2 sm:h-10 sm:w-10">
            <Image
              src={match.awayTeam.crest}
              alt={match.awayTeam.name}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
