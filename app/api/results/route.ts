import { NextResponse } from "next/server";

import { getResults } from "@/lib/api";

export async function GET() {
  const results = await getResults();

  return NextResponse.json(results);
}
