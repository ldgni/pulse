import MatchCard from "@/components/match-card";
import { getResults } from "@/lib/api";
import { Match } from "@/types/api";

export default async function ResultsList() {
  const data = await getResults();

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
  const data = await getResults();

  return <MatchCard match={data[0]} type="result" />;
}
