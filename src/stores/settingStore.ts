import type { PaletteMode } from "@mui/material";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  fontSize: number;
  theme: PaletteMode;
  setTheme: (theme: PaletteMode) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  setFontSize: (size: number) => void;
}

export const useSettingStore = create<Store>()(
  persist(
    (set, get) => ({
      fontSize: 20,
      theme: "light",
      primaryColor: "#9119d2ff",
      setPrimaryColor: (color: string) => set({ primaryColor: color }),
      secondaryColor: "#dc004e",
      setSecondaryColor: (color: string) => set({ secondaryColor: color }),
      setFontSize: (size: number) => set({ fontSize: size }),
      setTheme: (theme: PaletteMode) => set({ theme }),
    }),
    {
      name: "settings-storage", // name of the item in the storage (must be unique)
    }
  )
);
