import React from "react";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Card from "../../components/apple/Card";
import { Container, Box, Flex, Stack, Section } from "../../components/apple/Layout";
import { appleTheme } from "../../styles/apple-theme";
import { useTheme } from "../../contexts/ThemeContext";
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  ArrowBack,
  OpenInNew,
} from "@mui/icons-material";
import Link from "next/link";

export default function CommonAccessibilityIssues() {
  const { isDarkMode } = useTheme();
  
  const issues = [
    {
      title: "Missing Alt Text for Images",
      severity: "Critical",
      color: "#dc3545",
      description: "Images without alternative text are invisible to screen readers, making content inaccessible to visually impaired users.",
      impact: "Users with visual impairments cannot understand what images contain or their purpose.",
      solution: "Add descriptive alt text to all images. Use empty alt='' for decorative images.",
      example: '<img src="chart.jpg" alt="Sales increased by 25% in Q3 2023" />',
      wcag: "1.1.1 Non-text Content (Level A)"
    },
    {
      title: "Poor Color Contrast",
      severity: "Critical",
      color: "#dc3545",
      description: "Text that doesn't have sufficient contrast against its background is difficult to read for users with visual impairments.",
      impact: "Users with low vision or color blindness cannot read the text content.",
      solution: "Ensure at least 4.5:1 contrast ratio for normal text, 3:1 for large text.",
      example: 'color: #333; background-color: #fff; /* 12.63:1 ratio */',
      wcag: "1.4.3 Contrast (Minimum) (Level AA)"
    },
    {
      title: "Missing Form Labels",
      severity: "Critical",
      color: "#dc3545",
      description: "Form inputs without proper labels are not announced correctly by screen readers.",
      impact: "Users cannot understand what information to enter in form fields.",
      solution: "Use <label> elements or aria-label attributes to associate labels with form controls.",
      example: '<label for="email">Email Address</label><input id="email" type="email" />',
      wcag: "1.3.1 Info and Relationships (Level A)"
    },
    {
      title: "Missing Page Titles",
      severity: "Serious",
      color: "#ff9f43",
      description: "Pages without descriptive titles make navigation difficult for screen reader users.",
      impact: "Users cannot identify which page they're on or distinguish between multiple tabs.",
      solution: "Add unique, descriptive <title> elements to every page.",
      example: '<title>Contact Us - Your Company Name</title>',
      wcag: "2.4.2 Page Titled (Level A)"
    },
    {
      title: "Incorrect Heading Structure",
      severity: "Serious",
      color: "#ff9f43",
      description: "Headings that don't follow a logical hierarchy make content structure unclear.",
      impact: "Screen reader users cannot understand the content structure and navigate efficiently.",
      solution: "Use heading levels in order (H1, H2, H3) without skipping levels.",
      example: '<h1>Main Title</h1><h2>Section</h2><h3>Subsection</h3>',
      wcag: "1.3.1 Info and Relationships (Level A)"
    },
    {
      title: "Missing Focus Indicators",
      severity: "Serious",
      color: "#ff9f43",
      description: "Interactive elements without visible focus indicators make keyboard navigation difficult.",
      impact: "Keyboard users cannot see which element is currently focused.",
      solution: "Ensure all interactive elements have visible focus indicators.",
      example: 'button:focus { outline: 2px solid #0077b6; }',
      wcag: "2.4.7 Focus Visible (Level AA)"
    },
    {
      title: "Non-Descriptive Link Text",
      severity: "Moderate",
      color: "#ffc107",
      description: "Links with generic text like 'click here' don't provide context about their destination.",
      impact: "Screen reader users cannot understand where links will take them.",
      solution: "Use descriptive link text that explains the destination or action.",
      example: '<a href="/contact">Contact our support team</a>',
      wcag: "2.4.4 Link Purpose (Level A)"
    },
    {
      title: "Missing Language Declaration",
      severity: "Moderate",
      color: "#ffc107",
      description: "Pages without language attributes make it difficult for screen readers to pronounce content correctly.",
      impact: "Screen readers may mispronounce words or use wrong voice settings.",
      solution: "Add lang attribute to the <html> element.",
      example: '<html lang="en">',
      wcag: "3.1.1 Language of Page (Level A)"
    },
    {
      title: "Missing Skip Links",
      severity: "Moderate",
      color: "#ffc107",
      description: "Long pages without skip links force keyboard users to navigate through repetitive content.",
      impact: "Keyboard users must tab through navigation and other repetitive elements repeatedly.",
      solution: "Add skip links to allow users to jump to main content.",
      example: '<a href="#main" class="skip-link">Skip to main content</a>',
      wcag: "2.4.1 Bypass Blocks (Level A)"
    },
    {
      title: "Inaccessible PDFs",
      severity: "Moderate",
      color: "#ffc107",
      description: "PDF documents without proper structure are not accessible to screen readers.",
      impact: "Users with assistive technologies cannot access PDF content.",
      solution: "Create accessible PDFs with proper headings, alt text, and reading order.",
      example: "Use PDF accessibility tools to add proper structure and metadata.",
      wcag: "1.1.1 Non-text Content (Level A)"
    }
  ];

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "Critical":
        return <Error style={{ color: "#dc3545" }} />;
      case "Serious":
        return <Warning style={{ color: "#ff9f43" }} />;
      case "Moderate":
        return <Info style={{ color: "#ffc107" }} />;
      default:
        return <CheckCircle style={{ color: "#28a745" }} />;
    }
  };

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
              10 Common Accessibility Issues and How to Fix Them
            </Typography>
            
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Learn about the most frequent accessibility problems found on websites and practical solutions to resolve them.
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
                5 min read
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
            Why Accessibility Matters
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            lineHeight: appleTheme.typography.lineHeight.relaxed,
            color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
          }}>
            Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites. 
            According to the World Health Organization, over 1 billion people worldwide have some form of disability. 
            Making your website accessible isn't just the right thing to do—it's also good for business, SEO, and user experience.
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
              <strong>Quick Tip:</strong> Many accessibility improvements benefit all users, not just those with disabilities. 
              Better contrast, clearer navigation, and descriptive text make your site more usable for everyone.
            </Typography>
          </Box>
        </Card>

        {/* Issues List */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            The 10 Most Common Issues
          </Typography>
          
          {issues.map((issue, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[6],
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA"}`,
              backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF",
              boxShadow: isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}>
              <Stack spacing={4}>
                {/* Header with icon, title, and severity badge */}
                <Flex align="flex-start" gap={3}>
                  <Box style={{
                    padding: appleTheme.spacing[2],
                    backgroundColor: `${issue.color}20`,
                    borderRadius: "12px",
                    color: issue.color,
                    flexShrink: 0
                  }}>
                    {getSeverityIcon(issue.severity)}
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Flex align="center" justify="space-between" style={{ marginBottom: appleTheme.spacing[2] }}>
                      <Typography variant="title2" style={{ 
                        fontWeight: appleTheme.typography.fontWeight.semibold,
                        color: isDarkMode ? "#FFFFFF" : "#000000",
                        fontSize: "20px",
                        lineHeight: appleTheme.typography.lineHeight.tight
                      }}>
                        {index + 1}. {issue.title}
                      </Typography>
                      <Box style={{
                        backgroundColor: issue.color,
                        color: "white",
                        padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: appleTheme.typography.fontWeight.medium
                      }}>
                        {issue.severity}
                      </Box>
                    </Flex>
                    <Typography variant="body" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                      lineHeight: appleTheme.typography.lineHeight.relaxed,
                      fontSize: "16px"
                    }}>
                      {issue.description}
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
                      {issue.impact}
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
                      {issue.solution}
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
                    {issue.example}
                  </Box>
                </Box>

                {/* WCAG Reference section */}
                <Box style={{
                  backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(0, 122, 255, 0.05)",
                  border: `1px solid ${isDarkMode ? "rgba(0, 122, 255, 0.3)" : "rgba(0, 122, 255, 0.2)"}`,
                  borderRadius: appleTheme.borderRadius.md,
                  padding: appleTheme.spacing[4]
                }}>
                  <Flex align="flex-start" gap={2} style={{ marginBottom: appleTheme.spacing[2] }}>
                    <Info style={{ color: "#007AFF", fontSize: "20px", marginTop: "2px" }} />
                    <Typography variant="body" weight="semibold" style={{ 
                      color: isDarkMode ? "#FFFFFF" : "#000000",
                      fontSize: "16px"
                    }}>
                      WCAG Reference
                    </Typography>
                  </Flex>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    lineHeight: appleTheme.typography.lineHeight.relaxed
                  }}>
                    {issue.wcag}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Conclusion */}
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
            Next Steps
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[6],
            lineHeight: appleTheme.typography.lineHeight.relaxed,
            color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
          }}>
            Start by addressing the critical issues first—missing alt text, poor contrast, and form labels. 
            These have the biggest impact on accessibility. Then work through the serious and moderate issues.
          </Typography>
          
          <Stack spacing={4} style={{ marginBottom: appleTheme.spacing[6] }}>
            <Flex align="flex-start" gap={3}>
              <CheckCircle style={{ color: appleTheme.colors.success, marginTop: appleTheme.spacing[0.5] }} />
              <Box>
                <Typography variant="body" weight="semibold" style={{ 
                  marginBottom: appleTheme.spacing[1],
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  Test your website with our free accessibility scanner
                </Typography>
                <Typography variant="body" style={{ 
                  color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                }}>
                  Get a comprehensive report with specific issues and fix suggestions
                </Typography>
              </Box>
            </Flex>
            <Flex align="flex-start" gap={3}>
              <CheckCircle style={{ color: appleTheme.colors.success, marginTop: appleTheme.spacing[0.5] }} />
              <Box>
                <Typography variant="body" weight="semibold" style={{ 
                  marginBottom: appleTheme.spacing[1],
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  Use our Color Contrast Checker tool
                </Typography>
                <Typography variant="body" style={{ 
                  color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                }}>
                  Test color combinations to ensure they meet WCAG standards
                </Typography>
              </Box>
            </Flex>
            <Flex align="flex-start" gap={3}>
              <CheckCircle style={{ color: appleTheme.colors.success, marginTop: appleTheme.spacing[0.5] }} />
              <Box>
                <Typography variant="body" weight="semibold" style={{ 
                  marginBottom: appleTheme.spacing[1],
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  Test with keyboard navigation
                </Typography>
                <Typography variant="body" style={{ 
                  color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                }}>
                  Try navigating your site using only the Tab key
                </Typography>
              </Box>
            </Flex>
          </Stack>
          
          <Box style={{ textAlign: "center" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
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
                Test Your Website Now
              </Button>
            </Link>
          </Box>
        </Card>
      </Container>
    </div>
  );
}
