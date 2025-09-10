import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import Input from "../components/apple/Input";
import AnimatedGradient from "../components/apple/AnimatedGradient";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
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
const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6"/>
    <polyline points="8,6 2,12 8,18"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5,3 19,12 5,21 5,3"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export default function ApiDocs() {
  const { isDarkMode } = useTheme();
  const [testUrl, setTestUrl] = useState("");
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [expandedSections, setExpandedSections] = useState({});

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage("Copied to clipboard!");
    setSnackbarOpen(true);
  };

  const testApi = async () => {
    if (!testUrl) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/scan?url=${encodeURIComponent(testUrl)}`);
      const data = await response.json();
      setTestResult({ success: true, data });
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const codeExamples = {
    curl: `curl -X GET "https://scanweb.com/api/scan?url=https://example.com" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    
    javascript: `const response = await fetch('https://scanweb.com/api/scan?url=https://example.com', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
// console.log(data);`,
    
    python: `import requests

url = "https://scanweb.com/api/scan"
params = {"url": "https://example.com"}
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(data)`
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/scan",
      description: "Scan a website for accessibility issues",
      parameters: [
        { name: "url", type: "string", required: true, description: "The URL to scan" },
        { name: "depth", type: "number", required: false, description: "Scan depth (1-3, default: 1)" },
        { name: "include", type: "string", required: false, description: "Comma-separated list of issue types to include" }
      ]
    },
    {
      method: "POST",
      path: "/api/batch-scan",
      description: "Scan multiple URLs in a single request",
      parameters: [
        { name: "urls", type: "array", required: true, description: "Array of URLs to scan" },
        { name: "options", type: "object", required: false, description: "Scan options for all URLs" }
      ]
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
      <AnimatedGradient variant="subtle" intensity="low" />
      
      {/* Hero Section */}
      <Section background="linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)" padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[4],
              color: "#1C1C1E",
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              API Documentation
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: "#2C2C2E",
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              Integrate accessibility scanning into your applications with our powerful REST API.
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" padding="lg">
        {/* Quick Start */}
        <Section padding="lg">
          <Card variant="elevated" padding="large" style={{ marginBottom: appleTheme.spacing[8] }}>
            <Stack spacing={4}>
              <Typography variant="title2" style={{
                color: isDarkMode ? "#FFFFFF" : "#000000"
              }}>
                Quick Start
              </Typography>
              <Typography variant="body" color="secondary">
                Get started with our API in minutes. All you need is an API key and a URL to scan.
              </Typography>
              
              <Box style={{
                backgroundColor: appleTheme.colors.gray[50],
                padding: appleTheme.spacing[4],
                borderRadius: appleTheme.borderRadius.md,
                fontFamily: appleTheme.typography.fontFamily.mono,
                fontSize: appleTheme.typography.fontSize.sm,
                color: appleTheme.colors.text.secondary,
                overflowX: "auto"
              }}>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {codeExamples.curl}
                </pre>
              </Box>
              
              <HStack justify="space-between" align="center">
                <Typography variant="footnote" color="tertiary">
                  Replace YOUR_API_KEY with your actual API key
                </Typography>
                <Button
                  variant="ghost"
                  size="small"
                  startIcon={<CopyIcon />}
                  onClick={() => copyToClipboard(codeExamples.curl)}
                >
                  Copy
                </Button>
              </HStack>
            </Stack>
          </Card>
        </Section>

        {/* API Test */}
        <Section padding="lg">
          <Card variant="outlined" padding="large" style={{ marginBottom: appleTheme.spacing[8] }}>
            <Stack spacing={4}>
              <Typography variant="title2" style={{
                color: isDarkMode ? "#FFFFFF" : "#000000"
              }}>
                Test the API
              </Typography>
              <Typography variant="body" color="secondary">
                Try our API with a real URL to see how it works.
              </Typography>
              
              <HStack spacing={3} align="flex-end">
                <Box style={{ flex: 1 }}>
                  <Input
                    label="Website URL"
                    placeholder="https://example.com"
                    value={testUrl}
                    onChange={setTestUrl}
                    size="medium"
                  />
                </Box>
                <Button
                  variant="primary"
                  onClick={testApi}
                  loading={loading}
                  disabled={!testUrl.trim()}
                  startIcon={<PlayIcon />}
                >
                  Test API
                </Button>
              </HStack>
              
              {testResult && (
                <Box style={{
                  backgroundColor: testResult.success ? appleTheme.colors.success + "10" : appleTheme.colors.error + "10",
                  border: `1px solid ${testResult.success ? appleTheme.colors.success : appleTheme.colors.error}`,
                  borderRadius: appleTheme.borderRadius.md,
                  padding: appleTheme.spacing[4]
                }}>
                  <Flex align="center" gap={2} style={{ marginBottom: appleTheme.spacing[3] }}>
                    {testResult.success ? <CheckIcon style={{ color: isDarkMode ? "#30D158" : appleTheme.colors.success }} /> : <ErrorIcon style={{ color: isDarkMode ? "#FF453A" : appleTheme.colors.error }} />}
                    <Typography variant="callout" weight="semibold" color={testResult.success ? "success" : "error"}>
                      {testResult.success ? "Success!" : "Error"}
                    </Typography>
                  </Flex>
                  
                  <Box style={{
                    backgroundColor: appleTheme.colors.background.primary,
                    padding: appleTheme.spacing[3],
                    borderRadius: appleTheme.borderRadius.sm,
                    fontFamily: appleTheme.typography.fontFamily.mono,
                    fontSize: appleTheme.typography.fontSize.sm,
                    color: appleTheme.colors.text.secondary,
                    overflowX: "auto"
                  }}>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(testResult.data || testResult.error, null, 2)}
                    </pre>
                  </Box>
                </Box>
              )}
            </Stack>
          </Card>
        </Section>

        {/* Endpoints */}
        <Section padding="lg">
          <Typography variant="title2" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000"
          }}>
            API Endpoints
          </Typography>
          
          <Stack spacing={4}>
            {endpoints.map((endpoint, index) => (
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
                <Stack spacing={4}>
                  <Flex align="center" justify="space-between">
                    <HStack spacing={3} align="center">
                      <Box style={{
                        padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                        backgroundColor: endpoint.method === "GET" ? appleTheme.colors.success : appleTheme.colors.warning,
                        color: "white",
                        borderRadius: appleTheme.borderRadius.sm,
                        fontSize: appleTheme.typography.fontSize.xs,
                        fontWeight: appleTheme.typography.fontWeight.semibold
                      }}>
                        {endpoint.method}
                      </Box>
                      <Typography variant="callout" weight="semibold" style={{ 
                        fontFamily: appleTheme.typography.fontFamily.mono,
                        color: isDarkMode ? "#FFFFFF" : "#000000"
                      }}>
                        {endpoint.path}
                      </Typography>
                    </HStack>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => toggleSection(`endpoint-${index}`)}
                      endIcon={expandedSections[`endpoint-${index}`] ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    >
                      {expandedSections[`endpoint-${index}`] ? "Hide Details" : "Show Details"}
                    </Button>
                  </Flex>
                  
                  <Typography variant="body" style={{
                    color: isDarkMode ? "#E5E5EA" : "#1C1C1E"
                  }}>
                    {endpoint.description}
                  </Typography>
                  
                  {expandedSections[`endpoint-${index}`] && (
                    <Box>
                      <Typography variant="footnote" weight="semibold" style={{ 
                        marginBottom: appleTheme.spacing[3],
                        color: isDarkMode ? "#FFFFFF" : "#000000"
                      }}>
                        Parameters
                      </Typography>
                      <Stack spacing={2}>
                        {endpoint.parameters.map((param, paramIndex) => (
                          <Box key={paramIndex} style={{
                            padding: appleTheme.spacing[3],
                            backgroundColor: appleTheme.colors.gray[50],
                            borderRadius: appleTheme.borderRadius.sm
                          }}>
                            <Flex align="center" justify="space-between" style={{ marginBottom: appleTheme.spacing[1] }}>
                              <HStack spacing={2} align="center">
                                <Typography variant="footnote" weight="semibold" style={{ 
                                  fontFamily: appleTheme.typography.fontFamily.mono,
                                  color: isDarkMode ? "#FFFFFF" : "#000000"
                                }}>
                                  {param.name}
                                </Typography>
                                <Box style={{
                                  padding: `${appleTheme.spacing[0.5]} ${appleTheme.spacing[1]}`,
                                  backgroundColor: appleTheme.colors.gray[200],
                                  borderRadius: appleTheme.borderRadius.sm,
                                  fontSize: appleTheme.typography.fontSize.xs,
                                  color: appleTheme.colors.text.secondary
                                }}>
                                  {param.type}
                                </Box>
                                {param.required && (
                                  <Box style={{
                                    padding: `${appleTheme.spacing[0.5]} ${appleTheme.spacing[1]}`,
                                    backgroundColor: appleTheme.colors.error,
                                    color: "white",
                                    borderRadius: appleTheme.borderRadius.sm,
                                    fontSize: appleTheme.typography.fontSize.xs,
                                    fontWeight: appleTheme.typography.fontWeight.semibold
                                  }}>
                                    Required
                                  </Box>
                                )}
                              </HStack>
                            </Flex>
                            <Typography variant="caption1" color="tertiary">
                              {param.description}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </div>
            ))}
          </Stack>
        </Section>

        {/* Code Examples */}
        <Section padding="lg">
          <Typography variant="title2" style={{ 
            marginBottom: appleTheme.spacing[6],
            color: isDarkMode ? "#FFFFFF" : "#000000"
          }}>
            Code Examples
          </Typography>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: appleTheme.spacing[6]
          }}>
            {Object.entries(codeExamples).map(([language, code]) => (
              <div key={language} style={{
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
                <Stack spacing={3}>
                  <Flex align="center" justify="space-between">
                    <HStack spacing={2} align="center">
                      <CodeIcon style={{ color: appleTheme.colors.primary[500] }} />
                      <Typography variant="callout" weight="semibold" style={{ 
                        textTransform: "capitalize",
                        color: isDarkMode ? "#FFFFFF" : "#000000"
                      }}>
                        {language}
                      </Typography>
                    </HStack>
                    <Button
                      variant="ghost"
                      size="small"
                      startIcon={<CopyIcon />}
                      onClick={() => copyToClipboard(code)}
                    >
                      Copy
                    </Button>
                  </Flex>
                  
                  <Box style={{
                    backgroundColor: appleTheme.colors.gray[50],
                    padding: appleTheme.spacing[3],
                    borderRadius: appleTheme.borderRadius.sm,
                    fontFamily: appleTheme.typography.fontFamily.mono,
                    fontSize: appleTheme.typography.fontSize.sm,
                    color: appleTheme.colors.text.secondary,
                    overflowX: "auto"
                  }}>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                      {code}
                    </pre>
                  </Box>
                </Stack>
              </div>
            ))}
          </div>
        </Section>

        {/* Authentication */}
        <Section padding="lg">
          <Card variant="elevated" padding="large">
            <Stack spacing={4}>
              <HStack spacing={3} align="center">
                <KeyIcon style={{ color: appleTheme.colors.primary[500] }} />
                <Typography variant="title2" style={{
                  color: isDarkMode ? "#FFFFFF" : "#000000"
                }}>
                  Authentication
                </Typography>
              </HStack>
              
              <Typography variant="body" color="secondary">
                All API requests require authentication using an API key. Include your API key in the Authorization header.
              </Typography>
              
              <Box style={{
                backgroundColor: appleTheme.colors.gray[50],
                padding: appleTheme.spacing[4],
                borderRadius: appleTheme.borderRadius.md,
                fontFamily: appleTheme.typography.fontFamily.mono,
                fontSize: appleTheme.typography.fontSize.sm,
                color: appleTheme.colors.text.secondary
              }}>
                <pre style={{ margin: 0 }}>Authorization: Bearer YOUR_API_KEY</pre>
              </Box>
              
              <Typography variant="footnote" color="tertiary">
                Get your API key from the dashboard after signing up for a Pro or Enterprise plan.
              </Typography>
            </Stack>
          </Card>
        </Section>
      </Container>

      {/* Snackbar for copy feedback */}
      {snackbarOpen && (
        <Box style={{
          position: "fixed",
          bottom: appleTheme.spacing[6],
          right: appleTheme.spacing[6],
          backgroundColor: appleTheme.colors.success,
          color: "white",
          padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
          borderRadius: appleTheme.borderRadius.md,
          boxShadow: appleTheme.shadows.lg,
          zIndex: 1000
        }}>
          <Typography variant="footnote" color="white">
            {snackbarMessage}
          </Typography>
        </Box>
      )}
    </div>
  );
}
