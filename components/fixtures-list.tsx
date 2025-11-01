import MatchCard from "@/components/match-card";
import { getFixtures } from "@/lib/api";

export default async function FixturesList() {
  const data = await getFixtures();

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

export async function NextFixture() {
  const data = await getFixtures();

  return <MatchCard match={data[0]} type="fixture" />;
}
