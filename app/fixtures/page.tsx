import { Metadata } from "next";

import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
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
        <Card>
          <CardContent className="text-muted-foreground text-center">
            No upcoming matches scheduled
          </CardContent>
        </Card>
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
