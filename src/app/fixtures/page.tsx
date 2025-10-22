"use client";

import useSWR from "swr";

import EmptyState from "@/components/empty-state";
import ErrorCard from "@/components/error-card";
import MatchCard from "@/components/match-card";
import { Match } from "@/types/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FixturesPage() {
  const { data, error, isLoading } = useSWR("/api/fixtures", fetcher);

  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Fixtures</h1>
        <p className="text-muted-foreground">All upcoming matches</p>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <ErrorCard />
      ) : data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {data.map((match: Match) => (
            <MatchCard key={match.id} match={match} type="fixture" />
          ))}
        </div>
      )}
    </>
  );
}
