import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import AnimatedGradient from "../components/apple/AnimatedGradient";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import Link from "next/link";
import {
  Article,
  GraduationCap,
  Code,
  Palette,
  Microphone,
  Keyboard,
  DeviceMobile,
  Clock,
  CheckCircle,
  Download,
  ArrowSquareOut,
  Tag
} from "phosphor-react";

// Icon aliases for compatibility
const ArticleIcon = Article;
const SchoolIcon = GraduationCap;
const CodeIcon = Code;
const DesignIcon = Palette;
const RecordVoiceOverIcon = Microphone;
const KeyboardIcon = Keyboard;
const PhoneAndroidIcon = DeviceMobile;
const AccessTimeIcon = Clock;

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

// Custom Icons with Phosphor React
const DownloadIcon = () => <Download size={16} weight="regular" />;
const ExternalLinkIcon = () => <ArrowSquareOut size={16} weight="regular" />;
const ClockIcon = () => <Clock size={16} weight="regular" />;
const TagIcon = () => <Tag size={16} weight="regular" />;

export default function Resources() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const allCategoryLabel = t("resources.categoryAll");
  const [selectedCategory, setSelectedCategory] = useState(allCategoryLabel);
  
  const articles = [
    {
      title: t("resources.article1Title"),
      description: t("resources.article1Desc"),
      category: t("resources.categoryBeginner"),
      readTime: `5 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      icon: <ArticleIcon />,
      color: appleTheme.colors.primary[500],
      href: "/articles/10-common-accessibility-issues",
      available: true
    },
    {
      title: t("resources.article2Title"),
      description: t("resources.article2Desc"),
      category: t("resources.categoryAdvanced"),
      readTime: `8 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      icon: <SchoolIcon />,
      color: appleTheme.colors.success,
      href: "/articles/wcag-2-1-compliance-guide",
      available: true
    },
    {
      title: t("resources.article3Title"),
      description: t("resources.article3Desc"),
      category: t("resources.categoryDesign"),
      readTime: `6 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      icon: <DesignIcon />,
      color: "#FF6B35",
      href: "/articles/color-contrast-accessibility-guide",
      available: true
    },
    {
      title: t("resources.article4Title"),
      description: t("resources.article4Desc"),
      category: t("resources.categoryTesting"),
      readTime: `7 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      icon: <RecordVoiceOverIcon />,
      color: appleTheme.colors.primary[600],
      href: "/articles/screen-reader-optimization-guide",
      available: true
    },
    {
      title: t("resources.article5Title"),
      description: t("resources.article5Desc"),
      category: t("resources.categoryAdvanced"),
      readTime: `9 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      icon: <KeyboardIcon />,
      color: appleTheme.colors.warning,
      href: "/articles/keyboard-navigation-accessibility",
      available: true
    },
    {
      title: t("resources.article6Title"),
      description: t("resources.article6Desc"),
      category: t("resources.categoryAdvanced"),
      readTime: `8 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      icon: <PhoneAndroidIcon />,
      color: appleTheme.colors.success,
      href: "/articles/mobile-accessibility-best-practices",
      available: true
    },
    {
      title: t("resources.article7Title"),
      description: t("resources.article7Desc"),
      category: t("resources.categoryDevelopment"),
      readTime: `8 ${t("resources.minRead")}`,
      publishDate: t("resources.comingSoon"),
      icon: <CodeIcon />,
      color: appleTheme.colors.warning,
      href: "/articles/accessible-react-components",
      available: false
    }
  ];

  const tools = [
    {
      name: t("resources.toolWebAIM"),
      description: t("resources.toolWebAIMDesc"),
      url: "https://webaim.org/resources/contrastchecker/",
      category: t("resources.categoryDesign"),
      features: [
        t("resources.toolFeatureRealTime"),
        t("resources.toolFeatureWCAGCheck"), 
        t("resources.toolFeatureSimulation")
      ]
    },
    {
      name: t("resources.toolColorOracle"),
      description: t("resources.toolColorOracleDesc"),
      url: "https://colororacle.org/",
      category: t("resources.categoryDesign"),
      features: [
        t("resources.toolFeaturePreview"),
        t("resources.toolFeatureMultiple"),
        t("resources.toolFeatureCrossPlatform")
      ]
    },
    {
      name: t("resources.toolStark"),
      description: t("resources.toolStarkDesc"),
      url: "https://www.getstark.co/",
      category: t("resources.categoryDevelopment"),
      features: [
        t("resources.toolFeatureIntegration"),
        t("resources.toolFeatureScanning"),
        t("resources.toolFeatureSimulation")
      ]
    }
  ];

  const getCategoryColor = (category) => {
    // Map translated category names to colors
    const categoryMap = {
      [t("resources.categoryBeginner")]: appleTheme.colors.primary[500],
      [t("resources.categoryAdvanced")]: appleTheme.colors.success,
      [t("resources.categoryDevelopment")]: appleTheme.colors.warning,
      [t("resources.categoryDesign")]: "#FF6B35",
      [t("resources.categoryTesting")]: appleTheme.colors.primary[600]
    };
    return categoryMap[category] || appleTheme.colors.gray[500];
  };

  // Get unique categories for filter
  const categories = [allCategoryLabel, ...new Set(articles.map(article => article.category))];
  
  // Filter articles based on selected category
  const filteredArticles = selectedCategory === allCategoryLabel 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

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
              fontWeight: appleTheme.typography.fontWeight.bold,
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("resources.title")}
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium,
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("resources.subtitle")}
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Articles Section */}
        <Section padding="lg">
          <Box style={{ marginBottom: appleTheme.spacing[8] }}>
            <Typography variant="title2" style={{ 
              color: isDarkMode ? "#FFFFFF" : "#000000",
              marginBottom: appleTheme.spacing[6]
            }}>
              {t("resources.articlesAndGuides")}
            </Typography>
            
            {/* Filter Buttons */}
            <div style={{ 
              display: "flex",
              flexWrap: "wrap",
              gap: appleTheme.spacing[4],
              alignItems: "center"
            }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                    borderRadius: "16px",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: appleTheme.typography.fontWeight.medium,
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    backgroundColor: selectedCategory === category 
                      ? (category === allCategoryLabel ? appleTheme.colors.primary[500] : getCategoryColor(category))
                      : isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                    color: selectedCategory === category 
                      ? "white" 
                      : isDarkMode ? "#FFFFFF" : "#000000",
                    border: selectedCategory === category 
                      ? "none" 
                      : `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
                    fontFamily: "inherit",
                    minHeight: "28px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.backgroundColor = isDarkMode 
                        ? "rgba(255, 255, 255, 0.15)" 
                        : "rgba(0, 0, 0, 0.08)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.backgroundColor = isDarkMode 
                        ? "rgba(255, 255, 255, 0.1)" 
                        : "rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </Box>
          
          {/* Results counter */}
          <Typography variant="footnote" style={{ 
            color: isDarkMode ? "#AEAEB2" : "#6D6D70",
            marginBottom: appleTheme.spacing[6],
            fontSize: "14px"
          }}>
            {filteredArticles.length} {filteredArticles.length === 1 ? t("resources.article") : t("resources.articles")} 
            {selectedCategory !== allCategoryLabel && ` ${t("resources.inCategory")} ${selectedCategory}`}
          </Typography>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: appleTheme.spacing[4],
            marginBottom: appleTheme.spacing[12]
          }}>
            {filteredArticles.map((article, index) => (
              <Link key={index} href={article.href} style={{ textDecoration: "none", display: "block" }}>
                <div 
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E5EA",
                    borderRadius: "12px",
                    padding: "16px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    height: "160px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: 1,
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
                    {/* Category badge in top-right corner */}
                    <Box style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                      backgroundColor: getCategoryColor(article.category),
                      color: "white",
                      borderRadius: "12px",
                      fontSize: "10px",
                      fontWeight: appleTheme.typography.fontWeight.semibold,
                      textTransform: "uppercase",
                      zIndex: 2
                    }}>
                      {article.category}
                    </Box>
                    
                    {/* Icon in top-left */}
                    <Box style={{ 
                      color: appleTheme.colors.primary[500], 
                      flexShrink: 0,
                      marginBottom: appleTheme.spacing[3],
                      marginTop: "4px",
                      padding: appleTheme.spacing[2],
                      backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(0, 122, 255, 0.05)",
                      borderRadius: appleTheme.borderRadius.md,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "fit-content"
                    }}>
                      {article.icon}
                    </Box>
                    
                    {/* Title with proper spacing */}
                    <Box style={{ 
                      flex: 1, 
                      marginBottom: appleTheme.spacing[3],
                      paddingRight: "60px" // Space for the badge
                    }}>
                      <Typography variant="callout" weight="semibold" style={{ 
                        color: isDarkMode ? "#FFFFFF" : "#000000",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: "1.3",
                        fontSize: "16px"
                      }}>
                        {article.title}
                      </Typography>
                    </Box>
                    
                    {/* Bottom content */}
                    <HStack justify="space-between" align="center">
                      <HStack spacing={2} align="center">
                        <ClockIcon style={{ color: isDarkMode ? "#AEAEB2" : "#6D6D70", fontSize: "14px" }} />
                        <Typography variant="caption1" style={{
                          color: isDarkMode ? "#AEAEB2" : "#6D6D70",
                          fontSize: "12px"
                        }}>
                          {article.readTime}
                        </Typography>
                      </HStack>
                      
                      {article.available ? (
                        <Typography variant="caption1" weight="medium" style={{
                          color: isDarkMode ? "#007AFF" : appleTheme.colors.primary[500],
                          fontSize: "12px"
                        }}>
                          {t("resources.readArticle")}
        </Typography>
                      ) : (
                        <Typography variant="caption1" style={{
                          color: isDarkMode ? "#AEAEB2" : "#6D6D70",
                          fontSize: "12px"
                        }}>
                          {t("resources.comingSoon")}
        </Typography>
                      )}
                    </HStack>
                  </div>
            </Link>
            ))}
          </div>
        </Section>

        {/* Recommended Tools Section */}
        <Section padding="lg">
          <Typography variant="title2" style={{ marginBottom: appleTheme.spacing[8] }}>
            {t("resources.recommendedTools")}
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
                        {t("resources.visitTool")}
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
              marginBottom: appleTheme.spacing[2],
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("resources.stayUpdated")}
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
              {t("resources.stayUpdatedDesc")}
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
                {t("resources.subscribeToNewsletter")}
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
