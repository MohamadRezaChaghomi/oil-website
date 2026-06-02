// src/components/ui/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface ThemeToggleProps {
  isScrolled?: boolean;
}

export function ThemeToggle({ isScrolled = true }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-10 w-10" />;

  const isDark = theme === "dark";
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "transition-all",
        // در حالت اسکرول شده: رنگ آیکون مطابق با متن (foreground)
        // در حالت هیرو (اسکرول نشده): آیکون سفید با سایه (مانند بقیه عناصر هدر)
        isScrolled
          ? "text-foreground"
          : "text-white drop-shadow-md"
      )}
    >
      {isDark ? <Brightness7 className="h-5 w-5" /> : <Brightness4 className="h-5 w-5" />}
    </Button>
  );
}