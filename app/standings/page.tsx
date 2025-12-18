import { Suspense } from "react";

import CompetitionSelect from "@/components/competition-select";
import StandingsTable from "@/components/standings-table";
import { Spinner } from "@/components/ui/spinner";

type StandingsPageProps = {
  searchParams: Promise<{
    competition?: string;
  }>;
};

export default async function StandingsPage({
  searchParams,
}: StandingsPageProps) {
  const params = await searchParams;

  const competition = params.competition === "CL" ? "CL" : "FL1";

  const description =
    competition === "FL1" ? "Ligue 1 table" : "Champions League table";

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold sm:text-3xl">Standings</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex justify-center">
          <CompetitionSelect value={competition} includeAll={false} />
        </div>
      </div>
      <Suspense key={competition} fallback={<Spinner className="mx-auto" />}>
        <StandingsTable competition={competition} />
      </Suspense>
    </>
  );
}
