import { Card, CardContent } from "@/components/ui/card";

export default function ErrorCard() {
  return (
    <Card className="border-destructive/50 bg-destructive/10">
      <CardContent className="space-y-4 text-center">
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
