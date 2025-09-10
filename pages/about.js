import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import AnimatedGradient from "../components/apple/AnimatedGradient";
import { Container, Box, Flex, Stack, Section } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
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

// Icons (simplified SVG components)
const AccessibilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="4" r="2"/>
    <path d="M19 13v-2a7 7 0 0 0-14 0v2"/>
    <path d="M12 14l-3 6h6l-3-6z"/>
    <path d="M12 14v8"/>
  </svg>
);

const SpeedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
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

const SupportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12l2 2 4-4"/>
    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
    <path d="M13 12h3a2 2 0 0 1 2 2v1"/>
    <path d="M11 12H8a2 2 0 0 0-2 2v1"/>
  </svg>
);

const PeopleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
    <polyline points="17,6 23,6 23,12"/>
  </svg>
);

const BusinessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18"/>
    <path d="M5 21V7l8-4v18"/>
    <path d="M19 21V11l-6-4"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"/>
    <path d="M12 2C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

export default function About() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const stats = [
    { number: "1B+", label: "People with disabilities worldwide", icon: <PeopleIcon /> },
    { number: "71%", label: "Of users with disabilities leave sites due to poor accessibility", icon: <TrendingUpIcon /> },
    { number: "15%", label: "Of the global population has a disability", icon: <AccessibilityIcon /> },
    { number: "2.3x", label: "Higher conversion rates for accessible websites", icon: <BusinessIcon /> },
  ];

  const features = [
    {
      icon: <SpeedIcon />,
      title: "Lightning Fast Scans",
      description: "Get comprehensive accessibility reports in under 30 seconds. No more waiting around for slow, outdated tools."
    },
    {
      icon: <CodeIcon />,
      title: "Developer-Friendly",
      description: "Built by developers, for developers. Integrate seamlessly into your workflow with our API and CI/CD tools."
    },
    {
      icon: <DesignIcon />,
      title: "Design Integration",
      description: "Perfect for designers who want to ensure their creations work for everyone, not just the majority."
    },
    {
      icon: <SupportIcon />,
      title: "Expert Guidance",
      description: "Don't just find problems—learn how to fix them with our detailed guides and actionable recommendations."
    }
  ];

  const values = [
    {
      title: "Inclusion First",
      description: "We believe digital products should work for everyone, regardless of ability. Every decision we make is guided by this principle.",
      icon: <AccessibilityIcon />
    },
    {
      title: "Simplicity Matters",
      description: "Accessibility testing shouldn't be complicated. We've made it as simple as entering a URL and clicking scan.",
      icon: <LightbulbIcon />
    },
    {
      title: "Continuous Innovation",
      description: "The web evolves constantly, and so do we. We're always improving our tools to catch the latest accessibility issues.",
      icon: <RocketIcon />
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
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Making the Web Accessible, One Scan at a Time
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
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
                userSelect: "none"
              }}
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
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

      <Container size="lg" padding="lg">
        {/* Our Story */}
        <Section padding="lg">
          <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[12] }}>
            <Stack spacing={6} align="center">
              <Typography variant="title1" align="center" style={{
                color: isDarkMode ? "#FFFFFF" : "#000000"
              }}>
                Our Story
              </Typography>
              
              <Typography variant="body" align="center" style={{ 
                fontSize: appleTheme.typography.fontSize.lg,
                lineHeight: appleTheme.typography.lineHeight.relaxed,
                maxWidth: "800px",
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
              }}>
                It started with a simple observation: while working on web projects, we noticed that accessibility testing was always an afterthought—if it happened at all.
              </Typography>
              
              <Typography variant="body" align="center" style={{ 
                fontSize: appleTheme.typography.fontSize.lg,
                lineHeight: appleTheme.typography.lineHeight.relaxed,
                maxWidth: "800px",
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
              }}>
                We saw developers struggling with complex, expensive tools that took forever to run. We saw designers creating beautiful interfaces that worked great for some users but completely failed others. And most importantly, we saw millions of people being excluded from the digital world simply because their needs weren't considered.
              </Typography>

              <Typography variant="body" align="center" style={{ 
                fontSize: appleTheme.typography.fontSize.lg,
                lineHeight: appleTheme.typography.lineHeight.relaxed,
                maxWidth: "800px",
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
              }}>
                So we built ScanWeb—a tool that makes accessibility testing as simple as checking your email. No complex setup, no expensive licenses, no waiting around for results. Just enter a URL, click scan, and get actionable insights in seconds.
              </Typography>
            </Stack>
          </Card>

          {/* Statistics */}
          <Box style={{ marginBottom: appleTheme.spacing[12] }}>
            <Typography variant="title2" align="center" style={{ 
              marginBottom: appleTheme.spacing[8],
              color: isDarkMode ? "#FFFFFF" : "#000000"
            }}>
              The Numbers Don't Lie
            </Typography>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: appleTheme.spacing[6],
              width: "100%",
              alignItems: "start"
            }}>
              {stats.map((stat, index) => (
                <div key={index} style={{
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
                  height: "auto",
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
                    marginBottom: "8px"
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="footnote" align="center" style={{
                    color: isDarkMode ? "#AEAEB2" : "#1C1C1E",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    fontWeight: "500"
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
              color: isDarkMode ? "#FFFFFF" : "#000000"
            }}>
              Why Choose ScanWeb?
            </Typography>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: appleTheme.spacing[6],
              width: "100%",
              alignItems: "start"
            }}>
              {features.map((feature, index) => (
                <div key={index} style={{
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
                  height: "auto",
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
                    marginBottom: "16px"
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="callout" weight="semibold" style={{
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    lineHeight: 1.3
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="footnote" style={{
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    fontWeight: "400"
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
              color: isDarkMode ? "#FFFFFF" : "#000000"
            }}>
              Our Values
            </Typography>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: appleTheme.spacing[6],
              width: "100%",
              alignItems: "start"
            }}>
              {values.map((value, index) => (
                <div key={index} style={{
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
                  height: "auto",
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
                    alignItems: "flex-start", 
                    gap: "16px" 
                  }}>
                    <Box style={{ 
                      color: appleTheme.colors.primary[500],
                      flexShrink: 0,
                      marginTop: "4px"
                    }}>
                      {value.icon}
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="callout" weight="semibold" style={{ 
                        marginBottom: "12px",
                        color: isDarkMode ? "#FFFFFF" : "#000000",
                        fontSize: "18px",
                        fontWeight: "600",
                        lineHeight: 1.3
                      }}>
                        {value.title}
                      </Typography>
                      <Typography variant="footnote" style={{
                        color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                        fontSize: "14px",
                        lineHeight: 1.5,
                        fontWeight: "400"
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
                marginBottom: appleTheme.spacing[2]
              }}>
                Ready to Make Your Website Accessible?
        </Typography>
              <Typography variant="headline" style={{ 
                color: "white",
                opacity: 0.95,
                maxWidth: "600px",
                fontWeight: appleTheme.typography.fontWeight.medium,
                lineHeight: appleTheme.typography.lineHeight.relaxed
              }}>
                Join thousands of developers and designers who are already using ScanWeb to create more inclusive digital experiences.
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
                    userSelect: "none"
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
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
                  Start Scanning Now
                </button>
              </Box>
            </Stack>
          </Card>
        </Section>
      </Container>
    </div>
  );
}
