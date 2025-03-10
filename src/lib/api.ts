import { API_BASE_URL, LIGUE_1_ID, PSG_TEAM_ID } from "@/lib/constants";
import { Match, StandingEntry, StandingsResponse } from "@/lib/types";

// Generic API fetch function with authentication and caching
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

// Fetch PSG matches filtered by status
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

// Get completed PSG matches
export async function getResults(): Promise<Match[]> {
  return getMatchesByStatus("FINISHED");
}

// Get upcoming PSG matches
export async function getFixtures(): Promise<Match[]> {
  return getMatchesByStatus("SCHEDULED");
}

// Get current Ligue 1 standings table
export async function getStandings(): Promise<StandingsResponse> {
  return fetchFromAPI<StandingsResponse>(
    `/competitions/${LIGUE_1_ID}/standings`,
  );
}

// Get PSG's most recent match result
export async function getLatestResult(): Promise<Match | null> {
  const results = await getMatchesByStatus("FINISHED", 1);
  return results[0] || null;
}

// Get PSG's next upcoming match
export async function getNextFixture(): Promise<Match | null> {
  const fixtures = await getMatchesByStatus("SCHEDULED", 1);
  return fixtures[0] || null;
}

// Get PSG's current position in the Ligue 1
export async function getPsgStanding(): Promise<StandingEntry | undefined> {
  const standings = await getStandings();
  return standings.standings[0].table.find(
    (entry) => entry.team.id === PSG_TEAM_ID,
  );
}
