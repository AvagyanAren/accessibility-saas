import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function LanguageSwitcher() {
  const { language, changeLanguage, isClient } = useLanguage();
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current language state (with fallback)
  const currentLanguage = isClient ? language : 'en';
  const currentIsEnglish = currentLanguage === 'en';

  const handleToggle = () => {
    if (mounted && isClient) {
      changeLanguage(currentIsEnglish ? 'ru' : 'en');
    }
  };

  // Render placeholder during SSR or initial load to prevent layout shift
  // The placeholder matches the actual component structure
  if (typeof window === 'undefined' || !mounted) {
    return (
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '24px',
          minWidth: '80px',
          opacity: 0
        }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '12px' }}>RU</span>
        <div style={{ width: '44px', height: '24px' }} />
        <span style={{ fontSize: '12px' }}>ENG</span>
      </div>
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
          color: currentIsEnglish 
            ? (isDarkMode ? '#AEAEB2' : '#8E8E93') 
            : (isDarkMode ? '#FFFFFF' : '#000000'),
          transition: 'color 0.3s ease',
          userSelect: 'none',
          cursor: isClient ? 'pointer' : 'default',
          minWidth: '24px',
          opacity: isClient ? 1 : 0.5
        }}
        onClick={isClient ? handleToggle : undefined}
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
          backgroundColor: '#007AFF',
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
        aria-label={`Switch to ${currentIsEnglish ? 'Russian' : 'English'}`}
        disabled={!isClient}
        onMouseEnter={isClient ? (e) => {
          e.currentTarget.style.boxShadow = isDarkMode 
            ? '0 3px 10px rgba(0, 122, 255, 0.4)' 
            : '0 3px 10px rgba(0, 122, 255, 0.3)';
        } : undefined}
        onMouseLeave={isClient ? (e) => {
          e.currentTarget.style.boxShadow = isDarkMode 
            ? '0 2px 6px rgba(0, 122, 255, 0.3)' 
            : '0 2px 6px rgba(0, 122, 255, 0.2)';
        } : undefined}
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
            transform: currentIsEnglish ? 'translateX(20px)' : 'translateX(0px)',
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
          color: currentIsEnglish 
            ? (isDarkMode ? '#FFFFFF' : '#000000') 
            : (isDarkMode ? '#AEAEB2' : '#8E8E93'),
          transition: 'color 0.3s ease',
          userSelect: 'none',
          cursor: isClient ? 'pointer' : 'default',
          minWidth: '28px',
          opacity: isClient ? 1 : 0.5
        }}
        onClick={isClient ? handleToggle : undefined}
      >
        ENG
      </span>
    </div>
  );
}
