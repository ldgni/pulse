import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard({ count }: { count: number }) {
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
