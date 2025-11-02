import MatchCard from "@/components/match-card";
import { getFixtures } from "@/lib/api";

export default async function NextFixture() {
  const data = await getFixtures();

  return <MatchCard match={data[0]} type="fixture" />;
}
