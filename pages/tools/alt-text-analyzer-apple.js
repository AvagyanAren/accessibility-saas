import React, { useState } from "react";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Card from "../../components/apple/Card";
import Input from "../../components/apple/Input";
import { Container, Box, Flex, Stack, Section, HStack } from "../../components/apple/Layout";
import { appleTheme } from "../../styles/apple-theme";
import { useTheme } from "../../contexts/ThemeContext";
import { Image, Check, XCircle, MagnifyingGlass, CheckCircle, X, WarningCircle, Info } from "phosphor-react";
import { useLanguage } from "../../contexts/LanguageContext";

// Icons
const ImageIcon = () => <Image size={24} weight="regular" />;
const CheckIcon = () => <Check size={16} weight="bold" />;
const ErrorIcon = () => <XCircle size={16} weight="fill" />;
const SearchIcon = () => <MagnifyingGlass size={20} weight="regular" />;

export default function AltTextAnalyzer() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const mockAnalysis = async (url) => {
    // Simulate analysis - in real implementation, this would call an API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      totalImages: 12,
      imagesWithAlt: 8,
      imagesWithoutAlt: 3,
      imagesWithEmptyAlt: 1,
      issues: [
        {
          type: "missing-alt",
          severity: "error",
          message: "Image missing alt attribute",
          element: "<img src='hero.jpg' />",
          suggestion: "Add descriptive alt text: <img src='hero.jpg' alt='Person using laptop at modern desk' />"
        },
        {
          type: "empty-alt",
          severity: "warning",
          message: "Image has empty alt attribute",
          element: "<img src='decoration.png' alt='' />",
          suggestion: "If decorative, use alt='' or add descriptive text"
        },
        {
          type: "generic-alt",
          severity: "warning",
          message: "Generic alt text detected",
          element: "<img src='chart.png' alt='image' />",
          suggestion: "Use specific description: <img src='chart.png' alt='Sales growth chart showing 25% increase' />"
        }
      ],
      score: 75
    };
  };

  const handleAnalysis = async () => {
    if (!url.trim()) return;
    
    setAnalyzing(true);
    setResults(null);
    
    try {
      // Add protocol if missing
      let scanUrl = url.trim();
      if (!scanUrl.startsWith('http://') && !scanUrl.startsWith('https://')) {
        scanUrl = 'https://' + scanUrl;
      }
      
      const analysisResults = await mockAnalysis(scanUrl);
      setResults(analysisResults);
      setSnackbarMessage(t("altTextAnalyzer.successMessage"));
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(t("altTextAnalyzer.errorAnalyzeFailed"));
      setSnackbarOpen(true);
    }
    
    setAnalyzing(false);
  };

  const bestPractices = [
    {
      type: "do",
      text: t("altTextAnalyzer.do1"),
      description: t("altTextAnalyzer.do1Desc")
    },
    {
      type: "do",
      text: t("altTextAnalyzer.do2"),
      description: t("altTextAnalyzer.do2Desc")
    },
    {
      type: "do",
      text: t("altTextAnalyzer.do3"),
      description: t("altTextAnalyzer.do3Desc")
    },
    {
      type: "do",
      text: t("altTextAnalyzer.do4"),
      description: t("altTextAnalyzer.do4Desc")
    },
    {
      type: "dont",
      text: t("altTextAnalyzer.dont1"),
      description: t("altTextAnalyzer.dont1Desc")
    },
    {
      type: "dont",
      text: t("altTextAnalyzer.dont2"),
      description: t("altTextAnalyzer.dont2Desc")
    },
    {
      type: "dont",
      text: t("altTextAnalyzer.dont3"),
      description: t("altTextAnalyzer.dont3Desc")
    },
    {
      type: "dont",
      text: t("altTextAnalyzer.dont4"),
      description: t("altTextAnalyzer.dont4Desc")
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "error": return appleTheme.colors.error;
      case "warning": return appleTheme.colors.warning;
      default: return appleTheme.colors.gray[500];
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "error":
      case "critical":
        return <XCircle size={16} weight="fill" />;
      case "warning":
        return <WarningCircle size={16} weight="fill" />;
      case "info":
        return <Info size={16} weight="fill" />;
      default:
        return <XCircle size={16} weight="fill" />;
    }
  };

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div style={{ 
      backgroundColor: themeColors.background.secondary, 
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Hero Section */}
      <Section background={isDarkMode ? "linear-gradient(135deg, rgba(28, 28, 30, 0.9) 0%, rgba(44, 44, 46, 0.9) 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              {t("altTextAnalyzer.title")}
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              {t("altTextAnalyzer.subtitle")}
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Input Section */}
        <Section padding="lg">
          <Card variant="elevated" padding="large" style={{ marginBottom: appleTheme.spacing[8] }}>
            <Stack spacing={4}>
              <Typography variant="title2">
                {t("altTextAnalyzer.analyzeTitle")}
              </Typography>
              <Typography variant="body" color="secondary">
                {t("altTextAnalyzer.analyzeDesc")}
              </Typography>
              
              <HStack spacing={3} align="center">
                <Box style={{ flex: 1, maxWidth: '600px' }}>
                  <Input
                    label={t("altTextAnalyzer.websiteUrl")}
                    placeholder="https://example.com"
                    value={url}
                    onChange={setUrl}
                    size="large"
                    variant="filled"
                    startIcon={<SearchIcon />}
                  />
                </Box>
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleAnalysis}
                  loading={analyzing}
                  disabled={!url.trim()}
                  startIcon={<ImageIcon />}
                  style={{ height: '54px', flexShrink: 0 }}
                >
                  {analyzing ? t("altTextAnalyzer.analyzing") : t("altTextAnalyzer.analyzeImages")}
                </Button>
              </HStack>
            </Stack>
          </Card>

          {/* Results Section */}
          {results && (
            <Stack spacing={6}>
              {/* Summary Cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: appleTheme.spacing[4]
              }}>
                <Card variant="elevated" padding="large">
                  <Stack spacing={2} align="center">
                    <Typography variant="title1" color="primary" weight="bold">
                      {results.totalImages}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      {t("altTextAnalyzer.totalImages")}
                    </Typography>
                  </Stack>
                </Card>
                
                <Card variant="elevated" padding="large">
                  <Stack spacing={2} align="center">
                    <Typography variant="title1" color="success" weight="bold">
                      {results.imagesWithAlt}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      {t("altTextAnalyzer.withAltText")}
                    </Typography>
                  </Stack>
                </Card>
                
                <Card variant="elevated" padding="large">
                  <Stack spacing={2} align="center">
                    <Typography variant="title1" color="error" weight="bold">
                      {results.imagesWithoutAlt}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      {t("altTextAnalyzer.missingAlt")}
                    </Typography>
                  </Stack>
                </Card>
                
                <Card variant="elevated" padding="large">
                  <Stack spacing={2} align="center">
                    <Typography variant="title1" color="warning" weight="bold">
                      {results.imagesWithEmptyAlt}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      {t("altTextAnalyzer.emptyAlt")}
                    </Typography>
                  </Stack>
                </Card>
              </div>

              {/* Issues List */}
              {results.issues.length > 0 && (
                <Card variant="outlined" padding="large">
                  <Stack spacing={4}>
                    <Typography variant="title3">
                      {t("altTextAnalyzer.issuesFound")} ({results.issues.length})
                    </Typography>
                    
                    <Stack spacing={3}>
                      {results.issues.map((issue, index) => (
                        <Card key={index} variant="filled" padding="large">
                          <Stack spacing={3}>
                            <Flex align="flex-start" gap={3}>
                              <Box style={{ 
                                color: getSeverityColor(issue.severity),
                                flexShrink: 0,
                                marginTop: appleTheme.spacing[0.5]
                              }}>
                                {getSeverityIcon(issue.severity)}
                              </Box>
                              <Box style={{ flex: 1 }}>
                                <Typography variant="callout" weight="semibold" style={{ marginBottom: appleTheme.spacing[1] }}>
                                  {issue.message}
                                </Typography>
                                <Typography variant="footnote" color="secondary" style={{ marginBottom: appleTheme.spacing[2] }}>
                                  {issue.suggestion}
                                </Typography>
                                
                                <Box style={{
                                  backgroundColor: appleTheme.colors.gray[50],
                                  padding: appleTheme.spacing[2],
                                  borderRadius: appleTheme.borderRadius.sm,
                                  fontFamily: appleTheme.typography.fontFamily.mono,
                                  fontSize: appleTheme.typography.fontSize.sm,
                                  color: themeColors.text.secondary,
                                  overflowX: "auto"
                                }}>
                                  <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                                    {issue.element}
                                  </pre>
                                </Box>
                              </Box>
                            </Flex>
                          </Stack>
                        </Card>
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              )}
            </Stack>
          )}

          {/* Best Practices */}
          <Card variant="elevated" padding="large" style={{ marginTop: appleTheme.spacing[8] }}>
            <Stack spacing={6}>
              <Typography variant="title2">
                {t("altTextAnalyzer.bestPracticesTitle")}
              </Typography>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: appleTheme.spacing[4]
              }}>
                <Box>
                  <Typography variant="callout" weight="semibold" color="success" style={{ 
                    marginBottom: appleTheme.spacing[3],
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <CheckCircle size={20} weight="fill" />
                    {t("altTextAnalyzer.dos")}
                  </Typography>
                  <Stack spacing={2}>
                    {bestPractices.filter(p => p.type === "do").map((practice, index) => (
                      <Flex key={index} align="flex-start" gap={2}>
                        <CheckIcon style={{ color: isDarkMode ? '#30D158' : appleTheme.colors.success, flexShrink: 0, marginTop: appleTheme.spacing[0.5] }} />
                        <Box>
                          <Typography variant="footnote" weight="medium">
                            {practice.text}
                          </Typography>
                          <Typography variant="caption1" color="tertiary">
                            {practice.description}
                          </Typography>
                        </Box>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
                
                <Box>
                  <Typography variant="callout" weight="semibold" color="error" style={{ 
                    marginBottom: appleTheme.spacing[3],
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <X size={20} weight="bold" />
                    {t("altTextAnalyzer.donts")}
                  </Typography>
                  <Stack spacing={2}>
                    {bestPractices.filter(p => p.type === "dont").map((practice, index) => (
                      <Flex key={index} align="flex-start" gap={2}>
                        <ErrorIcon style={{ color: appleTheme.colors.error, flexShrink: 0, marginTop: appleTheme.spacing[0.5] }} />
                        <Box>
                          <Typography variant="footnote" weight="medium">
                            {practice.text}
                          </Typography>
                          <Typography variant="caption1" color="tertiary">
                            {practice.description}
                          </Typography>
                        </Box>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
              </div>
            </Stack>
          </Card>
        </Section>
      </Container>

      {/* Snackbar for notifications */}
      {snackbarOpen && (
        <Box style={{
          position: "fixed",
          bottom: appleTheme.spacing[6],
          right: appleTheme.spacing[6],
          backgroundColor: appleTheme.colors.success,
          color: "white",
          padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
          borderRadius: appleTheme.borderRadius.md,
          boxShadow: appleTheme.shadows.lg,
          zIndex: 1000
        }}>
          <Typography variant="footnote" color="white">
            {snackbarMessage}
          </Typography>
        </Box>
      )}
    </div>
  );
}
