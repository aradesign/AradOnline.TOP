"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@/components/icons/ThemeIcons";

export function ThemeToggle() {
  const { mode, toggle } = useTheme();
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle relative flex h-10 w-[4.25rem] shrink-0 items-center rounded-full border p-1 transition-all duration-300"
      aria-label={isDark ? "فعال‌سازی حالت روشن" : "فعال‌سازی حالت تاریک"}
      title={isDark ? "حالت روشن" : "حالت تاریک (نئون)"}
    >
      <span
        className="theme-toggle-thumb absolute top-1 h-8 w-8 rounded-full transition-all duration-300"
        style={{
          insetInlineStart: isDark ? "0.25rem" : "calc(100% - 2.25rem)",
        }}
      />
      <span
        className={`relative z-10 flex w-1/2 items-center justify-center transition-opacity ${
          isDark ? "opacity-100" : "opacity-40"
        }`}
      >
        <MoonIcon className="h-4 w-4" />
      </span>
      <span
        className={`relative z-10 flex w-1/2 items-center justify-center transition-opacity ${
          isDark ? "opacity-40" : "opacity-100"
        }`}
      >
        <SunIcon className="h-4 w-4" />
      </span>
    </button>
  );
}
