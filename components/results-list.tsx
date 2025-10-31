import MatchCard from "@/components/match-card";
import { ErrorCard, WarningCard } from "@/components/status-card";
import { getResults } from "@/lib/api";
import { Match } from "@/types/api";

export default async function ResultsList() {
  let data;
  try {
    data = await getResults();
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
          <MatchCard match={match} type="result" />
        </li>
      ))}
    </ol>
  );
}

export async function PreviousResult() {
  let data;
  try {
    data = await getResults();
  } catch {
    return <ErrorCard />;
  }

  if (data.length === 0) {
    return <WarningCard />;
  }

  return <MatchCard match={data[0]} type="result" />;
}
