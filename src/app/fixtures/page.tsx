import { Metadata } from "next";

import MatchCard from "@/components/match-card";
import { getFixtures } from "@/lib/api";

export const metadata: Metadata = {
  title: "Fixtures",
};

export default async function FixturesPage() {
  const fixtures = await getFixtures();

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold">Fixtures</h1>
      {fixtures.length > 0 ? (
        <div className="space-y-4">
          {fixtures.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-white py-12 text-center shadow">
          <p className="text-gray-500">No upcoming fixtures found</p>
        </div>
      )}
    </>
  );
}
