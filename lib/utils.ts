import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { COMPETITION_CODES, COMPETITION_NAMES } from "@/lib/constants";
import type { Competition, FormResult } from "@/types";
import type { Match } from "@/types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseCompetition(competition?: string): Competition {
  if (competition === COMPETITION_CODES.CHAMPIONS_LEAGUE) {
    return COMPETITION_CODES.CHAMPIONS_LEAGUE;
  }
  if (competition === COMPETITION_CODES.LIGUE_1) {
    return COMPETITION_CODES.LIGUE_1;
  }
  return COMPETITION_CODES.ALL;
}

export function filterByCompetition(
  matches: Match[],
  competition: Competition | undefined,
): Match[] {
  if (!competition || competition === "all") {
    return matches;
  }

  const competitionName =
    competition === "CL"
      ? COMPETITION_NAMES.CHAMPIONS_LEAGUE
      : COMPETITION_NAMES.LIGUE_1;

  return matches.filter((match) =>
    match.competition.name.includes(competitionName),
  );
}

export function getMatchResult(match: Match): FormResult {
  const isPSGHome =
    match.homeTeam.name.includes("Paris") ||
    match.homeTeam.shortName.includes("PSG");
  const psgScore = isPSGHome
    ? match.score.fullTime.home
    : match.score.fullTime.away;
  const opponentScore = isPSGHome
    ? match.score.fullTime.away
    : match.score.fullTime.home;

  if (psgScore > opponentScore) return "W";
  if (psgScore === opponentScore) return "D";
  return "L";
}

export function formatMatchDate(utcDate: string): string {
  return new Date(utcDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
}

export function formatMatchTime(utcDate: string): string {
  const timeStr = new Date(utcDate).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  });

  // Display "TBD" if the time is 01:00 or 02:00 (API placeholder for unknown times)
  return timeStr === "01:00" || timeStr === "02:00" ? "TBD" : timeStr;
}
