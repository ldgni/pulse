import { Card, CardContent } from "@/components/ui/card";

export default function EmptyState() {
  return (
    <Card className="mx-auto w-full max-w-3xs">
      <CardContent className="text-center">
        <p>The season has ended.</p>
      </CardContent>
    </Card>
  );
}
