import type { Match, TeamStanding } from "@/types/api";

const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY!;

if (!API_KEY) {
  throw new Error("FOOTBALL_DATA_API_KEY is not defined");
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data as T;
}

export async function getStandings(): Promise<TeamStanding[]> {
  const { standings } = await fetchAPI<{
    standings: Array<{ table: TeamStanding[] }>;
  }>("/competitions/FL1/standings");
  return standings[0].table;
}

export async function getFixtures(): Promise<Match[]> {
  const { matches } = await fetchAPI<{ matches: Match[] }>(
    "/teams/524/matches?status=SCHEDULED",
  );
  return matches;
}

export async function getResults(): Promise<Match[]> {
  const { matches } = await fetchAPI<{ matches: Match[] }>(
    "/teams/524/matches?status=FINISHED",
  );
  return matches.toReversed();
}
