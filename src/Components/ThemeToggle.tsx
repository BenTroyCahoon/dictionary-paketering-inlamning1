import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  // Använda sessionStorage för att hämta det sparade temat
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = sessionStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    // Använda tema från isDarkMode för att ändra klass på body
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Spara det nya temat i sessionStorage
      sessionStorage.setItem("theme", newMode ? "dark" : "light");
      // Ändra klass på body
      document.body.className = newMode ? "dark-theme" : "light-theme";
      return newMode;
    });
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "Byt till ljust tema" : "Byt till mörkt tema"}
    </button>
  );
};

export default ThemeToggle;
