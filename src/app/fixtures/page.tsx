import ErrorCard from "@/components/error-card";
import MatchCard from "@/components/match-card";
import { getFixtures } from "@/lib/api";
import { Match } from "@/types/api";

export default async function FixturesPage() {
  const matches = await getFixtures().catch(() => null);

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Fixtures
      </h1>
      {matches ? (
        <div className="space-y-4">
          {matches.map((match: Match) => (
            <MatchCard key={match.id} match={match} type="fixture" />
          ))}
        </div>
      ) : (
        <ErrorCard />
      )}
    </>
  );
}
