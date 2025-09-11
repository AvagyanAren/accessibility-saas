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
  RecordVoiceOver,
  Headphones,
  VolumeUp,
  Accessibility,
} from "@mui/icons-material";
import Link from "next/link";

export default function ScreenReaderOptimizationGuide() {
  const { isDarkMode } = useTheme();
  
  const bestPractices = [
    {
      category: "Semantic HTML",
      icon: <Accessibility />,
      practices: [
        "Use proper heading hierarchy (h1, h2, h3, etc.)",
        "Implement landmark elements (header, nav, main, aside, footer)",
        "Use list elements (ul, ol, li) for navigation and content lists",
        "Apply appropriate form labels and fieldset elements"
      ],
      impact: "Provides clear structure and navigation landmarks"
    },
    {
      category: "Alternative Text",
      icon: <RecordVoiceOver />,
      practices: [
        "Write descriptive alt text for all images",
        "Use empty alt='' for decorative images",
        "Include context and purpose in alt descriptions",
        "Avoid redundant phrases like 'image of' or 'picture of'"
      ],
      impact: "Makes visual content accessible to screen reader users"
    },
    {
      category: "Focus Management",
      icon: <Headphones />,
      practices: [
        "Ensure logical tab order through interactive elements",
        "Provide visible focus indicators",
        "Use skip links for main content navigation",
        "Manage focus for dynamic content updates"
      ],
      impact: "Enables efficient keyboard navigation and orientation"
    },
    {
      category: "ARIA Labels",
      icon: <VolumeUp />,
      practices: [
        "Use aria-label for unlabeled interactive elements",
        "Implement aria-describedby for additional context",
        "Apply aria-expanded for collapsible content",
        "Use role attributes to clarify element purpose"
      ],
      impact: "Provides additional context and state information"
    }
  ];

  const commonIssues = [
    {
      issue: "Missing or generic alt text",
      problem: "Screen readers announce 'image' without context",
      solution: "Write descriptive alt text that conveys the image's purpose and content",
      example: "✗ alt='image' → ✓ alt='Chart showing 2023 sales growth of 15%'"
    },
    {
      issue: "Poor heading structure",
      problem: "Screen readers can't navigate content hierarchy effectively",
      solution: "Use proper heading levels in logical order (h1 → h2 → h3)",
      example: "✗ h1, h4, h2, h3 → ✓ h1, h2, h3, h3"
    },
    {
      issue: "Unlabeled form controls",
      problem: "Screen readers can't identify form field purposes",
      solution: "Associate labels with form controls using for/id attributes",
      example: "✗ <input type='text'> → ✓ <label for='email'>Email</label><input id='email' type='text'>"
    },
    {
      issue: "Missing skip links",
      problem: "Screen reader users must tab through navigation repeatedly",
      solution: "Provide skip links to main content and important sections",
      example: "✓ <a href='#main' class='skip-link'>Skip to main content</a>"
    }
  ];

  const testingMethods = [
    {
      method: "Screen Reader Testing",
      tools: ["NVDA (Windows)", "JAWS (Windows)", "VoiceOver (macOS/iOS)", "TalkBack (Android)"],
      description: "Test with actual screen reader software to experience real user interactions",
      tips: [
        "Learn basic screen reader commands",
        "Test with different screen readers",
        "Verify all content is accessible",
        "Check navigation flow and efficiency"
      ]
    },
    {
      method: "Automated Testing",
      tools: ["axe-core", "WAVE", "Lighthouse", "Pa11y"],
      description: "Use automated tools to identify common accessibility issues",
      tips: [
        "Run tests on all pages",
        "Fix critical issues first",
        "Combine with manual testing",
        "Test after each major change"
      ]
    },
    {
      method: "Keyboard Navigation",
      tools: ["Tab key", "Arrow keys", "Enter/Space", "Escape key"],
      description: "Navigate your site using only keyboard to test focus management",
      tips: [
        "Tab through all interactive elements",
        "Verify focus indicators are visible",
        "Test skip links functionality",
        "Ensure no keyboard traps exist"
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
              Screen Reader Optimization: Complete Accessibility Guide
            </Typography>
            
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Learn how to optimize your website for screen readers and assistive technologies. 
              Create inclusive experiences that work seamlessly with NVDA, JAWS, VoiceOver, and other screen readers.
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
                7 min read
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
                Screen Readers
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
            Why Screen Reader Optimization Matters
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            lineHeight: appleTheme.typography.lineHeight.relaxed,
            color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
          }}>
            Screen readers are essential assistive technologies used by millions of people with visual impairments. 
            These software applications convert digital text into synthesized speech or braille output, enabling users 
            to navigate and interact with websites, applications, and digital content. Proper optimization ensures 
            that screen reader users can access and understand your content effectively.
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
              <strong>SEO Advantage:</strong> Screen reader-optimized websites often rank higher because they have 
              better semantic structure, cleaner HTML, and improved user experience metrics. Search engines favor 
              well-structured, accessible content.
            </Typography>
          </Box>
        </Card>

        {/* Best Practices */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            Essential Screen Reader Best Practices
          </Typography>
          
          {bestPractices.map((category, index) => (
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
                  {category.icon}
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    {category.category}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {category.impact}
                  </Typography>
                </Box>
              </Flex>
              
              <Stack spacing={2}>
                {category.practices.map((practice, pIndex) => (
                  <Flex key={pIndex} align="flex-start" gap={2}>
                    <CheckCircle style={{ color: appleTheme.colors.success, marginTop: appleTheme.spacing[0.5] }} />
                    <Typography variant="body" style={{ 
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                    }}>
                      {practice}
                    </Typography>
                  </Flex>
                ))}
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
            Common Screen Reader Issues and Solutions
          </Typography>
          
          {commonIssues.map((item, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.8)" : "#FFFFFF"
            }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    {item.issue}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    <strong>Problem:</strong> {item.problem}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    <strong>Solution:</strong> {item.solution}
                  </Typography>
                  <Box style={{
                    backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.3)" : "#F8F9FA",
                    padding: appleTheme.spacing[3],
                    borderRadius: appleTheme.borderRadius.md,
                    fontFamily: "monospace",
                    fontSize: "14px",
                    border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E9ECEF"}`,
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {item.example}
                  </Box>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Testing Methods */}
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
            How to Test Screen Reader Compatibility
          </Typography>
          
          <Stack spacing={4} style={{ marginBottom: appleTheme.spacing[6] }}>
            {testingMethods.map((method, index) => (
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
                    {method.method}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    {method.description}
                  </Typography>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    <strong>Tools:</strong> {method.tools.join(", ")}
                  </Typography>
                  <Stack spacing={1}>
                    {method.tips.map((tip, tIndex) => (
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
              </Flex>
            ))}
          </Stack>
          
          <Box style={{ textAlign: "center" }}>
            <Link href="/tools/screen-reader-simulator" style={{ textDecoration: "none" }}>
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
                Test Screen Reader Compatibility
              </Button>
            </Link>
          </Box>
        </Card>
      </Container>
    </div>
  );
}
