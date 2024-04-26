"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Match } from "@/types/matches";
import { formatDate } from "@/utils/dateFormater";
import { determineBgColor, determineOutcome } from "@/utils/matchUtils";

interface MatchListProps {
  matches: Match[];
  showScores: boolean;
}

export default function MatchList({ matches, showScores }: MatchListProps) {
  const enhancedMatches = matches.map((match) => {
    const outcome = determineOutcome(match, showScores);
    const bgColor = determineBgColor(outcome);

    return { ...match, outcome, bgColor };
  });

  return (
    <motion.ul
      className="flex w-full max-w-xl flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeIn" }}>
      {enhancedMatches.map(
        (match: Match & { outcome: string; bgColor: string }) => {
          return (
            <li
              key={match.id}
              className={`flex flex-col gap-4 rounded border border-slate-500 p-4 uppercase shadow sm:flex-col-reverse ${match.bgColor}`}>
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
                <p className="font-semibold">{formatDate(match.utcDate)}</p>
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
        }
      )}
    </motion.ul>
  );
}
