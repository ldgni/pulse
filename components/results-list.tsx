import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getResults } from "@/lib/api";

export default async function ResultsList() {
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
    <ol className="space-y-4">
      {data.map((match) => (
        <li key={match.id}>
          <MatchCard match={match} type="result" />
        </li>
      ))}
    </ol>
  );
}
