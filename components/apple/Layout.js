import React from 'react';
import { appleTheme } from '../../styles/apple-theme';

// Container Component
const Container = ({
  children,
  size = 'lg',
  padding = 'default',
  center = true,
  className = '',
  ...props
}) => {
  const getSizeStyles = () => {
    const sizes = {
      xs: { maxWidth: '475px' },
      sm: { maxWidth: '640px' },
      md: { maxWidth: '768px' },
      lg: { maxWidth: '1024px' },
      xl: { maxWidth: '1280px' },
      '2xl': { maxWidth: '1536px' },
      full: { maxWidth: '100%' },
      none: {}
    };

    return sizes[size] || sizes.lg;
  };

  const getPaddingStyles = () => {
    const paddings = {
      none: { padding: 0 },
      sm: { 
        paddingLeft: appleTheme.spacing[4], 
        paddingRight: appleTheme.spacing[4] 
      },
      default: { 
        paddingLeft: appleTheme.spacing[6], 
        paddingRight: appleTheme.spacing[6] 
      },
      lg: { 
        paddingLeft: appleTheme.spacing[8], 
        paddingRight: appleTheme.spacing[8] 
      }
    };

    return paddings[padding] || paddings.default;
  };

  const containerStyles = {
    width: '100%',
    ...getSizeStyles(),
    ...getPaddingStyles(),
    ...(center ? { marginLeft: 'auto', marginRight: 'auto' } : {})
  };

  return (
    <div className={className} style={containerStyles} {...props}>
      {children}
    </div>
  );
};

// Box Component (flexible container)
const Box = ({
  children,
  as = 'div',
  display = 'block',
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap = 0,
  padding = 0,
  margin = 0,
  width = 'auto',
  height = 'auto',
  background = 'transparent',
  border = 'none',
  borderRadius = 0,
  shadow = 'none',
  className = '',
  ...props
}) => {
  const getSpacingValue = (value) => {
    if (typeof value === 'number') {
      return appleTheme.spacing[value] || `${value}px`;
    }
    return value;
  };

  const boxStyles = {
    display,
    ...(display === 'flex' && {
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      gap: getSpacingValue(gap)
    }),
    padding: getSpacingValue(padding),
    margin: getSpacingValue(margin),
    width,
    height,
    backgroundColor: background,
    border,
    borderRadius: getSpacingValue(borderRadius),
    boxShadow: appleTheme.shadows[shadow] || shadow
  };

  const Component = as;

  return (
    <Component className={className} style={boxStyles} {...props}>
      {children}
    </Component>
  );
};

// Flex Component (shorthand for flex box)
const Flex = ({
  children,
  direction = 'row',
  align = 'center',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap = 0,
  ...props
}) => {
  return (
    <Box
      display="flex"
      direction={direction}
      align={align}
      justify={justify}
      wrap={wrap}
      gap={gap}
      {...props}
    >
      {children}
    </Box>
  );
};

// Grid Component
const Grid = ({
  children,
  columns = 1,
  gap = 4,
  rows = 'auto',
  areas,
  className = '',
  ...props
}) => {
  const getColumns = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    return columns;
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: getColumns(),
    gridTemplateRows: rows,
    gap: appleTheme.spacing[gap] || gap,
    ...(areas && { gridTemplateAreas: areas })
  };

  return (
    <div className={className} style={gridStyles} {...props}>
      {children}
    </div>
  );
};

// GridItem Component
const GridItem = ({
  children,
  column,
  row,
  area,
  className = '',
  ...props
}) => {
  const itemStyles = {
    ...(column && { gridColumn: column }),
    ...(row && { gridRow: row }),
    ...(area && { gridArea: area })
  };

  return (
    <div className={className} style={itemStyles} {...props}>
      {children}
    </div>
  );
};

// Stack Component (vertical spacing)
const Stack = ({
  children,
  spacing = 4,
  align = 'stretch',
  divider,
  className = '',
  ...props
}) => {
  const stackStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: align,
    gap: appleTheme.spacing[spacing] || spacing
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className} style={stackStyles} {...props}>
      {divider
        ? childrenArray.reduce((acc, child, index) => {
            acc.push(child);
            if (index < childrenArray.length - 1) {
              acc.push(
                <div key={`divider-${index}`} style={{ width: '100%' }}>
                  {divider}
                </div>
              );
            }
            return acc;
          }, [])
        : children}
    </div>
  );
};

// HStack Component (horizontal spacing)
const HStack = ({
  children,
  spacing = 4,
  align = 'center',
  justify = 'flex-start',
  divider,
  className = '',
  ...props
}) => {
  const stackStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: align,
    justifyContent: justify,
    gap: appleTheme.spacing[spacing] || spacing
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className} style={stackStyles} {...props}>
      {divider
        ? childrenArray.reduce((acc, child, index) => {
            acc.push(child);
            if (index < childrenArray.length - 1) {
              acc.push(
                <div key={`divider-${index}`} style={{ height: '100%' }}>
                  {divider}
                </div>
              );
            }
            return acc;
          }, [])
        : children}
    </div>
  );
};

// VStack Component (vertical spacing)
const VStack = ({
  children,
  spacing = 4,
  align = 'stretch',
  justify = 'flex-start',
  divider,
  className = '',
  ...props
}) => {
  const stackStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: align,
    justifyContent: justify,
    gap: appleTheme.spacing[spacing] || spacing
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className} style={stackStyles} {...props}>
      {divider
        ? childrenArray.reduce((acc, child, index) => {
            acc.push(child);
            if (index < childrenArray.length - 1) {
              acc.push(
                <div key={`divider-${index}`} style={{ width: '100%' }}>
                  {divider}
                </div>
              );
            }
            return acc;
          }, [])
        : children}
    </div>
  );
};

// Spacer Component
const Spacer = ({ size = 4, direction = 'vertical' }) => {
  const spacerStyles = {
    [direction === 'vertical' ? 'height' : 'width']: appleTheme.spacing[size] || size,
    flexShrink: 0
  };

  return <div style={spacerStyles} />;
};

// Divider Component
const Divider = ({
  orientation = 'horizontal',
  thickness = 1,
  color = 'gray.200',
  margin = 0,
  className = '',
  ...props
}) => {
  const dividerStyles = {
    border: 'none',
    backgroundColor: appleTheme.colors.gray[200],
    ...(orientation === 'horizontal'
      ? {
          width: '100%',
          height: `${thickness}px`,
          marginTop: appleTheme.spacing[margin] || margin,
          marginBottom: appleTheme.spacing[margin] || margin
        }
      : {
          height: '100%',
          width: `${thickness}px`,
          marginLeft: appleTheme.spacing[margin] || margin,
          marginRight: appleTheme.spacing[margin] || margin
        })
  };

  return <div className={className} style={dividerStyles} {...props} />;
};

// Section Component (semantic layout)
const Section = ({
  children,
  padding = 'default',
  background = 'transparent',
  className = '',
  ...props
}) => {
  const getPaddingStyles = () => {
    const paddings = {
      none: { padding: 0 },
      sm: { 
        paddingTop: appleTheme.spacing[8],
        paddingBottom: appleTheme.spacing[8]
      },
      default: { 
        paddingTop: appleTheme.spacing[12],
        paddingBottom: appleTheme.spacing[12]
      },
      lg: { 
        paddingTop: appleTheme.spacing[16],
        paddingBottom: appleTheme.spacing[16]
      },
      xl: { 
        paddingTop: appleTheme.spacing[20],
        paddingBottom: appleTheme.spacing[20]
      }
    };

    return paddings[padding] || paddings.default;
  };

  const sectionStyles = {
    width: '100%',
    backgroundColor: background,
    ...getPaddingStyles()
  };

  return (
    <section className={className} style={sectionStyles} {...props}>
      {children}
    </section>
  );
};

// Export all components
export {
  Container,
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  HStack,
  VStack,
  Spacer,
  Divider,
  Section
};

export default {
  Container,
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  HStack,
  VStack,
  Spacer,
  Divider,
  Section
};
