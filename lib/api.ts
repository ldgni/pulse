import { cacheLife } from "next/cache";

import type { Match, Standing } from "@/types/api";

const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY!;

if (!API_KEY) {
  throw new Error("FOOTBALL_DATA_API_KEY is not defined");
}

async function fetchAPI(endpoint: string) {
  "use cache";
  cacheLife({
    stale: 300, // 5 minutes until considered stale
    revalidate: 600, // 10 minutes until revalidated
    expire: 86400, // 24 hours until expired
  });

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "X-Auth-Token": API_KEY },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getStandings(): Promise<Standing[]> {
  const { standings } = await fetchAPI("/competitions/FL1/standings");
  return standings[0].table;
}

export async function getFixtures(): Promise<Match[]> {
  const { matches } = await fetchAPI("/teams/524/matches?status=SCHEDULED");
  return matches;
}

export async function getResults(): Promise<Match[]> {
  const { matches } = await fetchAPI("/teams/524/matches?status=FINISHED");
  return matches.toReversed();
}
