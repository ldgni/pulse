import { NextRequest, NextResponse } from "next/server";

import { API_BASE_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const limit = searchParams.get("limit") || "20";
  const teamId = searchParams.get("teamId") || "524"; // Default to PSG

  const apiUrl = `${API_BASE_URL}/teams/${teamId}/matches?status=${status}&limit=${limit}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
      },
      next: { revalidate: 60 }, // Revalidate once per minute
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching matches:`, error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 },
    );
  }
}
