import useSWR from "swr";

import { API_BASE_URL, LIGUE_1_ID, PSG_TEAM_ID } from "@/lib/constants";
import { Match, StandingEntry, StandingsResponse } from "@/lib/types";

// Revalidation interval for client-side data
const REVALIDATE_INTERVAL = 60000; // 1 minute in milliseconds

// =============================
// SERVER-SIDE API FUNCTIONS
// =============================

// Generic API fetch function with authentication and caching (server-side only)
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`Error fetching from API (${endpoint}):`, error);
    throw error;
  }
}

// Fetch PSG matches filtered by status (server-side)
async function getMatchesByStatus(
  status: "SCHEDULED" | "FINISHED",
  limit = 20,
): Promise<Match[]> {
  const data = await fetchFromAPI<{ matches: Match[] }>(
    `/teams/${PSG_TEAM_ID}/matches?status=${status}&limit=${limit}`,
  );

  return status === "FINISHED"
    ? data.matches.sort(
        (a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime(),
      )
    : data.matches;
}

// Get completed PSG matches (server-side)
export async function getResults(): Promise<Match[]> {
  return getMatchesByStatus("FINISHED");
}

// Get upcoming PSG matches (server-side)
export async function getFixtures(): Promise<Match[]> {
  return getMatchesByStatus("SCHEDULED");
}

// Get current Ligue 1 standings table (server-side)
export async function getStandings(): Promise<StandingsResponse> {
  return fetchFromAPI<StandingsResponse>(
    `/competitions/${LIGUE_1_ID}/standings`,
  );
}

// Get PSG's most recent match result (server-side)
export async function getLatestResult(): Promise<Match | null> {
  const results = await getMatchesByStatus("FINISHED", 1);
  return results[0] || null;
}

// Get PSG's next upcoming match (server-side)
export async function getNextFixture(): Promise<Match | null> {
  const fixtures = await getMatchesByStatus("SCHEDULED", 1);
  return fixtures[0] || null;
}

// Get PSG's current position in the Ligue 1 (server-side)
export async function getPsgStanding(): Promise<StandingEntry | undefined> {
  const standings = await getStandings();

  for (const standingType of standings.standings) {
    if (standingType.type === "TOTAL") {
      return standingType.table.find((entry) => entry.team.id === PSG_TEAM_ID);
    }
  }

  return undefined;
}

// =============================
// CLIENT-SIDE API HOOKS
// =============================

// Custom SWR fetcher for local API endpoints (client-side)
const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
};

// Hook for getting PSG matches with a specific status (client-side)
export function useMatchesByStatus(
  status: "SCHEDULED" | "FINISHED",
  limit = 20,
) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/matches?status=${status}&limit=${limit}&teamId=${PSG_TEAM_ID}`,
    fetcher,
    {
      refreshInterval: REVALIDATE_INTERVAL,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    matches: data?.matches
      ? status === "FINISHED"
        ? data.matches.sort(
            (a: Match, b: Match) =>
              new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime(),
          )
        : data.matches
      : [],
    isLoading,
    isValidating,
    isError: error,
    mutate,
  };
}

// Hook for getting completed matches (client-side)
export function useResults() {
  return useMatchesByStatus("FINISHED");
}

// Hook for getting upcoming matches (client-side)
export function useFixtures() {
  return useMatchesByStatus("SCHEDULED");
}

// Hook for getting the latest result (client-side)
export function useLatestResult() {
  const { matches, isLoading, isValidating, isError, mutate } = useResults();

  return {
    match: matches.length > 0 ? matches[0] : null,
    isLoading,
    isValidating,
    isError,
    mutate,
  };
}

// Hook for getting the next fixture (client-side)
export function useNextFixture() {
  const { matches, isLoading, isValidating, isError, mutate } = useFixtures();

  return {
    match: matches.length > 0 ? matches[0] : null,
    isLoading,
    isValidating,
    isError,
    mutate,
  };
}

// Hook for getting standings (client-side)
export function useStandings() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/standings?competitionId=${LIGUE_1_ID}`,
    fetcher,
    {
      refreshInterval: REVALIDATE_INTERVAL,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    standings: data as StandingsResponse | undefined,
    isLoading,
    isValidating,
    isError: error,
    mutate,
  };
}

// Hook for getting PSG's standing (client-side)
export function usePsgStanding() {
  const { standings, isLoading, isValidating, isError, mutate } =
    useStandings();

  let psgStanding: StandingEntry | null = null;

  if (standings) {
    for (const standingType of standings.standings) {
      if (standingType.type === "TOTAL") {
        psgStanding =
          standingType.table.find((entry) => entry.team.id === PSG_TEAM_ID) ||
          null;
        break;
      }
    }
  }

  return {
    standing: psgStanding,
    isLoading,
    isValidating,
    isError,
    mutate,
  };
}
