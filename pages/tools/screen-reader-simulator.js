import React, { useState } from "react";
import { Box, Stack, HStack, VStack } from "../../components/apple/Layout";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Input from "../../components/apple/Input";
import Card from "../../components/apple/Card";
import { appleTheme } from "../../styles/apple-theme";
import {
  RecordVoiceOver,
  CheckCircle,
  Error,
  Warning,
  Info,
  PlayArrow,
  Stop,
  VolumeUp,
  ExpandMore,
} from "@mui/icons-material";
import Link from "next/link";

import { Container, Section } from "../../components/apple/Layout";

export default function ScreenReaderSimulator() {
  const [url, setUrl] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSimulate = async () => {
    if (!url.trim()) {
      setSnackbarMessage("Please enter a URL to simulate");
      setSnackbarOpen(true);
      return;
    }

    setSimulating(true);
    try {
      // Simulate screen reader analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResults = {
        overallScore: 82,
        totalElements: 45,
        accessibleElements: 37,
        issueCount: 8,
        screenReaderOutput: [
          "Heading level 1: Welcome to our website",
          "Navigation landmark: Main navigation",
          "Link: Home",
          "Link: About",
          "Link: Services", 
          "Link: Contact",
          "Heading level 2: Our Services",
          "List with 3 items",
          "List item 1: Web Development",
          "List item 2: Mobile Apps",
          "List item 3: Consulting",
          "Button: Learn More",
          "Heading level 2: Contact Us",
          "Form: Contact form",
          "Text field: Name (required)",
          "Text field: Email (required)",
          "Text field: Message (required)",
          "Button: Send Message",
          "Footer landmark: Page footer"
        ],
        issues: [
          {
            type: "missing-alt",
            severity: "critical",
            element: "Hero image",
            description: "Image missing alt text",
            suggestion: "Add descriptive alt text for screen readers",
            code: 'alt="Team working on accessibility project"'
          },
          {
            type: "heading-structure",
            severity: "warning",
            element: "Service cards",
            description: "Heading levels skip from h2 to h4",
            suggestion: "Use proper heading hierarchy (h1, h2, h3, etc.)",
            code: "Change h4 to h3 for proper structure"
          },
          {
            type: "form-labels",
            severity: "warning",
            element: "Contact form",
            description: "Form fields missing proper labels",
            suggestion: "Associate labels with form controls",
            code: '<label htmlFor="email">Email Address</label>'
          },
          {
            type: "button-text",
            severity: "info",
            element: "Social media buttons",
            description: "Icon buttons lack accessible text",
            suggestion: "Add aria-label or visible text",
            code: 'aria-label="Follow us on Twitter"'
          },
          {
            type: "landmarks",
            severity: "info",
            element: "Page structure",
            description: "Missing main landmark",
            suggestion: "Add main landmark for primary content",
            code: '<main role="main">'
          },
          {
            type: "focus-management",
            severity: "warning",
            element: "Modal dialog",
            description: "Focus not trapped in modal",
            suggestion: "Implement focus trap for modal dialogs",
            code: "Use focus-trap-react or similar library"
          },
          {
            type: "live-regions",
            severity: "info",
            element: "Dynamic content",
            description: "No live regions for dynamic updates",
            suggestion: "Add aria-live regions for dynamic content",
            code: '<div aria-live="polite" id="status"></div>'
          },
          {
            type: "color-contrast",
            severity: "warning",
            element: "Call-to-action button",
            description: "Insufficient color contrast ratio",
            suggestion: "Improve color contrast for better visibility",
            code: "background-color: #007AFF; color: white;"
          }
        ],
        recommendations: [
          "Add alt text to all images",
          "Use proper heading hierarchy",
          "Associate labels with form controls",
          "Add ARIA labels to icon buttons",
          "Include landmark roles for page structure",
          "Implement focus management for modals",
          "Add live regions for dynamic content",
          "Ensure sufficient color contrast"
        ]
      };
      
      setResults(mockResults);
    } catch (error) {
      setSnackbarMessage("Error simulating screen reader. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setSimulating(false);
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

  const tabs = [
    { label: "Screen Reader Output", icon: <VolumeUp /> },
    { label: "Issues Found", icon: <Warning /> },
    { label: "Recommendations", icon: <CheckCircle /> }
  ];

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
              Screen Reader Simulator
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Experience your website as screen reader users do. Test accessibility and improve the experience for all users.
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
            Simulate Screen Reader Experience
          </Typography>
          
          <HStack spacing={3} align="stretch" style={{ marginBottom: appleTheme.spacing[4] }}>
            <Box style={{ flex: 1 }}>
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={setUrl}
                size="large"
                variant="filled"
                startIcon={<RecordVoiceOver />}
              />
            </Box>
            <Button
              variant="primary"
              size="large"
              onClick={handleSimulate}
              disabled={simulating}
              loading={simulating}
              startIcon={<PlayArrow />}
            >
              {simulating ? "Simulating..." : "Start Simulation"}
            </Button>
          </HStack>

          <Card variant="outlined" padding="md" style={{ 
            backgroundColor: appleTheme.colors.info + "10",
            borderColor: appleTheme.colors.info + "30"
          }}>
            <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
              <strong>What we simulate:</strong> Screen reader navigation, ARIA announcements, 
              heading structure, form labels, and landmark identification.
            </Typography>
          </Card>
        </Card>

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
                  {results.overallScore}%
                </Typography>
                <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
                  Accessibility Score
                </Typography>
              </Card>
              <Card variant="elevated" padding="lg" style={{ flex: 1, minWidth: "200px", textAlign: "center" }}>
                <Typography variant="title1" style={{ 
                  color: appleTheme.colors.success,
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  marginBottom: appleTheme.spacing[2]
                }}>
                  {results.accessibleElements}
                </Typography>
                <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
                  Accessible Elements
                </Typography>
              </Card>
              <Card variant="elevated" padding="lg" style={{ flex: 1, minWidth: "200px", textAlign: "center" }}>
                <Typography variant="title1" style={{ 
                  color: appleTheme.colors.error,
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  marginBottom: appleTheme.spacing[2]
                }}>
                  {results.issueCount}
                </Typography>
                <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
                  Issues Found
                </Typography>
              </Card>
              <Card variant="elevated" padding="lg" style={{ flex: 1, minWidth: "200px", textAlign: "center" }}>
                <Typography variant="title1" style={{ 
                  color: appleTheme.colors.info,
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  marginBottom: appleTheme.spacing[2]
                }}>
                  {results.totalElements}
                </Typography>
                <Typography variant="body" style={{ color: appleTheme.colors.text.secondary }}>
                  Total Elements
                </Typography>
              </Card>
            </HStack>

            {/* Tab Navigation */}
            <Card variant="elevated" padding="lg" style={{ marginBottom: appleTheme.spacing[4] }}>
              <HStack spacing={2} wrap="wrap">
                {tabs.map((tab, index) => (
                  <Button
                    key={index}
                    variant={activeTab === index ? "primary" : "ghost"}
                    size="medium"
                    onClick={() => setActiveTab(index)}
                    startIcon={tab.icon}
                    style={{
                      backgroundColor: activeTab === index ? appleTheme.colors.primary[500] : "transparent",
                      color: activeTab === index ? "white" : appleTheme.colors.text.primary
                    }}
                  >
                    {tab.label}
                  </Button>
                ))}
              </HStack>
            </Card>

            {/* Tab Content */}
            <Card variant="elevated" padding="xl">
              {activeTab === 0 && (
                <Box>
                  <Typography variant="title1" style={{ 
                    marginBottom: appleTheme.spacing[4],
                    color: appleTheme.colors.text.primary,
                    fontWeight: appleTheme.typography.fontWeight.semibold
                  }}>
                    Screen Reader Output
                  </Typography>
                  <Card variant="outlined" padding="lg" style={{ 
                    backgroundColor: appleTheme.colors.gray[50],
                    fontFamily: "SF Mono, Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"
                  }}>
                    <VStack spacing={1}>
                      {results.screenReaderOutput.map((line, index) => (
                        <Typography key={index} variant="body" style={{ 
                          color: appleTheme.colors.text.primary,
                          fontSize: appleTheme.typography.fontSize.sm,
                          lineHeight: 1.6
                        }}>
                          {line}
                        </Typography>
                      ))}
                    </VStack>
                  </Card>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="title1" style={{ 
                    marginBottom: appleTheme.spacing[4],
                    color: appleTheme.colors.text.primary,
                    fontWeight: appleTheme.typography.fontWeight.semibold
                  }}>
                    Accessibility Issues
                  </Typography>
                  
                  <VStack spacing={4}>
                    {results.issues.map((issue, index) => (
                      <Card key={index} variant="outlined" padding="lg">
                        <HStack spacing={3} align="flex-start">
                          <Box style={{ color: getSeverityColor(issue.severity), marginTop: appleTheme.spacing[1] }}>
                            {getSeverityIcon(issue.severity)}
                          </Box>
                          <Box style={{ flex: 1 }}>
                            <HStack spacing={2} align="center" style={{ marginBottom: appleTheme.spacing[2] }}>
                              <Typography variant="title2" style={{ 
                                color: appleTheme.colors.text.primary,
                                fontWeight: appleTheme.typography.fontWeight.semibold
                              }}>
                                {issue.description}
                              </Typography>
                              <Box style={{
                                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                                backgroundColor: getSeverityColor(issue.severity),
                                color: "white",
                                borderRadius: appleTheme.borderRadius.base,
                                fontSize: appleTheme.typography.fontSize.xs,
                                fontWeight: appleTheme.typography.fontWeight.semibold
                              }}>
                                {issue.severity.toUpperCase()}
                              </Box>
                            </HStack>
                            <Typography variant="body" style={{ 
                              marginBottom: appleTheme.spacing[2],
                              color: appleTheme.colors.text.secondary
                            }}>
                              <strong>Element:</strong> {issue.element}
                            </Typography>
                            <Card variant="outlined" padding="md" style={{ 
                              backgroundColor: appleTheme.colors.info + "10",
                              borderColor: appleTheme.colors.info + "30",
                              marginBottom: appleTheme.spacing[2]
                            }}>
                              <Typography variant="body" style={{ color: appleTheme.colors.text.primary }}>
                                <strong>💡 Suggestion:</strong> {issue.suggestion}
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
                                {issue.code}
                              </Typography>
                            </Card>
                          </Box>
                        </HStack>
                      </Card>
                    ))}
                  </VStack>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="title1" style={{ 
                    marginBottom: appleTheme.spacing[4],
                    color: appleTheme.colors.text.primary,
                    fontWeight: appleTheme.typography.fontWeight.semibold
                  }}>
                    Recommendations
                  </Typography>
                  <VStack spacing={2}>
                    {results.recommendations.map((recommendation, index) => (
                      <HStack key={index} spacing={2} align="center">
                        <CheckCircle style={{ color: appleTheme.colors.success, fontSize: "20px" }} />
                        <Typography variant="body" style={{ color: appleTheme.colors.text.primary }}>
                          {recommendation}
                        </Typography>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
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
            Screen Reader Best Practices
          </Typography>
          
          <HStack spacing={6} align="flex-start" wrap="wrap">
            <Box style={{ flex: 1, minWidth: "300px" }}>
              <Typography variant="title2" style={{ 
                marginBottom: appleTheme.spacing[3],
                color: appleTheme.colors.success,
                fontWeight: appleTheme.typography.fontWeight.semibold
              }}>
                ✅ Essential Requirements
              </Typography>
              <VStack spacing={2}>
                {[
                  "Provide alt text for all images",
                  "Use proper heading hierarchy (h1, h2, h3)",
                  "Associate labels with form controls",
                  "Add ARIA labels to interactive elements",
                  "Include landmark roles for page structure"
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
                fontWeight: appleTheme.typography.fontWeight.semibold
              }}>
                🚀 Advanced Features
              </Typography>
              <VStack spacing={2}>
                {[
                  "Implement live regions for dynamic content",
                  "Use focus management for modals",
                  "Provide skip links for navigation",
                  "Add descriptive link text",
                  "Test with actual screen readers"
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
            Explore our full suite of accessibility testing and simulation tools.
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