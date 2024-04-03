import { Match } from "@/types/matches";

export function determineOutcome(match: Match, showScores: boolean) {
  if (!showScores || !match.score) {
    return "upcoming";
  }

  if (match.score.fullTime.home === match.score.fullTime.away) {
    return "tie";
  }

  if (match.homeTeam.name === "Paris Saint-Germain FC") {
    return match.score.fullTime.home > match.score.fullTime.away
      ? "win"
      : "loss";
  } else if (match.awayTeam.name === "Paris Saint-Germain FC") {
    return match.score.fullTime.away > match.score.fullTime.home
      ? "win"
      : "loss";
  }

  return "";
}

export function determineBgColor(outcome: string) {
  switch (outcome) {
    case "win":
      return "win";
    case "loss":
      return "lose";
    case "tie":
      return "draw";
    case "upcoming":
      return "upcoming";
    default:
      return "";
  }
}
