import EmptyState from "@/components/empty-state";
import ErrorCard from "@/components/error-card";
import MatchCard from "@/components/match-card";
import { getResults } from "@/lib/api";
import { Match } from "@/types/api";

export default async function ResultsPage() {
  const matches = await getResults().catch(() => null);

  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Results</h1>
        <p className="text-muted-foreground">All matches played</p>
      </div>
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
