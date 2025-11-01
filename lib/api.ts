const API_BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY!;

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
    next: {
      revalidate: 300,
    },
  });
  const data = await res.json();
  return data;
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
