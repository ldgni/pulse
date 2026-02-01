import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FixturesPage() {
  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Fixtures</h1>
        <p className="text-muted-foreground text-sm">All upcoming matches</p>
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Competition</CardTitle>
          <CardDescription>Date</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          {/* Home Team */}
          <div className="flex flex-1 items-center justify-end gap-4">
            <span className="hidden font-semibold sm:block">Home Team</span>
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
              HT
            </div>
          </div>

          {/* Match Time */}
          <time className="bg-accent rounded-xl px-4 py-2 font-mono text-xl font-bold">
            20:45
          </time>

          {/* Away Team */}
          <div className="flex flex-1 items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500 font-bold text-white">
              AT
            </div>
            <span className="hidden font-semibold sm:block">Away Team</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
