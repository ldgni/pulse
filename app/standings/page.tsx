import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StandingsPage() {
  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Standings</h1>
        <p className="text-muted-foreground text-sm">
          Current league standings
        </p>
      </div>
      <Table>
        <TableCaption>Ligue 1</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead>Club</TableHead>
            <TableHead className="text-center">MP</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">D</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-center font-semibold">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell>PSG</TableCell>
            <TableCell className="text-center">12</TableCell>
            <TableCell className="text-center">8</TableCell>
            <TableCell className="text-center">2</TableCell>
            <TableCell className="text-center">2</TableCell>
            <TableCell className="text-center font-semibold">26</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
