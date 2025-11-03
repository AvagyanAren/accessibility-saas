import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load theme preference from localStorage on mount (client-side only)
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        } else if (typeof window.matchMedia !== 'undefined') {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setIsDarkMode(prefersDark);
        }
      } catch (e) {
        // localStorage or matchMedia might not be available
        console.warn('Could not access localStorage or matchMedia:', e);
      }
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    if (isClient && typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        // Update document class for CSS variables
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', isDarkMode);
        }
      } catch (e) {
        console.warn('Could not save theme preference:', e);
      }
    }
  }, [isDarkMode, isClient]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
