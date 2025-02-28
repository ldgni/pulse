import Image from "next/image";

import { StandingEntry } from "@/lib/types";

interface StandingsTableProps {
  standings: StandingEntry[];
  highlightTeamId?: number;
}

export default function StandingsTable({
  standings,
  highlightTeamId,
}: StandingsTableProps) {
  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:p-4">
              #
            </th>
            <th
              scope="col"
              className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:p-4">
              Club
            </th>
            <th
              scope="col"
              className="p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:p-4">
              MP
            </th>
            <th
              scope="col"
              className="hidden p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell sm:p-4">
              W
            </th>
            <th
              scope="col"
              className="hidden p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell sm:p-4">
              D
            </th>
            <th
              scope="col"
              className="hidden p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell sm:p-4">
              L
            </th>
            <th
              scope="col"
              className="p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:p-4">
              Pts
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {standings.map((entry) => (
            <tr
              key={entry.team.id}
              className={`${entry.team.id === highlightTeamId ? "bg-blue-50" : ""}`}>
              <td className="whitespace-nowrap p-2 text-sm font-medium text-gray-900 sm:p-4">
                {entry.position}
              </td>
              <td className="whitespace-nowrap p-2 text-sm sm:p-4">
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
              <td className="whitespace-nowrap p-2 text-center text-sm sm:p-4">
                {entry.playedGames}
              </td>
              <td className="hidden whitespace-nowrap p-2 text-center text-sm sm:table-cell sm:p-4">
                {entry.won}
              </td>
              <td className="hidden whitespace-nowrap p-2 text-center text-sm sm:table-cell sm:p-4">
                {entry.draw}
              </td>
              <td className="hidden whitespace-nowrap p-2 text-center text-sm sm:table-cell sm:p-4">
                {entry.lost}
              </td>
              <td className="whitespace-nowrap p-2 text-center text-sm font-bold sm:p-4">
                {entry.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
