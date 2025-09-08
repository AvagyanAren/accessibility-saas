import React, { useState } from 'react';
import { appleTheme } from '../../styles/apple-theme';

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  size = 'medium',
  variant = 'default',
  disabled = false,
  error = false,
  helperText,
  startIcon,
  endIcon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const getContainerStyles = () => {
    return {
      display: 'flex',
      flexDirection: 'column',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: appleTheme.typography.fontFamily.primary
    };
  };

  const getLabelStyles = () => {
    if (!label) return {};
    
    return {
      display: 'block',
      fontSize: appleTheme.typography.fontSize.sm,
      fontWeight: appleTheme.typography.fontWeight.medium,
      color: error ? appleTheme.colors.error : appleTheme.colors.text.secondary,
      marginBottom: appleTheme.spacing[1.5],
      lineHeight: appleTheme.typography.lineHeight.normal
    };
  };

  const getInputWrapperStyles = () => {
    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    };
  };

  const getInputStyles = () => {
    const baseStyles = {
      fontFamily: appleTheme.typography.fontFamily.primary,
      width: '100%',
      border: `1px solid ${
        error 
          ? appleTheme.colors.error 
          : focused 
            ? appleTheme.colors.primary[500]
            : appleTheme.colors.gray[300]
      }`,
      borderRadius: '9999px', // Fully rounded pill shape
      backgroundColor: disabled 
        ? appleTheme.colors.gray[50] 
        : appleTheme.colors.background.primary,
      color: disabled 
        ? appleTheme.colors.text.tertiary 
        : appleTheme.colors.text.primary,
      outline: 'none',
      transition: `all ${appleTheme.transition.duration.base} ${appleTheme.transition.timing.ease}`,
      boxShadow: focused 
        ? `0 0 0 3px ${appleTheme.colors.primary[500]}20`
        : '0 1px 3px rgba(0, 0, 0, 0.1)'
    };

    const sizes = {
      small: {
        fontSize: appleTheme.typography.fontSize.sm,
        padding: `${appleTheme.spacing[2]} ${appleTheme.spacing[3]}`,
        height: '36px'
      },
      medium: {
        fontSize: appleTheme.typography.fontSize.base,
        padding: `${appleTheme.spacing[2.5]} ${appleTheme.spacing[3]}`,
        height: '44px'
      },
      large: {
        fontSize: appleTheme.typography.fontSize.lg,
        padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
        height: '52px'
      }
    };

    const variants = {
      default: {},
      filled: {
        backgroundColor: appleTheme.colors.gray[100],
        border: `1px solid ${appleTheme.colors.gray[200]}`
      },
      outlined: {
        backgroundColor: 'transparent',
        border: `1px solid ${appleTheme.colors.gray[300]}`
      }
    };

    // Adjust padding for icons
    const paddingAdjustment = {};
    if (startIcon) {
      paddingAdjustment.paddingLeft = `${parseInt(appleTheme.spacing[10])}px`;
    }
    if (endIcon) {
      paddingAdjustment.paddingRight = `${parseInt(appleTheme.spacing[10])}px`;
    }

    return {
      ...baseStyles,
      ...sizes[size],
      ...variants[variant],
      ...paddingAdjustment
    };
  };

  const getIconStyles = (position) => {
    return {
      position: 'absolute',
      [position]: appleTheme.spacing[3],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: focused 
        ? appleTheme.colors.primary[500] 
        : appleTheme.colors.text.tertiary,
      transition: `color ${appleTheme.transition.duration.base} ${appleTheme.transition.timing.ease}`,
      pointerEvents: 'none',
      fontSize: '20px'
    };
  };

  const getHelperTextStyles = () => {
    if (!helperText) return {};
    
    return {
      fontSize: appleTheme.typography.fontSize.xs,
      color: error ? appleTheme.colors.error : appleTheme.colors.text.tertiary,
      marginTop: appleTheme.spacing[1],
      lineHeight: appleTheme.typography.lineHeight.normal
    };
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={className} style={getContainerStyles()}>
      {label && (
        <label style={getLabelStyles()}>
          {label}
        </label>
      )}
      
      <div style={getInputWrapperStyles()}>
        {startIcon && (
          <span style={getIconStyles('left')}>
            {startIcon}
          </span>
        )}
        
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          style={getInputStyles()}
          {...props}
        />
        
        {endIcon && (
          <span style={getIconStyles('right')}>
            {endIcon}
          </span>
        )}
      </div>
      
      {helperText && (
        <span style={getHelperTextStyles()}>
          {helperText}
        </span>
      )}
    </div>
  );
};

// Textarea component
const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  variant = 'default',
  disabled = false,
  error = false,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const getContainerStyles = () => {
    return {
      display: 'flex',
      flexDirection: 'column',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: appleTheme.typography.fontFamily.primary
    };
  };

  const getLabelStyles = () => {
    if (!label) return {};
    
    return {
      display: 'block',
      fontSize: appleTheme.typography.fontSize.sm,
      fontWeight: appleTheme.typography.fontWeight.medium,
      color: error ? appleTheme.colors.error : appleTheme.colors.text.secondary,
      marginBottom: appleTheme.spacing[1.5],
      lineHeight: appleTheme.typography.lineHeight.normal
    };
  };

  const getTextareaStyles = () => {
    const baseStyles = {
      fontFamily: appleTheme.typography.fontFamily.primary,
      width: '100%',
      border: `1px solid ${
        error 
          ? appleTheme.colors.error 
          : focused 
            ? appleTheme.colors.primary[500]
            : appleTheme.colors.gray[300]
      }`,
      borderRadius: '9999px', // Fully rounded pill shape
      backgroundColor: disabled 
        ? appleTheme.colors.gray[100] 
        : appleTheme.colors.background.primary,
      color: disabled 
        ? appleTheme.colors.text.tertiary 
        : appleTheme.colors.text.primary,
      fontSize: appleTheme.typography.fontSize.base,
      padding: appleTheme.spacing[3],
      outline: 'none',
      resize: 'vertical',
      minHeight: `${rows * 1.5}em`,
      lineHeight: appleTheme.typography.lineHeight.relaxed,
      transition: `all ${appleTheme.transition.duration.base} ${appleTheme.transition.timing.ease}`,
    };

    const variants = {
      default: {},
      filled: {
        backgroundColor: appleTheme.colors.gray[50],
        border: `1px solid ${appleTheme.colors.gray[200]}`
      },
      outlined: {
        backgroundColor: 'transparent'
      }
    };

    return {
      ...baseStyles,
      ...variants[variant]
    };
  };

  const getHelperTextStyles = () => {
    if (!helperText) return {};
    
    return {
      fontSize: appleTheme.typography.fontSize.xs,
      color: error ? appleTheme.colors.error : appleTheme.colors.text.tertiary,
      marginTop: appleTheme.spacing[1],
      lineHeight: appleTheme.typography.lineHeight.normal
    };
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={className} style={getContainerStyles()}>
      {label && (
        <label style={getLabelStyles()}>
          {label}
        </label>
      )}
      
      <textarea
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        style={getTextareaStyles()}
        {...props}
      />
      
      {helperText && (
        <span style={getHelperTextStyles()}>
          {helperText}
        </span>
      )}
    </div>
  );
};

// Export components
Input.Textarea = Textarea;

export default Input;
