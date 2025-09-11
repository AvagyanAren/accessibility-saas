import React from "react";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Card from "../../components/apple/Card";
import { Container, Box, Flex, Stack, Section } from "../../components/apple/Layout";
import { appleTheme } from "../../styles/apple-theme";
import { useTheme } from "../../contexts/ThemeContext";
import AnimatedGradient from "../../components/apple/AnimatedGradient";
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  ArrowBack,
  Palette,
  Visibility,
  Contrast,
} from "@mui/icons-material";
import Link from "next/link";

export default function ColorContrastAccessibilityGuide() {
  const { isDarkMode } = useTheme();
  
  const contrastRatios = [
    {
      level: "Normal Text (AA)",
      ratio: "4.5:1",
      color: "#ff9f43",
      description: "Minimum contrast for normal text (16px and below)",
      examples: [
        { text: "Black on white", ratio: "21:1", status: "Pass" },
        { text: "Dark gray on white", ratio: "12.6:1", status: "Pass" },
        { text: "Blue on white", ratio: "8.6:1", status: "Pass" },
        { text: "Light gray on white", ratio: "2.3:1", status: "Fail" }
      ]
    },
    {
      level: "Large Text (AA)",
      ratio: "3:1",
      color: "#ff9f43",
      description: "Minimum contrast for large text (18px+ or 14px+ bold)",
      examples: [
        { text: "Black on white", ratio: "21:1", status: "Pass" },
        { text: "Dark gray on white", ratio: "12.6:1", status: "Pass" },
        { text: "Blue on white", ratio: "8.6:1", status: "Pass" },
        { text: "Medium gray on white", ratio: "4.5:1", status: "Pass" }
      ]
    },
    {
      level: "Enhanced (AAA)",
      ratio: "7:1",
      color: "#28a745",
      description: "Enhanced contrast for normal text",
      examples: [
        { text: "Black on white", ratio: "21:1", status: "Pass" },
        { text: "Very dark gray on white", ratio: "16.8:1", status: "Pass" },
        { text: "Dark blue on white", ratio: "8.6:1", status: "Pass" },
        { text: "Medium gray on white", ratio: "4.5:1", status: "Fail" }
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Using light gray text on white backgrounds",
      impact: "Text becomes unreadable for users with low vision",
      solution: "Use darker colors or increase font weight",
      example: "✗ #CCCCCC on white (2.3:1) → ✓ #666666 on white (4.5:1)"
    },
    {
      mistake: "Relying solely on color to convey information",
      impact: "Colorblind users cannot distinguish between different states",
      solution: "Add icons, patterns, or text labels alongside color",
      example: "✗ Red text for errors only → ✓ Red text + error icon + 'Error:' label"
    },
    {
      mistake: "Insufficient contrast on hover states",
      impact: "Interactive elements become hard to identify",
      solution: "Ensure hover states maintain or improve contrast",
      example: "✗ Light blue on hover (3.2:1) → ✓ Darker blue on hover (4.8:1)"
    },
    {
      mistake: "Poor contrast in form validation messages",
      impact: "Users cannot read error or success messages",
      solution: "Use high contrast colors for all validation states",
      example: "✗ Light red for errors → ✓ Dark red with sufficient contrast"
    }
  ];

  const toolsAndResources = [
    {
      name: "WebAIM Contrast Checker",
      description: "Free online tool to test color combinations",
      features: ["Real-time contrast calculation", "WCAG compliance checking", "Color blindness simulation"],
      link: "https://webaim.org/resources/contrastchecker/"
    },
    {
      name: "Color Oracle",
      description: "Desktop application for color blindness simulation",
      features: ["Real-time preview", "Multiple color blindness types", "Cross-platform support"],
      link: "https://colororacle.org/"
    },
    {
      name: "Stark Plugin",
      description: "Design tool plugin for accessibility testing",
      features: ["Figma/Sketch integration", "Contrast checking", "Color blindness simulation"],
      link: "https://getstark.co/"
    }
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
            <Link href="/resources" style={{ textDecoration: "none", display: "inline-block", marginBottom: appleTheme.spacing[4] }}>
              <Button
                variant="ghost"
                size="medium"
                startIcon={<ArrowBack />}
                style={{
                  color: "#007AFF",
                  backgroundColor: "rgba(0, 122, 255, 0.1)",
                  border: "1px solid rgba(0, 122, 255, 0.2)"
                }}
              >
                Back to Resources
              </Button>
            </Link>
            
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Color Contrast Accessibility: Complete Guide for Web Designers
            </Typography>
            
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Master color contrast requirements to create accessible, inclusive designs that meet WCAG standards 
              and provide excellent user experience for all users, including those with visual impairments.
            </Typography>
            
            <Flex gap={2} wrap="wrap" justify="center">
              <Box style={{
                backgroundColor: "rgba(0, 122, 255, 0.1)",
                color: "#007AFF",
                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: appleTheme.typography.fontWeight.medium
              }}>
                6 min read
              </Box>
              <Box style={{
                backgroundColor: "rgba(0, 122, 255, 0.1)",
                color: "#007AFF",
                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: appleTheme.typography.fontWeight.medium
              }}>
                Beginner
              </Box>
              <Box style={{
                backgroundColor: "rgba(0, 122, 255, 0.1)",
                color: "#007AFF",
                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: appleTheme.typography.fontWeight.medium
              }}>
                Design
              </Box>
            </Flex>
          </Box>
        </Container>
      </Section>

      <Container size="lg" style={{ padding: appleTheme.spacing[6] }}>
        {/* Introduction */}
        <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
          Why Color Contrast Matters for Accessibility
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            lineHeight: appleTheme.typography.lineHeight.relaxed,
            color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
          }}>
            Color contrast is one of the most critical aspects of web accessibility. Over 285 million people worldwide 
            have visual impairments, and many more experience temporary vision issues due to lighting conditions, 
            device settings, or age-related changes. Proper color contrast ensures that text and interactive elements 
            are readable and usable for everyone.
          </Typography>
          <Box style={{
            backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(0, 122, 255, 0.05)",
            border: `1px solid ${isDarkMode ? "rgba(0, 122, 255, 0.3)" : "rgba(0, 122, 255, 0.2)"}`,
            borderRadius: appleTheme.borderRadius.md,
            padding: appleTheme.spacing[4],
            marginBottom: appleTheme.spacing[4]
          }}>
            <Typography variant="body" style={{ 
              color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              <strong>SEO Impact:</strong> Websites with proper color contrast rank better in search results because 
              they provide better user experience, reduce bounce rates, and are more likely to be shared and linked to 
              by accessibility advocates and inclusive design communities.
            </Typography>
          </Box>
        </Card>

        {/* Contrast Ratios */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            WCAG Color Contrast Requirements
          </Typography>
          
          {contrastRatios.map((level, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              border: `2px solid ${level.color}20`,
              backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.8)" : "#FFFFFF"
            }}>
              <Flex align="center" gap={3} style={{ marginBottom: appleTheme.spacing[4] }}>
                <Box style={{
                  padding: appleTheme.spacing[3],
                  backgroundColor: "rgba(0, 122, 255, 0.1)",
                  borderRadius: "12px",
                  color: "#007AFF"
                }}>
                  <Contrast />
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    {level.level}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {level.description}
                  </Typography>
                </Box>
                <Box style={{
                  backgroundColor: level.color,
                  color: "white",
                  padding: `${appleTheme.spacing[2]} ${appleTheme.spacing[4]}`,
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: appleTheme.typography.fontWeight.bold
                }}>
                  {level.ratio}
                </Box>
              </Flex>
              
              <Stack spacing={2}>
                {level.examples.map((example, eIndex) => (
                  <Flex key={eIndex} align="center" gap={3} style={{
                    padding: appleTheme.spacing[3],
                    backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.02)",
                    borderRadius: appleTheme.borderRadius.md
                  }}>
                    <Typography variant="body" weight="medium" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                      minWidth: "200px"
                    }}>
                      {example.text}
                    </Typography>
                    <Typography variant="body" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                      minWidth: "80px"
                    }}>
                      {example.ratio}
                    </Typography>
                    <Box style={{
                      backgroundColor: example.status === "Pass" ? appleTheme.colors.success : appleTheme.colors.error,
                      color: "white",
                      padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: appleTheme.typography.fontWeight.medium
                    }}>
                      {example.status}
                    </Box>
                  </Flex>
                ))}
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Common Mistakes */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            Common Color Contrast Mistakes to Avoid
          </Typography>
          
          {commonMistakes.map((mistake, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[6],
              backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.8)" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA"}`,
              boxShadow: isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}>
              <Stack spacing={4}>
                {/* Header with icon and title */}
                <Flex align="flex-start" gap={3}>
                  <Box style={{
                    padding: appleTheme.spacing[2],
                    backgroundColor: "rgba(220, 53, 69, 0.1)",
                    borderRadius: "12px",
                    color: "#dc3545",
                    flexShrink: 0
                  }}>
                    <Error style={{ fontSize: "24px" }} />
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Typography variant="title2" style={{ 
                      fontWeight: appleTheme.typography.fontWeight.semibold,
                      color: isDarkMode ? "#FFFFFF" : "#000000",
                      marginBottom: appleTheme.spacing[3],
                      fontSize: "20px",
                      lineHeight: appleTheme.typography.lineHeight.tight
                    }}>
                      {mistake.mistake}
                    </Typography>
                  </Box>
                </Flex>

                {/* Impact and Solution sections */}
                <Stack spacing={3}>
                  <Box style={{
                    backgroundColor: isDarkMode ? "rgba(255, 193, 7, 0.1)" : "rgba(255, 193, 7, 0.05)",
                    border: `1px solid ${isDarkMode ? "rgba(255, 193, 7, 0.3)" : "rgba(255, 193, 7, 0.2)"}`,
                    borderRadius: appleTheme.borderRadius.md,
                    padding: appleTheme.spacing[4]
                  }}>
                    <Flex align="flex-start" gap={2} style={{ marginBottom: appleTheme.spacing[2] }}>
                      <Warning style={{ color: "#ffc107", fontSize: "20px", marginTop: "2px" }} />
                      <Typography variant="body" weight="semibold" style={{ 
                        color: isDarkMode ? "#FFFFFF" : "#000000",
                        fontSize: "16px"
                      }}>
                        Impact
                      </Typography>
                    </Flex>
                    <Typography variant="body" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                      lineHeight: appleTheme.typography.lineHeight.relaxed
                    }}>
                      {mistake.impact}
                    </Typography>
                  </Box>

                  <Box style={{
                    backgroundColor: isDarkMode ? "rgba(40, 167, 69, 0.1)" : "rgba(40, 167, 69, 0.05)",
                    border: `1px solid ${isDarkMode ? "rgba(40, 167, 69, 0.3)" : "rgba(40, 167, 69, 0.2)"}`,
                    borderRadius: appleTheme.borderRadius.md,
                    padding: appleTheme.spacing[4]
                  }}>
                    <Flex align="flex-start" gap={2} style={{ marginBottom: appleTheme.spacing[2] }}>
                      <CheckCircle style={{ color: "#28a745", fontSize: "20px", marginTop: "2px" }} />
                      <Typography variant="body" weight="semibold" style={{ 
                        color: isDarkMode ? "#FFFFFF" : "#000000",
                        fontSize: "16px"
                      }}>
                        Solution
                      </Typography>
                    </Flex>
                    <Typography variant="body" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                      lineHeight: appleTheme.typography.lineHeight.relaxed
                    }}>
                      {mistake.solution}
                    </Typography>
                  </Box>
                </Stack>

                {/* Example section */}
                <Box>
                  <Typography variant="body" weight="semibold" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[3],
                    fontSize: "16px"
                  }}>
                    Example
                  </Typography>
                  <Box style={{
                    backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.3)" : "#F8F9FA",
                    padding: appleTheme.spacing[4],
                    borderRadius: appleTheme.borderRadius.md,
                    fontFamily: "monospace",
                    fontSize: "14px",
                    border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E9ECEF"}`,
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    lineHeight: appleTheme.typography.lineHeight.relaxed
                  }}>
                    {mistake.example}
                  </Box>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Tools and Resources */}
        <Card variant="elevated" padding="xl" style={{ 
          marginBottom: appleTheme.spacing[6],
          backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.05)" : "rgba(0, 122, 255, 0.02)",
          border: `1px solid ${isDarkMode ? "rgba(0, 122, 255, 0.2)" : "rgba(0, 122, 255, 0.1)"}`
        }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            Essential Color Contrast Testing Tools
          </Typography>
          
          <Stack spacing={4} style={{ marginBottom: appleTheme.spacing[6] }}>
            {toolsAndResources.map((tool, index) => (
              <Flex key={index} align="flex-start" gap={3}>
                <Box style={{
                  backgroundColor: "#007AFF",
                  color: "white",
                  padding: appleTheme.spacing[2],
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  minWidth: "40px",
                  textAlign: "center"
                }}>
                  {index + 1}
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="body" weight="semibold" style={{ 
                    marginBottom: appleTheme.spacing[2],
                    color: isDarkMode ? "#FFFFFF" : "#000000"
                  }}>
                    {tool.name}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    {tool.description}
                  </Typography>
                  <Stack spacing={1}>
                    {tool.features.map((feature, fIndex) => (
                      <Flex key={fIndex} align="flex-start" gap={2}>
                        <CheckCircle style={{ color: appleTheme.colors.success, marginTop: appleTheme.spacing[0.5] }} />
                        <Typography variant="body" style={{ 
                          color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                        }}>
                          {feature}
                        </Typography>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
              </Flex>
            ))}
          </Stack>
          
          <Box style={{ textAlign: "center" }}>
            <Link href="/tools/color-contrast" style={{ textDecoration: "none" }}>
              <Button
                variant="primary"
                size="large"
                style={{
                  backgroundColor: "#007AFF",
                  padding: `${appleTheme.spacing[4]} ${appleTheme.spacing[8]}`,
                  fontSize: "18px",
                  fontWeight: appleTheme.typography.fontWeight.semibold
                }}
              >
                Test Your Color Contrast Now
              </Button>
            </Link>
          </Box>
        </Card>
      </Container>
    </div>
  );
}
