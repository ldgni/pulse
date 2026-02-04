import { Metadata } from "next";

import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getPSGResults } from "@/lib/api";

export const metadata: Metadata = {
  title: "Results",
};

export default async function ResultsPage() {
  const results = await getPSGResults();

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Results</h1>
        <p className="text-muted-foreground text-sm">All matches played</p>
      </div>
      {results.length === 0 ? (
        <Card>
          <CardContent className="text-muted-foreground text-center">
            No matches played yet
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((match) => (
            <MatchCard key={match.id} match={match} variant="result" />
          ))}
        </div>
      )}
    </>
  );
}
