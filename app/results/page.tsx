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
  const competition = params.competition === "CL" ? "CL" : "FL1";

  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Results</h1>
        <CompetitionSelect value={competition} />
      </div>
      <Suspense key={competition} fallback={<Spinner className="mx-auto" />}>
        <ResultsList competition={competition} />
      </Suspense>
    </>
  );
}
