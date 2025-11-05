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
  PhoneAndroid,
  TouchApp,
  ZoomIn,
  Gesture,
} from "@mui/icons-material";
import Link from "next/link";

export default function MobileAccessibilityBestPractices() {
  const { isDarkMode } = useTheme();
  
  const touchTargets = [
    {
      size: "Minimum 44x44px",
      description: "WCAG recommended minimum touch target size",
      importance: "Critical",
      examples: ["Buttons", "Links", "Form controls", "Interactive elements"],
      tips: [
        "Ensure adequate spacing between targets",
        "Consider users with motor disabilities",
        "Test on various device sizes",
        "Account for different finger sizes"
      ]
    },
    {
      size: "Recommended 48x48px",
      description: "Apple and Google recommended size for better usability",
      importance: "High",
      examples: ["Primary action buttons", "Navigation items", "Form submissions"],
      tips: [
        "Use for primary interactive elements",
        "Provides comfortable touch experience",
        "Reduces accidental taps",
        "Improves overall usability"
      ]
    }
  ];

  const responsiveDesign = [
    {
      principle: "Flexible Layouts",
      description: "Designs that adapt to different screen sizes and orientations",
      implementation: [
        "Use CSS Grid and Flexbox",
        "Implement responsive breakpoints",
        "Test on various device sizes",
        "Consider landscape and portrait modes"
      ],
      benefits: ["Better user experience", "Reduced development time", "Future-proof design"]
    },
    {
      principle: "Scalable Typography",
      description: "Text that remains readable across all devices",
      implementation: [
        "Use relative units (rem, em, %)",
        "Implement fluid typography",
        "Test readability at all sizes",
        "Maintain proper line height"
      ],
      benefits: ["Improved readability", "Better accessibility", "Consistent experience"]
    },
    {
      principle: "Touch-Friendly Interactions",
      description: "Interface elements optimized for touch input",
      implementation: [
        "Adequate touch target sizes",
        "Proper spacing between elements",
        "Clear visual feedback",
        "Gesture support where appropriate"
      ],
      benefits: ["Easier interaction", "Reduced errors", "Better usability"]
    }
  ];

  const commonMobileIssues = [
    {
      issue: "Small touch targets",
      problem: "Difficult to tap accurately, especially for users with motor disabilities",
      solution: "Increase touch target size to minimum 44x44px with adequate spacing",
      impact: "High - affects all users but especially those with disabilities"
    },
    {
      issue: "Poor zoom support",
      problem: "Content becomes unusable when zoomed to 200%",
      solution: "Use responsive design and avoid fixed pixel widths",
      impact: "Critical - required by WCAG guidelines"
    },
    {
      issue: "Inaccessible gestures",
      problem: "Essential functions only available through complex gestures",
      solution: "Provide alternative interaction methods (buttons, menus)",
      impact: "High - excludes users who cannot perform gestures"
    },
    {
      issue: "Orientation lock",
      problem: "Forcing specific orientation limits user choice",
      solution: "Support both portrait and landscape orientations",
      impact: "Medium - reduces flexibility and accessibility"
    }
  ];

  const testingStrategies = [
    {
      method: "Device Testing",
      description: "Test on actual mobile devices",
      devices: ["iPhone (various sizes)", "Android phones", "Tablets", "Different screen densities"],
      focus: ["Touch target sizes", "Gesture interactions", "Performance", "Visual clarity"]
    },
    {
      method: "Browser DevTools",
      description: "Use browser developer tools for responsive testing",
      tools: ["Chrome DevTools", "Firefox Responsive Design Mode", "Safari Web Inspector"],
      focus: ["Responsive breakpoints", "Touch simulation", "Performance metrics", "Accessibility audit"]
    },
    {
      method: "Accessibility Testing",
      description: "Test with assistive technologies on mobile",
      tools: ["VoiceOver (iOS)", "TalkBack (Android)", "Switch Control", "Voice Control"],
      focus: ["Screen reader compatibility", "Switch navigation", "Voice commands", "Focus management"]
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
      {/* Animated Background Elements */}
      <AnimatedGradient variant="subtle" intensity="medium" />
      
      {/* Hero Section */}
      <Section background={isDarkMode ? "linear-gradient(135deg, rgba(28, 28, 30, 0.9) 0%, rgba(44, 44, 46, 0.9) 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} padding="xl">
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
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Mobile Accessibility: Complete Best Practices Guide
            </Typography>
            
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Master mobile accessibility to create inclusive experiences on smartphones and tablets. 
              Learn essential techniques for touch interfaces, responsive design, and mobile-specific accessibility challenges.
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
                Mobile
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
            The Importance of Mobile Accessibility
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            lineHeight: appleTheme.typography.lineHeight.relaxed,
            color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
          }}>
            Mobile devices are the primary way many users access the internet, especially those with disabilities. 
            Mobile accessibility presents unique challenges including smaller screens, touch-based interaction, 
            varying input methods, and different assistive technologies. Proper mobile accessibility ensures 
            that all users can effectively use your website or app on any device.
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
              <strong>Mobile-First SEO:</strong> Google's mobile-first indexing means mobile accessibility directly 
              impacts search rankings. Mobile-accessible sites rank higher, have better user engagement metrics, 
              and are more likely to be shared across social platforms.
            </Typography>
          </Box>
        </Card>

        {/* Touch Targets */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            Touch Target Guidelines
          </Typography>
          
          {touchTargets.map((target, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF"
            }}>
              <Flex align="center" gap={3} style={{ marginBottom: appleTheme.spacing[4] }}>
                <Box style={{
                  padding: appleTheme.spacing[3],
                  backgroundColor: "rgba(0, 122, 255, 0.1)",
                  borderRadius: "12px",
                  color: "#007AFF"
                }}>
                  <TouchApp />
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    {target.size}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {target.description}
                  </Typography>
                </Box>
                <Box style={{
                  backgroundColor: target.importance === "Critical" ? "#dc3545" : "#ff9f43",
                  color: "white",
                  padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: appleTheme.typography.fontWeight.bold
                }}>
                  {target.importance}
                </Box>
              </Flex>
              
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    Examples:
                  </Typography>
                  <Flex gap={1} wrap="wrap">
                    {target.examples.map((example, eIndex) => (
                      <Box key={eIndex} style={{
                        backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.2)" : "rgba(0, 122, 255, 0.1)",
                        color: "#007AFF",
                        padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: appleTheme.typography.fontWeight.medium
                      }}>
                        {example}
                      </Box>
                    ))}
                  </Flex>
                </Box>
                
                <Box>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    Implementation Tips:
                  </Typography>
                  <Stack spacing={1}>
                    {target.tips.map((tip, tIndex) => (
                      <Flex key={tIndex} align="flex-start" gap={2}>
                        <CheckCircle style={{ color: appleTheme.colors.success, marginTop: appleTheme.spacing[0.5] }} />
                        <Typography variant="body" style={{ 
                          color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                        }}>
                          {tip}
                        </Typography>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Responsive Design */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            Responsive Design for Accessibility
          </Typography>
          
          {responsiveDesign.map((principle, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF"
            }}>
              <Flex align="center" gap={3} style={{ marginBottom: appleTheme.spacing[4] }}>
                <Box style={{
                  padding: appleTheme.spacing[3],
                  backgroundColor: "rgba(0, 122, 255, 0.1)",
                  borderRadius: "12px",
                  color: "#007AFF"
                }}>
                  <PhoneAndroid />
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    {principle.principle}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {principle.description}
                  </Typography>
                </Box>
              </Flex>
              
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    Implementation:
                  </Typography>
                  <Stack spacing={1}>
                    {principle.implementation.map((item, iIndex) => (
                      <Flex key={iIndex} align="flex-start" gap={2}>
                        <CheckCircle style={{ color: appleTheme.colors.success, marginTop: appleTheme.spacing[0.5] }} />
                        <Typography variant="body" style={{ 
                          color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                        }}>
                          {item}
                        </Typography>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
                
                <Box>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    Benefits:
                  </Typography>
                  <Flex gap={1} wrap="wrap">
                    {principle.benefits.map((benefit, bIndex) => (
                      <Box key={bIndex} style={{
                        backgroundColor: isDarkMode ? "rgba(40, 167, 69, 0.2)" : "rgba(40, 167, 69, 0.1)",
                        color: appleTheme.colors.success,
                        padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: appleTheme.typography.fontWeight.medium
                      }}>
                        {benefit}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Common Issues */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            Common Mobile Accessibility Issues
          </Typography>
          
          {commonMobileIssues.map((issue, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF"
            }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    {issue.issue}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    <strong>Problem:</strong> {issue.problem}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    <strong>Solution:</strong> {issue.solution}
                  </Typography>
                  <Box style={{
                    backgroundColor: issue.impact === "Critical" ? "rgba(220, 53, 69, 0.1)" : 
                                   issue.impact === "High" ? "rgba(255, 159, 67, 0.1)" : "rgba(255, 193, 7, 0.1)",
                    border: `1px solid ${issue.impact === "Critical" ? "rgba(220, 53, 69, 0.3)" : 
                                      issue.impact === "High" ? "rgba(255, 159, 67, 0.3)" : "rgba(255, 193, 7, 0.3)"}`,
                    padding: appleTheme.spacing[3],
                    borderRadius: appleTheme.borderRadius.md
                  }}>
                    <Typography variant="body" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                      fontWeight: appleTheme.typography.fontWeight.medium
                    }}>
                      <strong>Impact Level:</strong> {issue.impact}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Testing Strategies */}
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
            Mobile Accessibility Testing Strategies
          </Typography>
          
          <Stack spacing={4} style={{ marginBottom: appleTheme.spacing[6] }}>
            {testingStrategies.map((strategy, index) => (
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
                    {strategy.method}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    {strategy.description}
                  </Typography>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    Tools/Devices:
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    {strategy.devices ? strategy.devices.join(", ") : strategy.tools.join(", ")}
                  </Typography>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    Focus Areas:
                  </Typography>
                  <Flex gap={1} wrap="wrap">
                    {strategy.focus.map((focus, fIndex) => (
                      <Box key={fIndex} style={{
                        backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.2)" : "rgba(0, 122, 255, 0.1)",
                        color: "#007AFF",
                        padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: appleTheme.typography.fontWeight.medium
                      }}>
                        {focus}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Stack>
          
          <Box style={{ textAlign: "center" }}>
            <Link href="/tools/mobile-accessibility" style={{ textDecoration: "none" }}>
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
                Test Mobile Accessibility
              </Button>
            </Link>
          </Box>
        </Card>
      </Container>
    </div>
  );
}
