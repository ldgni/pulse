import MatchCard from "@/components/match-card";
import { getResults } from "@/lib/api";

export default async function PreviousResult() {
  const data = await getResults();

  return <MatchCard match={data[0]} type="result" />;
}
