import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import AnimatedGradient from "../components/apple/AnimatedGradient";
import { Container, Box, Flex, Stack, Section } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/router";

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

// Icons with Phosphor React
const AccessibilityIcon = () => <Accessibility size={24} weight="regular" />;
const SpeedIcon = () => <Lightning size={24} weight="fill" />;
const CodeIcon = () => <Code size={24} weight="regular" />;

const DesignIcon = () => <Lightbulb size={24} weight="regular" />;
const SupportIcon = () => <ShieldCheck size={24} weight="regular" />;
const PeopleIcon = () => <People size={24} weight="regular" />;
const TrendingUpIcon = () => <TrendingUp size={24} weight="regular" />;
const BusinessIcon = () => <Business size={24} weight="regular" />;
const LightbulbIcon = () => <Lightbulb size={24} weight="regular" />;
const RocketIcon = () => <Rocket size={24} weight="regular" />;
const CheckIcon = () => <Check size={16} weight="bold" />;

export default function About() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const stats = [
    { number: "1B+", label: t("about.stat1"), icon: <PeopleIcon /> },
    { number: "71%", label: t("about.stat2"), icon: <TrendingUpIcon /> },
    { number: "15%", label: t("about.stat3"), icon: <AccessibilityIcon /> },
    { number: "2.3x", label: t("about.stat4"), icon: <BusinessIcon /> },
  ];

  const features = [
    {
      icon: <SpeedIcon />,
      title: t("about.feature1Title"),
      description: t("about.feature1Desc")
    },
    {
      icon: <CodeIcon />,
      title: t("about.feature2Title"),
      description: t("about.feature2Desc")
    },
    {
      icon: <DesignIcon />,
      title: t("about.feature3Title"),
      description: t("about.feature3Desc")
    },
    {
      icon: <SupportIcon />,
      title: t("about.feature4Title"),
      description: t("about.feature4Desc")
    }
  ];

  const values = [
    {
      title: t("about.value1Title"),
      description: t("about.value1Desc"),
      icon: <AccessibilityIcon />
    },
    {
      title: t("about.value2Title"),
      description: t("about.value2Desc"),
      icon: <LightbulbIcon />
    },
    {
      title: t("about.value3Title"),
      description: t("about.value3Desc"),
      icon: <RocketIcon />
    }
  ];

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div className="about-page" style={{ 
      backgroundColor: themeColors.background.secondary, 
        minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <div className="about-background">
        <AnimatedGradient variant="subtle" intensity="medium" />
      </div>
      
      {/* Hero Section */}
      <Section className="about-hero" background="linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)" padding="xl">
        <Container size="lg">
          <Box className="about-hero__content" style={{ textAlign: "center" }}>
            <Typography variant="display" className="about-hero__title" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Making the Web Accessible, One Scan at a Time
            </Typography>
            <Typography variant="headline" weight="regular" className="about-hero__subtitle" style={{ 
              color: themeColors.text.secondary,
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              We're on a mission to make digital accessibility testing as simple as checking your email. 
              Because everyone deserves to access the web, regardless of their abilities.
            </Typography>
            <button
              className="about-hero__cta-button"
              style={{
                backgroundColor: "white",
                color: "#007AFF",
                fontWeight: "600",
                padding: "16px 32px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid #007AFF",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 12px rgba(0, 122, 255, 0.15)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                userSelect: "none",
                position: "relative",
                zIndex: 10
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                  router.push("/");
                } catch (error) {
                  window.location.href = "/";
                }
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#007AFF";
                e.target.style.color = "#FFFFFF";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 122, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#007AFF";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 122, 255, 0.15)";
              }}
            >
              Start Your First Scan
            </button>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg" className="about-content">
        {/* Our Story */}
        <Section className="about-story" padding="lg">
          <Card variant="elevated" padding="xl" className="about-story__card" style={{ marginBottom: appleTheme.spacing[12] }}>
            <Stack spacing={6} align="center">
              <Typography variant="title1" align="center" className="about-story__title" style={{
                color: isDarkMode ? "#FFFFFF" : "#000000",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("about.ourStory")}
              </Typography>
              
              <Typography variant="body" align="center" style={{ 
                fontSize: appleTheme.typography.fontSize.lg,
                lineHeight: appleTheme.typography.lineHeight.relaxed,
                maxWidth: "800px",
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("about.storyParagraph1")}
              </Typography>
              
              <Typography variant="body" align="center" style={{ 
                fontSize: appleTheme.typography.fontSize.lg,
                lineHeight: appleTheme.typography.lineHeight.relaxed,
                maxWidth: "800px",
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("about.storyParagraph2")}
              </Typography>

              <Typography variant="body" align="center" style={{ 
                fontSize: appleTheme.typography.fontSize.lg,
                lineHeight: appleTheme.typography.lineHeight.relaxed,
                maxWidth: "800px",
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("about.storyParagraph3")}
              </Typography>
            </Stack>
          </Card>

          {/* Statistics */}
          <Box className="about-stats" style={{ marginBottom: appleTheme.spacing[12] }}>
            <Typography variant="title2" align="center" className="about-stats__title" style={{ 
              marginBottom: appleTheme.spacing[8],
              color: isDarkMode ? "#FFFFFF" : "#000000",
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("about.theNumbers")}
            </Typography>
            
            <div className="about-stats__grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: appleTheme.spacing[8],
              width: "100%",
              alignItems: "center",
              justifyItems: "center"
            }}>
              {stats.map((stat, index) => (
                <div key={index} className="about-stats__card" style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5EA",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  height: "200px",
                  width: "100%",
                  maxWidth: "320px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: 1,
                  contain: "layout style",
                  textAlign: "center"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "#007AFF";
                  e.currentTarget.style.backgroundColor = "#F8F9FA";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#E5E5EA";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}>
                  <Box style={{ 
                    color: appleTheme.colors.primary[500],
                    marginBottom: appleTheme.spacing[2],
                    display: "flex",
                    justifyContent: "center"
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="title1" weight="bold" style={{
                    color: isDarkMode ? "#FFFFFF" : appleTheme.colors.primary[500],
                    fontSize: "32px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    textAlign: "center"
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="footnote" align="center" style={{
                    color: isDarkMode ? "#AEAEB2" : "#1C1C1E",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    fontWeight: "500",
                    textAlign: "center"
                  }}>
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div>
          </Box>

          {/* Features */}
          <Box style={{ marginBottom: appleTheme.spacing[12] }}>
            <Typography variant="title2" align="center" style={{ 
              marginBottom: appleTheme.spacing[8],
              color: isDarkMode ? "#FFFFFF" : "#000000",
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("about.whyChoose")}
            </Typography>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: appleTheme.spacing[8],
              width: "100%",
              alignItems: "center",
              justifyItems: "center"
            }}>
              {features.map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5EA",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  height: "200px",
                  width: "100%",
                  maxWidth: "320px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: 1,
                  contain: "layout style"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "#007AFF";
                  e.currentTarget.style.backgroundColor = "#F8F9FA";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#E5E5EA";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}>
                  <Box style={{ 
                    color: appleTheme.colors.primary[500],
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "center"
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="callout" weight="semibold" style={{
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    lineHeight: 1.3,
                    textAlign: "center",
                    wordBreak: "break-word",
                    overflowWrap: "break-word"
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="footnote" style={{
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    fontWeight: "400",
                    textAlign: "center",
                    wordBreak: "break-word",
                    overflowWrap: "break-word"
                  }}>
                    {feature.description}
                  </Typography>
                </div>
              ))}
            </div>
          </Box>

          {/* Values */}
          <Box style={{ marginBottom: appleTheme.spacing[12] }}>
            <Typography variant="title2" align="center" style={{ 
              marginBottom: appleTheme.spacing[8],
              color: isDarkMode ? "#FFFFFF" : "#000000",
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("about.ourValues")}
            </Typography>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: appleTheme.spacing[8],
              width: "100%",
              alignItems: "center",
              justifyItems: "center"
            }}>
              {values.map((value, index) => (
                <div key={index} style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5EA",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  height: "200px",
                  width: "100%",
                  maxWidth: "320px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: 1,
                  contain: "layout style"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "#007AFF";
                  e.currentTarget.style.backgroundColor = "#F8F9FA";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#E5E5EA";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}>
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center", 
                    gap: "16px",
                    textAlign: "center"
                  }}>
                    <Box style={{ 
                      color: appleTheme.colors.primary[500],
                      display: "flex",
                      justifyContent: "center"
                    }}>
                      {value.icon}
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="callout" weight="semibold" style={{ 
                        marginBottom: "12px",
                        color: isDarkMode ? "#FFFFFF" : "#000000",
                        fontSize: "18px",
                        fontWeight: "600",
                        lineHeight: 1.3,
                        textAlign: "center",
                        wordBreak: "break-word",
                        overflowWrap: "break-word"
                      }}>
                        {value.title}
                      </Typography>
                      <Typography variant="footnote" style={{
                        color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                        fontSize: "14px",
                        lineHeight: 1.5,
                        fontWeight: "400",
                        textAlign: "center",
                        wordBreak: "break-word",
                        overflowWrap: "break-word"
                      }}>
                        {value.description}
        </Typography>
                    </Box>
                  </div>
                </div>
              ))}
            </div>
          </Box>

          {/* Call to Action */}
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
                {t("about.readyToMake")}
        </Typography>
              <Typography variant="headline" style={{ 
                color: "white",
                opacity: 0.95,
                maxWidth: "600px",
                fontWeight: appleTheme.typography.fontWeight.medium,
                lineHeight: appleTheme.typography.lineHeight.relaxed,
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("about.joinThousands")}
        </Typography>
              <Box style={{ marginTop: appleTheme.spacing[4] }}>
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#007AFF",
                    fontWeight: "600",
                    padding: "16px 32px",
                    fontSize: "18px",
                    borderRadius: "12px",
                    border: "1px solid #007AFF",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 12px rgba(0, 122, 255, 0.15)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    userSelect: "none",
                    position: "relative",
                    zIndex: 10
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                      router.push("/");
                    } catch (error) {
                      window.location.href = "/";
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#007AFF";
                    e.target.style.color = "#FFFFFF";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 20px rgba(0, 122, 255, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#007AFF";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 122, 255, 0.15)";
                  }}
                >
                  {t("common.startScanning")}
                </button>
              </Box>
            </Stack>
          </Card>
        </Section>
      </Container>
    </div>
  );
}
