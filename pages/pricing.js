import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import AnimatedGradient from "../components/apple/AnimatedGradient";
import { Container, Box, Flex, Stack, Section } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";

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

// Icons
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const HeadphonesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 14v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
    <path d="M21 14v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2z"/>
    <path d="M12 2a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

export default function Pricing() {
  const { isDarkMode } = useTheme();
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with accessibility testing",
      features: [
        "Up to 10 scans per month",
        "Basic accessibility report",
        "WCAG 2.1 AA compliance check",
        "Email support",
        "Community resources"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "primary",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For professionals who need comprehensive accessibility testing",
      features: [
        "Unlimited scans",
        "Advanced accessibility reports",
        "WCAG 2.1 AAA compliance check",
        "PDF and CSV export",
        "Email reports",
        "Priority support",
        "API access",
        "Custom integrations"
      ],
      buttonText: "Start Pro Trial",
      buttonVariant: "primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams and organizations with advanced needs",
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Advanced analytics dashboard",
        "Custom compliance frameworks",
        "Dedicated account manager",
        "SLA guarantee",
        "On-premise deployment",
        "Custom training sessions"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "primary",
      popular: false
    }
  ];

  const features = [
    {
      icon: <ZapIcon />,
      title: "Lightning Fast",
      description: "Get results in under 30 seconds"
    },
    {
      icon: <ShieldIcon />,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared"
    },
    {
      icon: <UsersIcon />,
      title: "Team Collaboration",
      description: "Share reports and work together"
    },
    {
      icon: <HeadphonesIcon />,
      title: "Expert Support",
      description: "Get help when you need it"
    }
  ];

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div className="pricing-page" style={{ 
      backgroundColor: themeColors.background.secondary, 
        minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <div className="pricing-background">
        <AnimatedGradient variant="subtle" intensity="low" />
      </div>
      
      {/* Hero Section */}
      <Section className="pricing-hero" background="linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)" padding="xl">
        <Container size="lg">
          <Box className="pricing-hero__content" style={{ textAlign: "center" }}>
            <Typography variant="display" className="pricing-hero__title" style={{ 
              marginBottom: appleTheme.spacing[4],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="headline" weight="regular" className="pricing-hero__subtitle" style={{ 
              color: themeColors.text.secondary,
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Choose the plan that fits your needs. Start free, upgrade anytime.
        </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Pricing Cards */}
        <Section padding="lg">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: appleTheme.spacing[4],
            marginBottom: appleTheme.spacing[16],
            alignItems: "center",
            justifyItems: "center",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            {plans.map((plan, index) => (
              <div 
                key={index} 
                style={{
                  backgroundColor: "#FFFFFF",
                  border: plan.popular ? "2px solid #007AFF" : "1px solid #E5E5EA",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: plan.popular ? "0 8px 25px rgba(0, 122, 255, 0.15)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  height: "610px",
                  width: "100%",
                  maxWidth: "320px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: plan.popular ? 2 : 1,
                  contain: "layout style",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.transform = plan.popular ? "scale(1.05) translateY(-3px)" : "translateY(-3px)";
                  e.currentTarget.style.borderColor = "#007AFF";
                  e.currentTarget.style.backgroundColor = "#F8F9FA";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = plan.popular ? "0 8px 25px rgba(0, 122, 255, 0.15)" : "0 1px 3px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = plan.popular ? "scale(1.05)" : "translateY(0)";
                  e.currentTarget.style.borderColor = plan.popular ? "#007AFF" : "#E5E5EA";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}
              >
                {plan.popular && (
                  <Box style={{
                    position: "absolute",
                    top: appleTheme.spacing[3],
                    right: appleTheme.spacing[3],
                    backgroundColor: appleTheme.colors.primary[500],
                    color: "white",
                    padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[3]}`,
                    borderRadius: appleTheme.borderRadius.full,
                    fontSize: appleTheme.typography.fontSize.sm,
                    fontWeight: appleTheme.typography.fontWeight.semibold
                  }}>
                    Most Popular
                  </Box>
                )}
                
                <Stack spacing={4} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <Box style={{ textAlign: "left" }}>
                    <Typography variant="title3" style={{ 
                      marginBottom: appleTheme.spacing[2],
                      color: isDarkMode ? "#FFFFFF" : "#000000"
                    }}>
                {plan.name}
              </Typography>
                    <Flex align="baseline" justify="flex-start" gap={1}>
                      <Typography variant="display" weight="bold" style={{
                        color: isDarkMode ? "#FFFFFF" : appleTheme.colors.primary[500]
                      }}>
                {plan.price}
              </Typography>
                      <Typography variant="footnote" style={{
                        color: isDarkMode ? "#AEAEB2" : "#6D6D70"
                      }}>
                        {plan.period}
                      </Typography>
                    </Flex>
                    <Typography variant="footnote" style={{ 
                      marginTop: appleTheme.spacing[2],
                      marginBottom: appleTheme.spacing[4],
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: 1.5,
                      padding: "12px 16px",
                      backgroundColor: isDarkMode ? "#2C2C2E" : "#F8F9FA",
                      borderRadius: "8px",
                      border: `1px solid ${isDarkMode ? "#3A3A3C" : "#E5E5EA"}`
                    }}>
                      {plan.description}
                    </Typography>
                  </Box>

                  <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Stack spacing={2} style={{ alignItems: "flex-start" }}>
                      {plan.features.map((feature, featureIndex) => (
                        <Flex key={featureIndex} align="center" gap={2} style={{ width: "100%" }}>
                          <CheckIcon style={{ 
                            color: isDarkMode ? "#30D158" : "#30D158", 
                            flexShrink: 0 
                          }} />
                          <Typography variant="footnote" style={{
                            color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                          }}>
                            {feature}
                          </Typography>
                        </Flex>
                      ))}
                    </Stack>
                  </Box>

                  <Button
                    variant="primary"
                    fullWidth
                    size="large"
                    onClick={(e) => {
                      console.log("Pricing button clicked:", plan.buttonText);
                      e.preventDefault();
                      e.stopPropagation();
                      if (plan.buttonText === "Start Free Trial") {
                        window.location.href = "/";
                      } else if (plan.buttonText === "Start Pro Trial") {
                        window.location.href = "/";
                      } else if (plan.buttonText === "Contact Sales") {
                        window.location.href = "mailto:sales@accessibility-saas.com";
                      }
                    }}
                    style={{
                      marginTop: "auto",
                      marginBottom: "16px",
                      backgroundColor: "#007AFF",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 20px",
                      minHeight: "44px",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.2s ease-in-out",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </Stack>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <Box style={{ marginBottom: appleTheme.spacing[12] }}>
            <Typography variant="title2" align="center" style={{ 
              marginBottom: appleTheme.spacing[8],
              color: isDarkMode ? "#FFFFFF" : "#000000"
            }}>
              Why Choose ScanWeb?
            </Typography>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: appleTheme.spacing[6]
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
                  <Stack spacing={3} align="center">
                    <Box style={{ color: isDarkMode ? "#007AFF" : appleTheme.colors.primary[500] }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="callout" weight="bold" align="center" style={{
                      color: isDarkMode ? "#FFFFFF" : "#000000"
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="footnote" weight="regular" align="center" style={{
                      color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                    }}>
                      {feature.description}
              </Typography>
                  </Stack>
                </div>
              ))}
            </div>
          </Box>

          {/* FAQ Section */}
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E5EA",
            borderRadius: "16px",
            padding: "32px",
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
          }}>
            <Stack spacing={6}>
              <Typography variant="title2" align="center" style={{
                color: isDarkMode ? "#FFFFFF" : "#000000"
              }}>
                Frequently Asked Questions
              </Typography>
              
              <Stack spacing={3}>
                {[
                  {
                    question: "Can I change plans anytime?",
                    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                  },
                  {
                    question: "What happens to my data if I cancel?",
                    answer: "Your data is safe. You can export all your reports before canceling, and we'll keep your data for 30 days."
                  },
                  {
                    question: "Do you offer refunds?",
                    answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked."
                  },
                  {
                    question: "Is there a free trial?",
                    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required."
                  }
                ].map((faq, index) => {
                  const isExpanded = expandedFAQ === index;
                  return (
                    <div key={index} style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E5EA",
                      borderRadius: "16px",
                      padding: "16px 16px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      minHeight: "56px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      zIndex: 1,
                      height: "auto",
                      contain: "layout style",
                      cursor: "pointer"
                    }}
                    onClick={() => setExpandedFAQ(isExpanded ? null : index)}
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
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center",
                        alignItems: "stretch",
                        flex: 1,
                        minHeight: "24px"
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          height: "24px"
                        }}>
                          <Typography variant="callout" weight="bold" style={{ 
                            color: isDarkMode ? "#FFFFFF" : "#1C1C1E",
                            flex: 1,
                            margin: 0,
                            fontSize: "16px",
                            lineHeight: 1.4,
                            letterSpacing: "0.01em"
                          }}>
                            {faq.question}
                          </Typography>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              padding: appleTheme.spacing[1],
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginLeft: appleTheme.spacing[2]
                            }}
                          >
                            <Box style={{
                              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s ease",
                              color: isDarkMode ? "#FFFFFF" : "#000000",
                              display: "flex",
                              alignItems: "center"
                            }}>
                              <ChevronDownIcon />
                            </Box>
                          </button>
                        </div>
                        
                        {isExpanded && (
                          <Box style={{ 
                            marginTop: appleTheme.spacing[3],
                            paddingTop: appleTheme.spacing[3],
                            borderTop: `1px solid ${isDarkMode ? appleTheme.colors.dark.gray[300] : appleTheme.colors.gray[200]}`
                          }}>
                            <Typography variant="body" style={{
                              color: isDarkMode ? "#AEAEB2" : "#6D6D70",
                              fontSize: "15px",
                              lineHeight: 1.5,
                              fontWeight: "400",
                              letterSpacing: "0.005em"
                            }}>
                              {faq.answer}
                            </Typography>
                          </Box>
                        )}
        </Box>
                    </div>
                  );
                })}
              </Stack>
            </Stack>
          </div>
        </Section>
      </Container>
    </div>
  );
}
