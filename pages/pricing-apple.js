import React from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import { Container, Box, Flex, Stack, Section } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";

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

export default function Pricing() {
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
      buttonText: "Get Started Free",
      buttonVariant: "outline",
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
      buttonVariant: "outline",
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

  return (
    <div style={{ backgroundColor: appleTheme.colors.background.secondary, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Section background="linear-gradient(135deg, #007AFF 0%, #5856D6 100%)" padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center", color: "white" }}>
            <Typography variant="display" color="white" style={{ marginBottom: appleTheme.spacing[4] }}>
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="headline" color="white" weight="regular" style={{ 
              opacity: 0.9,
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`
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
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: appleTheme.spacing[6],
            marginBottom: appleTheme.spacing[12]
          }}>
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                variant={plan.popular ? "elevated" : "outlined"} 
                padding="large"
                style={{
                  position: "relative",
                  border: plan.popular ? `2px solid ${appleTheme.colors.primary[500]}` : undefined
                }}
              >
                {plan.popular && (
                  <Box style={{
                    position: "absolute",
                    top: -appleTheme.spacing[3],
                    left: "50%",
                    transform: "translateX(-50%)",
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
                
                <Stack spacing={4}>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="title3" style={{ marginBottom: appleTheme.spacing[2] }}>
                      {plan.name}
                    </Typography>
                    <Flex align="baseline" justify="center" gap={1}>
                      <Typography variant="display" color="primary" weight="bold">
                        {plan.price}
                      </Typography>
                      <Typography variant="footnote" color="tertiary">
                        {plan.period}
                      </Typography>
                    </Flex>
                    <Typography variant="footnote" color="secondary" style={{ marginTop: appleTheme.spacing[2] }}>
                      {plan.description}
                    </Typography>
                  </Box>

                  <Box>
                    <Stack spacing={2}>
                      {plan.features.map((feature, featureIndex) => (
                        <Flex key={featureIndex} align="center" gap={2}>
                          <CheckIcon style={{ color: isDarkMode ? '#30D158' : '#30D158', flexShrink: 0 }} />
                          <Typography variant="footnote" color="secondary">
                            {feature}
                          </Typography>
                        </Flex>
                      ))}
                    </Stack>
                  </Box>

                  <Button
                    variant={plan.buttonVariant}
                    fullWidth
                    size="large"
                    style={{
                      marginTop: appleTheme.spacing[4]
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </Stack>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <Box style={{ marginBottom: appleTheme.spacing[12] }}>
            <Typography variant="title2" align="center" style={{ marginBottom: appleTheme.spacing[8] }}>
              Why Choose ScanWeb?
            </Typography>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: appleTheme.spacing[6]
            }}>
              {features.map((feature, index) => (
                <Card key={index} variant="outlined" padding="large" hover>
                  <Stack spacing={3} align="center">
                    <Box style={{ color: isDarkMode ? '#007AFF' : appleTheme.colors.primary[500] }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="callout" weight="semibold" align="center">
                      {feature.title}
                    </Typography>
                    <Typography variant="footnote" color="secondary" align="center">
                      {feature.description}
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </div>
          </Box>

          {/* FAQ Section */}
          <Card variant="elevated" padding="xl">
            <Stack spacing={6}>
              <Typography variant="title2" align="center">
                Frequently Asked Questions
              </Typography>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                gap: appleTheme.spacing[6]
              }}>
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
                ].map((faq, index) => (
                  <Box key={index}>
                    <Typography variant="callout" weight="semibold" style={{ marginBottom: appleTheme.spacing[2] }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      {faq.answer}
                    </Typography>
                  </Box>
                ))}
              </div>
            </Stack>
          </Card>
        </Section>
      </Container>
    </div>
  );
}
