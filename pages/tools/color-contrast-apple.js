import React, { useState } from "react";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Card from "../../components/apple/Card";
import Input from "../../components/apple/Input";
import { Container, Box, Flex, Stack, Section, HStack } from "../../components/apple/Layout";
import { appleTheme } from "../../styles/apple-theme";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

// Iconsa
const ContrastIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,4 23,10 17,10"/>
    <polyline points="1,20 1,14 7,14"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
  </svg>
);

export default function ColorContrastChecker() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
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
  const checkCompliance = (fg, bg) => {
    const ratio = getContrastRatio(fg, bg);
    setContrastRatio(ratio);
    
    // WCAG AA: 4.5:1 for normal text, 3:1 for large text
    // WCAG AAA: 7:1 for normal text, 4.5:1 for large text
    setAaCompliant(ratio >= 4.5);
    setAaaCompliant(ratio >= 7);
    setAaLargeCompliant(ratio >= 3);
  };

  const handleForegroundChange = (color) => {
    setForeground(color);
    checkCompliance(color, background);
  };

  const handleBackgroundChange = (color) => {
    setBackground(color);
    checkCompliance(foreground, color);
  };

  const randomizeColors = () => {
    const randomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
    const newFg = randomColor();
    const newBg = randomColor();
    setForeground(newFg);
    setBackground(newBg);
    checkCompliance(newFg, newBg);
  };

  const getComplianceColor = (compliant) => {
    return compliant ? appleTheme.colors.success : appleTheme.colors.error;
  };

  const getComplianceIcon = (compliant) => {
    return compliant ? <CheckIcon style={{ color: isDarkMode ? '#30D158' : appleTheme.colors.success }} /> : <ErrorIcon style={{ color: isDarkMode ? '#FF453A' : appleTheme.colors.error }} />;
  };

  return (
    <div style={{ backgroundColor: appleTheme.colors.background.secondary, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Section background="linear-gradient(135deg, #007AFF 0%, #5856D6 100%)" padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center", color: "white" }}>
            <Typography variant="display" color="white" style={{ marginBottom: appleTheme.spacing[4] }}>
              {t("colorContrastChecker.title")}
            </Typography>
            <Typography variant="headline" color="white" weight="regular" style={{ 
              opacity: 0.9,
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`
            }}>
              {t("colorContrastChecker.subtitle")}
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Color Input Section */}
        <Section padding="lg">
          <Card variant="elevated" padding="large" style={{ marginBottom: appleTheme.spacing[8] }}>
            <Stack spacing={6}>
              <Typography variant="title2">
                {t("colorContrastChecker.chooseColors")}
              </Typography>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: appleTheme.spacing[6]
              }}>
                <Box>
                  <Input
                    label={t("colorContrastChecker.foregroundColor")}
                    type="color"
                    value={foreground}
                    onChange={handleForegroundChange}
                    size="large"
                  />
                </Box>
                <Box>
                  <Input
                    label={t("colorContrastChecker.backgroundColor")}
                    type="color"
                    value={background}
                    onChange={handleBackgroundChange}
                    size="large"
                  />
                </Box>
              </div>
              
              <HStack justify="center">
                <Button
                  variant="outline"
                  onClick={randomizeColors}
                  startIcon={<RefreshIcon />}
                >
                  {t("colorContrastChecker.randomizeColors")}
                </Button>
              </HStack>
            </Stack>
          </Card>

          {/* Preview Section */}
          <Card variant="outlined" padding="large" style={{ marginBottom: appleTheme.spacing[8] }}>
            <Stack spacing={4}>
              <Typography variant="title3">
                {t("colorContrastChecker.preview")}
              </Typography>
              
              <Box style={{
                backgroundColor: background,
                padding: appleTheme.spacing[8],
                borderRadius: appleTheme.borderRadius.lg,
                textAlign: "center",
                border: `2px solid ${appleTheme.colors.gray[200]}`
              }}>
                <Typography 
                  variant="title1" 
                  style={{ 
                    color: foreground,
                    fontWeight: appleTheme.typography.fontWeight.bold
                  }}
                >
                  {t("colorContrastChecker.sampleText")}
                </Typography>
                <Typography 
                  variant="body" 
                  style={{ 
                    color: foreground,
                    marginTop: appleTheme.spacing[2]
                  }}
                >
                  {t("colorContrastChecker.previewDescription")}
                </Typography>
              </Box>
            </Stack>
          </Card>

          {/* Results Section */}
          <Card variant="elevated" padding="large">
            <Stack spacing={6}>
              <Typography variant="title2">
                {t("colorContrastChecker.contrastAnalysis")}
              </Typography>
              
              {/* Contrast Ratio */}
              <Box style={{ textAlign: "center" }}>
                <Typography variant="display" color="primary" weight="bold" style={{ marginBottom: appleTheme.spacing[2] }}>
                  {contrastRatio.toFixed(2)}:1
                </Typography>
                <Typography variant="body" color="secondary">
                  {t("colorContrastChecker.contrastRatio")}
                </Typography>
              </Box>
              
              {/* Compliance Checks */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: appleTheme.spacing[4]
              }}>
                <Card variant="outlined" padding="large">
                  <Stack spacing={3} align="center">
                    <Flex align="center" gap={2}>
                      {getComplianceIcon(aaCompliant)}
                      <Typography variant="callout" weight="semibold" color={getComplianceColor(aaCompliant)}>
                        {t("colorContrastChecker.wcagAA")}
                      </Typography>
                    </Flex>
                    <Typography variant="footnote" color="secondary" align="center">
                      {t("colorContrastChecker.normalText")} (4.5:1 minimum)
                    </Typography>
                    <Typography variant="caption1" color={getComplianceColor(aaCompliant)} weight="semibold">
                      {aaCompliant ? t("colorContrastChecker.pass") : t("colorContrastChecker.fail")}
                    </Typography>
                  </Stack>
                </Card>
                
                <Card variant="outlined" padding="large">
                  <Stack spacing={3} align="center">
                    <Flex align="center" gap={2}>
                      {getComplianceIcon(aaaCompliant)}
                      <Typography variant="callout" weight="semibold" color={getComplianceColor(aaaCompliant)}>
                        {t("colorContrastChecker.wcagAAA")}
                      </Typography>
                    </Flex>
                    <Typography variant="footnote" color="secondary" align="center">
                      {t("colorContrastChecker.normalText")} (7:1 minimum)
                    </Typography>
                    <Typography variant="caption1" color={getComplianceColor(aaaCompliant)} weight="semibold">
                      {aaaCompliant ? t("colorContrastChecker.pass") : t("colorContrastChecker.fail")}
                    </Typography>
                  </Stack>
                </Card>
                
                <Card variant="outlined" padding="large">
                  <Stack spacing={3} align="center">
                    <Flex align="center" gap={2}>
                      {getComplianceIcon(aaLargeCompliant)}
                      <Typography variant="callout" weight="semibold" color={getComplianceColor(aaLargeCompliant)}>
                        {t("colorContrastChecker.wcagAALarge")}
                      </Typography>
                    </Flex>
                    <Typography variant="footnote" color="secondary" align="center">
                      {t("colorContrastChecker.largeText")} (3:1 minimum)
                    </Typography>
                    <Typography variant="caption1" color={getComplianceColor(aaLargeCompliant)} weight="semibold">
                      {aaLargeCompliant ? t("colorContrastChecker.pass") : t("colorContrastChecker.fail")}
                    </Typography>
                  </Stack>
                </Card>
              </div>
            </Stack>
          </Card>
        </Section>
      </Container>
    </div>
  );
}
