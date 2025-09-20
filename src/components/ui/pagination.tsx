"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Always include first page
    range.push(1);

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always include last page if more than 1 page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where there are gaps
    let prev = 0;
    for (const i of range) {
      if (prev + 1 < i) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={`flex items-center justify-center space-x-1 ${className}`}
      aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`inline-flex h-8 w-8 items-center justify-center rounded border transition-colors sm:h-10 sm:w-10 ${
          currentPage === 1
            ? "cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-400"
            : "cursor-pointer border-zinc-300 bg-gradient-to-br from-zinc-50 to-sky-100 text-zinc-700 hover:from-sky-100 hover:to-sky-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        }`}
        aria-label="Previous page">
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="inline-flex h-8 w-8 items-center justify-center text-zinc-500 sm:h-10 sm:w-10">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded border text-sm font-medium transition-colors sm:h-10 sm:w-10 sm:text-base ${
                isCurrentPage
                  ? "border-sky-500 bg-sky-500 text-white shadow-sm"
                  : "cursor-pointer border-zinc-300 bg-gradient-to-br from-zinc-50 to-sky-100 text-zinc-700 hover:from-sky-100 hover:to-sky-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              }`}
              aria-label={`Page ${pageNumber}`}
              aria-current={isCurrentPage ? "page" : undefined}>
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`inline-flex h-8 w-8 items-center justify-center rounded border transition-colors sm:h-10 sm:w-10 ${
          currentPage === totalPages
            ? "cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-400"
            : "cursor-pointer border-zinc-300 bg-gradient-to-br from-zinc-50 to-sky-100 text-zinc-700 hover:from-sky-100 hover:to-sky-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        }`}
        aria-label="Next page">
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </nav>
  );
}
