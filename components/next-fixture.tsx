import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getFixtures } from "@/lib/api";

export default async function NextFixture() {
  const data = await getFixtures();

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="text-center">
          No upcoming fixture available
        </CardContent>
      </Card>
    );
  }

  return <MatchCard match={data[0]} type="fixture" />;
}
