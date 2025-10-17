import { Card, CardContent } from "@/components/ui/card";

export default function EmptyState() {
  return (
    <Card>
      <CardContent className="text-center">
        <p>The season has ended.</p>
      </CardContent>
    </Card>
  );
}
