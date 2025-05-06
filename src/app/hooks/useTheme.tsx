"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    // Remove any existing theme class
    root.classList.remove("light", "dark");
    
    // Set initial theme
    if (savedTheme) {
      setTheme(savedTheme);
      root.classList.add(savedTheme);
    } else {
      setTheme("light");
      root.classList.add("light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    // Debug log
    console.log("Theme changed to:", theme);
    console.log("Current classes:", root.classList.toString());
  }, [theme, mounted]);

  const toggleTheme = () => {
    console.log("Toggling theme from:", theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log("New theme will be:", newTheme);
      return newTheme;
    });
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}