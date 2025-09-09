import React, { useState } from "react";
import Typography from "../components/apple/Typography";
import Button from "../components/apple/Button";
import Card from "../components/apple/Card";
import Input from "../components/apple/Input";
import { Container, Box, Flex, Stack, Section, HStack } from "../components/apple/Layout";
import { appleTheme } from "../styles/apple-theme";

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
    <line x1="15" y1="9" x2="9" y1="15"/>
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
    <div style={{ backgroundColor: appleTheme.colors.background.secondary, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Section background="linear-gradient(135deg, #007AFF 0%, #5856D6 100%)" padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center", color: "white" }}>
            <Typography variant="display" color="white" style={{ marginBottom: appleTheme.spacing[4] }}>
              API Documentation
            </Typography>
            <Typography variant="headline" color="white" weight="regular" style={{ 
              opacity: 0.9,
              maxWidth: "600px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`
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
              <Typography variant="title2">
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
              <Typography variant="title2">
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
                    {testResult.success ? <CheckIcon style={{ color: isDarkMode ? '#30D158' : appleTheme.colors.success }} /> : <ErrorIcon style={{ color: isDarkMode ? '#FF453A' : appleTheme.colors.error }} />}
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
          <Typography variant="title2" style={{ marginBottom: appleTheme.spacing[6] }}>
            API Endpoints
          </Typography>
          
          <Stack spacing={4}>
            {endpoints.map((endpoint, index) => (
              <Card key={index} variant="outlined" padding="large">
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
                      <Typography variant="callout" weight="semibold" style={{ fontFamily: appleTheme.typography.fontFamily.mono }}>
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
                  
                  <Typography variant="body" color="secondary">
                    {endpoint.description}
                  </Typography>
                  
                  {expandedSections[`endpoint-${index}`] && (
                    <Box>
                      <Typography variant="footnote" weight="semibold" style={{ marginBottom: appleTheme.spacing[3] }}>
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
                                <Typography variant="footnote" weight="semibold" style={{ fontFamily: appleTheme.typography.fontFamily.mono }}>
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
              </Card>
            ))}
          </Stack>
        </Section>

        {/* Code Examples */}
        <Section padding="lg">
          <Typography variant="title2" style={{ marginBottom: appleTheme.spacing[6] }}>
            Code Examples
          </Typography>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: appleTheme.spacing[6]
          }}>
            {Object.entries(codeExamples).map(([language, code]) => (
              <Card key={language} variant="outlined" padding="large">
                <Stack spacing={3}>
                  <Flex align="center" justify="space-between">
                    <HStack spacing={2} align="center">
                      <CodeIcon style={{ color: appleTheme.colors.primary[500] }} />
                      <Typography variant="callout" weight="semibold" style={{ textTransform: "capitalize" }}>
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
              </Card>
            ))}
          </div>
        </Section>

        {/* Authentication */}
        <Section padding="lg">
          <Card variant="elevated" padding="large">
            <Stack spacing={4}>
              <HStack spacing={3} align="center">
                <KeyIcon style={{ color: appleTheme.colors.primary[500] }} />
                <Typography variant="title2">
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
