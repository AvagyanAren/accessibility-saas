import React from 'react';
import { appleTheme } from '../../styles/apple-theme';
import { useTheme } from '../../contexts/ThemeContext';

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  className = '',
  onClick,
  hover = false,
  ...props
}) => {
  const { isDarkMode } = useTheme();
  const getVariantStyles = () => {
    const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;
    
    const baseStyles = {
      backgroundColor: isDarkMode ? themeColors.background.elevated : appleTheme.colors.background.primary,
      borderRadius: appleTheme.borderRadius.xl,
      border: `1px solid ${isDarkMode ? themeColors.gray[300] : appleTheme.colors.gray[200]}`,
      transition: `all ${appleTheme.transition.duration.base} ${appleTheme.transition.timing.ease}`,
      position: 'relative',
      overflow: 'hidden'
    };

    const variants = {
      default: {
        ...baseStyles,
        boxShadow: appleTheme.shadows.sm
      },
      elevated: {
        ...baseStyles,
        boxShadow: appleTheme.shadows.md,
        borderColor: appleTheme.colors.gray[100]
      },
      outlined: {
        ...baseStyles,
        boxShadow: 'none',
        borderColor: appleTheme.colors.gray[300]
      },
      filled: {
        ...baseStyles,
        backgroundColor: appleTheme.colors.gray[50],
        borderColor: appleTheme.colors.gray[100],
        boxShadow: 'none'
      },
      glass: {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: appleTheme.shadows.lg
      }
    };

    return variants[variant];
  };

  const getPaddingStyles = () => {
    const paddings = {
      none: { padding: 0 },
      small: { padding: appleTheme.spacing[3] },
      medium: { padding: appleTheme.spacing[4] },
      large: { padding: appleTheme.spacing[6] },
      xl: { padding: appleTheme.spacing[8] }
    };
    return paddings[padding];
  };

  const getHoverStyles = () => {
    if (!hover && !onClick) return {};
    
    return {
      cursor: onClick ? 'pointer' : 'default',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: appleTheme.shadows.lg,
        borderColor: appleTheme.colors.primary[200]
      }
    };
  };

  const cardStyle = {
    ...getVariantStyles(),
    ...getPaddingStyles(),
    ...getHoverStyles()
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={className}
      style={cardStyle}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header Component
const CardHeader = ({ 
  children, 
  title, 
  subtitle, 
  action,
  className = '',
  ...props 
}) => {
  const headerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: appleTheme.spacing[4],
    paddingBottom: appleTheme.spacing[3],
    borderBottom: `1px solid ${appleTheme.colors.gray[200]}`
  };

  const titleStyle = {
    margin: 0,
    fontSize: appleTheme.typography.fontSize['2xl'],
    fontWeight: appleTheme.typography.fontWeight.semibold,
    color: appleTheme.colors.text.primary,
    lineHeight: appleTheme.typography.lineHeight.snug
  };

  const subtitleStyle = {
    margin: `${appleTheme.spacing[1]} 0 0 0`,
    fontSize: appleTheme.typography.fontSize.base,
    fontWeight: appleTheme.typography.fontWeight.regular,
    color: appleTheme.colors.text.secondary,
    lineHeight: appleTheme.typography.lineHeight.normal
  };

  const contentStyle = {
    flex: 1,
    minWidth: 0
  };

  const actionStyle = {
    marginLeft: appleTheme.spacing[4],
    flexShrink: 0
  };

  return (
    <div className={className} style={headerStyle} {...props}>
      <div style={contentStyle}>
        {title && <h3 style={titleStyle}>{title}</h3>}
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        {children}
      </div>
      {action && <div style={actionStyle}>{action}</div>}
    </div>
  );
};

// Card Content Component
const CardContent = ({ 
  children, 
  className = '',
  ...props 
}) => {
  const contentStyle = {
    fontSize: appleTheme.typography.fontSize.base,
    color: appleTheme.colors.text.primary,
    lineHeight: appleTheme.typography.lineHeight.relaxed
  };

  return (
    <div className={className} style={contentStyle} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
const CardFooter = ({ 
  children, 
  className = '',
  justify = 'flex-end',
  ...props 
}) => {
  const footerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: justify,
    marginTop: appleTheme.spacing[4],
    paddingTop: appleTheme.spacing[3],
    borderTop: `1px solid ${appleTheme.colors.gray[200]}`,
    gap: appleTheme.spacing[2]
  };

  return (
    <div className={className} style={footerStyle} {...props}>
      {children}
    </div>
  );
};

// Export components
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
