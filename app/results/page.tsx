import { Suspense } from "react";

import ResultsList from "@/components/results-list";
import { SkeletonCard } from "@/components/status-card";

export default function ResultsPage() {
  return (
    <>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Results</h1>
        <p className="text-muted-foreground">All matches played</p>
      </div>
      <Suspense fallback={<SkeletonCard count={10} />}>
        <ResultsList />
      </Suspense>
    </>
  );
}
