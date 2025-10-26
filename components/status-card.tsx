import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ErrorCard() {
  return (
    <Card className="border-destructive/50 bg-destructive/10 h-[166px]">
      <CardContent className="flex h-full flex-col justify-center gap-4 text-center">
        <p className="text-destructive text-lg font-semibold">
          Unable to load data
        </p>
        <p className="text-muted-foreground text-sm">
          We couldn&apos;t reach the API. Please try again later.
        </p>
      </CardContent>
    </Card>
  );
}

export function WarningCard() {
  return (
    <Card className="h-[166px] border-yellow-500/50 bg-yellow-500/10">
      <CardContent className="flex h-full flex-col justify-center text-center">
        <p>The season has ended.</p>
      </CardContent>
    </Card>
  );
}

export function SkeletonCard({ count }: { count: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[166px] w-full rounded-xl border shadow-sm"
        />
      ))}
    </div>
  );
}
