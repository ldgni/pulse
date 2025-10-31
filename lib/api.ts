const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY!;

if (!API_KEY) {
  throw new Error("FOOTBALL_DATA_API_KEY is not set in environment variables");
}

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getStandings() {
  const { standings } = await fetchAPI("/competitions/FL1/standings");
  return standings[0].table;
}

export async function getFixtures() {
  const { matches } = await fetchAPI("/teams/524/matches?status=SCHEDULED");
  return matches;
}

export async function getResults() {
  const { matches } = await fetchAPI("/teams/524/matches?status=FINISHED");
  return matches.toReversed();
}
