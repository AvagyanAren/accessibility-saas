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
  Keyboard,
  Tab,
  ArrowForward,
  Accessibility,
} from "@mui/icons-material";
import Link from "next/link";

export default function KeyboardNavigationAccessibility() {
  const { isDarkMode } = useTheme();
  
  const navigationPatterns = [
    {
      pattern: "Tab Navigation",
      key: "Tab",
      description: "Move forward through interactive elements",
      usage: "Primary navigation method for keyboard users",
      elements: ["Links", "Buttons", "Form controls", "Custom interactive elements"]
    },
    {
      pattern: "Shift + Tab",
      key: "Shift + Tab",
      description: "Move backward through interactive elements",
      usage: "Reverse navigation when you've gone too far",
      elements: ["All tabbable elements in reverse order"]
    },
    {
      pattern: "Arrow Keys",
      key: "Arrow Keys",
      description: "Navigate within grouped elements",
      usage: "Move between related options (radio buttons, menu items)",
      elements: ["Radio button groups", "Menu items", "List items", "Grid cells"]
    },
    {
      pattern: "Enter/Space",
      key: "Enter/Space",
      description: "Activate focused elements",
      usage: "Trigger actions on focused interactive elements",
      elements: ["Buttons", "Links", "Checkboxes", "Menu items"]
    },
    {
      pattern: "Escape",
      key: "Escape",
      description: "Close modals and cancel actions",
      usage: "Exit overlays, close dropdowns, cancel forms",
      elements: ["Modal dialogs", "Dropdown menus", "Form overlays", "Popups"]
    }
  ];

  const focusManagement = [
    {
      concept: "Focus Indicators",
      importance: "Critical",
      description: "Visual indication of which element currently has focus",
      implementation: [
        "Use CSS :focus pseudo-class",
        "Ensure 2px minimum outline width",
        "Maintain sufficient color contrast",
        "Make indicators visible on all backgrounds"
      ],
      example: "button:focus { outline: 2px solid #007AFF; outline-offset: 2px; }"
    },
    {
      concept: "Skip Links",
      importance: "High",
      description: "Quick navigation to main content areas",
      implementation: [
        "Provide skip to main content link",
        "Include skip to navigation link",
        "Make skip links visible on focus",
        "Position at the top of the page"
      ],
      example: "<a href='#main' class='skip-link'>Skip to main content</a>"
    },
    {
      concept: "Tab Order",
      importance: "Critical",
      description: "Logical sequence of focusable elements",
      implementation: [
        "Follow visual reading order",
        "Use tabindex='0' for custom elements",
        "Avoid tabindex='-1' unless necessary",
        "Test with keyboard-only navigation"
      ],
      example: "Use natural DOM order, avoid custom tabindex values"
    },
    {
      concept: "Focus Trapping",
      importance: "High",
      description: "Contain focus within modal dialogs",
      implementation: [
        "Trap focus in modal dialogs",
        "Return focus to trigger element",
        "Handle Escape key to close",
        "Prevent background scrolling"
      ],
      example: "Use focus-trap library or custom implementation"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Missing focus indicators",
      impact: "Users can't see which element is focused",
      solution: "Add visible focus styles to all interactive elements",
      code: "❌ No focus styles → ✅ button:focus { outline: 2px solid #007AFF; }"
    },
    {
      mistake: "Poor tab order",
      impact: "Navigation feels illogical and confusing",
      solution: "Follow visual reading order and logical flow",
      code: "❌ Random tabindex values → ✅ Natural DOM order"
    },
    {
      mistake: "Keyboard traps",
      impact: "Users get stuck and can't navigate away",
      solution: "Ensure all areas are reachable and escapable",
      code: "❌ Focus stuck in modal → ✅ Escape key closes modal"
    },
    {
      mistake: "Non-keyboard accessible custom elements",
      impact: "Custom components can't be used with keyboard",
      solution: "Add proper ARIA roles and keyboard event handlers",
      code: "❌ <div onclick='...'> → ✅ <button> or <div tabindex='0' role='button'>"
    }
  ];

  const testingChecklist = [
    {
      category: "Basic Navigation",
      items: [
        "All interactive elements are reachable via Tab",
        "Tab order follows logical reading sequence",
        "Focus indicators are clearly visible",
        "No keyboard traps exist"
      ]
    },
    {
      category: "Form Accessibility",
      items: [
        "All form fields are keyboard accessible",
        "Error messages are announced to screen readers",
        "Required fields are clearly marked",
        "Form submission works with Enter key"
      ]
    },
    {
      category: "Interactive Components",
      items: [
        "Dropdowns open/close with keyboard",
        "Modal dialogs trap focus properly",
        "Custom buttons respond to Enter/Space",
        "Menu items are navigable with arrow keys"
      ]
    },
    {
      category: "Content Navigation",
      items: [
        "Skip links work correctly",
        "Heading navigation is available",
        "Landmark navigation functions",
        "Search functionality is keyboard accessible"
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
              Keyboard Navigation Accessibility: Complete Implementation Guide
            </Typography>
            
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Master keyboard navigation patterns and focus management to create truly accessible web experiences. 
              Learn essential techniques for users who rely on keyboard-only interaction and assistive technologies.
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
                9 min read
              </Box>
              <Box style={{
                backgroundColor: "rgba(0, 122, 255, 0.1)",
                color: "#007AFF",
                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: appleTheme.typography.fontWeight.medium
              }}>
                Advanced
              </Box>
              <Box style={{
                backgroundColor: "rgba(0, 122, 255, 0.1)",
                color: "#007AFF",
                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: appleTheme.typography.fontWeight.medium
              }}>
                Keyboard
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
            Why Keyboard Navigation is Essential
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            lineHeight: appleTheme.typography.lineHeight.relaxed,
            color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
          }}>
            Keyboard navigation is fundamental to web accessibility. Many users rely on keyboard-only interaction 
            due to motor disabilities, visual impairments, or personal preference. Proper keyboard support ensures 
            that all users can access and interact with your website effectively, regardless of their input method.
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
              <strong>SEO Benefits:</strong> Keyboard-accessible websites often perform better in search rankings 
              because they provide superior user experience, reduce bounce rates, and are more likely to be 
              recommended by accessibility advocates and inclusive design communities.
            </Typography>
          </Box>
        </Card>

        {/* Navigation Patterns */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            Essential Keyboard Navigation Patterns
          </Typography>
          
          {navigationPatterns.map((pattern, index) => (
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
                  <Keyboard />
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    {pattern.pattern}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {pattern.description}
                  </Typography>
                </Box>
                <Box style={{
                  backgroundColor: "#007AFF",
                  color: "white",
                  padding: `${appleTheme.spacing[2]} ${appleTheme.spacing[4]}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  fontFamily: "monospace"
                }}>
                  {pattern.key}
                </Box>
              </Flex>
              
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    Usage:
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {pattern.usage}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body" weight="medium" style={{ 
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[2]
                  }}>
                    Applicable Elements:
                  </Typography>
                  <Flex gap={1} wrap="wrap">
                    {pattern.elements.map((element, eIndex) => (
                      <Box key={eIndex} style={{
                        backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.2)" : "rgba(0, 122, 255, 0.1)",
                        color: "#007AFF",
                        padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: appleTheme.typography.fontWeight.medium
                      }}>
                        {element}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Focus Management */}
        <Box style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000",
            fontWeight: appleTheme.typography.fontWeight.semibold,
            textAlign: "center"
          }}>
            Focus Management Best Practices
          </Typography>
          
          {focusManagement.map((concept, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.8)" : "#FFFFFF"
            }}>
              <Flex align="flex-start" gap={3} style={{ marginBottom: appleTheme.spacing[4] }}>
                <Box style={{
                  backgroundColor: concept.importance === "Critical" ? "#dc3545" : 
                                 concept.importance === "High" ? "#ff9f43" : "#28a745",
                  color: "white",
                  padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: appleTheme.typography.fontWeight.bold
                }}>
                  {concept.importance}
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="title2" style={{ 
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    {concept.concept}
                  </Typography>
                  <Typography variant="body" style={{ 
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {concept.description}
                  </Typography>
                </Box>
              </Flex>
              
              <Stack spacing={2} style={{ marginBottom: appleTheme.spacing[4] }}>
                {concept.implementation.map((item, iIndex) => (
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
              
              <Box style={{
                backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.3)" : "#F8F9FA",
                padding: appleTheme.spacing[3],
                borderRadius: appleTheme.borderRadius.md,
                fontFamily: "monospace",
                fontSize: "14px",
                border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E9ECEF"}`,
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
              }}>
                {concept.example}
              </Box>
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
            Common Keyboard Navigation Mistakes
          </Typography>
          
          {commonMistakes.map((mistake, index) => (
            <Card key={index} variant="elevated" padding="xl" style={{ 
              marginBottom: appleTheme.spacing[4],
              backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.8)" : "#FFFFFF"
            }}>
              <Stack spacing={3}>
                <Typography variant="title2" style={{ 
                  fontWeight: appleTheme.typography.fontWeight.semibold,
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  ❌ {mistake.mistake}
                </Typography>
                
                <Typography variant="body" style={{ 
                  color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                }}>
                  <strong>Impact:</strong> {mistake.impact}
                </Typography>
                
                <Typography variant="body" style={{ 
                  color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                }}>
                  <strong>Solution:</strong> {mistake.solution}
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
                  {mistake.code}
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Testing Checklist */}
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
            Keyboard Navigation Testing Checklist
          </Typography>
          
          <Stack spacing={4} style={{ marginBottom: appleTheme.spacing[6] }}>
            {testingChecklist.map((category, index) => (
              <Box key={index}>
                <Typography variant="title2" style={{ 
                  marginBottom: appleTheme.spacing[3],
                  color: isDarkMode ? "#FFFFFF" : "#000000",
                  fontWeight: appleTheme.typography.fontWeight.semibold
                }}>
                  {category.category}
                </Typography>
                <Stack spacing={2}>
                  {category.items.map((item, iIndex) => (
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
            ))}
          </Stack>
          
          <Box style={{ textAlign: "center" }}>
            <Link href="/tools/keyboard-navigator" passHref legacyBehavior>
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
                  Test Keyboard Navigation
                </Button>
              </a>
            </Link>
          </Box>
        </Card>
      </Container>
    </div>
  );
}
