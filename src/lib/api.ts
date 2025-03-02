import { API_BASE_URL, LIGUE_1_ID, PSG_TEAM_ID } from "./constants";
import { Match, StandingEntry, StandingsResponse } from "./types";

// Generic fetch function with proper typing and improved error handling
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");
      throw new Error(
        `API request failed with status ${res.status}: ${errorText}`,
      );
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`Error fetching from API (${endpoint}):`, error);
    throw error;
  }
}

// API functions with proper type parameters
export async function getFixtures(): Promise<Match[]> {
  const data = await fetchFromAPI<{ matches: Match[] }>(
    `/teams/${PSG_TEAM_ID}/matches?status=SCHEDULED&limit=20`,
  );
  return data.matches;
}

export async function getResults(): Promise<Match[]> {
  const data = await fetchFromAPI<{ matches: Match[] }>(
    `/teams/${PSG_TEAM_ID}/matches?status=FINISHED&limit=20`,
  );
  // Sort matches from newest to oldest
  return data.matches.sort(
    (a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime(),
  );
}

export async function getStandings(): Promise<StandingsResponse> {
  // Using the constant for Ligue 1 competition ID
  return fetchFromAPI<StandingsResponse>(
    `/competitions/${LIGUE_1_ID}/standings`,
  );
}

export async function getLatestResult(): Promise<Match | null> {
  const results = await getResults();
  return results.length > 0 ? results[0] : null;
}

export async function getNextFixture(): Promise<Match | null> {
  const fixtures = await getFixtures();
  return fixtures.length > 0 ? fixtures[0] : null;
}

export async function getPsgStanding(): Promise<StandingEntry | undefined> {
  const standings = await getStandings();
  return standings.standings[0].table.find(
    (entry) => entry.team.id === PSG_TEAM_ID,
  );
}
