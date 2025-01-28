import React, { useEffect, useState } from "react";

const Theme = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle between themes
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Set the initial theme based on user preference or system setting
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="p-4">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleThemeChange}
          className="toggle theme-controller"
        />
        <span className="text-sm font-medium">
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </label>
    </div>
  );
};

export default Theme;
