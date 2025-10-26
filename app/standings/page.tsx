import StandingsTable from "@/components/standings-table";

export default function StandingsPage() {
  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Standings</h1>
        <p className="text-muted-foreground">Ligue 1 table</p>
      </div>
      <StandingsTable />
    </>
  );
}
