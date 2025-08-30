import { NextRequest, NextResponse } from "next/server";

import { API_BASE_URL } from "@/lib/constants";
import { StandingEntry, StandingType } from "@/lib/types";

// Function to recalculate positions to ensure consecutive numbering
function recalculatePositions(table: StandingEntry[]): StandingEntry[] {
  return table.map((entry, index) => ({
    ...entry,
    position: index + 1,
  }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const competitionId = searchParams.get("competitionId") || "2015"; // Default to Ligue 1

  const apiUrl = `${API_BASE_URL}/competitions/${competitionId}/standings`;

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

    // Process the standings to ensure consecutive positions
    if (data.standings && Array.isArray(data.standings)) {
      data.standings = data.standings.map((standing: StandingType) => ({
        ...standing,
        table: recalculatePositions(standing.table),
      }));
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching standings:`, error);
    return NextResponse.json(
      { error: "Failed to fetch standings" },
      { status: 500 },
    );
  }
}
