import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { getStandings } from "@/lib/api";

export default async function CurrentRanking() {
  const data = await getStandings("FL1");

  const psg = data.find((team) => team.team.tla === "PSG")!;

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <span className="mr-2 text-2xl font-semibold">{psg.position}</span>
            <Image
              src={psg.team.crest}
              alt={psg.team.name}
              width={200}
              height={200}
              className="size-12"
            />
            <div>
              <span className="font-semibold sm:hidden">{psg.team.tla}</span>
              <span className="hidden font-semibold sm:block">
                {psg.team.name}
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground uppercase">Points</span>
            <div className="text-2xl font-semibold">{psg.points}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
