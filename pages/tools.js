import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import Link from "next/link";
import {
  Eyedropper,
  Image,
  Keyboard,
  ChartLineUp,
  Microphone,
  ArrowSquareOut
} from "phosphor-react";

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

// Icons with Phosphor React
const ContrastIcon = () => <Eyedropper size={24} weight="regular" />;
const ImageIcon = () => <Image size={24} weight="regular" />;
const KeyboardIcon = () => <Keyboard size={24} weight="regular" />;
const TrendingUpIcon = () => <ChartLineUp size={24} weight="regular" />;
const RecordVoiceOverIcon = () => <Microphone size={24} weight="regular" />;
const ExternalLinkIcon = () => <ArrowSquareOut size={16} weight="regular" />;

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

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div style={{ 
      backgroundColor: themeColors.background.secondary,
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
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
                <a style={{ textDecoration: "none", outline: "none" }}>
                  <div 
                    style={{
                      backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF",
                      border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA"}`,
                      borderRadius: "16px",
                      padding: "24px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      minHeight: "120px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      zIndex: 1,
                      height: "100%",
                      contain: "layout style",
                      cursor: "pointer",
                      outline: "none"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = "none";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = "none";
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = isDarkMode ? "0 8px 25px rgba(0, 0, 0, 0.5)" : "0 8px 25px rgba(0, 0, 0, 0.15)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "#007AFF";
                      e.currentTarget.style.backgroundColor = isDarkMode ? themeColors.gray[200] : "#F8F9FA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA";
                      e.currentTarget.style.backgroundColor = isDarkMode ? themeColors.background.tertiary : "#FFFFFF";
                    }}
                  >
                    <Stack spacing={4}>
                      {/* Header */}
                      <Flex align="flex-start" justify="space-between" gap={3}>
                        <Box style={{ 
                          color: appleTheme.colors.primary[500], 
                          flexShrink: 0,
                          padding: appleTheme.spacing[2],
                          backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(0, 122, 255, 0.05)",
                          borderRadius: appleTheme.borderRadius.md,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
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