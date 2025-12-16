import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getFixtures } from "@/lib/api";

type FixturesListProps = {
  competition: string;
};

export default async function FixturesList({ competition }: FixturesListProps) {
  const data = await getFixtures(competition);

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
    <ol className="space-y-4">
      {data.map((match) => (
        <li key={match.id}>
          <MatchCard match={match} type="fixture" />
        </li>
      ))}
    </ol>
  );
}
