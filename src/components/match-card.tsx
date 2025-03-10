import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const isPsgHome = match.homeTeam.id === PSG_TEAM_ID;
  const isPsgAway = match.awayTeam.id === PSG_TEAM_ID;
  const matchDate = new Date(match.utcDate);

  // Check if the time is likely a placeholder (midnight to 4am in UTC+1)
  const isProbablyTBD = () => {
    // Convert UTC to UTC+1
    const utcPlus1Date = new Date(matchDate.getTime() + 60 * 60 * 1000);
    const hours = utcPlus1Date.getUTCHours();
    return hours >= 0 && hours < 4;
  };

  useEffect(() => {
    // Format date and time on the client side
    const date = new Date(match.utcDate);
    setFormattedDate(
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    );

    setFormattedTime(
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    );
  }, [match.utcDate]);

  return (
    <div className="rounded border border-zinc-200 p-3 sm:p-4">
      <div className="mb-2 text-center text-xs text-gray-500">
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
            <div className="rounded-md text-base font-bold sm:text-lg">
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
            <div className="rounded bg-gray-200 px-2 py-1 text-sm font-medium text-gray-500">
              {isProbablyTBD() ? "TBD" : formattedTime}
            </div>
          )}
        </div>

        {/* Away Team */}
        <TeamDisplay team={match.awayTeam} alignment="left" />
      </div>
    </div>
  );
}
