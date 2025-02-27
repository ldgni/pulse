import { Match, StandingEntry, StandingsResponse } from "./types";

const API_BASE_URL = "https://api.football-data.org/v4";
const PSG_TEAM_ID = 524; // Paris Saint-Germain team ID in the API

// Generic fetch function with proper typing
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// API functions with proper type parameters
export async function getFixtures(): Promise<Match[]> {
  const data = await fetchFromAPI<{ matches: Match[] }>(
    `/teams/${PSG_TEAM_ID}/matches?status=SCHEDULED`,
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
  // Assuming Ligue 1 competition ID is 2015
  return fetchFromAPI<StandingsResponse>("/competitions/FL1/standings");
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
