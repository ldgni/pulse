import MatchCard from "@/components/match-card";
import { getResults } from "@/lib/api";

export default async function ResultsPage() {
  const results = await getResults();

  return (
    <div className="py-8">
      <h1 className="mb-6 text-3xl font-bold">PSG Recent Results</h1>
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-white py-12 text-center shadow dark:bg-gray-800">
          <p className="text-gray-500">No recent results found</p>
        </div>
      )}
    </div>
  );
}
