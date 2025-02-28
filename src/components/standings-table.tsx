import Image from "next/image";

import { StandingEntry } from "@/lib/types";

interface StandingsTableProps {
  standings: StandingEntry[];
  highlightTeamId?: number;
}

function getPositionBorderStyle(position: number): React.CSSProperties {
  const pos = Number(position);

  if (isNaN(pos)) return {};

  const borderColors: Record<number, string> = {
    // We use inline styles because tailwind doesn't work
    1: "#3b82f6", // Champions League group stage
    2: "#3b82f6", // Champions League group stage
    3: "#3b82f6", // Champions League group stage
    4: "#f97316", // Champions League qualifiers
    5: "#22c55e", // Europa League group stage
    6: "#93c5fd", // Conference League qualifiers
    16: "#eab308", // Relegation play-offs
    17: "#ef4444", // Relegation
    18: "#ef4444", // Relegation
  };

  const color = borderColors[pos];
  return color ? { borderLeft: `4px solid ${color}` } : {};
}

export default function StandingsTable({
  standings,
  highlightTeamId,
}: StandingsTableProps) {
  return (
    <div>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:p-4 sm:text-sm">
                #
              </th>
              <th
                scope="col"
                className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:p-4 sm:text-sm">
                Club
              </th>
              <th
                scope="col"
                className="p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:p-4 sm:text-sm">
                MP
              </th>
              <th
                scope="col"
                className="hidden p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell sm:p-4 sm:text-sm">
                W
              </th>
              <th
                scope="col"
                className="hidden p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell sm:p-4 sm:text-sm">
                D
              </th>
              <th
                scope="col"
                className="hidden p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell sm:p-4 sm:text-sm">
                L
              </th>
              <th
                scope="col"
                className="p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:p-4 sm:text-sm">
                Pts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {standings.map((entry) => {
              const highlightClass =
                entry.team.id === highlightTeamId ? "bg-blue-50" : "";

              return (
                <tr
                  key={entry.team.id}
                  className={highlightClass}
                  style={getPositionBorderStyle(Number(entry.position))}>
                  <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 sm:p-4 sm:text-base">
                    {entry.position}
                  </td>
                  <td className="whitespace-nowrap p-2 text-sm sm:p-4 sm:text-base">
                    <div className="flex items-center">
                      <div className="relative mr-2 h-6 w-6">
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
                  <td className="whitespace-nowrap p-2 text-center text-sm sm:p-4 sm:text-base">
                    {entry.playedGames}
                  </td>
                  <td className="hidden whitespace-nowrap p-2 text-center text-sm sm:table-cell sm:p-4 sm:text-base">
                    {entry.won}
                  </td>
                  <td className="hidden whitespace-nowrap p-2 text-center text-sm sm:table-cell sm:p-4 sm:text-base">
                    {entry.draw}
                  </td>
                  <td className="hidden whitespace-nowrap p-2 text-center text-sm sm:table-cell sm:p-4 sm:text-base">
                    {entry.lost}
                  </td>
                  <td className="whitespace-nowrap p-2 text-center text-sm font-bold sm:p-4 sm:text-base">
                    {entry.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Position Legend */}
      <div className="mt-4 text-xs sm:text-sm">
        <h3 className="mb-2 font-medium">Qualification/Relegation</h3>
        <ul className="space-y-1">
          <li className="flex items-center">
            <span
              className="mr-2 block h-4 w-4"
              style={{ backgroundColor: "#3b82f6" }}></span>
            <span>UEFA Champions League group stage</span>
          </li>
          <li className="flex items-center">
            <span
              className="mr-2 block h-4 w-4"
              style={{ backgroundColor: "#f97316" }}></span>
            <span>UEFA Champions League qualifiers</span>
          </li>
          <li className="flex items-center">
            <span
              className="mr-2 block h-4 w-4"
              style={{ backgroundColor: "#22c55e" }}></span>
            <span>Europa League group stage</span>
          </li>
          <li className="flex items-center">
            <span
              className="mr-2 block h-4 w-4"
              style={{ backgroundColor: "#93c5fd" }}></span>
            <span>Europa Conference League qualifiers</span>
          </li>
          <li className="flex items-center">
            <span
              className="mr-2 block h-4 w-4"
              style={{ backgroundColor: "#eab308" }}></span>
            <span>Relegation play-offs</span>
          </li>
          <li className="flex items-center">
            <span
              className="mr-2 block h-4 w-4"
              style={{ backgroundColor: "#ef4444" }}></span>
            <span>Relegation</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
