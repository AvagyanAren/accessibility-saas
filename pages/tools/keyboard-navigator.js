import React, { useState } from "react";
import { Box, Stack, HStack, VStack } from "../../components/apple/Layout";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Input from "../../components/apple/Input";
import Card from "../../components/apple/Card";
import { appleTheme } from "../../styles/apple-theme";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Keyboard,
  CheckCircle,
  XCircle,
  WarningCircle,
  Info,
  Play,
  Stop,
  ArrowsClockwise,
  CaretRight,
  Lightbulb,
  Rocket
} from "phosphor-react";
import Link from "next/link";

import { Container, Section } from "../../components/apple/Layout";
import { useLanguage } from "../../contexts/LanguageContext";

export default function KeyboardNavigator() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTest = async () => {
    if (!url.trim()) {
      setSnackbarMessage(t("keyboardNavigator.errorEnterUrl"));
      setSnackbarOpen(true);
      return;
    }

    setTesting(true);
    setActiveStep(0);
    try {
      // Simulate testing steps
      const steps = [
        "Scanning page for interactive elements...",
        "Testing tab order and focus management...",
        "Checking keyboard shortcuts and ARIA labels...",
        "Analyzing focus indicators and visual feedback...",
        "Generating accessibility report..."
      ];

      for (let i = 0; i < steps.length; i++) {
        setActiveStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      const mockResults = {
        totalElements: 24,
        keyboardAccessible: 18,
        issues: 6,
        score: 75,
        problems: [
          {
            type: "focus-trap",
            severity: "critical",
            element: "Modal dialog",
            description: "Modal cannot be closed with Escape key",
            suggestion: "Add onKeyDown handler for Escape key to close modal",
            code: "onKeyDown={(e) => e.key === 'Escape' && handleClose()}"
          },
          {
            type: "tab-order",
            severity: "warning",
            element: "Navigation menu",
            description: "Tab order skips important navigation items",
            suggestion: "Reorder elements or use tabIndex to fix tab sequence",
            code: "tabIndex={0} // for programmatically focused elements"
          },
          {
            type: "focus-indicator",
            severity: "warning",
            element: "Button group",
            description: "Focus indicators are not visible enough",
            suggestion: "Enhance focus outline with better contrast and visibility",
            code: "outline: 2px solid #0077b6; outline-offset: 2px;"
          },
          {
            type: "keyboard-shortcuts",
            severity: "info",
            element: "Search input",
            description: "No keyboard shortcuts for common actions",
            suggestion: "Add Ctrl+K shortcut for search focus",
            code: "onKeyDown={(e) => e.ctrlKey && e.key === 'k' && focus()}"
          },
          {
            type: "aria-labels",
            severity: "warning",
            element: "Icon buttons",
            description: "Icon buttons missing accessible labels",
            suggestion: "Add aria-label or aria-labelledby attributes",
            code: 'aria-label="Close dialog"'
          },
          {
            type: "skip-links",
            severity: "info",
            element: "Page navigation",
            description: "No skip links for main content",
            suggestion: "Add skip links to bypass navigation",
            code: '<a href="#main" className="skip-link">Skip to main content</a>'
          }
        ]
      };
      
      setResults(mockResults);
    } catch (error) {
      setSnackbarMessage("Error testing keyboard navigation. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setTesting(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return appleTheme.colors.error;
      case "warning": return appleTheme.colors.warning;
      case "info": return appleTheme.colors.info;
      default: return appleTheme.colors.gray[500];
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical": return <XCircle size={16} weight="fill" />;
      case "warning": return <WarningCircle size={16} weight="fill" />;
      case "info": return <Info size={16} weight="fill" />;
      default: return <Info size={16} weight="fill" />;
    }
  };

  const testSteps = [
    "Scanning page for interactive elements...",
    "Testing tab order and focus management...",
    "Checking keyboard shortcuts and ARIA labels...",
    "Analyzing focus indicators and visual feedback...",
    "Generating accessibility report..."
  ];

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
          <Box style={{ textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              {t("keyboardNavigator.title")}
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              {t("keyboardNavigator.subtitle")}
            </Typography>
            
            {/* Input and Button Section */}
            <HStack spacing={3} align="center" style={{ 
              marginBottom: appleTheme.spacing[4],
              width: '100%',
              maxWidth: '800px',
              justifyContent: 'center'
            }}>
              <Box style={{ flex: 1, maxWidth: '600px' }}>
                <Input
                  placeholder="https://example.com"
                  value={url}
                  onChange={setUrl}
                  size="large"
                  variant="filled"
                  startIcon={<Keyboard size={20} weight="regular" />}
                />
              </Box>
              <Button
                variant="primary"
                size="large"
                onClick={handleTest}
                disabled={testing}
                loading={testing}
                startIcon={testing ? <ArrowsClockwise size={16} weight="regular" /> : <Play size={16} weight="fill" />}
                style={{ 
                  height: '54px', 
                  flexShrink: 0,
                  minWidth: '140px'
                }}
              >
                {testing ? t("keyboardNavigator.testing") : t("keyboardNavigator.testButton")}
              </Button>
            </HStack>

            {/* What we test card */}
            <Card variant="outlined" padding="md" style={{ 
              backgroundColor: isDarkMode ? themeColors.background.tertiary : '#F5F5F7',
              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#E5E5EA'}`,
              borderRadius: appleTheme.borderRadius.lg,
              boxShadow: isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: '800px',
              textAlign: 'left'
            }}>
              <Typography variant="body" style={{ 
                color: themeColors.text.secondary,
                fontSize: appleTheme.typography.fontSize.base,
                lineHeight: appleTheme.typography.lineHeight.relaxed
              }}>
                <strong>{t("keyboardNavigator.whatWeTest")}</strong> {t("keyboardNavigator.whatWeTestDesc")}
              </Typography>
            </Card>
          </Box>
        </Container>
      </Section>

      <Container size="lg" style={{ padding: appleTheme.spacing[6] }}>

        {/* Testing Progress */}
        {testing && (
          <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
            <Typography variant="title1" style={{ 
              marginBottom: appleTheme.spacing[4],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.semibold
            }}>
              {t("keyboardNavigator.testingInProgress")}
            </Typography>
            <VStack spacing={3}>
              {testSteps.map((step, index) => (
                <HStack key={index} spacing={3} align="center">
                  <Box style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: index <= activeStep ? appleTheme.colors.primary[500] : appleTheme.colors.gray[300],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {index < activeStep ? "✓" : index + 1}
                  </Box>
                  <Typography variant="body" style={{ 
                    color: index <= activeStep ? themeColors.text.primary : themeColors.text.tertiary
                  }}>
                    {step}
                  </Typography>
                </HStack>
              ))}
            </VStack>
          </Card>
        )}

        {/* Results Section */}
        {results && (
          <Box style={{ marginBottom: appleTheme.spacing[6] }}>
            {/* Summary Cards */}
            <HStack spacing={4} wrap="wrap" style={{ marginBottom: appleTheme.spacing[6] }}>
              <Card variant="elevated" padding="lg" style={{ flex: 1, minWidth: "200px", textAlign: "center" }}>
                <Typography variant="title1" style={{ 
                  color: appleTheme.colors.primary[500],
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  marginBottom: appleTheme.spacing[2]
                }}>
                  {results.totalElements}
                </Typography>
                <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                  Interactive Elements
                </Typography>
              </Card>
              <Card variant="elevated" padding="lg" style={{ flex: 1, minWidth: "200px", textAlign: "center" }}>
                <Typography variant="title1" style={{ 
                  color: appleTheme.colors.success,
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  marginBottom: appleTheme.spacing[2]
                }}>
                  {results.keyboardAccessible}
                </Typography>
                <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                  Keyboard Accessible
                </Typography>
              </Card>
              <Card variant="elevated" padding="lg" style={{ flex: 1, minWidth: "200px", textAlign: "center" }}>
                <Typography variant="title1" style={{ 
                  color: appleTheme.colors.error,
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  marginBottom: appleTheme.spacing[2]
                }}>
                  {results.issues}
                </Typography>
                <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                  {t("keyboardNavigator.issuesFound")}
                </Typography>
              </Card>
              <Card variant="elevated" padding="lg" style={{ flex: 1, minWidth: "200px", textAlign: "center" }}>
                <Typography variant="title1" style={{ 
                  color: appleTheme.colors.warning,
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  marginBottom: appleTheme.spacing[2]
                }}>
                  {results.score}%
                </Typography>
                <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                  {t("keyboardNavigator.navigationScore")}
                </Typography>
              </Card>
            </HStack>

            {/* Issues List */}
            <Card variant="elevated" padding="xl">
              <Typography variant="title1" style={{ 
                marginBottom: appleTheme.spacing[4],
                color: themeColors.text.primary,
                fontWeight: appleTheme.typography.fontWeight.semibold
              }}>
                {t("keyboardNavigator.keyboardNavigationIssues")}
              </Typography>
              
              {results.problems.length === 0 ? (
                <Card variant="outlined" padding="lg" style={{ 
                  backgroundColor: appleTheme.colors.success + "10",
                  borderColor: appleTheme.colors.success + "30"
                }}>
                  <Typography variant="title2" style={{ 
                    color: appleTheme.colors.success,
                    marginBottom: appleTheme.spacing[2],
                    fontWeight: appleTheme.typography.fontWeight.semibold
                  }}>
                    {t("keyboardNavigator.excellent")}
                  </Typography>
                  <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                    {t("keyboardNavigator.excellentDesc")}
                  </Typography>
                </Card>
              ) : (
                <VStack spacing={4}>
                  {results.problems.map((problem, index) => (
                    <Card key={index} variant="outlined" padding="lg">
                      <HStack spacing={3} align="flex-start">
                        <Box style={{ color: getSeverityColor(problem.severity), marginTop: appleTheme.spacing[1] }}>
                          {getSeverityIcon(problem.severity)}
                        </Box>
                        <Box style={{ flex: 1 }}>
                          <HStack spacing={2} align="center" style={{ marginBottom: appleTheme.spacing[2] }}>
                            <Typography variant="title2" style={{ 
                              color: themeColors.text.primary,
                              fontWeight: appleTheme.typography.fontWeight.semibold
                            }}>
                              {problem.description}
                            </Typography>
                            <Box style={{
                              padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                              backgroundColor: getSeverityColor(problem.severity),
                              color: "white",
                              borderRadius: appleTheme.borderRadius.base,
                              fontSize: appleTheme.typography.fontSize.xs,
                              fontWeight: appleTheme.typography.fontWeight.semibold
                            }}>
                              {problem.severity.toUpperCase()}
                            </Box>
                          </HStack>
                          <Typography variant="body" style={{ 
                            marginBottom: appleTheme.spacing[2],
                            color: themeColors.text.secondary
                          }}>
                            <strong>Element:</strong> {problem.element}
                          </Typography>
                          <Card variant="outlined" padding="md" style={{ 
                            backgroundColor: appleTheme.colors.info + "10",
                            borderColor: appleTheme.colors.info + "30",
                            marginBottom: appleTheme.spacing[2]
                          }}>
                            <Typography variant="body" style={{ color: themeColors.text.primary }}>
                              <strong><Lightbulb size={16} weight="fill" style={{ marginRight: "4px", verticalAlign: "middle" }} /> Suggestion:</strong> {problem.suggestion}
                            </Typography>
                          </Card>
                          <Card variant="outlined" padding="md" style={{ backgroundColor: appleTheme.colors.gray[50] }}>
                            <Typography variant="caption" style={{ 
                              color: themeColors.text.tertiary,
                              display: "block",
                              marginBottom: appleTheme.spacing[1]
                            }}>
                              Code Example:
                            </Typography>
                            <Typography variant="body" style={{ 
                              fontFamily: "SF Mono, Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                              fontSize: appleTheme.typography.fontSize.sm,
                              color: themeColors.text.primary
                            }}>
                              {problem.code}
                            </Typography>
                          </Card>
                        </Box>
                      </HStack>
                    </Card>
                  ))}
                </VStack>
              )}
            </Card>
          </Box>
        )}

        {/* Best Practices */}
        <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: themeColors.text.primary,
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            {t("keyboardNavigator.bestPracticesTitle")}
          </Typography>
          
          <HStack spacing={6} align="flex-start" wrap="wrap">
            <Box style={{ flex: 1, minWidth: "300px" }}>
              <Typography variant="title2" style={{ 
                marginBottom: appleTheme.spacing[3],
                color: appleTheme.colors.success,
                fontWeight: appleTheme.typography.fontWeight.semibold,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <CheckCircle size={24} weight="fill" />
                {t("keyboardNavigator.essentialRequirements")}
              </Typography>
              <VStack spacing={2}>
                {[
                  t("keyboardNavigator.essentialItem1"),
                  t("keyboardNavigator.essentialItem2"),
                  t("keyboardNavigator.essentialItem3"),
                  t("keyboardNavigator.essentialItem4"),
                  t("keyboardNavigator.essentialItem5"),
                  t("keyboardNavigator.essentialItem6"),
                  t("keyboardNavigator.essentialItem7")
                ].map((item, index) => (
                  <HStack key={index} spacing={2} align="center">
                    <CheckCircle size={20} weight="fill" color={appleTheme.colors.success} />
                    <Typography variant="body" style={{ color: themeColors.text.primary }}>
                      {item}
                    </Typography>
                  </HStack>
                ))}
              </VStack>
            </Box>
            
            <Box style={{ flex: 1, minWidth: "300px" }}>
              <Typography variant="title2" style={{ 
                marginBottom: appleTheme.spacing[3],
                color: appleTheme.colors.info,
                fontWeight: appleTheme.typography.fontWeight.semibold,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Rocket style={{ fontSize: "24px" }} />
                {t("keyboardNavigator.advancedFeatures")}
              </Typography>
              <VStack spacing={2}>
                {[
                  t("keyboardNavigator.advancedItem1"),
                  t("keyboardNavigator.advancedItem2"),
                  t("keyboardNavigator.advancedItem3"),
                  t("keyboardNavigator.advancedItem4"),
                  t("keyboardNavigator.advancedItem5"),
                  t("keyboardNavigator.advancedItem6"),
                  t("keyboardNavigator.advancedItem7")
                ].map((item, index) => (
                  <HStack key={index} spacing={2} align="center">
                    <Info style={{ color: appleTheme.colors.info, fontSize: "20px" }} />
                    <Typography variant="body" style={{ color: themeColors.text.primary }}>
                      {item}
                    </Typography>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </HStack>
        </Card>

        {/* CTA */}
        <Card variant="elevated" padding="xl" style={{ 
          background: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
          textAlign: "center"
        }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[3],
            color: "white",
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            {t("keyboardNavigator.needMoreTools")}
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: "white",
            opacity: 0.9
          }}>
            {t("keyboardNavigator.needMoreToolsDesc")}
          </Typography>
          <Link href="/tools" passHref legacyBehavior>
            <a style={{ textDecoration: "none" }}>
              <Button
                variant="secondary"
                size="large"
                style={{
                  backgroundColor: "white",
                  color: "#007AFF",
                  fontWeight: appleTheme.typography.fontWeight.semibold
                }}
              >
                {t("keyboardNavigator.viewAllTools")}
              </Button>
            </a>
          </Link>
        </Card>
      </Container>

      {/* Snackbar */}
      {snackbarOpen && (
        <Box style={{
          position: "fixed",
          bottom: appleTheme.spacing[6],
          right: appleTheme.spacing[6],
          backgroundColor: appleTheme.colors.error,
          color: "white",
          padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
          borderRadius: appleTheme.borderRadius.md,
          boxShadow: appleTheme.shadows.lg,
          zIndex: 1000
        }}>
          <Typography variant="footnote" style={{ color: "white" }}>
            {snackbarMessage}
          </Typography>
        </Box>
      )}
    </div>
  );
}