"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      title="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Sun className="scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
