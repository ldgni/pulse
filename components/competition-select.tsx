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

const COMPETITIONS = [
  { value: "all", label: "All" },
  { value: "FL1", label: "Ligue 1" },
  { value: "CL", label: "Champions League" },
];

type CompetitionSelectProps = {
  value: string;
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

  const handleChange = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue === "all") {
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
  competitions;
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
