import MatchesList from "@/components/matches-list";
import { getFixtures } from "@/lib/api";
import type { Competition } from "@/types";

type FixturesListProps = {
  competition: Competition;
  page?: number;
};

export default async function FixturesList({
  competition,
  page = 1,
}: FixturesListProps) {
  const data = await getFixtures(competition);

  return (
    <MatchesList
      matches={data}
      competition={competition}
      page={page}
      basePath="/fixtures"
      emptyMessage="No upcoming fixtures available"
      matchType="fixture"
    />
  );
}
