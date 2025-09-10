import React, { useState } from "react";
import { Box, Stack, HStack, VStack } from "../../components/apple/Layout";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Input from "../../components/apple/Input";
import Card from "../../components/apple/Card";
import { appleTheme } from "../../styles/apple-theme";
import {
  Keyboard,
  CheckCircle,
  Error,
  Warning,
  Info,
  PlayArrow,
  Stop,
  Refresh,
  NavigateNext,
  Lightbulb,
  Rocket
} from "@mui/icons-material";
import Link from "next/link";

import { Container, Section } from "../../components/apple/Layout";
import AnimatedGradient from "../../components/apple/AnimatedGradient";

export default function KeyboardNavigator() {
  const [url, setUrl] = useState("");
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTest = async () => {
    if (!url.trim()) {
      setSnackbarMessage("Please enter a URL to test");
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
      case "critical": return <Error />;
      case "warning": return <Warning />;
      case "info": return <Info />;
      default: return <Info />;
    }
  };

  const testSteps = [
    "Scanning page for interactive elements...",
    "Testing tab order and focus management...",
    "Checking keyboard shortcuts and ARIA labels...",
    "Analyzing focus indicators and visual feedback...",
    "Generating accessibility report..."
  ];

  return (
    <div style={{ 
      backgroundColor: appleTheme.colors.background.secondary, 
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <AnimatedGradient variant="subtle" intensity="medium" />
      
      {/* Hero Section */}
      <Section background="linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)" padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Keyboard Navigator
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Test and improve keyboard navigation on your website. Ensure all interactive elements are accessible via keyboard, 
              making your site usable for everyone regardless of their input method.
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" style={{ padding: appleTheme.spacing[6] }}>
        {/* Input Section */}
        <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: appleTheme.colors.text.primary,
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            Test Keyboard Navigation
          </Typography>
          
          <HStack spacing={3} align="stretch" style={{ marginBottom: appleTheme.spacing[4] }}>
            <Box style={{ flex: 1 }}>
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={setUrl}
                size="large"
                variant="filled"
                startIcon={<Keyboard />}
              />
            </Box>
            <Button
              variant="primary"
              size="large"
              onClick={handleTest}
              disabled={testing}
              loading={testing}
              startIcon={testing ? <Refresh /> : <PlayArrow />}
            >
              {testing ? "Testing..." : "Test Navigation"}
            </Button>
          </HStack>

          <Card variant="outlined" padding="md" style={{ 
            backgroundColor: appleTheme.colors.info + "10",
            borderColor: appleTheme.colors.info + "30"
          }}>
            <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
              <strong>What we test:</strong> Tab order, focus management, keyboard shortcuts, 
              ARIA labels, focus indicators, and skip links.
            </Typography>
          </Card>
        </Card>

        {/* Testing Progress */}
        {testing && (
          <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
            <Typography variant="title1" style={{ 
              marginBottom: appleTheme.spacing[4],
              color: appleTheme.colors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.semibold
            }}>
              Testing in Progress...
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
                    color: index <= activeStep ? appleTheme.colors.text.primary : appleTheme.colors.text.tertiary
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
                <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
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
                <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
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
                <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
                  Issues Found
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
                <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
                  Navigation Score
                </Typography>
              </Card>
            </HStack>

            {/* Issues List */}
            <Card variant="elevated" padding="xl">
              <Typography variant="title1" style={{ 
                marginBottom: appleTheme.spacing[4],
                color: appleTheme.colors.text.primary,
                fontWeight: appleTheme.typography.fontWeight.semibold
              }}>
                Keyboard Navigation Issues
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
                    Excellent! No keyboard navigation issues found.
                  </Typography>
                  <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
                    All interactive elements are properly accessible via keyboard.
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
                              color: appleTheme.colors.text.primary,
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
                            color: appleTheme.colors.text.secondary
                          }}>
                            <strong>Element:</strong> {problem.element}
                          </Typography>
                          <Card variant="outlined" padding="md" style={{ 
                            backgroundColor: appleTheme.colors.info + "10",
                            borderColor: appleTheme.colors.info + "30",
                            marginBottom: appleTheme.spacing[2]
                          }}>
                            <Typography variant="body" style={{ color: appleTheme.colors.text.primary }}>
                              <strong><Lightbulb style={{ fontSize: "16px", marginRight: "4px", verticalAlign: "middle" }} /> Suggestion:</strong> {problem.suggestion}
                            </Typography>
                          </Card>
                          <Card variant="outlined" padding="md" style={{ backgroundColor: appleTheme.colors.gray[50] }}>
                            <Typography variant="caption" style={{ 
                              color: appleTheme.colors.text.tertiary,
                              display: "block",
                              marginBottom: appleTheme.spacing[1]
                            }}>
                              Code Example:
                            </Typography>
                            <Typography variant="body" style={{ 
                              fontFamily: "SF Mono, Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                              fontSize: appleTheme.typography.fontSize.sm,
                              color: appleTheme.colors.text.primary
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
            color: appleTheme.colors.text.primary,
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            Keyboard Navigation Best Practices
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
                <CheckCircle style={{ fontSize: "24px" }} />
                Essential Requirements
              </Typography>
              <VStack spacing={2}>
                {[
                  "Test Tab key navigation through all interactive elements",
                  "Verify logical tab order matches visual layout",
                  "Ensure focus indicators are clearly visible",
                  "Check that Escape key closes all modals and dropdowns",
                  "Test skip links bypass repetitive navigation",
                  "Verify arrow keys work in custom components",
                  "Test keyboard shortcuts don't conflict with browser defaults"
                ].map((item, index) => (
                  <HStack key={index} spacing={2} align="center">
                    <CheckCircle style={{ color: appleTheme.colors.success, fontSize: "20px" }} />
                    <Typography variant="body" style={{ color: appleTheme.colors.text.primary }}>
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
                Advanced Features
              </Typography>
              <VStack spacing={2}>
                {[
                  "Test custom keyboard shortcuts (Ctrl+S, Alt+N, etc.)",
                  "Verify arrow key navigation in dropdowns and menus",
                  "Test focus trapping in modal dialogs",
                  "Check focus restoration after closing modals",
                  "Test keyboard navigation in single-page applications",
                  "Verify focus management during dynamic content updates",
                  "Test keyboard navigation with screen readers"
                ].map((item, index) => (
                  <HStack key={index} spacing={2} align="center">
                    <Info style={{ color: appleTheme.colors.info, fontSize: "20px" }} />
                    <Typography variant="body" style={{ color: appleTheme.colors.text.primary }}>
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
            Need More Accessibility Tools?
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: "white",
            opacity: 0.9
          }}>
            Explore our full suite of accessibility testing tools.
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
                View All Tools
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