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

  // Get the correct score to display (regular + extra time, without penalties)
  const getScoreDisplay = () => {
    if (!isFinished) return { home: 0, away: 0 };

    // For regular time matches
    if (!match.score.duration || match.score.duration === "REGULAR") {
      return {
        home: match.score.fullTime.home ?? 0,
        away: match.score.fullTime.away ?? 0,
      };
    }

    // For matches with extra time or penalties
    return {
      home:
        (match.score.regularTime?.home ?? 0) +
        (match.score.extraTime?.home ?? 0),
      away:
        (match.score.regularTime?.away ?? 0) +
        (match.score.extraTime?.away ?? 0),
    };
  };

  const scores = getScoreDisplay();

  // Format the date once for better performance
  const formattedDate = `${matchDate.getUTCDate()} ${new Intl.DateTimeFormat("en-US", { month: "short" }).format(matchDate)} ${matchDate.getUTCFullYear()}`;

  // Get hours and minutes in UTC
  const hours = matchDate.getUTCHours();
  const minutes = matchDate.getUTCMinutes();

  // Check if the time is the placeholder (now at 00:00 UTC)
  const isPlaceholderTime = hours === 0 && minutes === 0;

  // Determine if DST is active in Europe (rough approximation)
  const currentDate = new Date();
  const isDST = currentDate.getMonth() > 2 && currentDate.getMonth() < 10;

  // Add timezone offset (+1 for CET, +2 for CEST during daylight saving)
  const localHours = isPlaceholderTime ? hours : hours + (isDST ? 2 : 1);
  const adjustedHours = localHours >= 24 ? localHours - 24 : localHours;

  // Format time in 24-hour format, with timezone adjustment
  const formattedTime = isPlaceholderTime
    ? "TBD"
    : `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return (
    <div className="rounded border border-zinc-300 bg-gradient-to-br from-zinc-50 to-sky-100 p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none sm:p-4">
      <div className="mb-2 text-center text-xs text-zinc-600">
        {match.competition.name}
        <span className="mx-2">•</span>
        {formattedDate}
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
                {scores.home}
              </span>
              <span className="px-1">-</span>
              <span
                className={`rounded px-2 py-1 ${isPsgAway ? "bg-blue-200" : "bg-gray-200"}`}>
                {scores.away}
              </span>
            </div>
          ) : (
            <div className="rounded bg-gray-200 px-2 py-1 text-sm font-medium text-zinc-600">
              {formattedTime}
            </div>
          )}
        </div>

        {/* Away Team */}
        <TeamDisplay team={match.awayTeam} alignment="left" />
      </div>
    </div>
  );
}
