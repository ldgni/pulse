"use client";

import CurrentStanding from "@/components/current-standing";
import LatestResult from "@/components/latest-result";
import NextFixture from "@/components/next-fixture";

export default function HomePage() {
  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-semibold">Overview</h1>
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <LatestResult />
        <NextFixture />
      </div>
      <CurrentStanding />
    </>
  );
}
