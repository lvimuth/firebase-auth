"use client";
import "./globals.css";
import { useState, createContext } from "react";

export const ThemeContext = createContext();

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <html className={darkMode ? "dark" : ""}>
        <body>{children}</body>
      </html>
    </ThemeContext.Provider>
  );
}
