import React from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import Link from "next/link";

// Icons
const ArticleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

const SchoolIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6"/>
    <polyline points="8,6 2,12 8,18"/>
  </svg>
);

const DesignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

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
  const articles = [
    {
      title: "10 Common Accessibility Issues and How to Fix Them",
      description: "Learn about the most frequent accessibility problems found on websites and practical solutions to resolve them.",
      category: "Beginner",
      readTime: "5 min read",
      icon: <ArticleIcon />,
      color: appleTheme.colors.primary[500],
      href: "/articles/10-common-accessibility-issues",
      available: true
    },
    {
      title: "Complete Guide to WCAG 2.1 Guidelines",
      description: "Comprehensive overview of Web Content Accessibility Guidelines with real-world examples and implementation tips.",
      category: "Advanced",
      readTime: "15 min read",
      icon: <SchoolIcon />,
      color: appleTheme.colors.success,
      href: "/articles/wcag-2.1-guide",
      available: false
    },
    {
      title: "Building Accessible React Components",
      description: "Best practices for creating accessible React components that work with screen readers and keyboard navigation.",
      category: "Development",
      readTime: "8 min read",
      icon: <CodeIcon />,
      color: appleTheme.colors.warning,
      href: "/articles/accessible-react-components",
      available: false
    },
    {
      title: "Designing for Color Blindness",
      description: "How to create designs that are accessible to users with color vision deficiencies.",
      category: "Design",
      readTime: "6 min read",
      icon: <DesignIcon />,
      color: "#FF6B35",
      href: "/articles/designing-for-color-blindness",
      available: false
    },
    {
      title: "Accessibility Testing Checklist",
      description: "A comprehensive checklist to ensure your website meets accessibility standards before launch.",
      category: "Testing",
      readTime: "4 min read",
      icon: <ArticleIcon />,
      color: appleTheme.colors.primary[600],
      href: "/articles/accessibility-testing-checklist",
      available: false
    },
    {
      title: "Screen Reader Testing Guide",
      description: "Learn how to test your website with screen readers and ensure proper navigation.",
      category: "Testing",
      readTime: "10 min read",
      icon: <SchoolIcon />,
      color: appleTheme.colors.success,
      href: "/articles/screen-reader-testing",
      available: false
    }
  ];

  const tools = [
    {
      name: "WAVE Web Accessibility Evaluator",
      description: "Free web accessibility evaluation tool",
      url: "https://wave.webaim.org/",
      category: "Testing"
    },
    {
      name: "axe DevTools",
      description: "Browser extension for accessibility testing",
      url: "https://www.deque.com/axe/devtools/",
      category: "Development"
    },
    {
      name: "Color Oracle",
      description: "Color blindness simulator for Windows, Mac, and Linux",
      url: "https://colororacle.org/",
      category: "Design"
    },
    {
      name: "WebAIM Contrast Checker",
      description: "Check color contrast ratios for accessibility",
      url: "https://webaim.org/resources/contrastchecker/",
      category: "Design"
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
    <div style={{ backgroundColor: appleTheme.colors.background.secondary, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Section background="linear-gradient(135deg, #007AFF 0%, #5856D6 100%)" padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center", color: "white" }}>
            <Typography variant="display" color="white" style={{ marginBottom: appleTheme.spacing[4] }}>
              Accessibility Resources
            </Typography>
            <Typography variant="headline" color="white" weight="regular" style={{ 
              opacity: 0.9,
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`
            }}>
              Learn, grow, and build more accessible digital experiences with our comprehensive guides and tools.
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Articles Section */}
        <Section padding="lg">
          <Typography variant="title2" style={{ marginBottom: appleTheme.spacing[8] }}>
            Articles & Guides
          </Typography>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: appleTheme.spacing[6],
            marginBottom: appleTheme.spacing[12]
          }}>
            {articles.map((article, index) => (
              <Link key={index} href={article.href} passHref legacyBehavior>
                <a style={{ textDecoration: "none" }}>
                  <Card 
                    variant="elevated" 
                    padding="large" 
                    hover
                    style={{
                      height: "100%",
                      cursor: article.available ? "pointer" : "not-allowed",
                      opacity: article.available ? 1 : 0.6
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
                        <Typography variant="callout" weight="semibold" style={{ marginBottom: appleTheme.spacing[2] }}>
                          {article.title}
                        </Typography>
                        <Typography variant="footnote" color="secondary">
                          {article.description}
                        </Typography>
                      </Box>
                      
                      <HStack justify="space-between" align="center">
                        <HStack spacing={2} align="center">
                          <ClockIcon style={{ color: appleTheme.colors.text.tertiary }} />
                          <Typography variant="caption1" color="tertiary">
                            {article.readTime}
                          </Typography>
                        </HStack>
                        
                        {article.available ? (
                          <Typography variant="caption1" color="primary" weight="medium">
                            Read Article →
                          </Typography>
                        ) : (
                          <Typography variant="caption1" color="tertiary">
                            Coming Soon
                          </Typography>
                        )}
                      </HStack>
                    </Stack>
                  </Card>
                </a>
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
              <Card key={index} variant="outlined" padding="large" hover>
                <Stack spacing={3}>
                  <Flex align="flex-start" justify="space-between" gap={3}>
                    <Box>
                      <Typography variant="callout" weight="semibold" style={{ marginBottom: appleTheme.spacing[1] }}>
                        {tool.name}
                      </Typography>
                      <Typography variant="footnote" color="secondary">
                        {tool.description}
                      </Typography>
                    </Box>
                    <ExternalLinkIcon style={{ color: appleTheme.colors.text.tertiary, flexShrink: 0 }} />
                  </Flex>
                  
                  <HStack justify="space-between" align="center">
                    <Box style={{
                      padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                      backgroundColor: appleTheme.colors.gray[100],
                      borderRadius: appleTheme.borderRadius.base,
                      fontSize: appleTheme.typography.fontSize.xs,
                      fontWeight: appleTheme.typography.fontWeight.medium,
                      color: appleTheme.colors.text.secondary
                    }}>
                      {tool.category}
                    </Box>
                    
                    <a 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="ghost" size="small">
                        Visit Tool
                      </Button>
                    </a>
                  </HStack>
                </Stack>
              </Card>
            ))}
          </div>
        </Section>

        {/* Newsletter Section */}
        <Card variant="elevated" padding="xl" style={{ 
          background: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
          color: "white",
          textAlign: "center"
        }}>
          <Stack spacing={6} align="center">
            <Typography variant="title2" color="white">
              Stay Updated
            </Typography>
            <Typography variant="body" color="white" style={{ 
              opacity: 0.9,
              maxWidth: "500px"
            }}>
              Get the latest accessibility tips, guides, and industry news delivered to your inbox.
            </Typography>
            <HStack spacing={3} wrap="wrap" justify="center">
              <Button
                variant="secondary"
                size="large"
                style={{
                  backgroundColor: "white",
                  color: appleTheme.colors.primary[500],
                  fontWeight: appleTheme.typography.fontWeight.semibold
                }}
              >
                Subscribe to Newsletter
              </Button>
              <Button
                variant="outline"
                size="large"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "white"
                }}
              >
                Follow on Twitter
              </Button>
            </HStack>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}
