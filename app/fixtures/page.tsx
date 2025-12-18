import { Suspense } from "react";

import CompetitionSelect from "@/components/competition-select";
import FixturesList from "@/components/fixtures-list";
import { Spinner } from "@/components/ui/spinner";

type FixturesPageProps = {
  searchParams: Promise<{
    competition?: string;
  }>;
};

export default async function FixturesPage({
  searchParams,
}: FixturesPageProps) {
  const params = await searchParams;

  const competition =
    params.competition === "CL"
      ? "CL"
      : params.competition === "FL1"
        ? "FL1"
        : "all";

  const description =
    competition === "all"
      ? "All upcoming matches"
      : competition === "FL1"
        ? "Ligue 1 upcoming matches"
        : "Champions League upcoming matches";

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold sm:text-3xl">Fixtures</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex justify-center">
          <CompetitionSelect value={competition} />
        </div>
      </div>
      <Suspense key={competition} fallback={<Spinner className="mx-auto" />}>
        <FixturesList competition={competition} />
      </Suspense>
    </>
  );
}
