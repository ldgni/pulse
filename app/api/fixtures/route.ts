import { NextResponse } from "next/server";

import { getFixtures } from "@/lib/api";

export async function GET() {
  const fixtures = await getFixtures();

  return NextResponse.json(fixtures);
}
