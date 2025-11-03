import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { appleTheme } from '../../styles/apple-theme';
import { Sun, Moon } from 'phosphor-react';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    color: isDarkMode ? appleTheme.colors.dark.text.primary : appleTheme.colors.text.primary,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isDarkMode 
      ? '0 4px 16px rgba(0, 0, 0, 0.3)' 
      : '0 4px 16px rgba(0, 0, 0, 0.15)',
    outline: 'none',
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
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = isDarkMode 
          ? 'rgba(255, 255, 255, 0.15)' 
          : 'rgba(255, 255, 255, 1)';
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = isDarkMode 
          ? '0 6px 20px rgba(0, 0, 0, 0.4)' 
          : '0 6px 20px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = isDarkMode 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(255, 255, 255, 0.9)';
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = isDarkMode 
          ? '0 4px 16px rgba(0, 0, 0, 0.3)' 
          : '0 4px 16px rgba(0, 0, 0, 0.15)';
      }}
    >
      {isDarkMode ? (
        <Sun size={20} weight="regular" style={iconStyles} />
      ) : (
        <Moon size={20} weight="regular" style={iconStyles} />
      )}
    </button>
  );
};

export default ThemeToggle;
