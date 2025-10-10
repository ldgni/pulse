import { MatchCard } from "@/components/match-card";
import { Match } from "@/types/api";

export default async function FixturesPage() {
  const response = await fetch(
    "https://api.football-data.org/v4/teams/524/matches?status=SCHEDULED",
    {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "" },
      next: { revalidate: 300 },
    },
  );
  const { matches } = await response.json();

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Fixtures
      </h1>
      <div className="space-y-4">
        {matches.map((match: Match) => (
          <MatchCard key={match.id} match={match} type="fixture" />
        ))}
      </div>
    </>
  );
}
