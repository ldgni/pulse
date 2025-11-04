import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getFixtures } from "@/lib/api";

export default async function FixturesPage() {
  const data = await getFixtures();

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="text-center">
          No upcoming fixtures available
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Fixtures</h1>
        <p className="text-muted-foreground">All upcoming matches</p>
      </div>
      <ol className="space-y-4">
        {data.map((match) => (
          <li key={match.id}>
            <MatchCard match={match} type="fixture" />
          </li>
        ))}
      </ol>
    </>
  );
}
