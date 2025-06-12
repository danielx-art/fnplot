import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppState = {
  theme: "system" | "light" | "dark";
  setTheme: (theme: AppState["theme"]) => void;
};

export const useAppStore = create(
  persist<AppState>(
    (set, get) => ({
      // Example state
      theme: "system", // "light" | "dark" | "system"
      setTheme: (theme) => set({ theme }),

      // Add other persistent state here
      // e.g. user: null, setUser: (user) => set({ user }),
    }),
    {
      name: "app-configs",
    }
  )
);
