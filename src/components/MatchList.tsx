import Image from "next/image";

import { Match } from "@/types/matches";

interface MatchListProps {
  matches: Match[];
  showScores: boolean;
}

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

export default function MatchList({ matches, showScores }: MatchListProps) {
  return (
    <ul className="flex w-full max-w-xl flex-col gap-8">
      {matches.map((match: Match) => {
        const outcome = determineOutcome(match, showScores);
        const bgColor = determineBgColor(outcome);

        return (
          <li
            key={match.id}
            className={`flex flex-col gap-4 rounded-lg border border-slate-400 p-4 uppercase sm:flex-col-reverse ${bgColor}`}>
            <div className="flex flex-col gap-2 font-semibold sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-2 sm:flex-1 sm:flex-row-reverse">
                <Image
                  src={match.homeTeam.crest}
                  width={96}
                  height={96}
                  className="h-auto w-8"
                  alt={`${match.homeTeam.name} logo`}
                />
                {showScores && match.score ? (
                  <div className="flex w-full justify-between sm:flex-row-reverse">
                    <p>{match.homeTeam.shortName}</p>
                    <p className="sm:hidden">{match.score.fullTime.home}</p>
                  </div>
                ) : (
                  <p>{match.homeTeam.shortName}</p>
                )}
              </div>
              {showScores && match.score ? (
                <p className="hidden sm:block">
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </p>
              ) : (
                <p className="hidden text-sm sm:block">vs</p>
              )}
              <div className="flex items-center gap-2 sm:flex-1">
                <Image
                  src={match.awayTeam.crest}
                  width={96}
                  height={96}
                  className="h-auto w-8"
                  alt={`${match.awayTeam.name} logo`}
                />
                {showScores && match.score ? (
                  <div className="flex w-full justify-between">
                    <p>{match.awayTeam.shortName}</p>
                    <p className="sm:hidden">{match.score.fullTime.away}</p>
                  </div>
                ) : (
                  <p>{match.awayTeam.shortName}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col text-sm sm:items-center">
              <p className="font-semibold">
                {new Date(match.utcDate)
                  .toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .replace(/,/g, "")}
              </p>
              <p className="text-slate-300">
                {match.competition.name}{" "}
                {match.competition.name === "Ligue 1" &&
                  `- Matchweek ${match.matchday}`}
                {match.competition.name === "UEFA Champions League" && (
                  <span className="hidden sm:inline">
                    {match.stage && `- ${match.stage.replace("_", " ")}`}
                  </span>
                )}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
