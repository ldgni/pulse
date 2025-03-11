import Image from "next/image";

import { PSG_TEAM_ID } from "@/lib/constants";
import { Match } from "@/lib/types";

interface MatchCardProps {
  match: Match;
}

// Team display component to reduce duplication
function TeamDisplay({
  team,
  alignment,
}: {
  team: Match["homeTeam"] | Match["awayTeam"];
  alignment: "left" | "right";
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 items-center ${alignment === "right" ? "justify-end" : "justify-start"}`}>
      {alignment === "right" && (
        <span className="mr-2 truncate text-sm font-medium sm:text-base">
          {team.shortName}
        </span>
      )}
      <div
        className={`relative h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10 ${alignment === "right" ? "" : "mr-2"}`}>
        <Image
          src={team.crest}
          alt={team.name}
          fill
          sizes="40px"
          className="object-contain"
        />
      </div>
      {alignment === "left" && (
        <span className="truncate text-sm font-medium sm:text-base">
          {team.shortName}
        </span>
      )}
    </div>
  );
}

export default function MatchCard({ match }: MatchCardProps) {
  const isFinished = match.status === "FINISHED";
  const matchDate = new Date(match.utcDate);
  const isPsgHome = match.homeTeam.id === PSG_TEAM_ID;
  const isPsgAway = match.awayTeam.id === PSG_TEAM_ID;

  // Check if the time is likely a placeholder (midnight to 4am in UTC+1)
  const isProbablyTBD = () => {
    let hours = matchDate.getUTCHours() + 1;
    if (hours >= 24) {
      hours -= 24;
    }
    return hours >= 0 && hours < 4; // Midnight to 4am in UTC+1
  };

  // Format time explicitly in UTC +1
  const formatMatchTime = () => {
    // Get UTC hours and add 1 for UTC+1
    let hours = matchDate.getUTCHours() + 1;
    // Handle day rollover if needed
    if (hours >= 24) {
      hours -= 24;
    }
    const minutes = matchDate.getUTCMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded border border-zinc-300 bg-gradient-to-br from-zinc-50 to-sky-100 p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none sm:p-4">
      <div className="mb-2 text-center text-xs text-zinc-600">
        {match.competition.name}
        <span className="mx-2">•</span>
        {/* Use explicit UTC date formatting */}
        {`${matchDate.getUTCDate()} ${new Intl.DateTimeFormat("en-US", { month: "short" }).format(matchDate)} ${matchDate.getUTCFullYear()}`}
      </div>

      <div className="flex items-center justify-center">
        {/* Home Team */}
        <TeamDisplay team={match.homeTeam} alignment="right" />

        {/* Score/Time */}
        <div className="mx-4">
          {isFinished ? (
            <div className="rounded-md text-base font-semibold sm:text-lg">
              <span
                className={`rounded px-2 py-1 ${isPsgHome ? "bg-blue-200" : "bg-gray-200"}`}>
                {match.score.fullTime.home}
              </span>
              <span className="px-1">-</span>
              <span
                className={`rounded px-2 py-1 ${isPsgAway ? "bg-blue-200" : "bg-gray-200"}`}>
                {match.score.fullTime.away}
              </span>
            </div>
          ) : (
            <div className="rounded bg-gray-200 px-2 py-1 text-sm font-medium text-zinc-600">
              {isProbablyTBD() ? "TBD" : formatMatchTime()}
            </div>
          )}
        </div>

        {/* Away Team */}
        <TeamDisplay team={match.awayTeam} alignment="left" />
      </div>
    </div>
  );
}
