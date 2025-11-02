import MatchCard from "@/components/match-card";
import { getResults } from "@/lib/api";

export default async function ResultsList() {
  const data = await getResults();

  return (
    <ol className="space-y-4">
      {data.map((match) => (
        <li key={match.id}>
          <MatchCard match={match} type="result" />
        </li>
      ))}
    </ol>
  );
}
