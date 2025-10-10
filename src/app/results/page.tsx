import { MatchCard } from "@/components/match-card";
import { Match } from "@/types/api";

export default async function ResultsPage() {
  const response = await fetch(
    "https://api.football-data.org/v4/teams/524/matches?status=FINISHED",
    {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "" },
      next: { revalidate: 300 },
    },
  );
  const { matches } = await response.json();
  const sortedMatches = matches.toReversed();

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Results
      </h1>
      <div className="space-y-4">
        {sortedMatches.map((match: Match) => (
          <MatchCard key={match.id} match={match} type="result" />
        ))}
      </div>
    </>
  );
}
