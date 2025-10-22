"use client";

import useSWR from "swr";

import CardSkeleton from "@/components/card-skeleton";
import EmptyState from "@/components/empty-state";
import ErrorCard from "@/components/error-card";
import MatchCard from "@/components/match-card";
import { Match } from "@/types/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ResultsPage() {
  const { data, error, isLoading } = useSWR("/api/results", fetcher);

  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Results</h1>
        <p className="text-muted-foreground">All matches played</p>
      </div>
      {isLoading ? (
        <CardSkeleton count={5} />
      ) : error ? (
        <ErrorCard />
      ) : data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {data.map((match: Match) => (
            <MatchCard key={match.id} match={match} type="result" />
          ))}
        </div>
      )}
    </>
  );
}
