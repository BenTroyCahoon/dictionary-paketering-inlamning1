// import React, { useState } from 'react';

// const ThemeToggle: React.FC = () => {
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme === 'dark';
//   });

//   const toggleTheme = () => {
//     setIsDarkMode(prevMode => {
//       const newMode = !prevMode;
//       document.body.className = newMode ? 'dark-theme' : 'light-theme';
//       localStorage.setItem('theme', newMode ? 'dark' : 'light');
//       return newMode;
//     });
//   };

//   return (
//     <button onClick={toggleTheme}>
//       {isDarkMode ? 'Byt till ljust tema' : 'Byt till mörkt tema'}
//     </button>
//   );
// };

// export default ThemeToggle;

// src/components/ThemeToggle.tsx

import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Read the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Apply the theme to the body on initial render
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      // Save the new theme in localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      // Apply the theme to the body
      document.body.className = newMode ? 'dark-theme' : 'light-theme';
      return newMode;
    });
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? 'Byt till ljust tema' : 'Byt till mörkt tema'}
    </button>
  );
};

export default ThemeToggle;

