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

// Professional feature icons
const AnalysisIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18"/>
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
  </svg>
);

const SpeedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const ComplianceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12l2 2 4-4"/>
    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
    <path d="M13 12h6"/>
    <path d="M5 12H1"/>
  </svg>
);

const ReportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

const SecurityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const SupportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
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
  const [inputFocused, setInputFocused] = useState(false);

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
    if (!url.trim()) {
      return;
    }
    
    setScanning(true);
    setViolations([]);
    setError("");
    setInputFocused(false);

    try {
      // Add protocol if missing
      let scanUrl = url.trim();
      if (!scanUrl.startsWith('http://') && !scanUrl.startsWith('https://')) {
        scanUrl = 'https://' + scanUrl;
      }
      
      const res = await fetch(`/api/scan?url=${encodeURIComponent(scanUrl)}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Scan failed');
      }
      
      const newViolations = data.violations || [];
      
      // Save results to localStorage
      localStorage.setItem('scanUrl', url.trim());
      localStorage.setItem('scanViolations', JSON.stringify(newViolations));
      
      setViolations(newViolations);
      
    } catch (err) {
      console.error("Scan error:", err);
      setError(err.message || "Failed to scan website. Please try again.");
    }

    setScanning(false);
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
    <div style={{ 
      backgroundColor: themeColors.background.secondary, 
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "-50%",
        left: "-50%",
        width: "200%",
        height: "200%",
        background: isDarkMode 
          ? "radial-gradient(circle at 20% 80%, rgba(0, 122, 255, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 122, 255, 0.15) 0%, transparent 50%)"
          : "radial-gradient(circle at 20% 80%, rgba(0, 122, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 122, 255, 0.2) 0%, transparent 50%)",
        animation: "float 20s ease-in-out infinite",
        zIndex: 0
      }} />
      
      <div style={{
        position: "absolute",
        top: "10%",
        right: "-20%",
        width: "40%",
        height: "40%",
        background: isDarkMode 
          ? "radial-gradient(circle, rgba(0, 122, 255, 0.2) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(0, 122, 255, 0.25) 0%, transparent 70%)",
        animation: "pulse 15s ease-in-out infinite",
        zIndex: 0
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "-30%",
        left: "10%",
        width: "60%",
        height: "60%",
        background: isDarkMode 
          ? "radial-gradient(circle, rgba(0, 122, 255, 0.18) 0%, transparent 60%)"
          : "radial-gradient(circle, rgba(0, 122, 255, 0.22) 0%, transparent 60%)",
        animation: "drift 25s ease-in-out infinite",
        zIndex: 0
      }} />
      {/* Hero Section */}
      <Section 
        background={isDarkMode ? "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} 
        padding="xl"
        style={{ paddingBottom: isMobile ? appleTheme.spacing[16] : appleTheme.spacing[20] }}
      >
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: isMobile ? appleTheme.spacing[4] : appleTheme.spacing[6],
              color: isDarkMode ? '#FFFFFF' : '#000000',
              fontWeight: appleTheme.typography.fontWeight.bold,
              fontSize: isMobile ? "32px" : "56px",
              lineHeight: 1.1,
              padding: isMobile ? "0 20px" : "0",
              background: isDarkMode 
                ? "linear-gradient(135deg, #FFFFFF 0%, #E5E5EA 100%)"
                : "linear-gradient(135deg, #1C1C1E 0%, #007AFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Make Your Website Accessible to Everyone
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: isDarkMode ? '#E5E5EA' : '#1C1C1E',
              marginBottom: isMobile ? appleTheme.spacing[6] : appleTheme.spacing[8],
              maxWidth: "700px",
              margin: isMobile ? `0 auto ${appleTheme.spacing[6]} auto` : `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium,
              fontSize: isMobile ? "18px" : "24px",
              lineHeight: 1.4,
              padding: isMobile ? "0 20px" : "0"
            }}>
              Get instant accessibility insights with our advanced AI-powered scanner. 
              Ensure your website meets WCAG 2.1 standards and create an inclusive digital experience for all users.
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
                flexDirection: "row",
                gap: "12px",
                alignItems: "flex-start",
                width: "100%"
              }}>
                <div style={{ 
                  flex: 1, 
                  position: "relative",
                  width: "100%"
                }}>
                  <div style={{ 
                    position: "relative", 
                    width: "100%",
                    height: "54px",
                    backgroundColor: inputFocused ? "#FFFFFF" : (url.trim() ? "transparent" : "#F2F2F7"),
                    border: `1px solid ${inputFocused ? "#007AFF" : (url.trim() ? "#007AFF" : "#D1D1D6")}`,
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: inputFocused ? "0 0 0 4px rgba(0, 122, 255, 0.1)" : "0 2px 8px rgba(0, 0, 0, 0.04)"
                  }}>
                    <div style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#8E8E93",
                      fontSize: "20px",
                      pointerEvents: "none",
                      zIndex: 10
                    }}>
                      <SearchIcon />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter website URL"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleScan();
                        }
                      }}
                      onFocus={(e) => {
                        setInputFocused(true);
                      }}
                      onBlur={(e) => {
                        setInputFocused(false);
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingLeft: "48px",
                        paddingRight: "16px",
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        fontSize: "18px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        color: "#000000",
                        zIndex: 1,
                        position: "relative",
                        cursor: "text"
                      }}
                    />
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => {
                    handleScan();
                  }}
                  disabled={scanning || !url.trim()}
                  loading={scanning}
                  style={{
                    minWidth: "140px",
                    height: "54px",
                    minHeight: "54px",
                    backgroundColor: "#007AFF",
                    color: "#FFFFFF",
                    borderRadius: "9999px",
                    fontSize: "18px",
                    fontWeight: "600",
                    padding: "16px 24px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 12px rgba(0, 122, 255, 0.3)",
                    cursor: "pointer",
                    transform: "translateY(0)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 20px rgba(0, 122, 255, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 122, 255, 0.3)";
                  }}
                >
                  {scanning ? "Scanning..." : "Scan Website"}
    </Button>
              </div>
              
              {/* Clear Results Button - appears below when there are results */}
      {violations.length > 0 && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px"
                }}>
                  <Button
                    variant="outline"
                    size="large"
                    onClick={clearResults}
                    style={{
                      minWidth: "140px",
                      height: "44px",
                      minHeight: "44px",
                      backgroundColor: "transparent",
                      color: "#007AFF",
                      border: "2px solid #007AFF",
                      borderRadius: "12px",
                      fontSize: "16px",
                      fontWeight: "600",
                      padding: "12px 24px"
                    }}
                  >
                    Clear Results
                  </Button>
                </div>
              )}

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
            
            {/* Stats Section */}
            <Box style={{ 
              marginTop: isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16],
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? appleTheme.spacing[6] : appleTheme.spacing[8],
              flexWrap: "wrap"
            }}>
              {[
                { number: "1B+", label: "Websites Scanned" },
                { number: "99.9%", label: "Accuracy Rate" },
                { number: "2.5M+", label: "Issues Fixed" },
                { number: "WCAG 2.1", label: "Compliance" }
              ].map((stat, index) => (
                <Box key={index} style={{ textAlign: "center" }}>
                  <Typography variant="title1" style={{
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    fontSize: isMobile ? "24px" : "32px",
                    fontWeight: "700",
                    lineHeight: 1,
                    marginBottom: appleTheme.spacing[1]
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="footnote" style={{
                    color: isDarkMode ? '#E5E5EA' : '#1C1C1E',
                    fontSize: isMobile ? "12px" : "14px",
                    fontWeight: "500"
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            {/* Key Features */}
            <Box style={{ 
              marginTop: isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16],
              maxWidth: "800px",
              margin: `${isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16]} auto 0 auto`
            }}>
              <Typography variant="title2" style={{
                color: isDarkMode ? '#FFFFFF' : '#000000',
                textAlign: "center",
                marginBottom: isMobile ? appleTheme.spacing[6] : appleTheme.spacing[8],
                fontSize: isMobile ? "20px" : "28px",
                fontWeight: "600"
              }}>
                Why Choose Our Accessibility Scanner?
              </Typography>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: isMobile ? appleTheme.spacing[4] : appleTheme.spacing[6]
              }}>
                {[
                  {
                    icon: <AnalysisIcon />,
                    title: "Comprehensive Analysis",
                    description: "Advanced AI-powered scanning detects 50+ accessibility issues including color contrast, alt text, keyboard navigation, ARIA labels, and screen reader compatibility with 99.9% accuracy."
                  },
                  {
                    icon: <SpeedIcon />,
                    title: "Lightning Fast Results",
                    description: "Get detailed accessibility reports in under 30 seconds with actionable recommendations, code snippets, and priority-based issue categorization for immediate implementation."
                  },
                  {
                    icon: <ComplianceIcon />,
                    title: "WCAG 2.1 AA Compliance",
                    description: "Ensures your website meets international accessibility standards (WCAG 2.1 AA) and legal requirements including ADA, Section 508, and EN 301 549 compliance."
                  },
                  {
                    icon: <ReportIcon />,
                    title: "Professional Reports",
                    description: "Generate comprehensive PDF reports with executive summaries, detailed findings, remediation guides, and progress tracking for stakeholder presentations and compliance documentation."
                  },
                  {
                    icon: <SecurityIcon />,
                    title: "Enterprise Security",
                    description: "Bank-level security with SOC 2 compliance, encrypted data transmission, and privacy-first approach. Your website data is never stored or shared with third parties."
                  },
                  {
                    icon: <SupportIcon />,
                    title: "Expert Support",
                    description: "24/7 technical support from accessibility experts, integration assistance, custom scanning rules, and ongoing consultation to ensure your digital accessibility success."
                  }
                ].map((feature, index) => (
                  <Box key={index} style={{
                    padding: appleTheme.spacing[5],
                    backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
                    borderRadius: appleTheme.borderRadius.lg,
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    <Box style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, #007AFF, #30D158, #FF9500, #FF3B30)",
                      opacity: 0.7
                    }} />
                    
                    <Box style={{
                      display: "flex",
                      alignItems: "center",
                      gap: appleTheme.spacing[3],
                      marginBottom: appleTheme.spacing[3]
                    }}>
                      <Box style={{
                        padding: appleTheme.spacing[2],
                        backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(0, 122, 255, 0.05)",
                        borderRadius: appleTheme.borderRadius.md,
                        color: "#007AFF"
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="title3" style={{
                        color: isDarkMode ? '#FFFFFF' : '#000000',
                        fontSize: "18px",
                        fontWeight: "600",
                        margin: 0
                      }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body" style={{
                      color: isDarkMode ? '#E5E5EA' : '#1C1C1E',
                      fontSize: isMobile ? "14px" : "15px",
                      lineHeight: 1.6
                    }}>
                      {feature.description}
                    </Typography>
                  </Box>
                ))}
              </div>
            </Box>
            
            {/* Trust Indicators */}
            <Box style={{ 
              marginTop: isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16],
              textAlign: "center"
            }}>
              <Typography variant="title3" style={{
                color: isDarkMode ? '#E5E5EA' : '#1C1C1E',
                marginBottom: isMobile ? appleTheme.spacing[6] : appleTheme.spacing[8],
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "500"
              }}>
                Trusted by leading organizations worldwide
              </Typography>
              
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: isMobile ? appleTheme.spacing[4] : appleTheme.spacing[6],
                opacity: 0.7
              }}>
                {[
                  "Fortune 500 Companies",
                  "Government Agencies", 
                  "Educational Institutions",
                  "Healthcare Organizations",
                  "E-commerce Platforms",
                  "Financial Services"
                ].map((indicator, index) => (
                  <Box key={index} style={{
                    padding: `${appleTheme.spacing[2]} ${appleTheme.spacing[4]}`,
                    backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                    borderRadius: appleTheme.borderRadius.full,
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)"
                  }}>
                    <Typography variant="footnote" style={{
                      color: isDarkMode ? '#E5E5EA' : '#1C1C1E',
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {indicator}
                    </Typography>
                  </Box>
                ))}
              </div>
            </Box>
            
            {/* Technical Specifications */}
            <Box style={{ 
              marginTop: isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16],
              maxWidth: "900px",
              margin: `${isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16]} auto 0 auto`,
              padding: appleTheme.spacing[6],
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
              borderRadius: appleTheme.borderRadius.xl,
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)"
            }}>
              <Typography variant="title2" style={{
                color: isDarkMode ? '#FFFFFF' : '#000000',
                textAlign: "center",
                marginBottom: isMobile ? appleTheme.spacing[6] : appleTheme.spacing[8],
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "600"
              }}>
                Technical Specifications
              </Typography>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? appleTheme.spacing[4] : appleTheme.spacing[6]
              }}>
                {[
                  {
                    title: "Scanning Technology",
                    details: ["AI-Powered Analysis", "Real-time Processing", "50+ Check Types", "Custom Rules Engine"]
                  },
                  {
                    title: "Compliance Standards",
                    details: ["WCAG 2.1 AA/AAA", "ADA Compliance", "Section 508", "EN 301 549"]
                  },
                  {
                    title: "Integration Options",
                    details: ["REST API", "Webhook Support", "CI/CD Integration", "Browser Extension"]
                  }
                ].map((spec, index) => (
                  <Box key={index}>
                    <Typography variant="title3" style={{
                      color: isDarkMode ? '#FFFFFF' : '#000000',
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: appleTheme.spacing[3]
                    }}>
                      {spec.title}
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "column", gap: appleTheme.spacing[2] }}>
                      {spec.details.map((detail, detailIndex) => (
                        <Box key={detailIndex} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: appleTheme.spacing[2]
                        }}>
                          <Box style={{
                            width: "4px",
                            height: "4px",
                            backgroundColor: "#007AFF",
                            borderRadius: "50%"
                          }} />
                          <Typography variant="footnote" style={{
                            color: isDarkMode ? '#E5E5EA' : '#1C1C1E',
                            fontSize: "13px"
                          }}>
                            {detail}
                          </Typography>
                        </Box>
                      ))}
                    </div>
                  </Box>
                ))}
              </div>
            </Box>
            
            {/* Results Section - moved here after search section */}
            {violations.length > 0 && (
              <Box style={{ 
                marginTop: isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16],
                maxWidth: "800px",
                margin: `${isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16]} auto 0 auto`
              }}>
                {/* Score Summary */}
                <Card variant="elevated" padding="large" style={{ 
                  marginBottom: appleTheme.spacing[8]
                }}>
                  <Flex 
                    direction="row" 
                    align="center" 
                    justify="space-between" 
                    wrap="wrap" 
                    gap={6}
                    style={{
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "center" : "flex-start"
                    }}
                  >
                    <Box style={{ textAlign: isMobile ? "center" : "left" }}>
                      <Typography variant="title2" style={{ 
                        marginBottom: appleTheme.spacing[2],
                        color: isDarkMode ? '#FFFFFF' : '#000000',
                        fontSize: isMobile ? "20px" : "24px"
                      }}>
                        Accessibility Score
                      </Typography>
                      <Flex 
                        align="center" 
                        gap={4}
                        style={{
                          justifyContent: isMobile ? "center" : "flex-start"
                        }}
                      >
                        <Box style={{ 
                          fontSize: isMobile ? "36px" : "48px", 
                          fontWeight: appleTheme.typography.fontWeight.bold,
                          color: getScoreColor(accessibilityScore)
                        }}>
                          {accessibilityScore}
                        </Box>
                        <Box>
                          <Typography variant="body" style={{ color: isDarkMode ? '#E5E5EA' : '#1C1C1E' }}>
                            out of 100
                          </Typography>
                          <Typography variant="caption1" style={{ color: isDarkMode ? '#E5E5EA' : '#1C1C1E' }}>
                            {violations.length} issues found
                          </Typography>
                        </Box>
                      </Flex>
                    </Box>

                    {/* Export Actions */}
                    <Flex 
                      gap={3}
                      style={{
                        flexDirection: isMobile ? "column" : "row",
                        width: isMobile ? "100%" : "auto"
                      }}
                    >
                      <Button 
                        variant="outline" 
                        startIcon={<DownloadIcon />}
                        style={{
                          width: isMobile ? "100%" : "auto"
                        }}
                      >
                        Download PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        startIcon={<EmailIcon />}
                        onClick={() => setEmailDialogOpen(true)}
                        style={{
                          width: isMobile ? "100%" : "auto"
                        }}
                      >
                        Email Report
                      </Button>
                    </Flex>
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
                      marginBottom: appleTheme.spacing[4]
                    }}>
                      <Stack spacing={3}>
                        <Flex 
                          align="flex-start" 
                          justify="space-between" 
                          gap={4}
                          style={{
                            flexDirection: isMobile ? "column" : "row"
                          }}
                        >
                          <Box style={{ flex: 1, width: "100%" }}>
                            <Flex 
                              align="center" 
                              gap={2} 
                              style={{ 
                                marginBottom: appleTheme.spacing[2],
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center"
                              }}
                            >
                              <Flex align="center" gap={2} style={{ width: "100%" }}>
                                <AlertIcon />
                                <Typography 
                                  variant="callout" 
                                  weight="semibold" 
                                  style={{
                                    color: isDarkMode ? '#FFFFFF' : '#000000',
                                    fontSize: isMobile ? "14px" : "16px",
                                    flex: 1
                                  }}
                                >
                                  {violation.help}
                                </Typography>
                              </Flex>
                              <Box style={{ 
                                padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                                backgroundColor: getStatusColor(violation.impact),
                                color: "white",
                                borderRadius: appleTheme.borderRadius.base,
                                fontSize: appleTheme.typography.fontSize.xs,
                                fontWeight: appleTheme.typography.fontWeight.semibold,
                                textTransform: "uppercase",
                                alignSelf: isMobile ? "flex-start" : "center"
                              }}>
                                {violation.impact}
                              </Box>
                            </Flex>
                            
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
              </Box>
            )}
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg" style={{ 
        paddingBottom: isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16]
      }}>
        {/* Features Section - only shown when no results */}
        {violations.length === 0 && (
          <Section padding="lg" style={{ marginTop: isMobile ? appleTheme.spacing[8] : appleTheme.spacing[12] }}>
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
