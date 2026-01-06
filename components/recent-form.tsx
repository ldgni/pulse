import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRecentForm } from "@/lib/api";
import { formatMatchDate, getMatchResult, isPSGHome } from "@/lib/utils";
import type { FormResult } from "@/types";
import type { Match } from "@/types/api";

function getBadgeClassName(result: FormResult): string {
  if (result === "W") {
    return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
  }
  if (result === "D") {
    return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
  }
  return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
}

function getTooltipContent(match: Match): string {
  const date = formatMatchDate(match.utcDate);

  return `${match.homeTeam.shortName} ${match.score.fullTime.home}-${match.score.fullTime.away} ${match.awayTeam.shortName}\n${match.competition.name}\n${date}`;
}

function calculateStats(formResults: FormResult[], matches: Match[]) {
  const wins = formResults.filter((r) => r === "W").length;
  const winRate = Math.round((wins / formResults.length) * 100);

  let goalsScored = 0;
  let goalsConceded = 0;

  matches.forEach((match) => {
    if (isPSGHome(match)) {
      goalsScored += match.score.fullTime.home;
      goalsConceded += match.score.fullTime.away;
    } else {
      goalsScored += match.score.fullTime.away;
      goalsConceded += match.score.fullTime.home;
    }
  });

  const goalDifference = goalsScored - goalsConceded;

  return { winRate, goalDifference };
}

export default async function RecentForm() {
  const matches = await getRecentForm();

  if (matches.length === 0) {
    return (
      <Card>
        <CardContent className="text-center">
          No recent form available
        </CardContent>
      </Card>
    );
  }

  const formResults = matches.map((match) => ({
    match,
    result: getMatchResult(match),
  }));

  const results = formResults.map(({ result }) => result);
  const stats = calculateStats(results, matches);

  return (
    <Card>
      <CardContent>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Win rate:</span>
            <span className="font-mono font-semibold">{stats.winRate}%</span>
          </div>
          <div className="bg-border h-4 w-px" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Goal diff:</span>
            <span
              className={`font-mono font-semibold ${
                stats.goalDifference > 0
                  ? "text-green-600 dark:text-green-400"
                  : stats.goalDifference < 0
                    ? "text-red-600 dark:text-red-400"
                    : ""
              }`}>
              {stats.goalDifference > 0 ? "+" : ""}
              {stats.goalDifference}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-8">
          {formResults.map(({ match, result }) => (
            <Tooltip key={match.id}>
              <TooltipTrigger asChild>
                <Badge
                  variant="default"
                  className={`size-10 transition-transform duration-200 hover:scale-110 sm:size-12 sm:text-lg ${getBadgeClassName(result)}`}>
                  {result}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <pre className="whitespace-pre-wrap">
                  {getTooltipContent(match)}
                </pre>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
