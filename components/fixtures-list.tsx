import MatchCard from "@/components/match-card";
import { ErrorCard, WarningCard } from "@/components/status-card";
import { getFixtures } from "@/lib/api";
import { Match } from "@/types/api";

export default async function FixturesList() {
  let data;
  try {
    data = await getFixtures();
  } catch {
    return <ErrorCard />;
  }

  if (data.length === 0) {
    return <WarningCard />;
  }

  return (
    <ol className="space-y-4">
      {data.map((match: Match) => (
        <li key={match.id}>
          <MatchCard match={match} type="fixture" />
        </li>
      ))}
    </ol>
  );
}

export async function NextFixture() {
  let data;
  try {
    data = await getFixtures();
  } catch {
    return <ErrorCard />;
  }

  if (data.length === 0) {
    return <WarningCard />;
  }

  return <MatchCard match={data[0]} type="fixture" />;
}
