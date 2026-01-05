import { Suspense } from "react";

import NextFixture from "@/components/next-fixture";
import PreviousResult from "@/components/previous-result";
import RecentForm from "@/components/recent-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold sm:text-6xl">Pulse</h1>
        <p className="text-muted-foreground mb-4 italic">
          Track PSG&apos;s performances
        </p>
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent form</h2>
          <Suspense
            fallback={
              <Skeleton className="h-[146px] w-full rounded-xl border shadow-sm" />
            }>
            <RecentForm />
          </Suspense>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Next fixture</h2>
          <Suspense
            fallback={
              <Skeleton className="h-[166px] w-full rounded-xl border shadow-sm" />
            }>
            <NextFixture />
          </Suspense>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Previous result</h2>
          <Suspense
            fallback={
              <Skeleton className="h-[166px] w-full rounded-xl border shadow-sm" />
            }>
            <PreviousResult />
          </Suspense>
        </div>
      </div>
    </>
  );
}
