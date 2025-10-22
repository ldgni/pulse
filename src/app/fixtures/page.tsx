"use client";

import useSWR from "swr";

import CardError from "@/components/card-error";
import CardMatch from "@/components/card-match";
import CardSkeleton from "@/components/card-skeleton";
import CardWarning from "@/components/card-warning";
import { Match } from "@/types/api";

export default function FixturesPage() {
  const { data, error, isLoading } = useSWR("/api/fixtures");

  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Fixtures</h1>
        <p className="text-muted-foreground">All upcoming matches</p>
      </div>
      {isLoading ? (
        <CardSkeleton count={5} />
      ) : error ? (
        <CardError />
      ) : data.length === 0 ? (
        <CardWarning />
      ) : (
        <div className="space-y-4">
          {data.map((match: Match) => (
            <CardMatch key={match.id} match={match} type="fixture" />
          ))}
        </div>
      )}
    </>
  );
}
