import React, { useState, useEffect, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
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
  CaretLeft,
  CaretRight
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
const ARTICLES_PER_PAGE = 9;

export default function Resources() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const allCategoryLabel = t("resources.categoryAll");
  const [selectedCategory, setSelectedCategory] = useState(allCategoryLabel);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    setSelectedCategory(allCategoryLabel);
    setCurrentPage(1);
  }, [allCategoryLabel]);

  const articles = [
    {
      title: t("resources.article1Title"),
      description: t("resources.article1Desc"),
      category: t("resources.categoryBeginner"),
      readTime: `5 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      color: appleTheme.colors.primary[500],
      href: "/articles/10-common-accessibility-issues",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article2Title"),
      description: t("resources.article2Desc"),
      category: t("resources.categoryAdvanced"),
      readTime: `8 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      color: appleTheme.colors.success,
      href: "/articles/wcag-2-1-compliance-guide",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article3Title"),
      description: t("resources.article3Desc"),
      category: t("resources.categoryDesign"),
      readTime: `6 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      color: "#FF6B35",
      href: "/articles/color-contrast-accessibility-guide",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article4Title"),
      description: t("resources.article4Desc"),
      category: t("resources.categoryTesting"),
      readTime: `7 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      color: appleTheme.colors.primary[600],
      href: "/articles/screen-reader-optimization-guide",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article5Title"),
      description: t("resources.article5Desc"),
      category: t("resources.categoryAdvanced"),
      readTime: `9 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      color: appleTheme.colors.warning,
      href: "/articles/keyboard-navigation-accessibility",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article6Title"),
      description: t("resources.article6Desc"),
      category: t("resources.categoryAdvanced"),
      readTime: `8 ${t("resources.minRead")}`,
      publishDate: "December 15, 2024",
      color: appleTheme.colors.success,
      href: "/articles/mobile-accessibility-best-practices",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article7Title"),
      description: t("resources.article7Desc"),
      category: t("resources.categoryDevelopment"),
      readTime: `8 ${t("resources.minRead")}`,
      publishDate: "February 5, 2025",
      color: appleTheme.colors.warning,
      href: "/articles/accessible-react-components",
      image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article8Title"),
      description: t("resources.article8Desc"),
      category: t("resources.categoryBeginner"),
      readTime: `7 ${t("resources.minRead")}`,
      publishDate: "January 8, 2025",
      color: appleTheme.colors.primary[500],
      href: "/articles/inclusive-form-design-checklist",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article9Title"),
      description: t("resources.article9Desc"),
      category: t("resources.categoryDesign"),
      readTime: `6 ${t("resources.minRead")}`,
      publishDate: "January 12, 2025",
      color: "#FF6B35",
      href: "/articles/accessible-typography-best-practices",
      image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article10Title"),
      description: t("resources.article10Desc"),
      category: t("resources.categoryDevelopment"),
      readTime: `9 ${t("resources.minRead")}`,
      publishDate: "January 18, 2025",
      color: appleTheme.colors.warning,
      href: "/articles/aria-landmarks-explained",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article11Title"),
      description: t("resources.article11Desc"),
      category: t("resources.categoryTesting"),
      readTime: `7 ${t("resources.minRead")}`,
      publishDate: "January 24, 2025",
      color: appleTheme.colors.primary[600],
      href: "/articles/accessibility-testing-toolkit",
      image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article12Title"),
      description: t("resources.article12Desc"),
      category: t("resources.categoryAdvanced"),
      readTime: `10 ${t("resources.minRead")}`,
      publishDate: "January 28, 2025",
      color: appleTheme.colors.success,
      href: "/articles/accessible-content-strategy",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article13Title"),
      description: t("resources.article13Desc"),
      category: t("resources.categoryBeginner"),
      readTime: `5 ${t("resources.minRead")}`,
      publishDate: "February 2, 2025",
      color: appleTheme.colors.primary[500],
      href: "/articles/getting-started-with-accessibility-audit",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article14Title"),
      description: t("resources.article14Desc"),
      category: t("resources.categoryDesign"),
      readTime: `6 ${t("resources.minRead")}`,
      publishDate: "February 6, 2025",
      color: "#FF6B35",
      href: "/articles/designing-accessible-dark-modes",
      image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article15Title"),
      description: t("resources.article15Desc"),
      category: t("resources.categoryDevelopment"),
      readTime: `8 ${t("resources.minRead")}`,
      publishDate: "February 10, 2025",
      color: appleTheme.colors.warning,
      href: "/articles/state-management-accessibility",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article16Title"),
      description: t("resources.article16Desc"),
      category: t("resources.categoryTesting"),
      readTime: `7 ${t("resources.minRead")}`,
      publishDate: "February 15, 2025",
      color: appleTheme.colors.primary[600],
      href: "/articles/manual-accessibility-testing-guide",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80",
      available: true
    },
    {
      title: t("resources.article17Title"),
      description: t("resources.article17Desc"),
      category: t("resources.categoryAdvanced"),
      readTime: `11 ${t("resources.minRead")}`,
      publishDate: "February 20, 2025",
      color: appleTheme.colors.success,
      href: "/articles/enterprise-accessibility-program",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      available: true
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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    const totalPagesCount = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
    if (currentPage > totalPagesCount) {
      setCurrentPage(totalPagesCount);
    }
  }, [filteredArticles.length, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
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
      <Section background={isDarkMode ? "linear-gradient(135deg, rgba(28, 28, 30, 0.9) 0%, rgba(44, 44, 46, 0.9) 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} padding="lg">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[4],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold,
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("resources.title")}
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[5]} auto`,
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
        <Section padding="lg" style={{ paddingTop: appleTheme.spacing[6] }}>
          <Box style={{ 
            marginBottom: appleTheme.spacing[4],
            width: "100%"
          }}>
            <Box style={{
              width: "100%",
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.04)" : "#FFFFFF",
              borderRadius: appleTheme.borderRadius.xl,
              padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
              border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
              boxShadow: isDarkMode ? "0 8px 24px rgba(0, 0, 0, 0.35)" : "0 12px 30px rgba(15, 23, 42, 0.08)",
              maxWidth: "calc(3 * 300px + 2 * 16px)",
              margin: "0 auto"
            }}>
              {/* Filter Buttons + Pagination */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: appleTheme.spacing[3],
                width: "100%"
              }}>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: appleTheme.spacing[2],
                  alignItems: "center",
                  flex: "1 1 auto"
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
                          ? appleTheme.colors.primary[500]
                          : isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                        color: selectedCategory === category 
                          ? "white" 
                          : isDarkMode ? "#FFFFFF" : "#000000",
                        border: "none",
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

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: appleTheme.spacing[2],
                  marginLeft: "auto",
                  flexShrink: 0
                }}>
                  <Typography variant="caption1" style={{
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    letterSpacing: "0.3px"
                  }}>
                    {`${t("resources.paginationLabel")} ${currentPage} ${t("resources.paginationOf")} ${totalPages}`}
                  </Typography>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    aria-label={t("resources.paginationPrev")}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      opacity: currentPage === 1 ? 0.4 : 1,
                      transition: "all 0.2s ease-in-out"
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== 1) {
                        e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0,0,0,0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== 1) {
                        e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
                      }
                    }}
                  >
                    <CaretLeft size={16} weight="bold" color={isDarkMode ? "#FFFFFF" : "#1C1C1E"} />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    aria-label={t("resources.paginationNext")}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                      opacity: currentPage === totalPages ? 0.4 : 1,
                      transition: "all 0.2s ease-in-out"
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== totalPages) {
                        e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0,0,0,0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== totalPages) {
                        e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
                      }
                    }}
                  >
                    <CaretRight size={16} weight="bold" color={isDarkMode ? "#FFFFFF" : "#1C1C1E"} />
                  </button>
                </div>
              </div>
            </Box>
          </Box>
          
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: appleTheme.spacing[4],
            justifyContent: "flex-start",
            marginBottom: appleTheme.spacing[12],
            maxWidth: "calc(3 * 300px + 2 * 16px)",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            {paginatedArticles.map((article, index) => (
              <Link key={`${article.href}-${startIndex + index}`} href={article.href} style={{ textDecoration: "none", display: "block" }}>
                <div 
                  style={{
                    backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF",
                    border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA"}`,
                    borderRadius: "12px",
                    padding: "16px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: 1,
                    contain: "layout style",
                    cursor: article.available ? "pointer" : "not-allowed",
                    opacity: article.available ? 1 : 0.6,
                    flex: "0 0 300px",
                    maxWidth: "300px",
                    width: "100%"
                  }}
                  onClick={(e) => {
                    if (!article.available) {
                      e.preventDefault();
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (article.available) {
                      e.currentTarget.style.boxShadow = isDarkMode ? "0 8px 25px rgba(0, 0, 0, 0.5)" : "0 8px 25px rgba(0, 0, 0, 0.15)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "#007AFF";
                      e.currentTarget.style.backgroundColor = isDarkMode ? themeColors.gray[200] : "#F8F9FA";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (article.available) {
                      e.currentTarget.style.boxShadow = isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA";
                      e.currentTarget.style.backgroundColor = isDarkMode ? themeColors.background.tertiary : "#FFFFFF";
                    }
                  }}
                >
                    {/* Article image */}
                    <Box style={{
                      position: "relative",
                      margin: "-16px -16px 16px -16px",
                      height: "160px",
                      overflow: "hidden",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px"
                    }}>
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block"
                        }}
                      />
                      <Box style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                        backgroundColor: getCategoryColor(article.category),
                        color: "white",
                        borderRadius: "12px",
                        fontSize: "10px",
                        fontWeight: appleTheme.typography.fontWeight.medium,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        zIndex: 2
                      }}>
                        {article.category}
                      </Box>
                    </Box>

                    <Stack spacing={3} style={{ flex: 1 }}>
                      <Typography
                        variant="callout"
                        style={{
                          color: isDarkMode ? "#FFFFFF" : "#000000",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: "1.3",
                          fontSize: "16px",
                          fontWeight: appleTheme.typography.fontWeight.semibold,
                          marginBottom: appleTheme.spacing[2]
                        }}
                      >
                        {article.title}
                      </Typography>

                      <Typography
                        variant="body"
                        style={{
                          color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                          fontSize: "14px",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          marginTop: appleTheme.spacing[1],
                          fontWeight: appleTheme.typography.fontWeight.regular
                        }}
                      >
                        {article.description}
                      </Typography>
                    </Stack>

                    <HStack spacing={3} align="center" style={{ marginTop: appleTheme.spacing[3], width: "100%" }}>
                      <HStack spacing={2} align="center">
                        <ClockIcon style={{ color: isDarkMode ? "#AEAEB2" : "#6D6D70", fontSize: "14px" }} />
                        <Typography variant="caption1" style={{
                          color: isDarkMode ? "#AEAEB2" : "#6D6D70",
                          fontSize: "12px",
                          letterSpacing: "0.3px"
                        }}>
                          {article.readTime}
                        </Typography>
                      </HStack>
                      
                      {article.available ? (
                        <Typography variant="caption1" weight="medium" style={{
                          color: isDarkMode ? "#007AFF" : appleTheme.colors.primary[500],
                          fontSize: "12px",
                          letterSpacing: "0.3px"
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
              <Card
                key={index}
                variant="elevated"
                padding="none"
                style={{
                  padding: `${appleTheme.spacing[6]} ${appleTheme.spacing[5]}`,
                  borderRadius: appleTheme.borderRadius.xl,
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(28, 28, 30, 0.95) 0%, rgba(44, 44, 46, 0.82) 100%)"
                    : "linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(15, 23, 42, 0.08)",
                  boxShadow: isDarkMode
                    ? "0 22px 38px rgba(0, 0, 0, 0.5)"
                    : "0 20px 38px rgba(15, 23, 42, 0.14)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? "0 28px 48px rgba(0, 0, 0, 0.58)"
                    : "0 26px 48px rgba(15, 23, 42, 0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? "0 22px 38px rgba(0, 0, 0, 0.5)"
                    : "0 20px 38px rgba(15, 23, 42, 0.14)";
                }}
              >
                <Box style={{
                  position: "absolute",
                  inset: 0,
                  background: isDarkMode
                    ? "radial-gradient(circle at top right, rgba(10, 132, 255, 0.25), transparent 55%)"
                    : "radial-gradient(circle at top right, rgba(0, 122, 255, 0.15), transparent 55%)",
                  pointerEvents: "none"
                }} />

                <Stack spacing={5} style={{ position: "relative", zIndex: 1 }}>
                  <Flex align="center" justify="space-between" gap={4} wrap="wrap">
                    <Flex align="center" gap={4}>
                      <Box style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, #0A84FF 0%, #64D2FF 100%)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: appleTheme.typography.fontWeight.bold,
                        fontSize: "20px",
                        boxShadow: isDarkMode
                          ? "0 16px 26px rgba(10, 132, 255, 0.35)"
                          : "0 16px 26px rgba(10, 132, 255, 0.22)"
                      }}>
                        {index + 1}
                      </Box>
                      <Box>
                        <Typography variant="title3" style={{
                          fontWeight: appleTheme.typography.fontWeight.semibold,
                          color: isDarkMode ? "#FFFFFF" : "#000000",
                          marginBottom: appleTheme.spacing[2],
                          letterSpacing: "0.2px"
                        }}>
                          {tool.name}
                        </Typography>
                        <Typography variant="body" style={{
                          color: isDarkMode ? "rgba(235, 235, 245, 0.78)" : appleTheme.colors.text.secondary,
                          lineHeight: appleTheme.typography.lineHeight.relaxed,
                          fontSize: "15px",
                          maxWidth: "320px"
                        }}>
                          {tool.description}
                        </Typography>
                      </Box>
                    </Flex>

                    <Box style={{
                      padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                      borderRadius: "999px",
                      backgroundColor: getCategoryColor(tool.category),
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: appleTheme.typography.fontWeight.medium,
                      letterSpacing: "0.4px",
                      boxShadow: isDarkMode
                        ? "0 10px 20px rgba(0,0,0,0.25)"
                        : "0 8px 18px rgba(0,0,0,0.12)"
                    }}>
                      {tool.category}
                    </Box>
                  </Flex>

                    <Stack spacing={2}>
                      {tool.features.map((feature, fIndex) => (
                        <Flex
                          key={fIndex}
                          align="center"
                          gap={3}
                          style={{
                            padding: `${appleTheme.spacing[2]} ${appleTheme.spacing[3]}`,
                            borderRadius: appleTheme.borderRadius.lg,
                            backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                            border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(15, 23, 42, 0.05)"
                          }}
                        >
                          <Box style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: isDarkMode ? "rgba(48, 209, 88, 0.18)" : "rgba(48, 209, 88, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}>
                            <CheckCircle size={16} weight="bold" color="#30D158" />
                          </Box>
                          <Typography variant="body" style={{
                            color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                            fontSize: "15px",
                            letterSpacing: "0.15px"
                          }}>
                            {feature}
                          </Typography>
                        </Flex>
                      ))}
                    </Stack>

                  <Flex align="center" justify="flex-end" style={{ marginTop: appleTheme.spacing[2] }}>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="secondary"
                        size="small"
                        startIcon={<ExternalLinkIcon />}
                        style={{
                          backgroundColor: isDarkMode ? "rgba(10, 132, 255, 0.18)" : "#FFFFFF",
                          color: isDarkMode ? "#8AC6FF" : appleTheme.colors.primary[500],
                          border: isDarkMode
                            ? "1px solid rgba(10, 132, 255, 0.35)"
                            : `1px solid ${appleTheme.colors.primary[100]}`,
                          boxShadow: "none",
                          letterSpacing: "0.2px"
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
                  e.preventDefault();
                  e.stopPropagation();
                  window.open("https://twitter.com/accessibility_saas", "_blank");
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
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
                  minWidth: "200px",
                  marginLeft: appleTheme.spacing[4]
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.textShadow = "0 4px 12px rgba(0, 0, 0, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.textShadow = "none";
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
