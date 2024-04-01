export async function fetchFromAPI(endpoint: string) {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!apiToken) {
    throw new Error("API token is not set");
  }

  const res = await fetch(`https://api.football-data.org/v4/${endpoint}`, {
    cache: "no-store",
    headers: {
      "X-Auth-Token": apiToken,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
