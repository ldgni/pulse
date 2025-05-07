import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-sky-600"></div>
    </div>
  );
}
