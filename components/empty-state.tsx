import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  variant: "fixture" | "result";
}

export default function EmptyState({ variant }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="text-muted-foreground text-center">
        {variant === "fixture"
          ? "No upcoming fixtures found"
          : "No previous results found"}
      </CardContent>
    </Card>
  );
}
