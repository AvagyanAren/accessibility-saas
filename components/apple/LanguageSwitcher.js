import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function LanguageSwitcher() {
  const { language, changeLanguage, isClient } = useLanguage();
  const { isDarkMode } = useTheme();

  const isEnglish = language === 'en';

  const handleToggle = () => {
    changeLanguage(isEnglish ? 'ru' : 'en');
  };

  // Don't render until client-side is ready
  if (!isClient) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: '24px',
        minWidth: '80px'
      }} />
    );
  }

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0
    }}>
      {/* Left Label - RU */}
      <span
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: isEnglish 
            ? (isDarkMode ? '#AEAEB2' : '#8E8E93') 
            : (isDarkMode ? '#FFFFFF' : '#000000'),
          transition: 'color 0.3s ease',
          userSelect: 'none',
          cursor: 'pointer',
          minWidth: '24px'
        }}
        onClick={handleToggle}
      >
        RU
      </span>

      {/* Toggle Switch */}
      <button
        onClick={handleToggle}
        style={{
          position: 'relative',
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: isEnglish ? '#007AFF' : '#007AFF',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          outline: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isDarkMode 
            ? '0 2px 6px rgba(0, 122, 255, 0.3)' 
            : '0 2px 6px rgba(0, 122, 255, 0.2)',
          display: 'flex',
          alignItems: 'center'
        }}
        aria-label={`Switch to ${isEnglish ? 'Russian' : 'English'}`}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = isDarkMode 
            ? '0 3px 10px rgba(0, 122, 255, 0.4)' 
            : '0 3px 10px rgba(0, 122, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isDarkMode 
            ? '0 2px 6px rgba(0, 122, 255, 0.3)' 
            : '0 2px 6px rgba(0, 122, 255, 0.2)';
        }}
      >
        {/* White Knob */}
        <div
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isEnglish ? 'translateX(20px)' : 'translateX(0px)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            left: '2px'
          }}
        />
      </button>

      {/* Right Label - ENG */}
      <span
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: isEnglish 
            ? (isDarkMode ? '#FFFFFF' : '#000000') 
            : (isDarkMode ? '#AEAEB2' : '#8E8E93'),
          transition: 'color 0.3s ease',
          userSelect: 'none',
          cursor: 'pointer',
          minWidth: '28px'
        }}
        onClick={handleToggle}
      >
        ENG
      </span>
    </div>
  );
}
