import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import Input from "../components/apple/Input";
import Typography from "../components/apple/Typography";
import { Container, Box, Flex, Stack, Section } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  MagnifyingGlass, 
  Check, 
  WarningCircle, 
  Download, 
  Envelope, 
  ChartLineUp, 
  Lightning, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Question, 
  CaretDown, 
  CaretUp, 
  Trash,
  CheckCircle,
  ArrowSquareDown
} from "phosphor-react";

// Icons with Phosphor React
const SearchIcon = memo(() => <MagnifyingGlass size={20} weight="regular" aria-hidden="true" />);
const CheckIcon = memo(() => <Check size={16} weight="bold" aria-hidden="true" />);
const AlertIcon = memo(() => <WarningCircle size={16} weight="fill" aria-hidden="true" />);
const DownloadIcon = memo(() => <Download size={16} weight="regular" aria-hidden="true" />);
const EmailIcon = memo(() => <Envelope size={16} weight="regular" aria-hidden="true" />);
const AnalysisIcon = memo(() => <ChartLineUp size={24} weight="regular" aria-hidden="true" />);
const SpeedIcon = memo(() => <Lightning size={24} weight="fill" aria-hidden="true" />);
const ComplianceIcon = memo(() => <ShieldCheck size={24} weight="regular" aria-hidden="true" />);
const ReportIcon = memo(() => <FileText size={24} weight="regular" aria-hidden="true" />);
const SecurityIcon = memo(() => <Lock size={24} weight="regular" aria-hidden="true" />);
const SupportIcon = memo(() => <Question size={24} weight="regular" aria-hidden="true" />);
const ChevronDownIcon = memo(() => <CaretDown size={16} weight="bold" aria-hidden="true" />);
const ChevronUpIcon = memo(() => <CaretUp size={16} weight="bold" aria-hidden="true" />);
const ClearIcon = memo(({ color = "currentColor" }) => <Trash size={16} weight="regular" color={color} aria-hidden="true" />);

// Tooltip Component with delay
const Tooltip = memo(({ children, text, position = "top", delay = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

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

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div
      style={tooltipStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div style={tooltipContentStyles}>
        {text}
      </div>
    </div>
  );
});

// Violation Card Component with Apple-style Accordion functionality
const ViolationCard = ({ violation, isDarkMode, getStatusColor, t }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getImpactTranslation = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'critical': return t("home.violationImpactCritical");
      case 'serious': return t("home.violationImpactSerious");
      case 'moderate': return t("home.violationImpactModerate");
      case 'minor': return t("home.violationImpactMinor");
      default: return impact;
    }
  };

  // Style constants for better performance and maintainability
  const cardStyles = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E5EA",
    borderRadius: "16px",
    cursor: "pointer",
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
  };

  const headerStyles = {
    padding: "16px 20px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    flex: "0 0 auto",
    minHeight: "auto"
  };

  const expandableContentStyles = {
    borderTop: "1px solid #F2F2F7",
    backgroundColor: "#FAFAFA",
    animation: "fadeIn 0.3s ease-in-out",
    flex: "0 0 auto",
    overflow: "visible",
    display: "block"
  };

  const descriptionStyles = {
    color: "#8E8E93",
    fontSize: "14px",
    lineHeight: 1.5,
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    maxHeight: "4.2em"
  };

  const statusContainerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0
  };

  const codeTitleStyles = {
    marginBottom: "8px",
    color: "#000000",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    textAlign: "left"
  };

  return (
    <div 
      style={cardStyles}
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
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header - Always Visible */}
      <div style={headerStyles}>
        {/* Left side - Icon and Title */}
        <div style={{ 
          display: "flex", 
          alignItems: "flex-start", 
          gap: "16px", 
          flex: 1,
          minWidth: 0
        }}>
          <div style={{
            padding: "8px",
            backgroundColor: "#FF6B35",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "2px"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
            </svg>
          </div>
          
          <div style={{ 
            flex: 1, 
            minWidth: 0,
            textAlign: "left"
          }}>
            <Typography 
              variant="callout" 
              weight="semibold" 
              style={{
                color: "#000000",
                fontSize: "16px",
                lineHeight: 1.4,
                marginBottom: "6px",
                textAlign: "left"
              }}
            >
              {violation.help}
            </Typography>
            <Typography variant="footnote" style={descriptionStyles}>
              {violation.description}
            </Typography>
          </div>
        </div>
        
        {/* Right side - Status and Chevron */}
        <div style={statusContainerStyles}>
          {/* Status Badge - Top Right */}
          <div style={{ 
            padding: "4px 8px",
            backgroundColor: getStatusColor(violation.impact),
            color: "white",
            borderRadius: "12px",
            fontSize: "11px",
            fontWeight: "600",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            letterSpacing: "0.5px"
          }}>
            <div style={{
              width: "4px",
              height: "4px",
              backgroundColor: "white",
              borderRadius: "50%"
            }} />
            {getImpactTranslation(violation.impact)}
          </div>
          
          {/* Chevron Icon */}
          <div style={{
            padding: "4px",
            color: "#8E8E93",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ChevronDownIcon style={{ width: "16px", height: "16px" }} />
          </div>
        </div>
      </div>
      
      {/* Expandable Content */}
      {isExpanded ? (
        <div style={expandableContentStyles}>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Code Snippet */}
              {violation.nodes && violation.nodes.length > 0 && (
                <div>
                  <Typography variant="footnote" weight="semibold" style={codeTitleStyles}>
                    {t("home.violationCode")}
                  </Typography>
                  <div 
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "16px",
                      borderRadius: "8px",
                      fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                      fontSize: "12px",
                      color: "#1C1C1E",
                      overflowX: "auto",
                      border: "1px solid #E5E5EA",
                      lineHeight: 1.6,
                      textAlign: "left",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      maxHeight: "200px",
                      overflowY: "auto",
                      userSelect: "text",
                      cursor: "text"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    {violation.nodes[0].html}
                  </div>
                </div>
              )}
              
              {/* How to Fix Section */}
              <div 
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #E3F2FD",
                  borderLeft: "4px solid #007AFF",
                  userSelect: "text",
                  cursor: "text"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    padding: "6px",
                    backgroundColor: "#007AFF",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <CheckIcon style={{ color: "white", width: "16px", height: "16px" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Typography variant="footnote" weight="semibold" style={codeTitleStyles}>
                      {t("home.violationHowToFix")}
                    </Typography>
                    <Typography variant="footnote" style={{
                      color: "#1C1C1E",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      textAlign: "left"
                    }}>
                      {t("home.violationFixDescription")}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default function Home() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [violations, setViolations] = useState([]);
  const [uxAudit, setUxAudit] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchStacked, setIsSearchStacked] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [dataFromCache, setDataFromCache] = useState(false);

  // Load saved scan results on component mount with timeout check
  useEffect(() => {
    try {
      const savedUrl = localStorage.getItem("scanUrl");
      const savedViolations = localStorage.getItem("scanViolations");
      const savedTimestamp = localStorage.getItem("scanTimestamp");
      
      // Check if data is older than 30 minutes (1800000 ms)
      const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
      const now = Date.now();
      const isDataExpired = savedTimestamp && (now - parseInt(savedTimestamp)) > TIMEOUT_DURATION;
      
      
      if (isDataExpired) {
        // Clear expired data
        localStorage.removeItem("scanUrl");
        localStorage.removeItem("scanViolations");
        localStorage.removeItem("scanUxAudit");
        localStorage.removeItem("scanTimestamp");
        return;
      }
      
      if (savedUrl && typeof savedUrl === "string") {
        setUrl(savedUrl);
        setDataFromCache(true);
      }
      
      if (savedViolations) {
        const parsed = JSON.parse(savedViolations);
        if (Array.isArray(parsed)) {
          setViolations(parsed);
          setDataFromCache(true);
        }
      }
      
      // Load UX audit from localStorage
      const savedUxAudit = localStorage.getItem("scanUxAudit");
      if (savedUxAudit) {
        try {
          const parsedUxAudit = JSON.parse(savedUxAudit);
          setUxAudit(parsedUxAudit);
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error loading UX audit:', e);
          }
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading saved data:', error);
      }
      // Clear corrupted data
      localStorage.removeItem('scanUrl');
      localStorage.removeItem('scanViolations');
      localStorage.removeItem('scanUxAudit');
      localStorage.removeItem('scanTimestamp');
    }
  }, []);


  // Mobile detection with debouncing
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
        setIsSearchStacked(window.innerWidth < 770);
      }, 100); // Debounce resize events
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleScan = useCallback(async () => {
    if (!url.trim()) {
      return;
    }
    
    const startTime = performance.now();
    setScanning(true);
    setViolations([]);
    setUxAudit(null);
    setError("");
    setInputFocused(false);
    setDataFromCache(false);

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
      const newUxAudit = data.uxAudit || null;
      
      // Save results to localStorage with timestamp
      localStorage.setItem('scanUrl', url.trim());
      localStorage.setItem('scanViolations', JSON.stringify(newViolations));
      if (newUxAudit) {
        localStorage.setItem('scanUxAudit', JSON.stringify(newUxAudit));
      }
      localStorage.setItem('scanTimestamp', Date.now().toString());
      
      setViolations(newViolations);
      setUxAudit(newUxAudit);
      
      // Performance logging (only in development)
      if (process.env.NODE_ENV === 'development') {
        const endTime = performance.now();
        console.log(`Scan completed in ${(endTime - startTime).toFixed(2)}ms`);
      }
      
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Scan error:", err);
      }
      setError(err.message || t("common.errorScanFailed"));
    }

    setScanning(false);
  }, [url]);

  const clearResults = useCallback(() => {
    setUrl("");
    setViolations([]);
    setUxAudit(null);
    setError("");
    setDataFromCache(false);
    localStorage.removeItem('scanUrl');
    localStorage.removeItem('scanViolations');
    localStorage.removeItem('scanUxAudit');
    localStorage.removeItem('scanTimestamp');
  }, []);

  const calculateAccessibilityScore = useCallback((violations) => {
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
  }, []);

  const getScoreColor = useCallback((score) => {
    if (score >= 90) return appleTheme.colors.success;
    if (score >= 70) return appleTheme.colors.warning;
    return appleTheme.colors.error;
  }, []);

  const getStatusColor = useCallback((impact) => {
    switch (impact) {
      case "critical": return appleTheme.colors.error;
      case "serious": return "#FF6B35";
      case "moderate": return appleTheme.colors.warning;
      case "minor": return "#34C759";
      default: return appleTheme.colors.gray[500];
    }
  }, []);

  const accessibilityScore = useMemo(() => calculateAccessibilityScore(violations), [violations, calculateAccessibilityScore]);

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div className="page-container" style={{ 
      backgroundColor: themeColors.background.secondary,
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Hero Section */}
      <Section 
        className="hero-section"
        background={isDarkMode ? "linear-gradient(135deg, rgba(28, 28, 30, 0.9) 0%, rgba(44, 44, 46, 0.9) 100%)" : "linear-gradient(135deg, rgba(245, 245, 247, 0.9) 0%, rgba(229, 229, 234, 0.9) 100%)"} 
        padding="xl"
        style={{ 
          paddingTop: isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16],
          paddingBottom: isMobile ? appleTheme.spacing[16] : appleTheme.spacing[20] 
        }}
      >
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <div key={`title-wrapper-${isDarkMode}`} style={{ width: "100%" }}>
              <Typography 
                variant="display" 
                style={{ 
                  marginBottom: isMobile ? appleTheme.spacing[6] : appleTheme.spacing[8],
                  color: themeColors.text.primary,
                  fontWeight: appleTheme.typography.fontWeight.bold,
                  fontSize: isMobile ? "28px" : "42px",
                  lineHeight: 1.2,
                  padding: isMobile ? "0 20px" : "0",
                  background: isDarkMode 
                    ? "linear-gradient(135deg, #FFFFFF 0%, #E5E5EA 100%)"
                    : "linear-gradient(135deg, #1C1C1E 0%, #007AFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  willChange: "background",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden"
                }}
              >
                {t("home.title")}
              </Typography>
            </div>
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              marginBottom: isMobile ? appleTheme.spacing[8] : appleTheme.spacing[10],
              maxWidth: "700px",
              margin: isMobile ? `0 auto ${appleTheme.spacing[8]} auto` : `0 auto ${appleTheme.spacing[10]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium,
              fontSize: isMobile ? "16px" : "20px",
              lineHeight: 1.6,
              padding: isMobile ? "0 20px" : "0",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              hyphens: "auto"
            }}>
              {t("home.subtitle")}
  </Typography>

            {/* URL Input Section - Centered and Prominent */}
            <Box style={{ 
              maxWidth: "700px", 
              margin: "0 auto",
              width: "100%",
              padding: isMobile ? "0 20px" : "0 16px",
              position: "relative",
              zIndex: 10
            }}>
              <div className="search-container" style={{
      display: "flex",
                flexDirection: isSearchStacked ? "column" : "row",
                gap: "12px",
                alignItems: "stretch",
                width: "100%"
              }}>
                <div className="search-input-wrapper" style={{ 
                  flex: 1, 
                  position: "relative",
                  width: "100%"
                }}>
                  <div className="search-input" style={{ 
                    position: "relative", 
                    width: "100%",
                    height: "60px",
                    backgroundColor: inputFocused ? themeColors.background.primary : (url.trim() ? "transparent" : themeColors.gray[100]),
                    border: `2px solid ${inputFocused ? appleTheme.colors.primary[500] : (url.trim() ? appleTheme.colors.primary[500] : themeColors.gray[300])}`,
                    borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: inputFocused ? "0 0 0 6px rgba(0, 122, 255, 0.15)" : (isDarkMode ? "0 4px 16px rgba(0, 0, 0, 0.3)" : "0 4px 16px rgba(0, 0, 0, 0.08)")
                  }}>
                    <div style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: themeColors.gray[500],
                      fontSize: "20px",
                      pointerEvents: "none",
                      zIndex: 10
                    }}>
                      <SearchIcon />
                    </div>
                    <input
                      type="url"
                      placeholder={t("home.enterUrl")}
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
                      aria-label={t("index.ariaUrlLabel")}
                      aria-describedby="url-help"
                      autoComplete="url"
                      spellCheck="false"
                      style={{
      width: "100%",
                        height: "100%",
                        paddingLeft: "52px",
                        paddingRight: "20px",
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        fontSize: "20px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        color: themeColors.text.primary,
                        zIndex: 1,
                        position: "relative",
                        cursor: "text",
                        fontWeight: "400"
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
                    minWidth: isSearchStacked ? "100%" : "160px",
                    width: isSearchStacked ? "100%" : "auto",
                    height: "60px",
                    minHeight: "60px",
                    maxHeight: "60px",
                    backgroundColor: "#007AFF",
                    color: "#FFFFFF",
                    borderRadius: "9999px",
                    fontSize: "20px",
                    fontWeight: "500",
                    padding: "0 28px",
                    textAlign: "center",
        display: "flex",
        alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 6px 20px rgba(0, 122, 255, 0.4)",
                    cursor: "pointer",
                    transform: "translateY(0)",
                    border: "none",
                    outline: "none"
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
                  {scanning ? t("common.scanning") : t("common.scanWebsite")}
    </Button>
              </div>
              

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

            {/* Results Section - positioned right after search section */}
      {(violations.length > 0 || (uxAudit && uxAudit.issues && uxAudit.issues.length > 0)) && (
              <Box className="results-section" style={{ 
                marginTop: isMobile ? appleTheme.spacing[8] : appleTheme.spacing[12],
                maxWidth: "1200px",
                margin: `${isMobile ? appleTheme.spacing[8] : appleTheme.spacing[12]} auto 0 auto`,
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: isMobile ? "16px" : "24px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                width: "100%"
              }}>
                {/* Score Summary */}
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "center" : "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                  gap: "16px",
                  padding: "24px",
                  backgroundColor: "linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)",
                  borderRadius: "16px",
                  border: "1px solid #E5E5EA",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Background decoration */}
                  <div style={{
                    position: "absolute",
                    top: "-50%",
                    right: "-20%",
                    width: "200px",
                    height: "200px",
                    background: `radial-gradient(circle, ${getScoreColor(accessibilityScore)}20 0%, transparent 70%)`,
                    borderRadius: "50%",
                    opacity: 0.6
                  }} />
                  
                  <div style={{ 
                    textAlign: isMobile ? "center" : "left", 
                    flex: 1,
                    minWidth: 0,
                    position: "relative",
                    zIndex: 1
                  }}>
                    <Typography variant="title2" style={{ 
                      marginBottom: appleTheme.spacing[2],
                      color: themeColors.text.primary,
                      fontSize: isMobile ? "20px" : "22px",
                      fontWeight: "600",
                      letterSpacing: "-0.3px"
                    }}>
                      {t("common.accessibilityScore")}
          </Typography>
                    {(url || (uxAudit && uxAudit.scannedUrl)) && (
                      <Typography variant="caption1" style={{
                        color: themeColors.text.secondary,
                        fontSize: "14px",
                        marginBottom: appleTheme.spacing[4],
                        display: "block",
                        wordBreak: "break-word"
                      }}>
                        {t("common.scanned")}: {uxAudit && uxAudit.scannedUrl ? uxAudit.scannedUrl : url}
                      </Typography>
                    )}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      justifyContent: isMobile ? "center" : "flex-start"
                    }}>
                      <div style={{ 
                        fontSize: isMobile ? "48px" : "56px", 
                        fontWeight: "700",
                        color: getScoreColor(accessibilityScore),
                        textShadow: `0 2px 4px ${getScoreColor(accessibilityScore)}30`,
                        letterSpacing: "-1px",
                        lineHeight: 1,
                        flexShrink: 0
                      }}>
                        {accessibilityScore}
                      </div>
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                      }}>
                        <Typography variant="body" style={{ 
                          color: themeColors.gray[600],
                          fontSize: isMobile ? "16px" : "18px",
                          fontWeight: "500",
                          lineHeight: 1.2
                        }}>
                          {t("common.outOf")} 100
                        </Typography>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          lineHeight: 1.2
                        }}>
                          <div style={{
                            width: "8px",
                            height: "8px",
                            backgroundColor: violations.length === 0 ? "#34C759" : getScoreColor(accessibilityScore),
                            borderRadius: "50%",
                            flexShrink: 0
                          }} />
                          <Typography variant="caption1" style={{ 
                            color: themeColors.gray[600],
                            fontSize: isMobile ? "14px" : "16px",
                            fontWeight: "500",
                            lineHeight: 1.2,
                            whiteSpace: "nowrap"
                          }}>
                            {violations.length} {violations.length === 1 ? t("common.issue") : t("common.issuesFound")}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Export Actions - positioned on the right top */}
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: "8px",
                    flexShrink: 0
                  }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                    <button 
                      style={{
                        height: isMobile ? "32px" : "36px",
                        backgroundColor: isDarkMode ? themeColors.background.tertiary : themeColors.background.primary,
                        color: appleTheme.colors.primary[500],
                        border: `1px solid ${appleTheme.colors.primary[500]}`,
                        borderRadius: "8px",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "500",
                        padding: isMobile ? "6px 12px" : "8px 16px",
        display: "flex",
        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: isDarkMode ? "0 1px 3px rgba(0, 122, 255, 0.3)" : "0 1px 3px rgba(0, 122, 255, 0.15)",
                        fontFamily: "inherit"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#007AFF";
                        e.target.style.color = "#FFFFFF";
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 2px 6px rgba(0, 122, 255, 0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#FFFFFF";
                        e.target.style.color = "#007AFF";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 1px 3px rgba(0, 122, 255, 0.15)";
                      }}
                    >
                      <DownloadIcon style={{ width: isMobile ? "14px" : "16px", height: isMobile ? "14px" : "16px" }} />
                      {t("common.downloadPdf")}
                    </button>
                    <button 
                      onClick={() => setEmailDialogOpen(true)}
                      style={{
                        height: isMobile ? "32px" : "36px",
                        backgroundColor: isDarkMode ? themeColors.background.tertiary : themeColors.background.primary,
                        color: appleTheme.colors.primary[500],
                        border: `1px solid ${appleTheme.colors.primary[500]}`,
                        borderRadius: "8px",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "500",
                        padding: isMobile ? "6px 12px" : "8px 16px",
                display: "flex",
                  alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: isDarkMode ? "0 1px 3px rgba(0, 122, 255, 0.3)" : "0 1px 3px rgba(0, 122, 255, 0.15)",
                        fontFamily: "inherit",
                        whiteSpace: "nowrap"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#007AFF";
                        e.target.style.color = "#FFFFFF";
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 2px 6px rgba(0, 122, 255, 0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#FFFFFF";
                        e.target.style.color = "#007AFF";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 1px 3px rgba(0, 122, 255, 0.15)";
                      }}
                    >
                      <EmailIcon style={{ width: isMobile ? "14px" : "16px", height: isMobile ? "14px" : "16px" }} />
                      {t("common.emailReport")}
                    </button>
                    </div>
                    <Tooltip text={t("index.tooltipClear")} delay={4000}>
                      <button 
                        onClick={clearResults}
                        style={{
                          height: isMobile ? "32px" : "36px",
                          backgroundColor: "transparent",
                          color: themeColors.text.primary,
                          border: "none",
                          borderRadius: "8px",
                          fontSize: isMobile ? "13px" : "14px",
                          fontWeight: "500",
                          padding: isMobile ? "6px 12px" : "8px 16px",
                  display: "flex",
                  alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          fontFamily: "inherit"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#F0F8FF";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <ClearIcon color="#FF3B30" style={{ width: isMobile ? "14px" : "16px", height: isMobile ? "14px" : "16px" }} />
                        {t("common.clearResults")}
                      </button>
                    </Tooltip>
                  </div>
                </div>

                {/* WCAG Accessibility Issues Title */}
                {violations.length > 0 && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                      <Typography variant="title3" style={{
                        color: "#000000",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "left"
                      }}>
                        {t("home.wcagIssues")} ({violations.length})
                      </Typography>
                    </div>

                    {/* Violations Grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: isMobile 
                        ? "1fr" 
                        : "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: isMobile ? "12px" : "20px",
                      maxWidth: "100%",
                      width: "100%",
                      alignItems: "start"
                    }}>
                      {violations.map((violation, index) => (
                        <ViolationCard 
                          key={`violation-${index}-${violation.id || 'unknown'}`} 
                          violation={violation} 
                          isDarkMode={isDarkMode}
                          getStatusColor={getStatusColor}
                          t={t}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* UX Audit Section */}
                {uxAudit && uxAudit.issues && uxAudit.issues.length > 0 && (
                  <>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "8px", 
                      marginTop: "40px",
                      marginBottom: "20px" 
                    }}>
                      <Typography variant="title3" style={{
                        color: "#000000",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "left"
                      }}>
                        {t("home.uxAuditResults")} ({uxAudit.issues.length})
                      </Typography>
                    </div>

                    {/* UX Issues Grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: isMobile 
                        ? "1fr" 
                        : "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: isMobile ? "12px" : "20px",
                      maxWidth: "100%",
                      width: "100%",
                      alignItems: "start"
                    }}>
                      {uxAudit.issues.map((issue, index) => {
                        const getSeverityColor = (severity) => {
                          switch (severity) {
                            case 'high': return '#FF3B30';
                            case 'medium': return '#FF9500';
                            case 'low': return '#34C759';
                            default: return '#8E8E93';
                          }
                        };

                        const getSeverityText = (severity) => {
                          switch (severity) {
                            case 'high': return t("home.severityHigh");
                            case 'medium': return t("home.severityMedium");
                            case 'low': return t("home.severityLow");
                            default: return severity;
                          }
                        };

                        const getCategoryText = (category) => {
                          switch (category?.toLowerCase()) {
                            case 'mobile': return t("home.categoryMobile");
                            case 'navigation': return t("home.categoryNavigation");
                            case 'engagement': return t("home.categoryEngagement");
                            case 'forms': return t("home.categoryForms");
                            case 'content': return t("home.categoryContent");
                            case 'seo': return t("home.categorySEO");
                            case 'performance': return t("home.categoryPerformance");
                            default: return category;
                          }
                        };

                        const getIssueTranslation = (issueId, field) => {
                          // Map issue IDs to translation key prefixes
                          const issueIdMap = {
                            'viewport-meta': 'Viewport',
                            'navigation-structure': 'Navigation',
                            'call-to-action': 'CTA',
                            'form-usability': 'Forms',
                            'content-hierarchy': 'Content',
                            'image-alt': 'Image',
                            'meta-description': 'Meta'
                          };
                          
                          const prefix = issueIdMap[issueId] || issueId.charAt(0).toUpperCase() + issueId.slice(1).replace(/-/g, '');
                          const translationKey = `home.uxIssue${prefix}${field.charAt(0).toUpperCase() + field.slice(1)}`;
                          const translation = t(translationKey);
                          // If translation doesn't exist, return null to fallback to original
                          return translation !== translationKey ? translation : null;
                        };

                        const translatedTitle = getIssueTranslation(issue.id, 'title') || issue.title;
                        const translatedDesc = getIssueTranslation(issue.id, 'desc') || issue.description;
                        const translatedRec = getIssueTranslation(issue.id, 'rec') || issue.recommendation;
                        const translatedImpact = issue.impact ? (getIssueTranslation(issue.id, 'impact') || issue.impact) : null;

                        return (
                          <div
                            key={`ux-issue-${index}-${issue.id || 'unknown'}`}
                            style={{
                              backgroundColor: "#FFFFFF",
                              border: `1px solid ${getSeverityColor(issue.severity)}40`,
                              borderRadius: "12px",
                              padding: "20px",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)";
                              e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginBottom: "12px"
                            }}>
                              <div style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: getSeverityColor(issue.severity)
                              }} />
                              <Typography variant="callout" style={{
                                color: "#000000",
                                fontSize: "16px",
                                fontWeight: "600",
                                textTransform: "capitalize"
                              }}>
                                {getSeverityText(issue.severity)} {t("home.priority")}
                              </Typography>
                              <div style={{
                                padding: "4px 8px",
                                backgroundColor: `${getSeverityColor(issue.severity)}20`,
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: "600",
                                color: getSeverityColor(issue.severity),
                                textTransform: "uppercase"
                              }}>
                                {getCategoryText(issue.category)}
                              </div>
                            </div>
                            <Typography variant="title3" style={{
                              color: "#000000",
                              fontSize: "16px",
                              fontWeight: "600",
                              marginBottom: "8px"
                            }}>
                              {translatedTitle}
                            </Typography>
                            <Typography variant="body" style={{
                              color: "#1C1C1E",
                              fontSize: "14px",
                              lineHeight: 1.5,
                              marginBottom: "12px"
                            }}>
                              {translatedDesc}
                            </Typography>
                            <div style={{
                              padding: "12px",
                              backgroundColor: "#FFFFFF",
                              borderRadius: "8px",
                              marginBottom: "12px",
                              border: "1px solid #E5E5EA"
                            }}>
                              <Typography variant="caption1" style={{
                                color: "#007AFF",
                                fontSize: "12px",
                                fontWeight: "600",
                                marginBottom: "6px",
                                display: "block"
                              }}>
                                {t("home.recommendation")}
                              </Typography>
                              <Typography variant="caption1" style={{
                                color: "#1C1C1E",
                                fontSize: "13px",
                                lineHeight: 1.4
                              }}>
                                {translatedRec}
                              </Typography>
                            </div>
                            {translatedImpact && (
                              <Typography variant="footnote" style={{
                                color: "#8E8E93",
                                fontSize: "12px",
                                fontStyle: "italic"
                              }}>
                                {t("home.impact")} {translatedImpact}
                              </Typography>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                </Box>
      )}

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
                { number: "1B+", label: t("index.statsScanned") },
                { number: "99.9%", label: t("index.statsAccuracy") },
                { number: "2.5M+", label: t("index.statsFixed") },
                { number: "WCAG 2.1", label: t("index.statsCompliance") }
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
                fontWeight: "600",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("index.whyChoose")}
  </Typography>

              <div style={{
            display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: isMobile ? appleTheme.spacing[4] : appleTheme.spacing[6]
              }}>
                {[
                  {
                    icon: <AnalysisIcon />,
                    title: t("index.featureAnalysis"),
                    description: t("index.featureAnalysisDesc")
                  },
                  {
                    icon: <SpeedIcon />,
                    title: t("index.featureFast"),
                    description: t("index.featureFastDesc")
                  },
                  {
                    icon: <ComplianceIcon />,
                    title: t("index.featureWCAG"),
                    description: t("index.featureWCAGDesc")
                  },
                  {
                    icon: <ReportIcon />,
                    title: t("index.featureReports"),
                    description: t("index.featureReportsDesc")
                  },
                  {
                    icon: <SecurityIcon />,
                    title: t("index.featureSecurity"),
                    description: t("index.featureSecurityDesc")
                  },
                  {
                    icon: <SupportIcon />,
                    title: t("index.featureExpert"),
                    description: t("index.featureExpertDesc")
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
              <Typography variant="title2" style={{
                color: themeColors.text.primary,
                marginBottom: isMobile ? appleTheme.spacing[6] : appleTheme.spacing[8],
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: appleTheme.typography.fontWeight.semibold,
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("index.trustedBy")}
              </Typography>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: isMobile ? appleTheme.spacing[4] : appleTheme.spacing[6],
                maxWidth: "900px",
                margin: "0 auto"
              }}>
                {[
                  t("index.orgFortune500"),
                  t("index.orgGovernment"), 
                  t("index.orgEducational"),
                  t("index.orgHealthcare"),
                  t("index.orgEcommerce"),
                  t("index.orgFinancial")
                ].map((indicator, index) => (
                  <Box 
                    key={index} 
                    style={{
                      padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[5]}`,
                      backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF",
                      borderRadius: appleTheme.borderRadius.lg,
                      border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid #E5E5EA",
                      boxShadow: isDarkMode ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "default",
                      minWidth: "120px",
                      textAlign: "center"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.borderColor = isDarkMode ? "rgba(0, 122, 255, 0.3)" : "#007AFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = isDarkMode ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#E5E5EA";
                    }}
                  >
                    <Typography variant="callout" style={{
                      color: themeColors.text.primary,
                      fontSize: "14px",
                      fontWeight: appleTheme.typography.fontWeight.semibold,
                      wordBreak: "break-word",
                      overflowWrap: "break-word"
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
                fontWeight: "600",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("index.technicalSpecs")}
              </Typography>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? appleTheme.spacing[4] : appleTheme.spacing[6]
              }}>
                {[
                  {
                    title: t("index.specScanningTech"),
                    details: [t("index.detailAIAnalysis"), t("index.detailRealTime"), t("index.detail50Checks"), t("index.detailCustomRules")]
                  },
                  {
                    title: t("index.specCompliance"),
                    details: [t("index.detailWCAG"), t("index.detailADA"), t("index.detailSection508"), t("index.detailEN301549")]
                  },
                  {
                    title: t("index.specIntegration"),
                    details: [t("index.detailRESTAPI"), t("index.detailWebhook"), t("index.detailCICD"), t("index.detailBrowserExt")]
                  }
                ].map((spec, index) => (
                  <Box key={index}>
                    <Typography variant="title3" style={{
                      color: isDarkMode ? '#FFFFFF' : '#000000',
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: appleTheme.spacing[3],
                      wordBreak: "break-word",
                      overflowWrap: "break-word"
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
                            fontSize: "13px",
                            wordBreak: "break-word",
                            overflowWrap: "break-word"
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

    </Box>
        </Container>
      </Section>

      <Container size="lg" style={{ 
        paddingBottom: isMobile ? appleTheme.spacing[12] : appleTheme.spacing[16],
        paddingTop: isMobile ? appleTheme.spacing[8] : appleTheme.spacing[12]
      }}>
        {/* Features Section - only shown when no results */}
        {violations.length === 0 && (
          <Section className="features-section" padding="lg" style={{ 
            padding: `${appleTheme.spacing[12]} 0`
          }}>
            <Box style={{ textAlign: "center", marginBottom: appleTheme.spacing[12] }}>
              <Typography variant="title1" style={{ 
                marginBottom: appleTheme.spacing[4],
                color: themeColors.text.primary,
                fontWeight: appleTheme.typography.fontWeight.bold,
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("index.detailedReportsTitle")}
              </Typography>
              <Typography variant="body" style={{ 
                maxWidth: "600px", 
                margin: "0 auto",
                marginBottom: appleTheme.spacing[8],
                color: themeColors.text.secondary,
                fontSize: appleTheme.typography.fontSize.lg,
                lineHeight: appleTheme.typography.lineHeight.relaxed,
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("index.detailedReportsDesc")}
              </Typography>
            </Box>

            <div className="features-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: appleTheme.spacing[6],
              maxWidth: "900px",
              margin: "0 auto",
              alignItems: "stretch"
            }}>
              {[
                {
                  title: t("index.reportWCAGTitle"),
                  description: t("index.reportWCAGDesc"),
                  icon: <CheckCircle size={20} weight="regular" />
                },
                {
                  title: t("index.reportDetailedTitle"),
                  description: t("index.reportDetailedDesc"),
                  icon: <FileText size={20} weight="regular" />
                },
                {
                  title: t("index.reportExportTitle"),
                  description: t("index.reportExportDesc"),
                  icon: <ArrowSquareDown size={20} weight="regular" />
                }
              ].map((feature, index) => (
                <Card key={index} variant="elevated" padding="xl" hover className="feature-card" style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: `1px solid ${themeColors.gray[200]}`,
                  backgroundColor: isDarkMode ? themeColors.background.tertiary : themeColors.background.primary,
                  borderRadius: appleTheme.borderRadius.xl,
                  padding: `24px 16px`,
                  boxShadow: isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.08)",
                  overflow: "visible"
                }}>
                  <div className="feature-card__container" style={{ 
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                  }}>
                    <div className="feature-card__icon" style={{ 
                      color: appleTheme.colors.primary[500],
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: appleTheme.spacing[4],
                      padding: appleTheme.spacing[2],
                      backgroundColor: isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(0, 122, 255, 0.05)",
                      borderRadius: appleTheme.borderRadius.md,
                      width: "fit-content"
                    }}>
                      {feature.icon}
                    </div>
                    <div className="feature-card__content" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                      <Typography variant="title2" weight="semibold" className="feature-card__title" style={{
                        color: themeColors.text.primary,
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "6px",
                        lineHeight: 1.3,
                        textAlign: "left",
                        wordBreak: "break-word",
                        overflowWrap: "break-word"
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body" className="feature-card__description" style={{
                        color: themeColors.text.secondary,
                        fontSize: "15px",
                        lineHeight: 1.5,
                        fontWeight: "400",
                        textAlign: "left",
                        wordBreak: "break-word",
                        overflowWrap: "break-word"
                      }}>
                        {feature.description}
                      </Typography>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        )}
      </Container>
    </div>
  );
}
