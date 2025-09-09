import React, { useState, useEffect } from "react";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import Input from "../components/apple/Input";
import Typography from "../components/apple/Typography";
import { Container, Box, Flex, Stack, Section } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";

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
  const { isDarkMode } = useTheme();
  const [url, setUrl] = useState("");
  const [violations, setViolations] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Load saved scan results on component mount
  useEffect(() => {
    const savedUrl = localStorage.getItem('scanUrl');
    const savedViolations = localStorage.getItem('scanViolations');
    
    if (savedUrl) {
      setUrl(savedUrl);
    }
    
    if (savedViolations) {
      try {
        setViolations(JSON.parse(savedViolations));
      } catch (error) {
        console.error('Error parsing saved violations:', error);
      }
    }
  }, []);

  // Debug violations state changes
  useEffect(() => {
    console.log('Violations state changed:', violations.length, violations);
  }, [violations]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScan = async () => {
    if (!url.trim()) return;
    
    console.log('Starting scan for URL:', url);
    setScanning(true);
    setViolations([]);
    setError("");

    try {
      // Add protocol if missing
      let scanUrl = url.trim();
      if (!scanUrl.startsWith('http://') && !scanUrl.startsWith('https://')) {
        scanUrl = 'https://' + scanUrl;
      }
      
      console.log('Fetching from API:', scanUrl);
      const res = await fetch(`/api/scan?url=${encodeURIComponent(scanUrl)}`);
      console.log('Response status:', res.status);
      
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) {
        throw new Error(data.error || 'Scan failed');
      }
      
      const newViolations = data.violations || [];
      console.log('Violations found:', newViolations.length, newViolations);
      
      // Save results to localStorage
      localStorage.setItem('scanUrl', url.trim());
      localStorage.setItem('scanViolations', JSON.stringify(newViolations));
      
      console.log('Setting violations state...');
      setViolations(newViolations);
      console.log('State should be updated now');
      
      // Force a re-render by updating a dummy state
      setTimeout(() => {
        console.log('Current violations state:', violations);
      }, 100);
      
    } catch (err) {
      console.error("Scan error:", err);
      setError(err.message || "Failed to scan website. Please try again.");
    }

    setScanning(false);
    console.log('Scan completed, scanning set to false');
  };

  const clearResults = () => {
    setUrl("");
    setViolations([]);
    setError("");
    localStorage.removeItem('scanUrl');
    localStorage.removeItem('scanViolations');
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

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div style={{ backgroundColor: themeColors.background.secondary, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Section background={isDarkMode ? "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: isMobile ? appleTheme.spacing[4] : appleTheme.spacing[6],
              color: isDarkMode ? '#FFFFFF' : '#000000',
              fontWeight: appleTheme.typography.fontWeight.bold,
              fontSize: isMobile ? "28px" : "48px",
              lineHeight: 1.1,
              padding: isMobile ? "0 20px" : "0"
            }}>
              Website Accessibility Checker
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: isDarkMode ? '#FFFFFF' : '#1C1C1E',
              marginBottom: isMobile ? appleTheme.spacing[6] : appleTheme.spacing[8],
              maxWidth: "600px",
              margin: isMobile ? `0 auto ${appleTheme.spacing[6]} auto` : `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium,
              fontSize: isMobile ? "16px" : "20px",
              lineHeight: 1.4,
              padding: isMobile ? "0 20px" : "0"
            }}>
              Scan your website for accessibility issues and get actionable insights 
              to make your content accessible to everyone.
            </Typography>
            
            {/* URL Input Section */}
            <Box style={{ 
              maxWidth: "600px", 
              margin: "0 auto",
              width: "100%",
              padding: isMobile ? "0 20px" : "0 16px"
            }}>
              <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "16px" : "12px",
                alignItems: "stretch"
              }}>
                <div style={{ 
                  flex: 1, 
                  width: "100%",
                  minWidth: 0
                }}>
                  <Input
                    placeholder="Enter website URL"
                    value={url}
                    onChange={setUrl}
                    size="large"
                    variant="filled"
                    startIcon={<SearchIcon />}
                    style={{
                      width: "100%",
                      fontSize: isMobile ? "16px" : "18px",
                      height: isMobile ? "48px" : "auto",
                      minHeight: "48px"
                    }}
                  />
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "12px" : "8px",
                  width: isMobile ? "100%" : "auto",
                  minWidth: isMobile ? "100%" : "auto"
                }}>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleScan}
                    disabled={scanning || !url.trim()}
                    loading={scanning}
                    style={{
                      width: isMobile ? "100%" : "140px",
                      backgroundColor: "#007AFF",
                      color: "white",
                      borderRadius: "9999px",
                      height: "48px",
                      minHeight: "48px",
                      fontSize: isMobile ? "16px" : "18px",
                      fontWeight: "600"
                    }}
                  >
                    {scanning ? "Scanning..." : "Scan Website"}
                  </Button>
                  {violations.length > 0 && (
                    <Button
                      variant="outline"
                      size="large"
                      onClick={clearResults}
                      style={{
                        width: isMobile ? "100%" : "120px",
                        borderRadius: "9999px",
                        height: "48px",
                        minHeight: "48px",
                        fontSize: isMobile ? "16px" : "18px"
                      }}
                    >
                      Clear Results
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Debug Display */}
              <Box style={{ marginTop: appleTheme.spacing[4] }}>
                <Typography 
                  variant="caption1" 
                  style={{ 
                    textAlign: "center",
                    padding: appleTheme.spacing[2],
                    backgroundColor: isDarkMode ? '#2C2C2E' : '#F2F2F7',
                    borderRadius: appleTheme.borderRadius.small,
                    fontSize: '12px'
                  }}
                >
                  Debug: Violations count: {violations.length}, Scanning: {scanning ? 'true' : 'false'}
                </Typography>
              </Box>

              {/* Error Display */}
              {error && (
                <Box style={{ marginTop: appleTheme.spacing[4] }}>
                  <Typography 
                    variant="body" 
                    color="error"
                    style={{ 
                      textAlign: "center",
                      padding: appleTheme.spacing[3],
                      backgroundColor: isDarkMode ? '#FF3B30' : '#FFEBEE',
                      borderRadius: appleTheme.borderRadius.medium,
                      border: `1px solid ${isDarkMode ? '#FF3B30' : '#FFCDD2'}`
                    }}
                  >
                    {error}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Results Section */}
        {violations.length > 0 && (
          <Section padding="lg">
            {/* Score Summary */}
            <Card variant="elevated" padding="large" style={{ 
              marginBottom: appleTheme.spacing[8],
              padding: isMobile ? "20px" : "24px"
            }}>
              <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "center" : "flex-start",
                justifyContent: isMobile ? "center" : "space-between",
                gap: isMobile ? "20px" : "24px",
                width: "100%"
              }}>
                <div style={{ 
                  textAlign: isMobile ? "center" : "left",
                  width: isMobile ? "100%" : "auto"
                }}>
                  <Typography variant="title2" style={{ 
                    marginBottom: appleTheme.spacing[2],
                    color: appleTheme.colors.text.primary,
                    fontSize: isMobile ? "20px" : "24px",
                    fontWeight: "600"
                  }}>
                    Accessibility Score
                  </Typography>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    justifyContent: isMobile ? "center" : "flex-start"
                  }}>
                    <div style={{ 
                      fontSize: isMobile ? "36px" : "48px", 
                      fontWeight: appleTheme.typography.fontWeight.bold,
                      color: getScoreColor(accessibilityScore),
                      lineHeight: 1
                    }}>
                      {accessibilityScore}
                    </div>
                    <div>
                      <Typography variant="body" color="secondary" style={{
                        fontSize: isMobile ? "14px" : "16px"
                      }}>
                        out of 100
                      </Typography>
                      <Typography variant="caption1" color="tertiary" style={{
                        fontSize: isMobile ? "12px" : "14px"
                      }}>
                        {violations.length} issues found
                      </Typography>
                    </div>
                  </div>
                </div>
                
                {/* Export Actions */}
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "12px" : "12px",
                  width: isMobile ? "100%" : "auto"
                }}>
                  <Button 
                    variant="outline" 
                    startIcon={<DownloadIcon />}
                    style={{
                      width: isMobile ? "100%" : "auto",
                      height: "44px",
                      minHeight: "44px",
                      fontSize: isMobile ? "16px" : "18px"
                    }}
                  >
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    startIcon={<EmailIcon />}
                    onClick={() => setEmailDialogOpen(true)}
                    style={{
                      width: isMobile ? "100%" : "auto",
                      height: "44px",
                      minHeight: "44px",
                      fontSize: isMobile ? "16px" : "18px"
                    }}
                  >
                    Email Report
                  </Button>
                </div>
              </Flex>
            </Card>

            {/* Violations List */}
            <Stack spacing={4}>
              <Typography variant="title3" style={{
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }}>
                Accessibility Issues ({violations.length})
              </Typography>
              
              {violations.map((violation, index) => (
                <Card key={index} variant="outlined" padding="large" style={{
                  marginBottom: appleTheme.spacing[4],
                  padding: isMobile ? "16px" : "24px"
                }}>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? "12px" : "16px"
                  }}>
                    <div style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "flex-start" : "center",
                      justifyContent: "space-between",
                      gap: isMobile ? "12px" : "16px",
                      width: "100%"
                    }}>
                      <div style={{ 
                        flex: 1, 
                        width: "100%",
                        minWidth: 0
                      }}>
                        <div style={{ 
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          marginBottom: isMobile ? "8px" : "12px"
                        }}>
                          <AlertIcon style={{
                            width: isMobile ? "16px" : "20px",
                            height: isMobile ? "16px" : "20px",
                            flexShrink: 0,
                            marginTop: "2px"
                          }} />
                          <Typography 
                            variant="callout" 
                            weight="semibold" 
                            style={{
                              color: isDarkMode ? '#FFFFFF' : '#000000',
                              fontSize: isMobile ? "14px" : "16px",
                              lineHeight: 1.4,
                              flex: 1
                            }}
                          >
                            {violation.help}
                          </Typography>
                        </div>
                        <div style={{ 
                          padding: isMobile ? "6px 12px" : "8px 16px",
                          backgroundColor: getStatusColor(violation.impact),
                          color: "white",
                          borderRadius: "6px",
                          fontSize: isMobile ? "11px" : "12px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          alignSelf: "flex-start",
                          display: "inline-block"
                        }}>
                          {violation.impact}
                        </div>
                      </div>
                    </div>
                        
                        <Typography variant="footnote" style={{ 
                          marginBottom: appleTheme.spacing[3],
                          color: isDarkMode ? '#E5E5EA' : '#1C1C1E'
                        }}>
                          {violation.description}
                        </Typography>
                        
                        {violation.nodes && violation.nodes.length > 0 && (
                          <Box style={{
                            backgroundColor: isDarkMode ? appleTheme.colors.dark.gray[200] : appleTheme.colors.gray[50],
                            padding: appleTheme.spacing[3],
                            borderRadius: appleTheme.borderRadius.md,
                            fontFamily: appleTheme.typography.fontFamily.mono,
                            fontSize: appleTheme.typography.fontSize.sm,
                            color: isDarkMode ? '#E5E5EA' : '#1C1C1E',
                            overflowX: "auto"
                          }}>
                            {violation.nodes[0].html}
                          </Box>
                        )}
                      </Box>
                    </Flex>
                    
                    {/* Fix Suggestion */}
                    <Box style={{
                      backgroundColor: isDarkMode ? appleTheme.colors.dark.gray[200] : appleTheme.colors.primary[50],
                      padding: appleTheme.spacing[3],
                      borderRadius: appleTheme.borderRadius.md,
                      borderLeft: `4px solid ${appleTheme.colors.primary[500]}`
                    }}>
                      <Flex align="flex-start" gap={2}>
                        <CheckIcon style={{ color: isDarkMode ? '#30D158' : appleTheme.colors.success }} />
                        <Box>
                          <Typography variant="footnote" weight="semibold" style={{ 
                            marginBottom: appleTheme.spacing[1],
                            color: isDarkMode ? '#FFFFFF' : '#000000'
                          }}>
                            How to fix:
                          </Typography>
                          <Typography variant="footnote" style={{
                            color: isDarkMode ? '#E5E5EA' : '#1C1C1E'
                          }}>
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
              <Typography variant="title1" style={{ 
                marginBottom: appleTheme.spacing[4],
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }}>
                Comprehensive Accessibility Testing
              </Typography>
              <Typography variant="body" style={{ 
                maxWidth: "600px", 
                margin: "0 auto",
                marginBottom: appleTheme.spacing[8],
                color: isDarkMode ? '#FFFFFF' : '#1C1C1E'
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
                    <Typography variant="callout" weight="semibold" style={{
                      color: isDarkMode ? '#FFFFFF' : '#000000'
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="footnote" style={{
                      color: isDarkMode ? '#E5E5EA' : '#1C1C1E'
                    }}>
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
