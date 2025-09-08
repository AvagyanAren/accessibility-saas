import React from 'react';
import { appleTheme } from '../../styles/apple-theme';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  startIcon,
  endIcon,
  loading = false,
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: appleTheme.typography.fontFamily.primary,
      fontWeight: appleTheme.typography.fontWeight.semibold,
      borderRadius: '9999px', // Fully rounded pill shape
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: `all ${appleTheme.transition.duration.base} ${appleTheme.transition.timing.ease}`,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      ':focus': {
        outline: 'none',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      ':focus-visible': {
        outline: 'none',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
    };

    const variants = {
      primary: {
        backgroundColor: '#007AFF', // Apple blue
        color: 'white',
        border: 'none',
      },
      secondary: {
        backgroundColor: 'white',
        color: '#007AFF', // Apple blue
        border: `1px solid #007AFF`,
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#007AFF',
        border: `1px solid #007AFF`,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#007AFF',
        border: 'none',
        boxShadow: 'none',
      },
      danger: {
        backgroundColor: '#FF3B30', // Apple red
        color: 'white',
        border: 'none',
      }
    };

    return { ...baseStyles, ...variants[variant] };
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: `${appleTheme.spacing[2]} ${appleTheme.spacing[3]}`,
        fontSize: appleTheme.typography.fontSize.sm,
        minHeight: '32px'
      },
      medium: {
        padding: `${appleTheme.spacing[2.5]} ${appleTheme.spacing[4]}`,
        fontSize: appleTheme.typography.fontSize.base,
        minHeight: '40px'
      },
      large: {
        padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[6]}`,
        fontSize: appleTheme.typography.fontSize.lg,
        minHeight: '48px'
      }
    };
    return sizes[size];
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  const buttonStyle = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...(fullWidth ? { width: '100%' } : {}),
    ...(disabled || loading ? {
      opacity: 0.6,
      transform: 'none',
      cursor: 'not-allowed'
    } : {})
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
      style={buttonStyle}
      {...props}
    >
      {loading && (
        <span 
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'buttonSpin 1s linear infinite',
            marginRight: (startIcon || children) ? appleTheme.spacing[2] : 0,
            display: 'inline-block'
          }}
        />
      )}
      {!loading && startIcon && (
        <span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
          {startIcon}
        </span>
      )}
      {children}
      {!loading && endIcon && (
        <span style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
          {endIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
