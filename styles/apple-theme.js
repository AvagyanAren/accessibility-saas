// Apple-inspired design system
// Based on Apple Human Interface Guidelines and design principles

export const appleTheme = {
  // Typography System (Apple-inspired)
  typography: {
    fontFamily: {
      primary: `
        -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 
        system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif
      `,
      mono: `
        'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', 'Courier New', monospace
      `
    },
    fontSize: {
      // Apple's standard type scale
      xs: '11px',    // Caption 2
      sm: '12px',    // Caption 1
      base: '14px',  // Footnote
      md: '15px',    // Subheadline
      lg: '16px',    // Callout
      xl: '17px',    // Body
      '2xl': '20px', // Headline
      '3xl': '22px', // Title 3
      '4xl': '28px', // Title 2
      '5xl': '34px', // Title 1
      '6xl': '48px', // Large Title
      '7xl': '60px'  // Display
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800
    },
    lineHeight: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.35,
      relaxed: 1.5,
      loose: 1.75
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em'
    }
  },

  // Color System (Apple-inspired)
  colors: {
    // System colors
    primary: {
      50: '#EBF8FF',   // Very light blue
      100: '#BEE3F8',  // Light blue
      200: '#90CDF4',  // Medium light blue
      300: '#63B3ED',  // Medium blue
      400: '#4299E1',  // Medium dark blue
      500: '#007AFF',  // Apple Blue (Primary)
      600: '#0066CC',  // Dark blue
      700: '#004C99',  // Darker blue
      800: '#003366',  // Very dark blue
      900: '#001A33'   // Darkest blue
    },
    
    // Semantic colors
    success: '#30D158', // Apple Green
    warning: '#FF9F0A', // Apple Orange
    error: '#FF453A',   // Apple Red
    info: '#007AFF',    // Apple Blue
    
    // Neutral colors (Apple-inspired grays)
    gray: {
      25: '#FAFCFF',   // Almost white
      50: '#F5F5F7',   // Very light gray
      100: '#F2F2F7',  // Light gray
      200: '#E5E5EA',  // Medium light gray
      300: '#D1D1D6',  // Medium gray
      400: '#C7C7CC',  // Medium dark gray
      500: '#AEAEB2',  // Dark gray
      600: '#8E8E93',  // Darker gray
      700: '#636366',  // Very dark gray
      800: '#48484A',  // Almost black
      900: '#1C1C1E'   // Black
    },
    
    // Background colors
    background: {
      primary: '#FFFFFF',   // White
      secondary: '#F2F2F7', // Light gray
      tertiary: '#FFFFFF',  // White
      elevated: '#FFFFFF'   // White with shadow
    },
    
    // Text colors - Improved contrast ratios
    text: {
      primary: '#000000',   // Pure black for maximum contrast
      secondary: '#1C1C1E', // Very dark gray
      tertiary: '#2C2C2E',  // Dark gray
      quaternary: '#6D6D70' // Medium gray - improved from 8E8E93
    },

    // Dark mode colors
    dark: {
      // Background colors for dark mode
      background: {
        primary: '#000000',   // Pure black
        secondary: '#1C1C1E', // Dark gray
        tertiary: '#2C2C2E',  // Medium dark gray
        elevated: '#1C1C1E'   // Dark gray with shadow
      },
      
      // Text colors for dark mode - Improved contrast
      text: {
        primary: '#FFFFFF',   // Pure white for maximum contrast
        secondary: '#FFFFFF', // White for better contrast
        tertiary: '#E5E5EA',  // Light gray
        quaternary: '#AEAEB2' // Lighter gray for better readability
      },
      
      // Gray scale for dark mode
      gray: {
        25: '#000000',   // Black
        50: '#1C1C1E',   // Very dark gray
        100: '#2C2C2E',  // Dark gray
        200: '#3A3A3C',  // Medium dark gray
        300: '#48484A',  // Medium gray
        400: '#636366',  // Light gray
        500: '#8E8E93',  // Lighter gray
        600: '#AEAEB2',  // Very light gray
        700: '#C7C7CC',  // Almost white
        800: '#D1D1D6',  // Light white
        900: '#F2F2F7'   // White
      }
    },
    
    // Label colors (for dark mode compatibility)
    label: {
      primary: '#000000',
      secondary: 'rgba(60, 60, 67, 0.6)',
      tertiary: 'rgba(60, 60, 67, 0.3)',
      quaternary: 'rgba(60, 60, 67, 0.18)'
    },
    
    // Fill colors
    fill: {
      primary: 'rgba(120, 120, 128, 0.2)',
      secondary: 'rgba(120, 120, 128, 0.16)',
      tertiary: 'rgba(118, 118, 128, 0.12)',
      quaternary: 'rgba(116, 116, 128, 0.08)'
    }
  },

  // Spacing System (Apple-inspired)
  spacing: {
    px: '1px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px'
  },

  // Border radius (Apple-inspired)
  borderRadius: {
    none: '0px',
    sm: '4px',
    base: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px'
  },

  // Shadows (Apple-inspired)
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none'
  },

  // Transition and animation
  transition: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms'
    },
    timing: {
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
      easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  },

  // Breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
};

// CSS custom properties generator
export const generateCSSVariables = (theme) => {
  const cssVars = {};
  
  // Colors
  Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'object') {
      Object.entries(colorValue).forEach(([shade, value]) => {
        cssVars[`--color-${colorName}-${shade}`] = value;
      });
    } else {
      cssVars[`--color-${colorName}`] = colorValue;
    }
  });
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  // Typography
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value;
  });
  
  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    cssVars[`--border-radius-${key}`] = value;
  });
  
  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });
  
  return cssVars;
};

export default appleTheme;
