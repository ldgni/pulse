import MatchCard from "@/components/match-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Competition } from "@/types";
import type { Match } from "@/types/api";

const ITEMS_PER_PAGE = 5;

type MatchesListProps = {
  matches: Match[];
  competition: Competition;
  page?: number;
  basePath: string;
  emptyMessage: string;
  matchType: "result" | "fixture";
};

function getPaginationHref(
  page: number,
  competition: Competition,
  basePath: string,
): string {
  const params = new URLSearchParams();
  if (competition !== "all") {
    params.set("competition", competition);
  }
  if (page > 1) {
    params.set("page", page.toString());
  }
  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

export default function MatchesList({
  matches,
  competition,
  page = 1,
  basePath,
  emptyMessage,
  matchType,
}: MatchesListProps) {
  const totalPages = Math.ceil(matches.length / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = matches.slice(startIndex, endIndex);

  if (matches.length === 0) {
    return (
      <Card>
        <CardContent className="text-center">{emptyMessage}</CardContent>
      </Card>
    );
  }

  return (
    <>
      <ol className="space-y-4">
        {paginatedData.map((match) => (
          <li key={match.id}>
            <MatchCard match={match} type={matchType} />
          </li>
        ))}
      </ol>
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={getPaginationHref(currentPage - 1, competition, basePath)}
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {(() => {
              const pages: (number | "ellipsis")[] = [];

              // Determine which pages to show
              if (totalPages <= 7) {
                // Show all pages if 7 or fewer
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // Always show first page
                pages.push(1);
                // Show ellipsis and selected pages
                if (currentPage <= 3) {
                  // Near the start
                  for (let i = 2; i <= 4; i++) {
                    pages.push(i);
                  }
                  pages.push("ellipsis");
                  pages.push(totalPages);
                } else if (currentPage >= totalPages - 2) {
                  // Near the end
                  pages.push("ellipsis");
                  for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  // In the middle
                  pages.push("ellipsis");
                  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                  }
                  pages.push("ellipsis");
                  pages.push(totalPages);
                }
              }

              return pages.map((page, index) => {
                if (page === "ellipsis") {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={getPaginationHref(page, competition, basePath)}
                      isActive={page === currentPage}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              });
            })()}
            <PaginationItem>
              <PaginationNext
                href={getPaginationHref(currentPage + 1, competition, basePath)}
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
