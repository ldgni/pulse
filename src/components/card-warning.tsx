import { Card, CardContent } from "@/components/ui/card";

export default function CardWarning() {
  return (
    <Card className="h-[166px] border-yellow-500/50 bg-yellow-500/10">
      <CardContent className="flex h-full flex-col justify-center text-center">
        <p>The season has ended.</p>
      </CardContent>
    </Card>
  );
}
