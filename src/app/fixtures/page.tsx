"use client";

import MatchCard from "@/components/match-card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Pagination from "@/components/ui/pagination";
import { useFixtures } from "@/lib/api";
import { usePagination } from "@/lib/hooks/use-pagination";
import { Match } from "@/lib/types";

export default function FixturesPage() {
  const { matches, isLoading, isValidating } = useFixtures();
  const isRefreshing = isLoading || isValidating;

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedMatches,
    setCurrentPage,
  } = usePagination<Match>({
    data: matches,
    itemsPerPage: 5,
  });

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-semibold">Fixtures</h1>

      {isRefreshing && matches.length === 0 ? (
        <LoadingSpinner />
      ) : matches.length > 0 ? (
        <div className="space-y-6">
          <div className="relative space-y-4">
            {isRefreshing && <LoadingSpinner />}
            {paginatedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-8"
          />
        </div>
      ) : (
        <div className="rounded border border-zinc-300 bg-gradient-to-br from-zinc-50 to-sky-100 p-3 sm:p-4">
          <p className="py-4 text-center text-sm text-zinc-600 sm:text-base">
            No upcoming fixtures found
          </p>
        </div>
      )}
    </>
  );
}
