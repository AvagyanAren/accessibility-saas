import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function ToolCTA({
  title = "Need More Accessibility Tools?",
  subtitle = "Explore our full suite of accessibility testing tools.",
  primaryButtonText = "View All Tools",
  primaryButtonHref = "/tools",
  secondaryButtonText,
  secondaryButtonHref,
  onPrimaryClick,
  onSecondaryClick
}) {
  return (
    <Paper sx={{ 
      p: 4, 
      textAlign: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      mt: 4
    }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
        {subtitle}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
        <Button
          component={primaryButtonHref ? Link : "button"}
          href={primaryButtonHref}
          onClick={onPrimaryClick}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "white",
            color: "#667eea",
            fontWeight: 600,
            px: 4,
            "&:hover": {
              backgroundColor: "#f8f9fa"
            }
          }}
        >
          {primaryButtonText}
        </Button>
        {secondaryButtonText && (
          <Button
            component={secondaryButtonHref ? Link : "button"}
            href={secondaryButtonHref}
            onClick={onSecondaryClick}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "white",
              color: "white",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)"
              }
            }}
          >
            {secondaryButtonText}
          </Button>
        )}
      </Box>
    </Paper>
  );
}
