import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const AnimatedGradient = ({ variant = 'default', intensity = 'medium' }) => {
  const { isDarkMode } = useTheme();

  const getGradientConfig = () => {
    const variants = {
      default: {
        primary: isDarkMode 
          ? "radial-gradient(ellipse at 20% 80%, rgba(0, 122, 255, 0.3) 0%, rgba(0, 122, 255, 0.1) 30%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 122, 255, 0.2) 0%, rgba(0, 122, 255, 0.05) 40%, transparent 70%)"
          : "radial-gradient(ellipse at 20% 80%, rgba(0, 122, 255, 0.4) 0%, rgba(0, 122, 255, 0.15) 30%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 122, 255, 0.3) 0%, rgba(0, 122, 255, 0.1) 40%, transparent 70%)",
        secondary: isDarkMode 
          ? "radial-gradient(ellipse, rgba(0, 122, 255, 0.25) 0%, rgba(0, 122, 255, 0.08) 40%, transparent 80%)"
          : "radial-gradient(ellipse, rgba(0, 122, 255, 0.35) 0%, rgba(0, 122, 255, 0.12) 40%, transparent 80%)",
        tertiary: isDarkMode 
          ? "radial-gradient(ellipse, rgba(0, 122, 255, 0.2) 0%, rgba(0, 122, 255, 0.06) 35%, transparent 75%)"
          : "radial-gradient(ellipse, rgba(0, 122, 255, 0.3) 0%, rgba(0, 122, 255, 0.1) 35%, transparent 75%)",
        animation1: "smoothFloat 25s ease-in-out infinite",
        animation2: "gentlePulse 20s ease-in-out infinite",
        animation3: "softDrift 30s ease-in-out infinite"
      },
      subtle: {
        primary: isDarkMode 
          ? "radial-gradient(ellipse at 30% 70%, rgba(0, 122, 255, 0.15) 0%, transparent 50%)"
          : "radial-gradient(ellipse at 30% 70%, rgba(0, 122, 255, 0.2) 0%, transparent 50%)",
        secondary: isDarkMode 
          ? "radial-gradient(ellipse, rgba(0, 122, 255, 0.1) 0%, transparent 70%)"
          : "radial-gradient(ellipse, rgba(0, 122, 255, 0.15) 0%, transparent 70%)",
        tertiary: isDarkMode 
          ? "radial-gradient(ellipse, rgba(0, 122, 255, 0.08) 0%, transparent 60%)"
          : "radial-gradient(ellipse, rgba(0, 122, 255, 0.12) 0%, transparent 60%)",
        animation1: "float 20s ease-in-out infinite",
        animation2: "pulse 15s ease-in-out infinite",
        animation3: "drift 25s ease-in-out infinite"
      },
      vibrant: {
        primary: isDarkMode 
          ? "radial-gradient(ellipse at 20% 80%, rgba(0, 122, 255, 0.4) 0%, rgba(0, 122, 255, 0.15) 30%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 122, 255, 0.3) 0%, rgba(0, 122, 255, 0.1) 40%, transparent 70%)"
          : "radial-gradient(ellipse at 20% 80%, rgba(0, 122, 255, 0.5) 0%, rgba(0, 122, 255, 0.2) 30%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 122, 255, 0.4) 0%, rgba(0, 122, 255, 0.15) 40%, transparent 70%)",
        secondary: isDarkMode 
          ? "radial-gradient(ellipse, rgba(0, 122, 255, 0.35) 0%, rgba(0, 122, 255, 0.12) 40%, transparent 80%)"
          : "radial-gradient(ellipse, rgba(0, 122, 255, 0.45) 0%, rgba(0, 122, 255, 0.18) 40%, transparent 80%)",
        tertiary: isDarkMode 
          ? "radial-gradient(ellipse, rgba(0, 122, 255, 0.3) 0%, rgba(0, 122, 255, 0.1) 35%, transparent 75%)"
          : "radial-gradient(ellipse, rgba(0, 122, 255, 0.4) 0%, rgba(0, 122, 255, 0.15) 35%, transparent 75%)",
        animation1: "smoothFloat 25s ease-in-out infinite",
        animation2: "gentlePulse 20s ease-in-out infinite",
        animation3: "softDrift 30s ease-in-out infinite"
      }
    };

    return variants[variant] || variants.default;
  };

  const config = getGradientConfig();
  const intensityMultiplier = intensity === 'high' ? 1.2 : intensity === 'low' ? 0.3 : 0.8;

  return (
    <>
      <div style={{
        position: "absolute",
        top: "-50%",
        left: "-50%",
        width: "200%",
        height: "200%",
        background: config.primary,
        animation: config.animation1,
        filter: `blur(${1 * intensityMultiplier}px)`,
        zIndex: 0
      }} />
      
      <div style={{
        position: "absolute",
        top: "10%",
        right: "-20%",
        width: `${50 * intensityMultiplier}%`,
        height: `${50 * intensityMultiplier}%`,
        background: config.secondary,
        animation: config.animation2,
        filter: `blur(${1.5 * intensityMultiplier}px)`,
        zIndex: 0
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "-30%",
        left: "10%",
        width: `${70 * intensityMultiplier}%`,
        height: `${70 * intensityMultiplier}%`,
        background: config.tertiary,
        animation: config.animation3,
        filter: `blur(${1 * intensityMultiplier}px)`,
        zIndex: 0
      }} />
    </>
  );
};

export default AnimatedGradient;
