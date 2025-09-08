import React from 'react';
import { appleTheme } from '../../styles/apple-theme';
import { useTheme } from '../../contexts/ThemeContext';

const Typography = ({
  children,
  variant = 'body',
  size,
  weight = 'regular',
  color = 'primary',
  align = 'left',
  component,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useTheme();
  const getVariantStyles = () => {
    const variants = {
      // Display styles
      display: {
        fontSize: appleTheme.typography.fontSize['7xl'],
        fontWeight: appleTheme.typography.fontWeight.bold,
        lineHeight: appleTheme.typography.lineHeight.tight,
        letterSpacing: appleTheme.typography.letterSpacing.tight
      },
      
      // Title styles - Enhanced for better readability
      title1: {
        fontSize: appleTheme.typography.fontSize['5xl'],
        fontWeight: appleTheme.typography.fontWeight.heavy, // 800 - More prominent
        lineHeight: appleTheme.typography.lineHeight.tight,
        letterSpacing: appleTheme.typography.letterSpacing.tight
      },
      title2: {
        fontSize: appleTheme.typography.fontSize['4xl'],
        fontWeight: appleTheme.typography.fontWeight.bold, // 700 - Strong
        lineHeight: appleTheme.typography.lineHeight.snug,
        letterSpacing: appleTheme.typography.letterSpacing.tight
      },
      title3: {
        fontSize: appleTheme.typography.fontSize['3xl'],
        fontWeight: appleTheme.typography.fontWeight.bold, // 700 - Strong
        lineHeight: appleTheme.typography.lineHeight.snug
      },
      
      // Headline - Enhanced for better hierarchy
      headline: {
        fontSize: appleTheme.typography.fontSize['2xl'],
        fontWeight: appleTheme.typography.fontWeight.bold, // 700 - Stronger
        lineHeight: appleTheme.typography.lineHeight.snug
      },
      
      // Body styles - Improved hierarchy
      body: {
        fontSize: appleTheme.typography.fontSize.xl,
        fontWeight: appleTheme.typography.fontWeight.regular, // 400 - Light
        lineHeight: appleTheme.typography.lineHeight.relaxed
      },
      callout: {
        fontSize: appleTheme.typography.fontSize.lg,
        fontWeight: appleTheme.typography.fontWeight.medium, // 500 - Slightly heavier
        lineHeight: appleTheme.typography.lineHeight.normal
      },
      subheadline: {
        fontSize: appleTheme.typography.fontSize.md,
        fontWeight: appleTheme.typography.fontWeight.medium, // 500 - Slightly heavier
        lineHeight: appleTheme.typography.lineHeight.normal
      },
      footnote: {
        fontSize: appleTheme.typography.fontSize.base,
        fontWeight: appleTheme.typography.fontWeight.regular, // 400 - Light
        lineHeight: appleTheme.typography.lineHeight.normal
      },
      
      // Caption styles
      caption1: {
        fontSize: appleTheme.typography.fontSize.sm,
        fontWeight: appleTheme.typography.fontWeight.regular,
        lineHeight: appleTheme.typography.lineHeight.normal
      },
      caption2: {
        fontSize: appleTheme.typography.fontSize.xs,
        fontWeight: appleTheme.typography.fontWeight.regular,
        lineHeight: appleTheme.typography.lineHeight.normal
      }
    };

    return variants[variant] || variants.body;
  };

  const getSizeStyles = () => {
    if (!size) return {};
    
    const sizes = {
      xs: { fontSize: appleTheme.typography.fontSize.xs },
      sm: { fontSize: appleTheme.typography.fontSize.sm },
      base: { fontSize: appleTheme.typography.fontSize.base },
      md: { fontSize: appleTheme.typography.fontSize.md },
      lg: { fontSize: appleTheme.typography.fontSize.lg },
      xl: { fontSize: appleTheme.typography.fontSize.xl },
      '2xl': { fontSize: appleTheme.typography.fontSize['2xl'] },
      '3xl': { fontSize: appleTheme.typography.fontSize['3xl'] },
      '4xl': { fontSize: appleTheme.typography.fontSize['4xl'] },
      '5xl': { fontSize: appleTheme.typography.fontSize['5xl'] },
      '6xl': { fontSize: appleTheme.typography.fontSize['6xl'] },
      '7xl': { fontSize: appleTheme.typography.fontSize['7xl'] }
    };

    return sizes[size] || {};
  };

  const getWeightStyles = () => {
    const weights = {
      regular: { fontWeight: appleTheme.typography.fontWeight.regular },
      medium: { fontWeight: appleTheme.typography.fontWeight.medium },
      semibold: { fontWeight: appleTheme.typography.fontWeight.semibold },
      bold: { fontWeight: appleTheme.typography.fontWeight.bold },
      heavy: { fontWeight: appleTheme.typography.fontWeight.heavy }
    };

    return weights[weight] || weights.regular;
  };

  const getColorStyles = () => {
    const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;
    
    const colors = {
      primary: { color: themeColors.text.primary },
      secondary: { color: themeColors.text.secondary },
      tertiary: { color: themeColors.text.tertiary },
      quaternary: { color: themeColors.text.quaternary },
      blue: { color: appleTheme.colors.primary[500] },
      success: { color: appleTheme.colors.success },
      warning: { color: appleTheme.colors.warning },
      error: { color: appleTheme.colors.error },
      white: { color: 'white' },
      inherit: { color: 'inherit' }
    };

    return colors[color] || colors.primary;
  };

  const getAlignStyles = () => {
    return {
      textAlign: align
    };
  };

  const getComponent = () => {
    if (component) return component;
    
    const componentMap = {
      display: 'h1',
      title1: 'h1',
      title2: 'h2',
      title3: 'h3',
      headline: 'h4',
      body: 'p',
      callout: 'p',
      subheadline: 'p',
      footnote: 'p',
      caption1: 'span',
      caption2: 'span'
    };

    return componentMap[variant] || 'p';
  };

  const combinedStyles = {
    fontFamily: appleTheme.typography.fontFamily.primary,
    margin: 0,
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...getWeightStyles(),
    ...getColorStyles(),
    ...getAlignStyles()
  };

  const Component = getComponent();

  return (
    <Component
      className={className}
      style={combinedStyles}
      {...props}
    >
      {children}
    </Component>
  );
};

// Specialized typography components
const Heading = ({ level = 1, children, ...props }) => {
  const variants = {
    1: 'title1',
    2: 'title2',
    3: 'title3',
    4: 'headline',
    5: 'callout',
    6: 'subheadline'
  };

  const components = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6'
  };

  return (
    <Typography
      variant={variants[level]}
      component={components[level]}
      {...props}
    >
      {children}
    </Typography>
  );
};

const Text = ({ children, ...props }) => {
  return (
    <Typography variant="body" component="span" {...props}>
      {children}
    </Typography>
  );
};

const Caption = ({ children, size = 1, ...props }) => {
  const variant = size === 1 ? 'caption1' : 'caption2';
  
  return (
    <Typography variant={variant} component="span" {...props}>
      {children}
    </Typography>
  );
};

const Link = ({ 
  children, 
  href, 
  external = false, 
  color = 'blue',
  underline = 'hover',
  ...props 
}) => {
  const linkStyles = {
    textDecoration: underline === 'always' ? 'underline' : 'none',
    cursor: 'pointer',
    transition: `all ${appleTheme.transition.duration.base} ${appleTheme.transition.timing.ease}`,
    '&:hover': underline === 'hover' ? {
      textDecoration: 'underline'
    } : {}
  };

  const linkProps = {
    ...props,
    ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})
  };

  return (
    <Typography
      component="a"
      href={href}
      color={color}
      style={linkStyles}
      {...linkProps}
    >
      {children}
    </Typography>
  );
};

// Export components
Typography.Heading = Heading;
Typography.Text = Text;
Typography.Caption = Caption;
Typography.Link = Link;

export default Typography;
