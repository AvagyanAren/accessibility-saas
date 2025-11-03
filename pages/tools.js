import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import AnimatedGradient from "../components/apple/AnimatedGradient";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";

// Tooltip Component
const Tooltip = memo(({ children, text, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipStyles = {
    position: "relative",
    display: "inline-block"
  };

  const tooltipContentStyles = {
    visibility: isVisible ? "visible" : "hidden",
    opacity: isVisible ? 1 : 0,
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#1C1C1E",
    color: "#FFFFFF",
    textAlign: "center",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: 1.4,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "all 0.2s ease-in-out",
    ...(position === "top" && {
      bottom: "125%",
      left: "50%",
      transform: "translateX(-50%)",
      marginBottom: "8px"
    }),
    ...(position === "bottom" && {
      top: "125%",
      left: "50%",
      transform: "translateX(-50%)",
      marginTop: "8px"
    }),
    ...(position === "left" && {
      right: "125%",
      top: "50%",
      transform: "translateY(-50%)",
      marginRight: "8px"
    }),
    ...(position === "right" && {
      left: "125%",
      top: "50%",
      transform: "translateY(-50%)",
      marginLeft: "8px"
    })
  };

  return (
    <div
      style={tooltipStyles}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div style={tooltipContentStyles}>
        {text}
      </div>
    </div>
  );
});

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
  const { t } = useLanguage();

  const tools = [
    {
      id: "color-contrast",
      title: t("tools.toolContrast"),
      description: t("tools.toolContrastDesc"),
      icon: <ContrastIcon />,
      color: "#007AFF",
      status: t("tools.statusAvailable"),
      features: [t("tools.featureWCAG"), t("tools.featureLivePreview"), t("tools.featureColorGen"), t("tools.featureDetailedReport")]
    },
    {
      id: "alt-text-analyzer",
      title: t("tools.toolAltText"),
      description: t("tools.toolAltTextDesc"),
      icon: <ImageIcon />,
      color: "#30D158",
      status: t("tools.statusAvailable"),
      features: [t("tools.featureBulkScan"), t("tools.featureMissingDetection"), t("tools.featureSuggestions"), t("tools.featureExport")]
    },
    {
      id: "keyboard-navigator",
      title: t("tools.toolKeyboard"),
      description: t("tools.toolKeyboardDesc"),
      icon: <KeyboardIcon />,
      color: "#FF9F0A",
      status: t("tools.statusAvailable"),
      features: ["Tab order testing", "Focus indicators", "Skip links detection", "Navigation flow analysis"]
    },
    {
      id: "performance-audit",
      title: t("tools.toolPerformance"),
      description: t("tools.toolPerformanceDesc"),
      icon: <TrendingUpIcon />,
      color: "#FF6B6B",
      status: t("tools.statusAvailable"),
      features: ["Load time analysis", "Resource optimization", "Performance scoring", "Improvement recommendations"]
    },
    {
      id: "screen-reader-simulator",
      title: t("tools.toolScreenReader"),
      description: t("tools.toolScreenReaderDesc"),
      icon: <RecordVoiceOverIcon />,
      color: "#9C27B0",
      status: t("tools.statusAvailable"),
      features: ["Voice simulation", "Multiple voices", "Speed control", "Content structure analysis"]
    }
  ];

  return (
    <div style={{ 
      backgroundColor: isDarkMode ? appleTheme.colors.dark.background.primary : appleTheme.colors.background.secondary,
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <AnimatedGradient variant="subtle" intensity="low" />
      {/* Hero Section */}
      <Section background={isDarkMode ? "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{
              marginBottom: appleTheme.spacing[4],
              color: isDarkMode ? '#FFFFFF' : "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold,
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("tools.title")}
            </Typography>
            <Typography variant="headline" weight="regular" style={{
              color: isDarkMode ? '#FFFFFF' : "#2C2C2E",
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[4]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium,
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("tools.subtitle")}
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* Tools Grid */}
      <Container size="lg" padding="lg">
        <Section padding="lg" style={{ paddingTop: appleTheme.spacing[4] }}>
          <Typography variant="title2" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? '#FFFFFF' : '#000000',
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }}>
            {t("tools.title")}
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
                  <div 
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E5EA",
                      borderRadius: "16px",
                      padding: "24px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      minHeight: "120px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      zIndex: 1,
                      height: "100%",
                      contain: "layout style",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "#007AFF";
                      e.currentTarget.style.backgroundColor = "#F8F9FA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "#E5E5EA";
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
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
                          color: isDarkMode ? "#FFFFFF" : "#000000"
                        }}>
                          {tool.title}
                        </Typography>
                        <Typography variant="body" style={{
                          color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                          marginBottom: appleTheme.spacing[4]
                        }}>
                          {tool.description}
                        </Typography>
                      </Box>
                      
                      {/* Features */}
                      <Box>
                        <Typography variant="footnote" weight="semibold" style={{
                          marginBottom: appleTheme.spacing[2],
                          color: isDarkMode ? "#FFFFFF" : "#000000"
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
                  </div>
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
          boxShadow: "0 20px 40px rgba(0, 122, 255, 0.3)",
          position: "relative",
          zIndex: 10
        }}>
          <Stack spacing={6} align="center">
            <Typography variant="title1" style={{ 
              color: "white",
              fontWeight: appleTheme.typography.fontWeight.bold,
              marginBottom: appleTheme.spacing[2],
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("tools.needAdvanced")}
            </Typography>
            <Typography variant="headline" style={{ 
              color: "white",
              opacity: 0.95,
              maxWidth: "500px",
              fontWeight: appleTheme.typography.fontWeight.medium,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("tools.needAdvancedDesc")}
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
                      transition: "all 0.3s ease",
                      position: "relative",
                      zIndex: 11
                    }}
                  >
                    {t("tools.viewPricing")}
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
                      transition: "all 0.3s ease",
                      position: "relative",
                      zIndex: 11
                    }}
                  >
                    {t("tools.viewAPI")}
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