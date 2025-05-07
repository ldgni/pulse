"use client";

import Link from "next/link";

import MatchCard from "@/components/match-card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useNextFixture } from "@/lib/api";

export default function NextFixture() {
  const { match, isLoading, isValidating } = useNextFixture();
  const isRefreshing = isLoading || isValidating;

  return (
    <div className="flex flex-col rounded-md border border-zinc-400 p-3 shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium">Next Fixture</h2>
        <Link
          href="/fixtures"
          className="hidden text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:inline">
          View all fixtures →
        </Link>
      </div>

      {isRefreshing && !match ? (
        <LoadingSpinner />
      ) : !match ? (
        <p className="py-8 text-center text-gray-500">
          No upcoming match found
        </p>
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
        href="/fixtures"
        className="mt-4 text-center text-sm text-sky-600 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none active:text-sky-800 sm:hidden">
        View all fixtures →
      </Link>
    </div>
  );
}
