import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import AnimatedGradient from "../components/apple/AnimatedGradient";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";
import {
  Article as ArticleIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Palette as DesignIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Keyboard as KeyboardIcon,
  PhoneAndroid as PhoneAndroidIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle
} from "@mui/icons-material";

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

// Custom Icons (keeping only the ones not available in Material-UI)
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

export default function Resources() {
  const { isDarkMode } = useTheme();
  const articles = [
    {
      title: "10 Common Accessibility Issues and How to Fix Them",
      description: "Learn about the most frequent accessibility problems found on websites and practical solutions to resolve them.",
      category: "Beginner",
      readTime: "5 min read",
      publishDate: "December 15, 2024",
      icon: <ArticleIcon />,
      color: appleTheme.colors.primary[500],
      href: "/articles/10-common-accessibility-issues",
      available: true
    },
    {
      title: "WCAG 2.1 Compliance Guide: Complete Web Accessibility Standards",
      description: "Master the Web Content Accessibility Guidelines (WCAG) 2.1 to create inclusive, accessible websites that comply with international standards.",
      category: "Advanced",
      readTime: "8 min read",
      publishDate: "December 15, 2024",
      icon: <SchoolIcon />,
      color: appleTheme.colors.success,
      href: "/articles/wcag-2-1-compliance-guide",
      available: true
    },
    {
      title: "Color Contrast Accessibility: Complete Guide for Web Designers",
      description: "Master color contrast requirements to create accessible, inclusive designs that meet WCAG standards and provide excellent user experience.",
      category: "Design",
      readTime: "6 min read",
      publishDate: "December 15, 2024",
      icon: <DesignIcon />,
      color: "#FF6B35",
      href: "/articles/color-contrast-accessibility-guide",
      available: true
    },
    {
      title: "Screen Reader Optimization: Complete Accessibility Guide",
      description: "Learn how to optimize your website for screen readers and assistive technologies. Create inclusive experiences that work seamlessly with NVDA, JAWS, VoiceOver.",
      category: "Testing",
      readTime: "7 min read",
      publishDate: "December 15, 2024",
      icon: <RecordVoiceOverIcon />,
      color: appleTheme.colors.primary[600],
      href: "/articles/screen-reader-optimization-guide",
      available: true
    },
    {
      title: "Keyboard Navigation Accessibility: Complete Implementation Guide",
      description: "Master keyboard navigation patterns and focus management to create truly accessible web experiences for users who rely on keyboard-only interaction.",
      category: "Advanced",
      readTime: "9 min read",
      publishDate: "December 15, 2024",
      icon: <KeyboardIcon />,
      color: appleTheme.colors.warning,
      href: "/articles/keyboard-navigation-accessibility",
      available: true
    },
    {
      title: "Mobile Accessibility: Complete Best Practices Guide",
      description: "Master mobile accessibility to create inclusive experiences on smartphones and tablets. Learn essential techniques for touch interfaces and responsive design.",
      category: "Advanced",
      readTime: "8 min read",
      publishDate: "December 15, 2024",
      icon: <PhoneAndroidIcon />,
      color: appleTheme.colors.success,
      href: "/articles/mobile-accessibility-best-practices",
      available: true
    },
    {
      title: "Building Accessible React Components",
      description: "Best practices for creating accessible React components that work with screen readers and keyboard navigation.",
      category: "Development",
      readTime: "8 min read",
      publishDate: "Coming Soon",
      icon: <CodeIcon />,
      color: appleTheme.colors.warning,
      href: "/articles/accessible-react-components",
      available: false
    }
  ];

  const tools = [
    {
      name: "WebAIM Contrast Checker",
      description: "Online tool for checking color contrast ratios",
      url: "https://webaim.org/resources/contrastchecker/",
      category: "Design",
      features: [
        "Real-time contrast calculation",
        "WCAG compliance checking", 
        "Color blindness simulation"
      ]
    },
    {
      name: "Color Oracle",
      description: "Desktop application for color blindness simulation",
      url: "https://colororacle.org/",
      category: "Design",
      features: [
        "Real-time preview",
        "Multiple color blindness types",
        "Cross-platform support"
      ]
    },
    {
      name: "Stark Plugin",
      description: "Design tool plugin for accessibility testing",
      url: "https://www.getstark.co/",
      category: "Development",
      features: [
        "Figma/Sketch integration",
        "Contrast checking",
        "Color blindness simulation"
      ]
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Beginner": appleTheme.colors.primary[500],
      "Advanced": appleTheme.colors.success,
      "Development": appleTheme.colors.warning,
      "Design": "#FF6B35",
      "Testing": appleTheme.colors.primary[600]
    };
    return colors[category] || appleTheme.colors.gray[500];
  };

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
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[4],
              color: "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Accessibility Resources
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Learn, grow, and build more accessible digital experiences with our comprehensive guides and tools.
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Articles Section */}
        <Section padding="lg">
          <Typography variant="title2" style={{ 
            marginBottom: appleTheme.spacing[8],
            color: isDarkMode ? "#FFFFFF" : "#000000"
          }}>
            Articles & Guides
          </Typography>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: appleTheme.spacing[6],
            marginBottom: appleTheme.spacing[12]
          }}>
            {articles.map((article, index) => (
              <Link key={index} href={article.href} style={{ textDecoration: "none", display: "block" }}>
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
                    cursor: article.available ? "pointer" : "not-allowed",
                    opacity: article.available ? 1 : 0.6
                  }}
                  onClick={(e) => {
                    if (article.available) {
                      console.log("Article clicked:", article.href);
                    } else {
                      e.preventDefault();
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (article.available) {
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "#007AFF";
                      e.currentTarget.style.backgroundColor = "#F8F9FA";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (article.available) {
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "#E5E5EA";
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                    }
                  }}
                >
                    <Stack spacing={4}>
                      <Flex align="flex-start" justify="space-between" gap={3}>
                        <Box style={{ color: article.color, flexShrink: 0 }}>
                          {article.icon}
                        </Box>
                        <Box style={{
                          padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                          backgroundColor: getCategoryColor(article.category),
                          color: "white",
                          borderRadius: appleTheme.borderRadius.base,
                          fontSize: appleTheme.typography.fontSize.xs,
                          fontWeight: appleTheme.typography.fontWeight.semibold,
                          textTransform: "uppercase"
                        }}>
                          {article.category}
                        </Box>
                      </Flex>
                      
                      <Box>
                        <Typography variant="callout" weight="semibold" style={{ 
                          marginBottom: appleTheme.spacing[2],
                          color: isDarkMode ? "#FFFFFF" : "#000000"
                        }}>
                          {article.title}
                        </Typography>
                        <Typography variant="footnote" style={{
                          color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                        }}>
                          {article.description}
                        </Typography>
                      </Box>
                      
                      <HStack justify="space-between" align="center">
                        <HStack spacing={2} align="center">
                          <ClockIcon style={{ color: isDarkMode ? "#AEAEB2" : "#6D6D70" }} />
                          <Typography variant="caption1" style={{
                            color: isDarkMode ? "#AEAEB2" : "#6D6D70"
                          }}>
                            {article.readTime}
                          </Typography>
                        </HStack>
                        <HStack spacing={1} align="center">
                          <AccessTimeIcon style={{ 
                            color: isDarkMode ? "#AEAEB2" : "#6D6D70",
                            fontSize: "14px"
                          }} />
                          <Typography variant="caption1" style={{
                            color: isDarkMode ? "#AEAEB2" : "#6D6D70"
                          }}>
                            {article.publishDate}
                          </Typography>
                        </HStack>
                        
                        {article.available ? (
                          <Typography variant="caption1" weight="medium" style={{
                            color: isDarkMode ? "#007AFF" : appleTheme.colors.primary[500]
                          }}>
                            Read Article →
                          </Typography>
                        ) : (
                          <Typography variant="caption1" style={{
                            color: isDarkMode ? "#AEAEB2" : "#6D6D70"
                          }}>
                            Coming Soon
                          </Typography>
                        )}
                      </HStack>
                    </Stack>
                  </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Recommended Tools Section */}
        <Section padding="lg">
          <Typography variant="title2" style={{ marginBottom: appleTheme.spacing[8] }}>
            Recommended Tools
          </Typography>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: appleTheme.spacing[6],
            marginBottom: appleTheme.spacing[12]
          }}>
            {tools.map((tool, index) => (
              <Card key={index} variant="elevated" padding="xl" style={{
                backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.8)" : "#FFFFFF",
                border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA"}`,
                boxShadow: isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: appleTheme.spacing[6]
              }}>
                <Stack spacing={4}>
                  {/* Header with number and title */}
                  <Flex align="flex-start" gap={4}>
                    <Box style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#007AFF",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <Typography variant="title2" style={{ 
                        color: "white",
                        fontWeight: appleTheme.typography.fontWeight.bold,
                        fontSize: "20px"
                      }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="title2" style={{ 
                        fontWeight: appleTheme.typography.fontWeight.semibold,
                        color: isDarkMode ? "#FFFFFF" : "#000000",
                        marginBottom: appleTheme.spacing[2],
                        fontSize: "20px",
                        lineHeight: appleTheme.typography.lineHeight.tight
                      }}>
                        {tool.name}
                      </Typography>
                      <Typography variant="body" style={{ 
                        color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                        lineHeight: appleTheme.typography.lineHeight.relaxed,
                        fontSize: "16px"
                      }}>
                        {tool.description}
                      </Typography>
                    </Box>
                  </Flex>

                  {/* Features list */}
                  <Box>
                    <Stack spacing={2}>
                      {tool.features.map((feature, fIndex) => (
                        <Flex key={fIndex} align="center" gap={2}>
                          <CheckCircle style={{ 
                            color: "#28a745", 
                            fontSize: "18px",
                            flexShrink: 0
                          }} />
                          <Typography variant="body" style={{ 
                            color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                            fontSize: "15px"
                          }}>
                            {feature}
                          </Typography>
                        </Flex>
                      ))}
                    </Stack>
                  </Box>

                  {/* Footer with category and visit button */}
                  <Flex align="center" justify="space-between">
                    <Box style={{
                      padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                      backgroundColor: getCategoryColor(tool.category),
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: appleTheme.typography.fontWeight.medium,
                      color: "white"
                    }}>
                      {tool.category}
                    </Box>
                    
                    <a 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button 
                        variant="primary" 
                        size="medium"
                        style={{
                          backgroundColor: "#007AFF",
                          color: "white",
                          padding: `${appleTheme.spacing[2]} ${appleTheme.spacing[4]}`,
                          fontSize: "14px",
                          fontWeight: appleTheme.typography.fontWeight.medium
                        }}
                      >
                        Visit Tool
                      </Button>
                    </a>
                  </Flex>
                </Stack>
              </Card>
            ))}
          </div>
        </Section>

        {/* Newsletter Section */}
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
              Stay Updated
            </Typography>
            <Typography variant="headline" style={{ 
              color: "white",
              opacity: 0.95,
              maxWidth: "500px",
              fontWeight: appleTheme.typography.fontWeight.medium,
              lineHeight: appleTheme.typography.lineHeight.relaxed
            }}>
              Get the latest accessibility tips, guides, and industry news delivered to your inbox.
            </Typography>
            <HStack spacing={4} wrap="wrap" justify="center" style={{ marginTop: appleTheme.spacing[4] }}>
              <button
                onClick={(e) => {
                  console.log("Newsletter button clicked");
                  e.preventDefault();
                  e.stopPropagation();
                  // In a real app, this would open a newsletter signup modal or redirect to a signup page
                  alert("Newsletter signup coming soon! For now, you can contact us at hello@accessibility-saas.com");
                }}
                style={{
                  backgroundColor: "white",
                  color: "#007AFF",
                  fontWeight: appleTheme.typography.fontWeight.semibold,
                  padding: `${appleTheme.spacing[4]} ${appleTheme.spacing[8]}`,
                  borderRadius: appleTheme.borderRadius.lg,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "48px",
                  minWidth: "200px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F8F9FA";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                }}
              >
                Subscribe to Newsletter
              </button>
              <button
                onClick={(e) => {
                  console.log("Twitter button clicked");
                  e.preventDefault();
                  e.stopPropagation();
                  window.open("https://twitter.com/accessibility_saas", "_blank");
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  padding: `${appleTheme.spacing[4]} ${appleTheme.spacing[8]}`,
                  borderRadius: appleTheme.borderRadius.lg,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "48px",
                  minWidth: "200px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Follow on Twitter
              </button>
            </HStack>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}
