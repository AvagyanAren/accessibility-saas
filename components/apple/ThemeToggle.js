import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { appleTheme } from '../../styles/apple-theme';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: isDarkMode ? appleTheme.colors.dark.gray[200] : appleTheme.colors.gray[100],
    color: isDarkMode ? appleTheme.colors.dark.text.primary : appleTheme.colors.text.primary,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    ':hover': {
      backgroundColor: isDarkMode ? appleTheme.colors.dark.gray[300] : appleTheme.colors.gray[200],
      transform: 'scale(1.05)'
    }
  };

  const iconStyles = {
    fontSize: '20px',
    transition: 'all 0.3s ease',
    transform: isDarkMode ? 'rotate(180deg)' : 'rotate(0deg)'
  };

  return (
    <button
      onClick={toggleTheme}
      style={toggleStyles}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        // Sun icon for dark mode (click to go to light)
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={iconStyles}
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ) : (
        // Moon icon for light mode (click to go to dark)
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={iconStyles}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
