import type { Match, Standing } from "@/types/api";

const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY!;

if (!API_KEY) {
  throw new Error("FOOTBALL_DATA_API_KEY is not defined");
}

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "X-Auth-Token": API_KEY },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getStandings(competition: string): Promise<Standing[]> {
  const { standings } = await fetchAPI(
    `/competitions/${competition}/standings`,
  );
  return standings[0].table;
}

export async function getFixtures(competition?: string): Promise<Match[]> {
  const { matches } = await fetchAPI("/teams/524/matches?status=SCHEDULED");
  if (!competition || competition === "all") return matches;
  return matches.filter((match: Match) =>
    match.competition.name.includes(
      competition === "CL" ? "Champions League" : "Ligue 1",
    ),
  );
}

export async function getResults(competition?: string): Promise<Match[]> {
  const { matches } = await fetchAPI("/teams/524/matches?status=FINISHED");
  if (!competition || competition === "all") {
    return matches.toReversed();
  }
  const filtered = matches.filter((match: Match) =>
    match.competition.name.includes(
      competition === "CL" ? "Champions League" : "Ligue 1",
    ),
  );
  return filtered.toReversed();
}
