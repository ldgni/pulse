import CurrentRanking from "@/components/current-ranking";
import NextFixture from "@/components/next-fixture";
import PreviousResult from "@/components/previous-result";

export default function HomePage() {
  return (
    <>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Welcome to Pulse</h1>
        <p className="text-muted-foreground">Paris Saint-Germain FC Tracker</p>
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Next fixture</h2>
          <NextFixture />
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Previous result</h2>
          <PreviousResult />
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Current ranking</h2>
          <CurrentRanking />
        </div>
      </div>
    </>
  );
}
