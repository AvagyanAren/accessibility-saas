import React from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";

// Icons (simplified SVG components)
const ContrastIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

const KeyboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
    <line x1="6" y1="8" x2="6.01" y2="8"/>
    <line x1="10" y1="8" x2="10.01" y2="8"/>
    <line x1="14" y1="8" x2="14.01" y2="8"/>
    <line x1="18" y1="8" x2="18.01" y2="8"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="9" y1="16" x2="15" y2="16"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
    <polyline points="17,6 23,6 23,12"/>
  </svg>
);

const RecordVoiceOverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function Tools() {
  const { isDarkMode } = useTheme();

  const tools = [
    {
      id: "color-contrast",
      title: "Color Contrast Checker",
      description: "Test color combinations for WCAG accessibility compliance. Input hex codes and get instant contrast ratio results.",
      icon: <ContrastIcon />,
      color: "#007AFF",
      status: "Available",
      features: ["WCAG AA/AAA compliance", "Live preview", "Random color generator", "Detailed compliance report"]
    },
    {
      id: "alt-text-analyzer",
      title: "Alt Text Analyzer",
      description: "Scan any webpage to find images missing alt text attributes. Perfect for quick accessibility audits.",
      icon: <ImageIcon />,
      color: "#30D158",
      status: "Available",
      features: ["Bulk image scanning", "Missing alt text detection", "Improvement suggestions", "Export results"]
    },
    {
      id: "keyboard-navigator",
      title: "Keyboard Navigation Tester",
      description: "Test keyboard accessibility by navigating through interactive elements without using a mouse.",
      icon: <KeyboardIcon />,
      color: "#FF9F0A",
      status: "Available",
      features: ["Tab order testing", "Focus indicators", "Skip links detection", "Navigation flow analysis"]
    },
    {
      id: "performance-audit",
      title: "Performance Audit",
      description: "Analyze website performance metrics that impact accessibility, including loading times and resource optimization.",
      icon: <TrendingUpIcon />,
      color: "#FF6B6B",
      status: "Available",
      features: ["Load time analysis", "Resource optimization", "Performance scoring", "Improvement recommendations"]
    },
    {
      id: "screen-reader-simulator",
      title: "Screen Reader Simulator",
      description: "Experience how your website sounds to screen reader users. Test with different screen reader voices and settings.",
      icon: <RecordVoiceOverIcon />,
      color: "#9C27B0",
      status: "Available",
      features: ["Voice simulation", "Multiple voices", "Speed control", "Content structure analysis"]
    }
  ];

  return (
    <div style={{ 
      backgroundColor: isDarkMode ? appleTheme.colors.dark.background.primary : appleTheme.colors.background.secondary,
      minHeight: "100vh"
    }}>
      {/* Hero Section */}
      <Section background={isDarkMode ? "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{
              marginBottom: appleTheme.spacing[4],
              color: isDarkMode ? '#FFFFFF' : "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Accessibility Tools
            </Typography>
            <Typography variant="headline" weight="regular" style={{
              color: isDarkMode ? '#FFFFFF' : "#2C2C2E",
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Comprehensive suite of tools to test, analyze, and improve your website's accessibility.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* Tools Grid */}
      <Container size="lg" padding="lg">
        <Section padding="lg">
          <Typography variant="title2" style={{ 
            marginBottom: appleTheme.spacing[8],
            color: isDarkMode ? '#FFFFFF' : '#000000'
          }}>
            Available Tools
          </Typography>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: appleTheme.spacing[6],
            marginBottom: appleTheme.spacing[12]
          }}>
            {tools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} passHref legacyBehavior>
                <a style={{ textDecoration: "none" }}>
                  <Card 
                    variant="elevated" 
                    padding="large" 
                    hover
                    style={{
                      height: "100%",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <Stack spacing={4}>
                      {/* Header */}
                      <Flex align="flex-start" justify="space-between" gap={3}>
                        <Box style={{ 
                          color: tool.color, 
                          flexShrink: 0,
                          padding: appleTheme.spacing[3],
                          backgroundColor: `${tool.color}15`,
                          borderRadius: appleTheme.borderRadius.lg
                        }}>
                          {tool.icon}
                        </Box>
                        <Box style={{
                          padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                          backgroundColor: tool.status === "Available" ? "#30D158" : "#FF9F0A",
                          color: "white",
                          borderRadius: appleTheme.borderRadius.full,
                          fontSize: appleTheme.typography.fontSize.xs,
                          fontWeight: appleTheme.typography.fontWeight.semibold
                        }}>
                          {tool.status}
                        </Box>
                      </Flex>
                      
                      {/* Content */}
                      <Box>
                        <Typography variant="title3" style={{ 
                          marginBottom: appleTheme.spacing[2],
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}>
                          {tool.title}
                        </Typography>
                        <Typography variant="body" style={{
                          color: isDarkMode ? '#E5E5EA' : '#1C1C1E',
                          marginBottom: appleTheme.spacing[4]
                        }}>
                          {tool.description}
                        </Typography>
                      </Box>
                      
                      {/* Features */}
                      <Box>
                        <Typography variant="footnote" weight="semibold" style={{
                          marginBottom: appleTheme.spacing[2],
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}>
                          Key Features:
                        </Typography>
                        <Stack spacing={1}>
                          {tool.features.map((feature, index) => (
                            <HStack key={index} spacing={2} align="center">
                              <Box style={{
                                width: "4px",
                                height: "4px",
                                backgroundColor: tool.color,
                                borderRadius: "50%"
                              }} />
                              <Typography variant="footnote" style={{
                                color: isDarkMode ? '#AEAEB2' : '#6D6D70'
                              }}>
                                {feature}
                              </Typography>
                            </HStack>
                          ))}
                        </Stack>
                      </Box>
                      
                      {/* Action */}
                      <HStack justify="space-between" align="center">
                        <Typography variant="caption1" weight="medium" style={{
                          color: tool.color
                        }}>
                          Try Tool
                        </Typography>
                        <ExternalLinkIcon style={{ 
                          color: tool.color,
                          fontSize: "14px"
                        }} />
                      </HStack>
                    </Stack>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Card variant="elevated" style={{ 
          background: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
          textAlign: "center",
          padding: `${appleTheme.spacing[12]} ${appleTheme.spacing[8]}`,
          margin: `${appleTheme.spacing[8]} 0`,
          borderRadius: appleTheme.borderRadius.xl,
          boxShadow: "0 20px 40px rgba(0, 122, 255, 0.3)"
        }}>
          <Stack spacing={6} align="center">
            <Typography variant="title1" style={{ 
              color: "white",
              fontWeight: appleTheme.typography.fontWeight.bold,
              marginBottom: appleTheme.spacing[2]
            }}>
              Need More Advanced Features?
            </Typography>
            <Typography variant="headline" style={{ 
              color: "white",
              opacity: 0.95,
              maxWidth: "500px",
              fontWeight: appleTheme.typography.fontWeight.medium,
              lineHeight: appleTheme.typography.lineHeight.relaxed
            }}>
              Upgrade to Pro for unlimited scans, advanced reporting, and priority support.
            </Typography>
            <HStack spacing={4} wrap="wrap" justify="center" style={{ marginTop: appleTheme.spacing[4] }}>
              <Link href="/pricing" passHref legacyBehavior>
                <a style={{ textDecoration: "none" }}>
                  <Button
                    variant="secondary"
                    size="large"
                    style={{
                      backgroundColor: "white",
                      color: "#007AFF",
                      fontWeight: appleTheme.typography.fontWeight.semibold,
                      padding: `${appleTheme.spacing[4]} ${appleTheme.spacing[8]}`,
                      borderRadius: appleTheme.borderRadius.lg,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    View Pricing
                  </Button>
                </a>
              </Link>
              <Link href="/api-docs" passHref legacyBehavior>
                <a style={{ textDecoration: "none" }}>
                  <Button
                    variant="outline"
                    size="large"
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                      padding: `${appleTheme.spacing[4]} ${appleTheme.spacing[8]}`,
                      borderRadius: appleTheme.borderRadius.lg,
                      transition: "all 0.3s ease"
                    }}
                  >
                    API Documentation
                  </Button>
                </a>
              </Link>
            </HStack>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}