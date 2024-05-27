export async function getFromAPI(endpoint: string) {
  const token = process.env.API_TOKEN;

  if (!token) {
    throw new Error("API token is not set");
  }

  const res = await fetch(`https://api.football-data.org/v4/${endpoint}`, {
    headers: {
      "X-Auth-Token": token,
    },
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
