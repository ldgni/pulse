import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import { getResults } from "@/lib/api";

export default async function PreviousResult() {
  const data = await getResults();

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="text-center">
          No previous result available
        </CardContent>
      </Card>
    );
  }

  return <MatchCard match={data[0]} type="result" />;
}
