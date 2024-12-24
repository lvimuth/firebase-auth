"use client";
import { useContext } from "react";
import { ThemeContext } from "../layout";

export default function ToggleThemeButton() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="mt-4 text-center">
      <button
        onClick={toggleTheme}
        className="text-gray-600 dark:text-gray-400"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}
