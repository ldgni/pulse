"use client";

import Link from "next/link";

import MatchCard from "@/components/match-card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useLatestResult } from "@/lib/api";

export default function LatestResult() {
  const { match, isLoading, isValidating } = useLatestResult();
  const isRefreshing = isLoading || isValidating;

  return (
    <div className="flex flex-col rounded-md border border-zinc-400 p-3 shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium">Latest Result</h2>
        <Link
          href="/results"
          className="hidden text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:inline">
          View all results →
        </Link>
      </div>

      {isRefreshing && !match ? (
        <LoadingSpinner />
      ) : !match ? (
        <p className="py-8 text-center text-gray-500">No recent match found</p>
      ) : (
        <>
          {isRefreshing && (
            <div className="absolute top-4 right-4">
              <LoadingSpinner />
            </div>
          )}
          <MatchCard match={match} />
        </>
      )}

      <Link
        href="/results"
        className="mt-4 text-center text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:hidden">
        View all results →
      </Link>
    </div>
  );
}
