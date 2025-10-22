import { Card, CardContent } from "@/components/ui/card";

export default function CardError() {
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
