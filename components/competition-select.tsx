"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPETITION_CODES } from "@/lib/constants";
import type { Competition } from "@/types/api";

const COMPETITIONS: { value: Competition; label: string }[] = [
  { value: COMPETITION_CODES.ALL, label: "All" },
  { value: COMPETITION_CODES.LIGUE_1, label: "Ligue 1" },
  { value: COMPETITION_CODES.CHAMPIONS_LEAGUE, label: "Champions League" },
];

type CompetitionSelectProps = {
  value: Competition;
  includeAll?: boolean;
};

export default function CompetitionSelect({
  value,
  includeAll = true,
}: CompetitionSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const competitions = includeAll
    ? COMPETITIONS
    : COMPETITIONS.filter((c) => c.value !== "all");

  const handleChange = (nextValue: Competition) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue === COMPETITION_CODES.ALL) {
      params.delete("competition");
    } else {
      params.set("competition", nextValue);
    }

    startTransition(() => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  return (
    <Select value={value} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger aria-label="Select competition">
        <SelectValue placeholder="Select competition" />
      </SelectTrigger>
      <SelectContent>
        {competitions.map((competition) => (
          <SelectItem key={competition.value} value={competition.value}>
            {competition.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
