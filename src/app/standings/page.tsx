import StandingsTable from "@/components/standings-table";
import { getStandings } from "@/lib/api";

const PSG_TEAM_ID = 524;

export default async function StandingsPage() {
  const standings = await getStandings();
  const leagueTable = standings.standings[0].table;

  return (
    <div className="py-8">
      <h1 className="mb-6 text-3xl font-bold">Ligue 1 Standings</h1>
      <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        <StandingsTable standings={leagueTable} highlightTeamId={PSG_TEAM_ID} />
      </div>
    </div>
  );
}
