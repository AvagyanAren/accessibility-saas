import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  Slider,
  InputAdornment,
} from "@mui/material";
import { Contrast, CheckCircle, Error, Refresh } from "@mui/icons-material";

export default function ColorContrastChecker() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [contrastRatio, setContrastRatio] = useState(21);
  const [aaCompliant, setAaCompliant] = useState(true);
  const [aaaCompliant, setAaaCompliant] = useState(true);
  const [aaLargeCompliant, setAaLargeCompliant] = useState(true);

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (color1, color2) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  // Check compliance
  const checkCompliance = (ratio) => {
    const aa = ratio >= 4.5;
    const aaa = ratio >= 7;
    const aaLarge = ratio >= 3;
    
    return { aa, aaa, aaLarge };
  };

  // Handle color change
  const handleColorChange = (type, color) => {
    if (type === 'foreground') {
      setForeground(color);
    } else {
      setBackground(color);
    }
    
    const ratio = getContrastRatio(
      type === 'foreground' ? color : foreground,
      type === 'background' ? color : background
    );
    
    setContrastRatio(ratio);
    const compliance = checkCompliance(ratio);
    setAaCompliant(compliance.aa);
    setAaaCompliant(compliance.aaa);
    setAaLargeCompliant(compliance.aaLarge);
  };

  // Generate random colors
  const generateRandomColors = () => {
    const randomForeground = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomBackground = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    
    setForeground(randomForeground);
    setBackground(randomBackground);
    
    const ratio = getContrastRatio(randomForeground, randomBackground);
    setContrastRatio(ratio);
    const compliance = checkCompliance(ratio);
    setAaCompliant(compliance.aa);
    setAaaCompliant(compliance.aaa);
    setAaLargeCompliant(compliance.aaLarge);
  };

  const getContrastGrade = (ratio) => {
    if (ratio >= 7) return { grade: "AAA", color: "#28a745" };
    if (ratio >= 4.5) return { grade: "AA", color: "#ffc107" };
    if (ratio >= 3) return { grade: "AA Large", color: "#fd7e14" };
    return { grade: "Fail", color: "#dc3545" };
  };

  const grade = getContrastGrade(contrastRatio);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#e3f2fd", p: 3 }}>
      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        {/* Header */}
        <Paper sx={{ p: 4, mb: 4, textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
            <Contrast sx={{ fontSize: 40, color: "#0077b6", mr: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, color: "#333" }}>
              Color Contrast Checker
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: "#666", mb: 3 }}>
            Test color combinations for WCAG accessibility compliance
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={generateRandomColors}
            sx={{ borderColor: "#0077b6", color: "#0077b6" }}
          >
            Generate Random Colors
          </Button>
        </Paper>

        <Grid container spacing={3}>
          {/* Color Inputs */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Color Input
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                  Foreground Color (Text)
                </Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <TextField
                    fullWidth
                    value={foreground}
                    onChange={(e) => handleColorChange('foreground', e.target.value)}
                    placeholder="#000000"
                    size="small"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">#</InputAdornment>,
                    }}
                  />
                  <Box
                    sx={{
                      width: 50,
                      height: 40,
                      backgroundColor: foreground,
                      border: "1px solid #ccc",
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                  Background Color
                </Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <TextField
                    fullWidth
                    value={background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    placeholder="#ffffff"
                    size="small"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">#</InputAdornment>,
                    }}
                  />
                  <Box
                    sx={{
                      width: 50,
                      height: 40,
                      backgroundColor: background,
                      border: "1px solid #ccc",
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Results */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Contrast Results
              </Typography>
              
              {/* Contrast Ratio */}
              <Box sx={{ mb: 3, textAlign: "center" }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 700, 
                  color: grade.color,
                  mb: 1
                }}>
                  {contrastRatio.toFixed(2)}:1
                </Typography>
                <Chip
                  label={grade.grade}
                  sx={{
                    backgroundColor: grade.color,
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                    px: 2,
                    py: 1
                  }}
                />
              </Box>

              {/* Compliance Status */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  WCAG Compliance
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {aaCompliant ? <CheckCircle sx={{ color: "#28a745", mr: 1 }} /> : <Error sx={{ color: "#dc3545", mr: 1 }} />}
                  <Typography variant="body2" sx={{ color: aaCompliant ? "#28a745" : "#dc3545" }}>
                    AA (4.5:1) - Normal Text
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {aaaCompliant ? <CheckCircle sx={{ color: "#28a745", mr: 1 }} /> : <Error sx={{ color: "#dc3545", mr: 1 }} />}
                  <Typography variant="body2" sx={{ color: aaaCompliant ? "#28a745" : "#dc3545" }}>
                    AAA (7:1) - Enhanced
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {aaLargeCompliant ? <CheckCircle sx={{ color: "#28a745", mr: 1 }} /> : <Error sx={{ color: "#dc3545", mr: 1 }} />}
                  <Typography variant="body2" sx={{ color: aaLargeCompliant ? "#28a745" : "#dc3545" }}>
                    AA Large (3:1) - Large Text
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Preview */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Live Preview
              </Typography>
              
              <Box sx={{ 
                backgroundColor: background, 
                p: 4, 
                borderRadius: 2,
                border: "1px solid #ccc"
              }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: foreground,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Sample Heading Text
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: foreground,
                    fontSize: "16px",
                    lineHeight: 1.5
                  }}
                >
                  This is sample body text to demonstrate how the color combination looks in practice. 
                  The contrast ratio of {contrastRatio.toFixed(2)}:1 {aaCompliant ? 'meets' : 'does not meet'} 
                  WCAG AA standards for normal text.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Tips */}
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                💡 Tips for Better Contrast
              </Typography>
              <Typography variant="body2">
                • Aim for at least 4.5:1 ratio for normal text (AA compliance)<br/>
                • Use 7:1 ratio for enhanced accessibility (AAA compliance)<br/>
                • Large text (18pt+) only needs 3:1 ratio<br/>
                • Test with actual content, not just color swatches
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
