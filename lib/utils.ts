import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMatchDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(dateString));
}

export function formatMatchTime(dateString: string): string {
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  }).format(new Date(dateString));

  // Check if time is a placeholder (01:00 or 02:00)
  if (formattedTime === "01:00" || formattedTime === "02:00") {
    return "TBA";
  }

  return formattedTime;
}
