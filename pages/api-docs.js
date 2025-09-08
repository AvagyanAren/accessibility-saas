import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Code,
  ContentCopy,
  PlayArrow,
  ExpandMore,
  CheckCircle,
  Error,
} from "@mui/icons-material";

export default function ApiDocs() {
  const [testUrl, setTestUrl] = useState("");
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const codeExamples = {
    curl: `curl -X GET "https://your-domain.com/api/scan?url=https://example.com"`,
    javascript: `const response = await fetch('https://your-domain.com/api/scan?url=https://example.com');
const data = await response.json();
console.log(data.violations);`,
    python: `import requests

response = requests.get('https://your-domain.com/api/scan', 
                       params={'url': 'https://example.com'})
data = response.json()
print(data['violations'])`,
    php: `<?php
$url = 'https://your-domain.com/api/scan?url=' . urlencode('https://example.com');
$response = file_get_contents($url);
$data = json_decode($response, true);
echo json_encode($data['violations']);
?>`
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/scan",
      description: "Scan a website for accessibility issues",
      parameters: [
        { name: "url", type: "string", required: true, description: "The website URL to scan" }
      ],
      response: {
        violations: "Array of accessibility violations",
        timestamp: "Scan completion timestamp",
        url: "Scanned URL"
      }
    },
    {
      method: "POST",
      path: "/api/send-report",
      description: "Send accessibility report via email",
      parameters: [
        { name: "email", type: "string", required: true, description: "Recipient email address" },
        { name: "url", type: "string", required: true, description: "Scanned website URL" },
        { name: "score", type: "object", required: true, description: "Accessibility score data" },
        { name: "violations", type: "array", required: true, description: "Array of violations" }
      ],
      response: {
        message: "Success message",
        email: "Sent email address",
        reportId: "Unique report identifier"
      }
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#e3f2fd" }}>
      {/* Header */}
      <Box sx={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: { xs: 6, sm: 8 },
        textAlign: "center"
      }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 700, 
          mb: 2,
          fontSize: { xs: "28px", sm: "36px" }
        }}>
          API Documentation
        </Typography>
        <Typography variant="h6" sx={{ 
          opacity: 0.9,
          maxWidth: "600px",
          mx: "auto",
          px: 2
        }}>
          Integrate accessibility testing into your development workflow with our RESTful API.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        {/* API Test Section */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            🧪 Test the API
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Website URL"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              placeholder="https://example.com"
              size="small"
            />
            <Button
              variant="contained"
              onClick={testApi}
              disabled={loading || !testUrl}
              startIcon={<PlayArrow />}
            >
              {loading ? "Testing..." : "Test API"}
            </Button>
          </Box>
          
          {testResult && (
            <Alert 
              severity={testResult.success ? "success" : "error"}
              sx={{ mt: 2 }}
            >
              {testResult.success ? (
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    ✅ API call successful! Found {testResult.data.violations?.length || 0} accessibility issues.
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => copyToClipboard(JSON.stringify(testResult.data, null, 2))}
                    startIcon={<ContentCopy />}
                  >
                    Copy Response
                  </Button>
                </Box>
              ) : (
                `❌ API call failed: ${testResult.error}`
              )}
            </Alert>
          )}
        </Paper>

        {/* Endpoints Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            📡 API Endpoints
          </Typography>
          <Grid container spacing={3}>
            {endpoints.map((endpoint, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Chip 
                        label={endpoint.method} 
                        color={endpoint.method === "GET" ? "success" : "primary"}
                        sx={{ mr: 2 }}
                      />
                      <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                        {endpoint.path}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {endpoint.description}
                    </Typography>
                    
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Parameters:
                    </Typography>
                    {endpoint.parameters.map((param, paramIndex) => (
                      <Box key={paramIndex} sx={{ ml: 2, mb: 1 }}>
                        <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                          {param.name} ({param.type}) {param.required && <Chip label="required" size="small" />}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#666" }}>
                          {param.description}
                        </Typography>
                      </Box>
                    ))}
                    
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                      Response:
                    </Typography>
                    <Box sx={{ 
                      backgroundColor: "#f8f9fa", 
                      p: 2, 
                      borderRadius: 1,
                      fontFamily: "monospace",
                      fontSize: "14px"
                    }}>
                      {JSON.stringify(endpoint.response, null, 2)}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Code Examples Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            💻 Code Examples
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(codeExamples).map(([language, code]) => (
              <Grid item xs={12} md={6} key={language}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                      {language}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ 
                      backgroundColor: "#f8f9fa", 
                      p: 2, 
                      borderRadius: 1,
                      position: "relative"
                    }}>
                      <Button
                        size="small"
                        startIcon={<ContentCopy />}
                        onClick={() => copyToClipboard(code)}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                      >
                        Copy
                      </Button>
                      <pre style={{ 
                        margin: 0, 
                        fontFamily: "monospace", 
                        fontSize: "14px",
                        overflow: "auto"
                      }}>
                        {code}
                      </pre>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Paper sx={{ p: 4, textAlign: "center", mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            💰 API Pricing
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Free Tier
                </Typography>
                <Typography variant="h4" sx={{ color: "#28a745", mb: 1 }}>
                  $0
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  100 scans/month
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Perfect for testing and development
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, border: "2px solid #0077b6" }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Pro
                </Typography>
                <Typography variant="h4" sx={{ color: "#0077b6", mb: 1 }}>
                  $29
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  1,000 scans/month
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For growing businesses
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Enterprise
                </Typography>
                <Typography variant="h4" sx={{ color: "#6f42c1", mb: 1 }}>
                  Custom
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Unlimited scans
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For large organizations
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* CTA Section */}
        <Paper sx={{ 
          p: 4, 
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white"
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Start integrating accessibility testing into your development workflow today.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: "white",
              color: "#667eea",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                backgroundColor: "#f8f9fa"
              }
            }}
            href="/"
          >
            Get API Key
          </Button>
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
