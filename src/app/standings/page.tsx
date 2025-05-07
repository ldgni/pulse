"use client";

import StandingsTable from "@/components/standings-table";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useStandings } from "@/lib/api";
import { PSG_TEAM_ID } from "@/lib/constants";

export default function StandingsPage() {
  const { standings, isLoading, isValidating } = useStandings();
  const isRefreshing = isLoading || isValidating;

  const leagueTable = standings?.standings?.[0]?.table || [];

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-semibold">
        Ligue 1 Standings
      </h1>

      {isRefreshing && leagueTable.length === 0 ? (
        <LoadingSpinner />
      ) : leagueTable.length > 0 ? (
        <div className="relative">
          {isRefreshing && (
            <div className="absolute top-0 right-4">
              <LoadingSpinner />
            </div>
          )}
          <StandingsTable
            standings={leagueTable}
            highlightTeamId={PSG_TEAM_ID}
          />
        </div>
      ) : (
        <div className="rounded-lg bg-white py-12 text-center shadow">
          <p className="text-gray-500">Standings information not available</p>
        </div>
      )}
    </>
  );
}
