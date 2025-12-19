import { PSG_TEAM_ID } from "@/lib/constants";
import { filterByCompetition } from "@/lib/utils";
import type { Competition, Match, Standing } from "@/types/api";

const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

if (!API_KEY) {
  throw new Error("FOOTBALL_DATA_API_KEY is not defined");
}

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "X-Auth-Token": API_KEY! },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(
      `API request failed: ${res.status} ${res.statusText}. Endpoint: ${endpoint}`,
    );
  }

  return res.json();
}

export async function getStandings(competition: string): Promise<Standing[]> {
  try {
    const { standings } = await fetchAPI(
      `/competitions/${competition}/standings`,
    );
    return standings[0].table;
  } catch (error) {
    throw new Error(
      `Failed to fetch standings for competition ${competition}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getFixtures(competition?: Competition): Promise<Match[]> {
  try {
    const { matches } = await fetchAPI(
      `/teams/${PSG_TEAM_ID}/matches?status=SCHEDULED`,
    );
    return filterByCompetition(matches, competition);
  } catch (error) {
    throw new Error(
      `Failed to fetch fixtures: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getResults(competition?: Competition): Promise<Match[]> {
  try {
    const { matches } = await fetchAPI(
      `/teams/${PSG_TEAM_ID}/matches?status=FINISHED`,
    );
    const filtered = filterByCompetition(matches, competition);
    return filtered.toReversed();
  } catch (error) {
    throw new Error(
      `Failed to fetch results: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
