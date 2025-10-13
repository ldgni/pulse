import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMatchDate(utcDate: string): string {
  return new Date(utcDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
}

export function formatMatchTime(utcDate: string): string {
  const timeStr = new Date(utcDate).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  });

  // Display "TBD" if the time is 01:00 or 02:00 (API placeholder for unknown times)
  return timeStr === "01:00" || timeStr === "02:00" ? "TBD" : timeStr;
}
