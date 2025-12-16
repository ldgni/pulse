import { Suspense } from "react";

import CompetitionSelect from "@/components/competition-select";
import ResultsList from "@/components/results-list";
import { Spinner } from "@/components/ui/spinner";

type ResultsPageProps = {
  searchParams: Promise<{
    competition?: string;
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const competition =
    params.competition === "CL"
      ? "CL"
      : params.competition === "FL1"
        ? "FL1"
        : "all";

  const description =
    competition === "all"
      ? "All matches played"
      : competition === "FL1"
        ? "Ligue 1 matches played"
        : "Champions League matches played";

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold sm:text-3xl">Results</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex justify-center">
          <CompetitionSelect value={competition} />
        </div>
      </div>
      <Suspense key={competition} fallback={<Spinner className="mx-auto" />}>
        <ResultsList competition={competition} />
      </Suspense>
    </>
  );
}
