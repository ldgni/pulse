import { Loader } from "lucide-react";
import { Suspense } from "react";

import StandingsTable from "@/components/standings-table";

export default function StandingsPage() {
  return (
    <>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Standings</h1>
        <p className="text-muted-foreground">Ligue 1 table</p>
      </div>
      <Suspense fallback={<Loader className="mx-auto animate-spin" />}>
        <StandingsTable />
      </Suspense>
    </>
  );
}
