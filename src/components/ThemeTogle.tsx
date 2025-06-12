import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  // Apply theme to <html> on mount and when theme changes
  useEffect(() => {
    let resolvedTheme = theme;
    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Determine checked state for the switch
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="flex items-center gap-2">
      <span>Light</span>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <span>Dark</span>
      {/* Optional: Add a "System" button */}
      <button
        className="ml-2 text-xs underline"
        onClick={() => setTheme("system")}
      >
        System
      </button>
    </div>
  );
}
