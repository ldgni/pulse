"use client";

import useSWR from "swr";

import MatchCard from "@/components/match-card";
import { SkeletonCard } from "@/components/status-card";
import { ErrorCard } from "@/components/status-card";
import { WarningCard } from "@/components/status-card";
import { Match } from "@/types/api";

export default function ResultsList() {
  const { data, error, isLoading } = useSWR("/api/results");

  if (isLoading) {
    return <SkeletonCard count={10} />;
  }

  if (error) {
    return <ErrorCard />;
  }

  if (data.length === 0) {
    return <WarningCard />;
  }

  return (
    <ol className="space-y-4">
      {data.map((match: Match) => (
        <li key={match.id}>
          <MatchCard match={match} type="result" />
        </li>
      ))}
    </ol>
  );
}

export function PreviousResult() {
  const { data, error, isLoading } = useSWR("/api/results?limit=1");

  if (isLoading) {
    return <SkeletonCard count={1} />;
  }

  if (error) {
    return <ErrorCard />;
  }

  if (data.length === 0) {
    return <WarningCard />;
  }

  return <MatchCard match={data[0]} type="result" />;
}
