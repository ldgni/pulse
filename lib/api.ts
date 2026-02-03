import { LIGUE_1_CODE, PSG_TEAM_ID } from "@/lib/constants";

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

// Generic fetch function for football-data.org API
async function fetchFromAPI(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "X-Auth-Token": API_KEY || "" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
}

// Fetch PSG's upcoming fixtures
export async function getPSGFixtures() {
  const data = await fetchFromAPI(
    `/teams/${PSG_TEAM_ID}/matches?status=SCHEDULED`,
  );
  return data.matches;
}

// Fetch PSG's recent results
export async function getPSGResults() {
  const data = await fetchFromAPI(
    `/teams/${PSG_TEAM_ID}/matches?status=FINISHED`,
  );
  return data.matches.toReversed();
}

// Fetch Ligue 1 standings
export async function getLigue1Standings() {
  const data = await fetchFromAPI(`/competitions/${LIGUE_1_CODE}/standings`);
  return data.standings[0].table;
}
