import { Suspense } from "react";

import { NextFixture } from "@/components/fixtures-list";
import { PreviousResult } from "@/components/results-list";
import { CurrentRanking } from "@/components/standings-table";
import { SkeletonCard } from "@/components/status-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Welcome to Pulse</h1>
        <p className="text-muted-foreground">Paris Saint-Germain FC Tracker</p>
      </div>
      <div className="space-y-8">
        <>
          <h2 className="mb-4 text-xl font-semibold">Next fixture</h2>
          <Suspense fallback={<SkeletonCard count={1} />}>
            <NextFixture />
          </Suspense>
        </>
        <>
          <h2 className="mb-4 text-xl font-semibold">Previous result</h2>
          <Suspense fallback={<SkeletonCard count={1} />}>
            <PreviousResult />
          </Suspense>
        </>
        <>
          <h2 className="mb-4 text-xl font-semibold">Current ranking</h2>
          <Suspense
            fallback={
              <Skeleton className="h-[106px] w-full rounded-xl border shadow-sm" />
            }>
            <CurrentRanking />
          </Suspense>
        </>
      </div>
    </>
  );
}
