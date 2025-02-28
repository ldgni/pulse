import CurrentStanding from "@/components/current-standing";
import LatestResult from "@/components/latest-result";
import NextFixture from "@/components/next-fixture";
import { getLatestResult, getNextFixture, getPsgStanding } from "@/lib/api";

export default async function HomePage() {
  const [latestResult, nextFixture, psgStanding] = await Promise.all([
    getLatestResult(),
    getNextFixture(),
    getPsgStanding(),
  ]);

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold">Overview</h1>
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <LatestResult match={latestResult} />
        <NextFixture match={nextFixture} />
      </div>
      <CurrentStanding standing={psgStanding} />
    </>
  );
}
