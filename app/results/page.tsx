import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResultsPage() {
  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Results</h1>
        <p className="text-muted-foreground text-sm">All matches played</p>
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

          {/* Score */}
          <time className="bg-accent rounded-xl px-4 py-2 font-mono text-xl font-bold">
            2 - 1
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
