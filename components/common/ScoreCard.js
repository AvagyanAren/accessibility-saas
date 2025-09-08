import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { getScoreColor } from '../../utils/accessibilityUtils';

export default function ScoreCard({ 
  title, 
  score, 
  maxScore = 100, 
  subtitle, 
  icon, 
  color,
  size = "medium" 
}) {
  const scoreColor = color || getScoreColor(score);
  const percentage = Math.round((score / maxScore) * 100);
  
  const sizeConfig = {
    small: { 
      cardPadding: 2, 
      titleVariant: "h6", 
      scoreVariant: "h5",
      iconSize: 24 
    },
    medium: { 
      cardPadding: 2, 
      titleVariant: "h6", 
      scoreVariant: "h4",
      iconSize: 32 
    },
    large: { 
      cardPadding: 3, 
      titleVariant: "h5", 
      scoreVariant: "h3",
      iconSize: 40 
    }
  };
  
  const config = sizeConfig[size];
  
  return (
    <Card sx={{ 
      textAlign: "center", 
      p: config.cardPadding,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <CardContent>
        {icon && (
          <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
            {React.cloneElement(icon, { 
              sx: { 
                fontSize: config.iconSize, 
                color: scoreColor 
              } 
            })}
          </Box>
        )}
        <Typography 
          variant={config.scoreVariant} 
          sx={{ 
            fontWeight: 700, 
            color: scoreColor, 
            mb: 0.5 
          }}
        >
          {score}
          {maxScore !== 100 && `/${maxScore}`}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 0.5 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            {subtitle}
          </Typography>
        )}
        {maxScore === 100 && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: scoreColor,
              fontWeight: 600,
              fontSize: "0.75rem"
            }}
          >
            {percentage}%
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
