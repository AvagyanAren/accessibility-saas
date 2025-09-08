import React, { useState } from "react";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import Input from "../components/apple/Input";
import Typography from "../components/apple/Typography";
import { Container, Box, Flex, Stack, Section } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";

// Icons (simplified SVG components)
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Home() {
  const [url, setUrl] = useState("");
  const [violations, setViolations] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) return;
    
    setScanning(true);
    setViolations([]);

    try {
      // Add protocol if missing
      let scanUrl = url.trim();
      if (!scanUrl.startsWith('http://') && !scanUrl.startsWith('https://')) {
        scanUrl = 'https://' + scanUrl;
      }
      
      const res = await fetch(`/api/scan?url=${encodeURIComponent(scanUrl)}`);
      const data = await res.json();
      setViolations(data.violations || []);
    } catch (err) {
      console.error("Scan error:", err);
      // Could add a toast notification here
    }

    setScanning(false);
  };

  const calculateAccessibilityScore = (violations) => {
    if (!violations || violations.length === 0) return 100;
    
    const totalIssues = violations.length;
    const criticalIssues = violations.filter(v => v.impact === 'critical').length;
    const seriousIssues = violations.filter(v => v.impact === 'serious').length;
    const moderateIssues = violations.filter(v => v.impact === 'moderate').length;
    const minorIssues = violations.filter(v => v.impact === 'minor').length;
    
    const weightedScore = (criticalIssues * 25) + (seriousIssues * 15) + (moderateIssues * 8) + (minorIssues * 3);
    const maxPossibleScore = 100;
    const score = Math.max(0, maxPossibleScore - weightedScore);
    
    return Math.round(score);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return appleTheme.colors.success;
    if (score >= 70) return appleTheme.colors.warning;
    return appleTheme.colors.error;
  };

  const getStatusColor = (impact) => {
    switch (impact) {
      case "critical": return appleTheme.colors.error;
      case "serious": return "#FF6B35";
      case "moderate": return appleTheme.colors.warning;
      case "minor": return "#34C759";
      default: return appleTheme.colors.gray[500];
    }
  };

  const accessibilityScore = calculateAccessibilityScore(violations);

  return (
    <div style={{ backgroundColor: appleTheme.colors.background.secondary, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Section background="linear-gradient(135deg, #007AFF 0%, #5856D6 100%)" padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center", color: "white" }}>
            <Typography variant="display" color="white" style={{ marginBottom: appleTheme.spacing[6] }}>
              Website Accessibility Checker
            </Typography>
            <Typography variant="headline" color="white" weight="regular" style={{ 
              opacity: 0.9, 
              marginBottom: appleTheme.spacing[8],
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`
            }}>
              Scan your website for accessibility issues and get actionable insights 
              to make your content accessible to everyone.
            </Typography>
            
            {/* URL Input Section */}
            <Box style={{ maxWidth: "600px", margin: "0 auto" }}>
              <Flex gap={3} align="stretch">
                <Box style={{ flex: 1 }}>
                  <Input
                    placeholder="Enter website URL (e.g., https://example.com)"
                    value={url}
                    onChange={setUrl}
                    size="large"
                    variant="filled"
                    startIcon={<SearchIcon />}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "white"
                    }}
                  />
                </Box>
                <Button
                  variant="secondary"
                  size="large"
                  onClick={handleScan}
                  disabled={scanning || !url.trim()}
                  loading={scanning}
                  style={{
                    backgroundColor: "white",
                    color: appleTheme.colors.primary[500],
                    fontWeight: appleTheme.typography.fontWeight.semibold,
                    minWidth: "140px"
                  }}
                >
                  {scanning ? "Scanning..." : "Scan Website"}
                </Button>
              </Flex>
            </Box>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Results Section */}
        {violations.length > 0 && (
          <Section padding="lg">
            {/* Score Summary */}
            <Card variant="elevated" padding="large" style={{ marginBottom: appleTheme.spacing[8] }}>
              <Flex direction="row" align="center" justify="space-between" wrap="wrap" gap={6}>
                <Box>
                  <Typography variant="title2" style={{ marginBottom: appleTheme.spacing[2] }}>
                    Accessibility Score
                  </Typography>
                  <Flex align="center" gap={4}>
                    <Box style={{ 
                      fontSize: "48px", 
                      fontWeight: appleTheme.typography.fontWeight.bold,
                      color: getScoreColor(accessibilityScore)
                    }}>
                      {accessibilityScore}
                    </Box>
                    <Box>
                      <Typography variant="body" color="secondary">
                        out of 100
                      </Typography>
                      <Typography variant="caption1" color="tertiary">
                        {violations.length} issues found
                      </Typography>
                    </Box>
                  </Flex>
                </Box>
                
                {/* Export Actions */}
                <Flex gap={3}>
                  <Button variant="outline" startIcon={<DownloadIcon />}>
                    Download PDF
                  </Button>
                  <Button variant="outline" startIcon={<EmailIcon />}>
                    Email Report
                  </Button>
                </Flex>
              </Flex>
            </Card>

            {/* Violations List */}
            <Stack spacing={4}>
              <Typography variant="title3">
                Accessibility Issues ({violations.length})
              </Typography>
              
              {violations.map((violation, index) => (
                <Card key={index} variant="outlined" padding="large">
                  <Stack spacing={3}>
                    <Flex align="flex-start" justify="space-between" gap={4}>
                      <Box style={{ flex: 1 }}>
                        <Flex align="center" gap={2} style={{ marginBottom: appleTheme.spacing[2] }}>
                          <AlertIcon />
                          <Typography variant="callout" weight="semibold">
                            {violation.help}
                          </Typography>
                          <Box style={{ 
                            padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                            backgroundColor: getStatusColor(violation.impact),
                            color: "white",
                            borderRadius: appleTheme.borderRadius.base,
                            fontSize: appleTheme.typography.fontSize.xs,
                            fontWeight: appleTheme.typography.fontWeight.semibold,
                            textTransform: "uppercase"
                          }}>
                            {violation.impact}
                          </Box>
                        </Flex>
                        
                        <Typography variant="footnote" color="secondary" style={{ marginBottom: appleTheme.spacing[3] }}>
                          {violation.description}
                        </Typography>
                        
                        {violation.nodes && violation.nodes.length > 0 && (
                          <Box style={{
                            backgroundColor: appleTheme.colors.gray[50],
                            padding: appleTheme.spacing[3],
                            borderRadius: appleTheme.borderRadius.md,
                            fontFamily: appleTheme.typography.fontFamily.mono,
                            fontSize: appleTheme.typography.fontSize.sm,
                            color: appleTheme.colors.text.secondary,
                            overflowX: "auto"
                          }}>
                            {violation.nodes[0].html}
                          </Box>
                        )}
                      </Box>
                    </Flex>
                    
                    {/* Fix Suggestion */}
                    <Box style={{
                      backgroundColor: appleTheme.colors.primary[50],
                      padding: appleTheme.spacing[3],
                      borderRadius: appleTheme.borderRadius.md,
                      borderLeft: `4px solid ${appleTheme.colors.primary[500]}`
                    }}>
                      <Flex align="flex-start" gap={2}>
                        <CheckIcon style={{ color: isDarkMode ? '#30D158' : appleTheme.colors.success }} />
                        <Box>
                          <Typography variant="footnote" weight="semibold" style={{ marginBottom: appleTheme.spacing[1] }}>
                            How to fix:
                          </Typography>
                          <Typography variant="footnote" color="secondary">
                            Review the element and ensure it follows accessibility best practices. 
                            Check WCAG guidelines for specific requirements.
                          </Typography>
                        </Box>
                      </Flex>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Section>
        )}

        {/* Features Section */}
        {violations.length === 0 && (
          <Section padding="lg">
            <Box style={{ textAlign: "center", marginBottom: appleTheme.spacing[12] }}>
              <Typography variant="title1" style={{ marginBottom: appleTheme.spacing[4] }}>
                Comprehensive Accessibility Testing
              </Typography>
              <Typography variant="body" color="secondary" style={{ 
                maxWidth: "600px", 
                margin: "0 auto",
                marginBottom: appleTheme.spacing[8]
              }}>
                Our advanced scanner checks your website against WCAG guidelines and provides 
                detailed reports with actionable recommendations.
              </Typography>
            </Box>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: appleTheme.spacing[6]
            }}>
              {[
                {
                  title: "WCAG Compliance",
                  description: "Comprehensive testing against Web Content Accessibility Guidelines 2.1 AA standards."
                },
                {
                  title: "Detailed Reports",
                  description: "Get specific recommendations for each accessibility issue found on your website."
                },
                {
                  title: "Export & Share",
                  description: "Download PDF reports or email results to your team for collaborative improvements."
                }
              ].map((feature, index) => (
                <Card key={index} variant="elevated" padding="large" hover>
                  <Stack spacing={3}>
                    <Typography variant="callout" weight="semibold">
                      {feature.title}
                    </Typography>
                    <Typography variant="footnote" color="secondary">
                      {feature.description}
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </div>
          </Section>
        )}
      </Container>
    </div>
  );
}
