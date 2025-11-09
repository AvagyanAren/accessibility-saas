import React, { useState } from "react";
import { Box, Stack, HStack, VStack } from "../../components/apple/Layout";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Input from "../../components/apple/Input";
import Card from "../../components/apple/Card";
import { appleTheme } from "../../styles/apple-theme";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Microphone,
  CheckCircle,
  XCircle,
  WarningCircle,
  Info,
  Play,
  Stop,
  SpeakerHigh,
  CaretDown,
  Lightbulb,
  Rocket
} from "phosphor-react";
import Link from "next/link";

import { Container, Section } from "../../components/apple/Layout";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ScreenReaderSimulator() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSimulate = async () => {
    if (!url.trim()) {
      setSnackbarMessage(t("screenReaderSimulator.errorEnterUrl"));
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
      setSnackbarMessage(t("screenReaderSimulator.errorSimulationFailed"));
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
      case "critical": return <XCircle size={16} weight="fill" />;
      case "warning": return <WarningCircle size={16} weight="fill" />;
      case "info": return <Info size={16} weight="fill" />;
      default: return <Info size={16} weight="fill" />;
    }
  };

  const tabs = [
    { label: "Screen Reader Output", icon: <SpeakerHigh size={20} weight="regular" /> },
    { label: "Issues Found", icon: <WarningCircle size={20} weight="fill" /> },
    { label: "Recommendations", icon: <CheckCircle size={20} weight="fill" /> }
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
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              {t("screenReaderSimulator.title")}
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              {t("screenReaderSimulator.subtitle")}
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" style={{ padding: appleTheme.spacing[6] }}>
        {/* Input Section */}
        <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: themeColors.text.primary,
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            {t("screenReaderSimulator.simulateTitle")}
          </Typography>
          
          <HStack spacing={3} align="center" style={{ marginBottom: 0 }}>
            <Box style={{ flex: 1 }}>
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={setUrl}
                size="large"
                variant="filled"
                startIcon={<Microphone size={20} weight="regular" />}
              />
            </Box>
            <Button
              variant="primary"
              size="large"
              onClick={handleSimulate}
              disabled={simulating}
              loading={simulating}
              startIcon={<Play size={16} weight="fill" />}
              style={{ height: '54px', flexShrink: 0 }}
            >
              {simulating ? t("screenReaderSimulator.simulating") : t("screenReaderSimulator.startSimulation")}
            </Button>
          </HStack>
        </Card>

          <Card variant="outlined" padding="md" style={{ 
          backgroundColor: isDarkMode ? themeColors.background.tertiary : '#F5F5F7',
          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#E5E5EA'}`,
          borderRadius: appleTheme.borderRadius.lg,
          marginTop: appleTheme.spacing[4],
          marginBottom: appleTheme.spacing[6],
          boxShadow: isDarkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
          width: '100%'
          }}>
          <Typography variant="body" style={{ 
            color: themeColors.text.secondary
          }}>
            <strong>{t("screenReaderSimulator.whatWeSimulate")}</strong> {t("screenReaderSimulator.whatWeSimulateDesc")}
            </Typography>
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
                <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                  {t("screenReaderSimulator.accessibilityScore")}
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
                <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                  {t("screenReaderSimulator.accessibleElements")}
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
                <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                  {t("screenReaderSimulator.issuesFound")}
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
                <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                  {t("screenReaderSimulator.totalElements")}
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
                      color: activeTab === index ? "white" : themeColors.text.primary
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
                    color: themeColors.text.primary,
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
                          color: themeColors.text.primary,
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
                    color: themeColors.text.primary,
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
                                color: themeColors.text.primary,
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
                              color: themeColors.text.secondary
                            }}>
                              <strong>Element:</strong> {issue.element}
                            </Typography>
                            <Card variant="outlined" padding="md" style={{ 
                              backgroundColor: appleTheme.colors.info + "10",
                              borderColor: appleTheme.colors.info + "30",
                              marginBottom: appleTheme.spacing[2]
                            }}>
                              <Typography variant="body" style={{ color: themeColors.text.primary }}>
                                <strong><Lightbulb style={{ fontSize: "16px", marginRight: "4px", verticalAlign: "middle" }} /> Suggestion:</strong> {issue.suggestion}
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
                    color: themeColors.text.primary,
                    fontWeight: appleTheme.typography.fontWeight.semibold
                  }}>
                    Recommendations
                  </Typography>
                  <VStack spacing={2}>
                    {results.recommendations.map((recommendation, index) => (
                      <HStack key={index} spacing={2} align="center">
                        <CheckCircle size={20} weight="fill" color={appleTheme.colors.success} />
                        <Typography variant="body" style={{ color: themeColors.text.primary }}>
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
            color: themeColors.text.primary,
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            {t("screenReaderSimulator.bestPracticesTitle")}
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
                {t("screenReaderSimulator.essentialRequirements")}
              </Typography>
              <VStack spacing={2}>
                {[
                  t("screenReaderSimulator.essentialItem1"),
                  t("screenReaderSimulator.essentialItem2"),
                  t("screenReaderSimulator.essentialItem3"),
                  t("screenReaderSimulator.essentialItem4"),
                  t("screenReaderSimulator.essentialItem5"),
                  t("screenReaderSimulator.essentialItem6"),
                  t("screenReaderSimulator.essentialItem7")
                ].map((item, index) => (
                  <HStack key={index} spacing={2} align="center">
                    <CheckCircle style={{ color: appleTheme.colors.success, fontSize: "20px" }} />
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
                {t("screenReaderSimulator.advancedFeatures")}
              </Typography>
              <VStack spacing={2}>
                {[
                  t("screenReaderSimulator.advancedItem1"),
                  t("screenReaderSimulator.advancedItem2"),
                  t("screenReaderSimulator.advancedItem3"),
                  t("screenReaderSimulator.advancedItem4"),
                  t("screenReaderSimulator.advancedItem5"),
                  t("screenReaderSimulator.advancedItem6"),
                  t("screenReaderSimulator.advancedItem7")
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
            {t("screenReaderSimulator.needMoreTools")}
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: "white",
            opacity: 0.9
          }}>
            {t("screenReaderSimulator.needMoreToolsDesc")}
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