import React, { useState } from "react";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Card from "../../components/apple/Card";
import Input from "../../components/apple/Input";
import { Container, Box, Flex, Stack, Section, HStack } from "../../components/apple/Layout";
import { appleTheme } from "../../styles/apple-theme";

// Icons
const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
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

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

export default function AltTextAnalyzer() {
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
      setSnackbarMessage("Alt text analysis completed successfully");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error analyzing images. Please try again.");
      setSnackbarOpen(true);
    }
    
    setAnalyzing(false);
  };

  const bestPractices = [
    {
      type: "do",
      text: "Be descriptive and specific",
      description: "Describe what's in the image, not just that it's an image"
    },
    {
      type: "do",
      text: "Keep it concise (under 125 characters)",
      description: "Screen readers read alt text in full, so keep it brief"
    },
    {
      type: "do",
      text: "Use alt='' for decorative images",
      description: "Empty alt text tells screen readers to skip decorative images"
    },
    {
      type: "do",
      text: "Include text that appears in the image",
      description: "If the image contains text, include it in the alt text"
    },
    {
      type: "dont",
      text: "Use generic text like 'image' or 'photo'",
      description: "This provides no useful information to screen reader users"
    },
    {
      type: "dont",
      text: "Start with 'Image of' or 'Picture of'",
      description: "Screen readers already announce it's an image"
    },
    {
      type: "dont",
      text: "Repeat the filename",
      description: "Filenames are usually not descriptive or meaningful"
    },
    {
      type: "dont",
      text: "Leave alt text empty for meaningful images",
      description: "This makes important content inaccessible"
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
    return severity === "error" ? <ErrorIcon /> : <ErrorIcon />;
  };

  return (
    <div style={{ backgroundColor: appleTheme.colors.background.secondary, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Section background="linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)" padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[4],
              color: "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Alt Text Analyzer
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Analyze and improve alt text for images on your website to ensure accessibility for screen readers.
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
                Analyze Website Images
              </Typography>
              <Typography variant="body" color="secondary">
                Enter a website URL to analyze all images for proper alt text implementation.
              </Typography>
              
              <HStack spacing={3} align="flex-end">
                <Box style={{ flex: 1 }}>
                  <Input
                    label="Website URL"
                    placeholder="https://example.com"
                    value={url}
                    onChange={setUrl}
                    size="large"
                    startIcon={<SearchIcon />}
                  />
                </Box>
                <Button
                  variant="primary"
                  onClick={handleAnalysis}
                  loading={analyzing}
                  disabled={!url.trim()}
                  startIcon={<ImageIcon />}
                >
                  {analyzing ? "Analyzing..." : "Analyze Images"}
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
                      Total Images
                    </Typography>
                  </Stack>
                </Card>
                
                <Card variant="elevated" padding="large">
                  <Stack spacing={2} align="center">
                    <Typography variant="title1" color="success" weight="bold">
                      {results.imagesWithAlt}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      With Alt Text
                    </Typography>
                  </Stack>
                </Card>
                
                <Card variant="elevated" padding="large">
                  <Stack spacing={2} align="center">
                    <Typography variant="title1" color="error" weight="bold">
                      {results.imagesWithoutAlt}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      Missing Alt
                    </Typography>
                  </Stack>
                </Card>
                
                <Card variant="elevated" padding="large">
                  <Stack spacing={2} align="center">
                    <Typography variant="title1" color="warning" weight="bold">
                      {results.imagesWithEmptyAlt}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      Empty Alt
                    </Typography>
                  </Stack>
                </Card>
              </div>

              {/* Issues List */}
              {results.issues.length > 0 && (
                <Card variant="outlined" padding="large">
                  <Stack spacing={4}>
                    <Typography variant="title3">
                      Issues Found ({results.issues.length})
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
                                  color: appleTheme.colors.text.secondary,
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
                Alt Text Best Practices
              </Typography>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: appleTheme.spacing[4]
              }}>
                <Box>
                  <Typography variant="callout" weight="semibold" color="success" style={{ marginBottom: appleTheme.spacing[3] }}>
                    ✅ Do's
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
                  <Typography variant="callout" weight="semibold" color="error" style={{ marginBottom: appleTheme.spacing[3] }}>
                    ❌ Don'ts
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
