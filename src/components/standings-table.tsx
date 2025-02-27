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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Pos
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Club
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              MP
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              W
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              D
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              L
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Pts
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
          {standings.map((entry) => (
            <tr
              key={entry.team.id}
              className={`${entry.team.id === highlightTeamId ? "bg-blue-50 dark:bg-blue-900/30" : ""}`}>
              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                {entry.position}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
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
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm">
                {entry.playedGames}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm">
                {entry.won}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm">
                {entry.draw}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm">
                {entry.lost}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm font-bold">
                {entry.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
