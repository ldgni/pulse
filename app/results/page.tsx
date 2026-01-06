import type { Metadata } from "next";
import { Suspense } from "react";

import CompetitionSelect from "@/components/competition-select";
import ResultsList from "@/components/results-list";
import { Spinner } from "@/components/ui/spinner";
import { COMPETITION_CODES } from "@/lib/constants";
import { parseCompetition } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pulse - Results",
  description: "Recent PSG match results and scores",
};

type ResultsPageProps = {
  searchParams: Promise<{
    competition?: string;
    page?: string;
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const competition = parseCompetition(params.competition);
  const page = params.page ? parseInt(params.page, 10) : 1;
  const description =
    competition === COMPETITION_CODES.ALL
      ? "All matches played"
      : competition === COMPETITION_CODES.LIGUE_1
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
      <Suspense
        key={`${competition}-${page}`}
        fallback={<Spinner className="mx-auto" />}>
        <ResultsList competition={competition} page={page} />
      </Suspense>
    </>
  );
}
