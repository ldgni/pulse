import MatchesList from "@/components/matches-list";
import { getResults } from "@/lib/api";
import type { Competition } from "@/types";

type ResultsListProps = {
  competition: Competition;
  page?: number;
};

export default async function ResultsList({
  competition,
  page = 1,
}: ResultsListProps) {
  const data = await getResults(competition);

  return (
    <MatchesList
      matches={data}
      competition={competition}
      page={page}
      basePath="/results"
      emptyMessage="No recent results available"
      matchType="result"
    />
  );
}
