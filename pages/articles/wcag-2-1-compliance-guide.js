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
  Accessibility,
  Visibility,
  Keyboard,
  VolumeUp,
} from "@mui/icons-material";
import Link from "next/link";

export default function WCAG21ComplianceGuide() {
  const { isDarkMode } = useTheme();
  
  const principles = [
    {
      title: "Perceivable",
      icon: <Visibility />,
      description: "Information and user interface components must be presentable to users in ways they can perceive.",
      guidelines: [
        "Provide text alternatives for non-text content",
        "Create content that can be presented in different ways",
        "Make it easier for users to see and hear content"
      ],
      level: "Level A"
    },
    {
      title: "Operable",
      icon: <Keyboard />,
      description: "User interface components and navigation must be operable.",
      guidelines: [
        "Make all functionality available from a keyboard",
        "Give users enough time to read and use content",
        "Do not design content in a way that is known to cause seizures"
      ],
      level: "Level A"
    },
    {
      title: "Understandable",
      icon: <Info />,
      description: "Information and the operation of user interface must be understandable.",
      guidelines: [
        "Make text content readable and understandable",
        "Make web pages appear and operate in predictable ways",
        "Help users avoid and correct mistakes"
      ],
      level: "Level A"
    },
    {
      title: "Robust",
      icon: <Accessibility />,
      description: "Content must be robust enough that it can be interpreted by a wide variety of user agents.",
      guidelines: [
        "Maximize compatibility with current and future user agents",
        "Ensure content remains accessible as technologies advance"
      ],
      level: "Level A"
    }
  ];

  const conformanceLevels = [
    {
      level: "Level A",
      color: "#dc3545",
      description: "Minimum level of accessibility compliance",
      requirements: [
        "All images have alt text",
        "Color is not the only means of conveying information",
        "Text can be resized up to 200%",
        "All functionality is keyboard accessible"
      ]
    },
    {
      level: "Level AA",
      color: "#ff9f43",
      description: "Enhanced accessibility compliance",
      requirements: [
        "Contrast ratio of at least 4.5:1 for normal text",
        "Contrast ratio of at least 3:1 for large text",
        "Focus indicators are visible",
        "Headings and labels describe topic or purpose"
      ]
    },
    {
      level: "Level AAA",
      color: "#28a745",
      description: "Maximum level of accessibility compliance",
      requirements: [
        "Contrast ratio of at least 7:1 for normal text",
        "Contrast ratio of at least 4.5:1 for large text",
        "No timing is an essential part of the event",
        "Sign language interpretation for prerecorded audio"
      ]
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
            <Link href="/resources" passHref legacyBehavior>
              <a style={{ textDecoration: "none", display: "inline-block", marginBottom: appleTheme.spacing[4] }}>
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
              </a>
            </Link>
            
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              WCAG 2.1 Compliance Guide: Complete Web Accessibility Standards
            </Typography>
            
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Master the Web Content Accessibility Guidelines (WCAG) 2.1 to create inclusive, 
              accessible websites that comply with international standards and legal requirements.
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
                8 min read
              </Box>
              <Box style={{
                backgroundColor: "rgba(0, 122, 255, 0.1)",
                color: "#007AFF",
                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: appleTheme.typography.fontWeight.medium
              }}>
                Intermediate
              </Box>
              <Box style={{
                backgroundColor: "rgba(0, 122, 255, 0.1)",
                color: "#007AFF",
                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: appleTheme.typography.fontWeight.medium
              }}>
                WCAG 2.1
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
            What is WCAG 2.1?
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            lineHeight: appleTheme.typography.lineHeight.relaxed,
            color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
          }}>
            The Web Content Accessibility Guidelines (WCAG) 2.1 is the international standard for web accessibility, 
            developed by the World Wide Web Consortium (W3C). It provides a comprehensive framework for making web 
            content accessible to people with disabilities, including visual, auditory, physical, speech, cognitive, 
            language, learning, and neurological disabilities.
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
              <strong>SEO Benefit:</strong> WCAG-compliant websites rank better in search engines because they provide 
              better user experience, have cleaner code structure, and are more likely to be shared and linked to by 
              accessibility-focused communities.
            </Typography>
          </Box>
        </Card>

        {/* Four Principles */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            The Four Principles of Accessibility
          </Typography>
          
          {principles.map((principle, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.8)" : "#FFFFFF"
            }}>
              <Flex align="center" gap={3} style={{ marginBottom: appleTheme.spacing[4] }}>
                <Box style={{
                  padding: appleTheme.spacing[3],
                  backgroundColor: "rgba(0, 122, 255, 0.1)",
                  borderRadius: "12px",
                  color: "#007AFF"
                }}>
                  {principle.icon}
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    {principle.title}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {principle.description}
                  </Typography>
                </Box>
                <Box style={{
                  backgroundColor: "#007AFF",
                  color: "white",
                  padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: appleTheme.typography.fontWeight.medium
                }}>
                  {principle.level}
                </Box>
              </Flex>
              
              <Stack spacing={2}>
                {principle.guidelines.map((guideline, gIndex) => (
                  <Flex key={gIndex} align="flex-start" gap={2}>
                    <CheckCircle style={{ color: appleTheme.colors.success, marginTop: appleTheme.spacing[0.5] }} />
                    <Typography variant="body" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                    }}>
                      {guideline}
                    </Typography>
                  </Flex>
                ))}
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Conformance Levels */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            WCAG 2.1 Conformance Levels
          </Typography>
          
          {conformanceLevels.map((level, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              border: `2px solid ${level.color}20`,
              backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.8)" : "#FFFFFF"
            }}>
              <Flex align="center" gap={3} style={{ marginBottom: appleTheme.spacing[4] }}>
                <Box style={{
                  backgroundColor: level.color,
                  color: "white",
                  padding: `${appleTheme.spacing[2]} ${appleTheme.spacing[4]}`,
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: appleTheme.typography.fontWeight.bold
                }}>
                  {level.level}
                </Box>
                <Typography variant="title2" style={{ 
                  fontWeight: appleTheme.typography.fontWeight.semibold,
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  {level.description}
                </Typography>
              </Flex>
              
              <Stack spacing={2}>
                {level.requirements.map((requirement, rIndex) => (
                  <Flex key={rIndex} align="flex-start" gap={2}>
                    <CheckCircle style={{ color: level.color, marginTop: appleTheme.spacing[0.5] }} />
                    <Typography variant="body" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                    }}>
                      {requirement}
                    </Typography>
                  </Flex>
                ))}
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Implementation Guide */}
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
            How to Implement WCAG 2.1 Compliance
          </Typography>
          
          <Stack spacing={4} style={{ marginBottom: appleTheme.spacing[6] }}>
            <Flex align="flex-start" gap={3}>
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
                1
              </Box>
              <Box>
                <Typography variant="body" weight="semibold" style={{ 
                  marginBottom: appleTheme.spacing[2],
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  Audit Your Current Website
                </Typography>
                <Typography variant="body" style={{ 
                  color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                }}>
                  Use automated accessibility testing tools to identify current issues. Our free accessibility 
                  scanner can help you get started with a comprehensive audit of your website's compliance status.
                </Typography>
              </Box>
            </Flex>
            
            <Flex align="flex-start" gap={3}>
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
                2
              </Box>
              <Box>
                <Typography variant="body" weight="semibold" style={{ 
                  marginBottom: appleTheme.spacing[2],
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  Prioritize Critical Issues
                </Typography>
                <Typography variant="body" style={{ 
                  color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                }}>
                  Focus on Level A compliance first, then move to Level AA. Address issues that have the 
                  highest impact on user experience and legal compliance.
                </Typography>
              </Box>
            </Flex>
            
            <Flex align="flex-start" gap={3}>
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
                3
              </Box>
              <Box>
                <Typography variant="body" weight="semibold" style={{ 
                  marginBottom: appleTheme.spacing[2],
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  Test with Real Users
                </Typography>
                <Typography variant="body" style={{ 
                  color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                }}>
                  Include people with disabilities in your testing process. Use screen readers, 
                  keyboard-only navigation, and other assistive technologies to validate your improvements.
                </Typography>
              </Box>
            </Flex>
          </Stack>
          
          <Box style={{ textAlign: "center" }}>
            <Link href="/" passHref legacyBehavior>
              <a style={{ textDecoration: "none" }}>
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
                  Start Your WCAG Compliance Audit
                </Button>
              </a>
            </Link>
          </Box>
        </Card>
      </Container>
    </div>
  );
}
