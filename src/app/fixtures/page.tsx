import MatchCard from "@/components/match-card";
import { getFixtures } from "@/lib/api";

export default async function FixturesPage() {
  const fixtures = await getFixtures();

  return (
    <div className="py-8">
      <h1 className="mb-6 text-3xl font-bold">Upcoming PSG Fixtures</h1>
      {fixtures.length > 0 ? (
        <div className="space-y-4">
          {fixtures.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-white py-12 text-center shadow dark:bg-gray-800">
          <p className="text-gray-500">No upcoming fixtures found</p>
        </div>
      )}
    </div>
  );
}
