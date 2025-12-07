import { Suspense } from "react";

import FixturesList from "@/components/fixtures-list";
import { Spinner } from "@/components/ui/spinner";

export const revalidate = 300;

export default function FixturesPage() {
  return (
    <>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Fixtures</h1>
        <p className="text-muted-foreground">All upcoming matches</p>
      </div>
      <Suspense fallback={<Spinner className="mx-auto" />}>
        <FixturesList />
      </Suspense>
    </>
  );
}
