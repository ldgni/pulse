import FixturesList from "@/components/fixtures-list";

export default function FixturesPage() {
  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Fixtures</h1>
        <p className="text-muted-foreground">All upcoming matches</p>
      </div>
      <FixturesList />
    </>
  );
}
