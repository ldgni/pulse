import { Metadata } from "next";

import EmptyState from "@/components/empty-state";
import MatchCard from "@/components/match-card";
import { getPSGFixtures } from "@/lib/api";

export const metadata: Metadata = {
  title: "Fixtures",
};

export default async function FixturesPage() {
  const fixtures = await getPSGFixtures();

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Fixtures</h1>
        <p className="text-muted-foreground text-sm">All upcoming matches</p>
      </div>
      {fixtures.length === 0 ? (
        <EmptyState variant="fixture" />
      ) : (
        <div className="space-y-4">
          {fixtures.map((match) => (
            <MatchCard key={match.id} match={match} variant="fixture" />
          ))}
        </div>
      )}
    </>
  );
}
