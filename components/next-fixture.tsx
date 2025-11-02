import MatchCard from "@/components/match-card";
import { Card } from "@/components/ui/card";
import { getFixtures } from "@/lib/api";

export default async function NextFixture() {
  const data = await getFixtures();

  if (data.length === 0) {
    return <Card className="text-center">No upcoming fixture available</Card>;
  }

  return <MatchCard match={data[0]} type="fixture" />;
}
