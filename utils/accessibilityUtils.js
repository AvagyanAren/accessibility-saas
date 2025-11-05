// Shared utility functions for accessibility tools
import React from 'react';
import { XCircle, WarningCircle, Info } from 'phosphor-react';

export const getSeverityColor = (severity) => {
  switch (severity) {
    case "critical": 
    case "error": 
      return "#dc3545";
    case "warning": return "#ffc107";
    case "info": return "#17a2b8";
    default: return "#6c757d";
  }
};

export const getSeverityIcon = (severity) => {
  switch (severity) {
    case "critical":
    case "error":
      return <XCircle size={24} weight="fill" />;
    case "warning": return <WarningCircle size={24} weight="fill" />;
    case "info": return <Info size={24} weight="fill" />;
    default: return <Info size={24} weight="fill" />;
  }
};

export const getScoreColor = (score) => {
  if (score >= 90) return "#28a745";
  if (score >= 70) return "#ffc107";
  return "#dc3545";
};

export const getScoreLabel = (score) => {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
};

export const validateUrl = (url) => {
  if (!url.trim()) {
    return { valid: false, message: "Please enter a URL" };
  }
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, message: "URL must use HTTP or HTTPS protocol" };
    }
    return { valid: true, url: urlObj.href };
  } catch (error) {
    return { valid: false, message: "Please enter a valid URL" };
  }
};

export const formatTime = (seconds) => {
  if (seconds < 1) {
    return `${Math.round(seconds * 1000)}ms`;
  }
  return `${seconds.toFixed(1)}s`;
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateMockId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
