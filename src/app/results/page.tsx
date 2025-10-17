import EmptyState from "@/components/empty-state";
import ErrorCard from "@/components/error-card";
import MatchCard from "@/components/match-card";
import { getResults } from "@/lib/api";
import { Match } from "@/types/api";

export default async function ResultsPage() {
  const matches = await getResults().catch(() => null);

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Results
      </h1>
      {matches === null ? (
        <ErrorCard />
      ) : matches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {matches.map((match: Match) => (
            <MatchCard key={match.id} match={match} type="result" />
          ))}
        </div>
      )}
    </>
  );
}
