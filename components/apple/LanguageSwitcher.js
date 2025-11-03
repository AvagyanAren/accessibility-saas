import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { appleTheme } from '../../styles/apple-theme';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          backgroundColor: isOpen 
            ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')
            : 'transparent',
          border: `1px solid ${isDarkMode ? appleTheme.colors.dark.gray[400] : appleTheme.colors.gray[300]}`,
          borderRadius: appleTheme.borderRadius.medium,
          color: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
          fontSize: appleTheme.typography.fontSize.sm,
          fontWeight: appleTheme.typography.fontWeight.medium,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          outline: 'none',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          minWidth: 'auto'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.target.style.backgroundColor = 'transparent';
          }
        }}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span style={{ fontSize: '16px', flexShrink: 0 }}>{currentLanguage.flag}</span>
        <span style={{ whiteSpace: 'nowrap' }}>{currentLanguage.code.toUpperCase()}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        >
          <path d="M3 4l3 3 3-3" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            backgroundColor: isDarkMode ? appleTheme.colors.dark.background.primary : '#FFFFFF',
            border: `1px solid ${isDarkMode ? appleTheme.colors.dark.gray[400] : appleTheme.colors.gray[300]}`,
            borderRadius: appleTheme.borderRadius.medium,
            boxShadow: isDarkMode 
              ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            minWidth: '150px',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: language === lang.code
                  ? (isDarkMode ? 'rgba(0, 122, 255, 0.2)' : 'rgba(0, 122, 255, 0.1)')
                  : 'transparent',
                border: 'none',
                color: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
                fontSize: appleTheme.typography.fontSize.base,
                fontWeight: language === lang.code
                  ? appleTheme.typography.fontWeight.semibold
                  : appleTheme.typography.fontWeight.regular,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                fontFamily: 'inherit',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (language !== lang.code) {
                  e.target.style.backgroundColor = isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (language !== lang.code) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '20px' }}>{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && (
                <span style={{ marginLeft: 'auto', color: appleTheme.colors.primary[500] }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

