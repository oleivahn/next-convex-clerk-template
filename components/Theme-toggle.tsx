"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  moonClassName?: string;
}

export function ThemeToggle({ className, moonClassName }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "hover:bg-primary-foreground/20 dark:hover:bg-accent",
        className
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun fill="white" className="hidden h-[1.5rem] w-[1.3rem] dark:block" />
      <Moon
        className={cn(
          "h-5 w-5 text-primary-foreground dark:hidden",
          moonClassName
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
