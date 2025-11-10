import React, { useState, memo } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import Input from "../components/apple/Input";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Code,
  Copy,
  Play,
  Check,
  XCircle,
  CaretDown,
  CaretRight,
  Key,
  Globe,
  ShieldCheck
} from "phosphor-react";

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
const CodeIcon = () => <Code size={20} weight="regular" />;
const CopyIcon = () => <Copy size={16} weight="regular" />;
const PlayIcon = () => <Play size={16} weight="fill" />;
const CheckIcon = () => <Check size={16} weight="bold" />;
const ErrorIcon = () => <XCircle size={16} weight="fill" />;
const ChevronDownIcon = () => <CaretDown size={16} weight="bold" />;

const ChevronRightIcon = () => <CaretRight size={16} weight="bold" />;

const KeyIcon = () => <Key size={20} weight="regular" />;

const GlobeIcon = () => <Globe size={20} weight="regular" />;
const ShieldIcon = () => <ShieldCheck size={20} weight="regular" />;

export default function ApiDocs() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [testUrl, setTestUrl] = useState("");
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [expandedSections, setExpandedSections] = useState({});

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage(t("apiDocs.copiedToClipboard"));
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
      description: t("apiDocs.endpointScanDesc"),
      parameters: [
        { name: "url", type: "string", required: true, description: t("apiDocs.paramUrl") },
        { name: "depth", type: "number", required: false, description: t("apiDocs.paramDepth") },
        { name: "include", type: "string", required: false, description: t("apiDocs.paramInclude") }
      ]
    },
    {
      method: "POST",
      path: "/api/batch-scan",
      description: t("apiDocs.endpointBatchDesc"),
      parameters: [
        { name: "urls", type: "array", required: true, description: t("apiDocs.paramUrls") },
        { name: "options", type: "object", required: false, description: t("apiDocs.paramOptions") }
      ]
    }
  ];

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div style={{ 
      backgroundColor: themeColors.background.secondary, 
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Hero Section */}
      <Section background={isDarkMode ? "linear-gradient(135deg, rgba(28, 28, 30, 0.9) 0%, rgba(44, 44, 46, 0.9) 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[4],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold,
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("apiDocs.title")}
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[5]} auto`,
              fontWeight: appleTheme.typography.fontWeight.medium,
              wordBreak: "break-word",
              overflowWrap: "break-word"
            }}>
              {t("apiDocs.subtitle")}
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
                {t("apiDocs.quickStart")}
              </Typography>
              <Typography variant="body" style={{
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("apiDocs.quickStartDesc")}
              </Typography>
              
              <Box style={{
                backgroundColor: isDarkMode ? "#2C2C2E" : "#FFFFFF",
                padding: appleTheme.spacing[4],
                borderRadius: appleTheme.borderRadius.md,
                fontFamily: appleTheme.typography.fontFamily.mono,
                fontSize: appleTheme.typography.fontSize.sm,
                color: isDarkMode ? "#FFFFFF" : "#000000",
                overflowX: "auto",
                border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #E5E5EA"
              }}>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {codeExamples.curl}
                </pre>
              </Box>
              
              <HStack justify="space-between" align="center">
                <Typography variant="footnote" style={{
                  color: isDarkMode ? "#AEAEB2" : "#6D6D70",
                  wordBreak: "break-word",
                  overflowWrap: "break-word"
                }}>
                  {t("apiDocs.replaceApiKey")}
                </Typography>
                <Button
                  variant="ghost"
                  size="small"
                  startIcon={<CopyIcon />}
                  onClick={() => copyToClipboard(codeExamples.curl)}
                  style={{
                    color: isDarkMode ? "#007AFF" : appleTheme.colors.primary[500]
                  }}
                >
                  {t("apiDocs.copy")}
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
                {t("apiDocs.testApi")}
              </Typography>
              <Typography variant="body" style={{
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("apiDocs.testApiDesc")}
              </Typography>
              
              <HStack spacing={3} align="flex-end">
                <Box style={{ flex: 1 }}>
                  <Input
                    label={t("apiDocs.websiteUrl")}
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
                  {t("apiDocs.testApi")}
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
                      {testResult.success ? t("apiDocs.success") : t("apiDocs.error")}
                    </Typography>
                  </Flex>
                  
                  <Box style={{
                    backgroundColor: isDarkMode ? "#2C2C2E" : "#FFFFFF",
                    padding: appleTheme.spacing[3],
                    borderRadius: appleTheme.borderRadius.sm,
                    fontFamily: appleTheme.typography.fontFamily.mono,
                    fontSize: appleTheme.typography.fontSize.sm,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    overflowX: "auto",
                    border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #E5E5EA"
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
            {t("apiDocs.apiEndpoints")}
          </Typography>
          
          <Stack spacing={4}>
            {endpoints.map((endpoint, index) => (
              <div key={index} style={{
                backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF",
                border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA"}`,
                borderRadius: "16px",
                padding: "24px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
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
                e.currentTarget.style.boxShadow = isDarkMode ? "0 8px 25px rgba(0, 0, 0, 0.5)" : "0 8px 25px rgba(0, 0, 0, 0.15)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "#007AFF";
                e.currentTarget.style.backgroundColor = isDarkMode ? themeColors.gray[200] : "#F8F9FA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA";
                e.currentTarget.style.backgroundColor = isDarkMode ? themeColors.background.tertiary : "#FFFFFF";
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
                      {expandedSections[`endpoint-${index}`] ? t("apiDocs.hideDetails") : t("apiDocs.showDetails")}
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
                        {t("apiDocs.parameters")}
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
                                    {t("apiDocs.required")}
                                  </Box>
                                )}
                              </HStack>
                            </Flex>
                            <Typography variant="caption1" style={{
                              color: isDarkMode ? "#AEAEB2" : "#6D6D70"
                            }}>
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
            {t("apiDocs.codeExamples")}
          </Typography>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: appleTheme.spacing[6]
          }}>
            {Object.entries(codeExamples).map(([language, code]) => (
              <div key={language} style={{
                backgroundColor: isDarkMode ? themeColors.background.tertiary : "#FFFFFF",
                border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA"}`,
                borderRadius: "16px",
                padding: "24px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
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
                e.currentTarget.style.boxShadow = isDarkMode ? "0 8px 25px rgba(0, 0, 0, 0.5)" : "0 8px 25px rgba(0, 0, 0, 0.15)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "#007AFF";
                e.currentTarget.style.backgroundColor = isDarkMode ? themeColors.gray[200] : "#F8F9FA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isDarkMode ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#E5E5EA";
                e.currentTarget.style.backgroundColor = isDarkMode ? themeColors.background.tertiary : "#FFFFFF";
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
                      style={{
                        color: isDarkMode ? "#007AFF" : appleTheme.colors.primary[500]
                      }}
                    >
                      {t("apiDocs.copy")}
                    </Button>
                  </Flex>
                  
                  <Box style={{
                    backgroundColor: isDarkMode ? "#2C2C2E" : "#FFFFFF",
                    padding: appleTheme.spacing[3],
                    borderRadius: appleTheme.borderRadius.sm,
                    fontFamily: appleTheme.typography.fontFamily.mono,
                    fontSize: appleTheme.typography.fontSize.sm,
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                    overflowX: "auto",
                    border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #E5E5EA"
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
                  {t("apiDocs.authentication")}
                </Typography>
              </HStack>
              
              <Typography variant="body" style={{
                color: isDarkMode ? "#E5E5EA" : "#1C1C1E",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("apiDocs.authDesc")}
              </Typography>
              
              <Box style={{
                backgroundColor: isDarkMode ? "#2C2C2E" : "#FFFFFF",
                padding: appleTheme.spacing[4],
                borderRadius: appleTheme.borderRadius.md,
                fontFamily: appleTheme.typography.fontFamily.mono,
                fontSize: appleTheme.typography.fontSize.sm,
                color: isDarkMode ? "#FFFFFF" : "#000000",
                border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #E5E5EA"
              }}>
                <pre style={{ margin: 0 }}>Authorization: Bearer YOUR_API_KEY</pre>
              </Box>
              
              <Typography variant="footnote" style={{
                color: isDarkMode ? "#AEAEB2" : "#6D6D70",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}>
                {t("apiDocs.getApiKey")}
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
