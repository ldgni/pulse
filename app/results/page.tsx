import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getResults } from "@/lib/api";

export default async function ResultsPage() {
  const data = await getResults();

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="text-center">
          No recent results available
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Results</h1>
        <p className="text-muted-foreground">All matches played</p>
      </div>
      <ol className="space-y-4">
        {data.map((match) => (
          <li key={match.id}>
            <MatchCard match={match} type="result" />
          </li>
        ))}
      </ol>
    </>
  );
}
