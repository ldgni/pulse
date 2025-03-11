import Image from "next/image";

import { POSITION_COLORS } from "@/lib/constants";
import { StandingEntry } from "@/lib/types";

interface StandingsTableProps {
  standings: StandingEntry[];
  highlightTeamId?: number;
}

// Position legend data for reusability
const positionLegends = [
  { color: "#3b82f6", label: "UEFA Champions League group stage" },
  { color: "#f97316", label: "UEFA Champions League qualifiers" },
  { color: "#22c55e", label: "Europa League group stage" },
  { color: "#93c5fd", label: "Europa Conference League qualifiers" },
  { color: "#eab308", label: "Relegation play-offs" },
  { color: "#ef4444", label: "Relegation" },
];

function getPositionBorderStyle(position: number): React.CSSProperties {
  if (isNaN(position)) return {};
  const color =
    POSITION_COLORS[position as keyof typeof POSITION_COLORS] || "#e2e8f0"; // Default to slate-200
  return { borderLeft: `4px solid ${color}` };
}

// Table header component
function TableHeader() {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="p-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:p-4 sm:text-sm">
          #
        </th>
        <th
          scope="col"
          className="p-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:p-4 sm:text-sm">
          Club
        </th>
        <th
          scope="col"
          className="p-2 text-center text-xs font-medium tracking-wider text-gray-500 uppercase sm:p-4 sm:text-sm">
          MP
        </th>
        <th
          scope="col"
          className="hidden p-2 text-center text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell sm:p-4 sm:text-sm">
          W
        </th>
        <th
          scope="col"
          className="hidden p-2 text-center text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell sm:p-4 sm:text-sm">
          D
        </th>
        <th
          scope="col"
          className="hidden p-2 text-center text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell sm:p-4 sm:text-sm">
          L
        </th>
        <th
          scope="col"
          className="p-2 text-center text-xs font-medium tracking-wider text-gray-500 uppercase sm:p-4 sm:text-sm">
          Pts
        </th>
      </tr>
    </thead>
  );
}

// Position legend component
function PositionLegend() {
  return (
    <div className="mt-4 text-xs sm:text-sm">
      <h3 className="mb-2 font-medium">Qualification/Relegation</h3>
      <ul className="space-y-1">
        {positionLegends.map((legend) => (
          <li key={legend.label} className="flex items-center">
            <span
              className="mr-2 block h-4 w-4"
              style={{ backgroundColor: legend.color }}></span>
            <span>{legend.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StandingsTable({
  standings,
  highlightTeamId,
}: StandingsTableProps) {
  return (
    <>
      <div className="overflow-x-auto rounded border border-zinc-300 bg-sky-100">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <tbody className="divide-y divide-gray-200 bg-white">
            {standings.map((entry) => {
              const highlightClass =
                entry.team.id === highlightTeamId ? "bg-blue-50" : "";

              return (
                <tr
                  key={entry.team.id}
                  className={highlightClass}
                  style={getPositionBorderStyle(Number(entry.position))}>
                  <td className="p-2 text-sm font-medium whitespace-nowrap text-gray-900 sm:p-4 sm:text-base">
                    {entry.position}
                  </td>
                  <td className="p-2 text-sm whitespace-nowrap sm:p-4 sm:text-base">
                    <div className="flex items-center">
                      <div className="relative mr-2 h-6 w-6 sm:mr-4">
                        <Image
                          src={entry.team.crest}
                          alt={entry.team.name}
                          fill
                          sizes="24px"
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">
                        {entry.team.shortName || entry.team.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 text-center text-sm whitespace-nowrap sm:p-4 sm:text-base">
                    {entry.playedGames}
                  </td>
                  <td className="hidden p-2 text-center text-sm whitespace-nowrap sm:table-cell sm:p-4 sm:text-base">
                    {entry.won}
                  </td>
                  <td className="hidden p-2 text-center text-sm whitespace-nowrap sm:table-cell sm:p-4 sm:text-base">
                    {entry.draw}
                  </td>
                  <td className="hidden p-2 text-center text-sm whitespace-nowrap sm:table-cell sm:p-4 sm:text-base">
                    {entry.lost}
                  </td>
                  <td className="p-2 text-center text-sm font-bold whitespace-nowrap sm:p-4 sm:text-base">
                    {entry.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PositionLegend />
    </>
  );
}
