import { useEffect, useState } from "react";

export function useDarkMode() {
  const [enabled, setEnabled] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [enabled]);

  return { enabled, toggle: () => setEnabled((v) => !v) };
}
