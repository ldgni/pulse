import { Match, TeamStanding } from "@/types/api";

const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY || "";

async function fetchAPI(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "X-Auth-Token": API_KEY },
    next: { revalidate: 300 },
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export async function getStandings() {
  const { standings } = await fetchAPI("/competitions/FL1/standings");
  return standings[0].table as TeamStanding[];
}

export async function getFixtures() {
  const { matches } = await fetchAPI("/teams/524/matches?status=SCHEDULED");
  return matches as Match[];
}

export async function getResults() {
  const { matches } = await fetchAPI("/teams/524/matches?status=FINISHED");
  return (matches as Match[]).toReversed();
}
