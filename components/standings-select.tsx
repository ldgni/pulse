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
  { value: "FL1", label: "Ligue 1" },
  { value: "CL", label: "Champions League" },
];

type StandingsSelectProps = {
  value: string;
};

export default function StandingsSelect({ value }: StandingsSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue === "FL1") {
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
        {COMPETITIONS.map((competition) => (
          <SelectItem key={competition.value} value={competition.value}>
            {competition.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
