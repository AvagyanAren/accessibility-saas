import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Play } from 'phosphor-react';
import Link from 'next/link';

export default function ToolHeader({ 
  title, 
  subtitle, 
  description,
  icon,
  onAction,
  actionText = "Start Analysis",
  actionIcon = <Play size={20} weight="fill" />,
  actionLoading = false,
  showBackButton = true
}) {
  return (
    <Box sx={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      py: { xs: 6, sm: 8 },
      textAlign: "center"
    }}>
      <Box sx={{ maxWidth: "800px", mx: "auto", px: 2 }}>
        {showBackButton && (
          <Button
            component={Link}
            href="/tools"
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              mb: 3,
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)"
              }
            }}
          >
            ← Back to Tools
          </Button>
        )}
        
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
          {icon && (
            <Box sx={{ mr: 2, fontSize: "48px" }}>
              {icon}
            </Box>
          )}
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            fontSize: { xs: "28px", sm: "36px" }
          }}>
            {title}
          </Typography>
        </Box>
        
        {subtitle && (
          <Typography variant="h6" sx={{ 
            opacity: 0.9,
            mb: 2,
            fontSize: { xs: "16px", sm: "20px" }
          }}>
            {subtitle}
          </Typography>
        )}
        
        {description && (
          <Typography variant="body1" sx={{ 
            opacity: 0.8,
            mb: 3,
            fontSize: { xs: "14px", sm: "16px" },
            lineHeight: 1.6
          }}>
            {description}
          </Typography>
        )}
        
        {onAction && (
          <Button
            variant="contained"
            onClick={onAction}
            disabled={actionLoading}
            startIcon={actionLoading ? null : actionIcon}
            sx={{
              backgroundColor: "white",
              color: "#667eea",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: "18px",
              "&:hover": {
                backgroundColor: "#f8f9fa",
                transform: "translateY(-2px)"
              }
            }}
          >
            {actionLoading ? "Analyzing..." : actionText}
          </Button>
        )}
      </Box>
    </Box>
  );
}
