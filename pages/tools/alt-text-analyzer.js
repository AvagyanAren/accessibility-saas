import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  Image,
  CheckCircle,
  Error,
  Warning,
  Info,
  Upload,
  Refresh,
  Download,
} from "@mui/icons-material";
import Link from "next/link";

export default function AltTextAnalyzer() {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setSnackbarMessage("Please enter a URL to analyze");
      setSnackbarOpen(true);
      return;
    }

    setAnalyzing(true);
    try {
      // Simulate analysis - in real implementation, this would call an API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults = {
        totalImages: 12,
        withAltText: 8,
        withoutAltText: 4,
        issues: [
          {
            type: "missing",
            severity: "critical",
            element: "img",
            selector: ".hero-image",
            description: "Hero banner image missing alt text",
            suggestion: "Add descriptive alt text: 'Modern office workspace with team collaboration'"
          },
          {
            type: "empty",
            severity: "warning",
            element: "img",
            selector: ".decoration-icon",
            description: "Decorative icon has empty alt text",
            suggestion: "Use alt='' for decorative images or add meaningful description"
          },
          {
            type: "generic",
            severity: "warning",
            element: "img",
            selector: ".product-image",
            description: "Product image has generic alt text",
            suggestion: "Replace 'image' with specific product description"
          },
          {
            type: "too-long",
            severity: "info",
            element: "img",
            selector: ".chart-image",
            description: "Alt text is too long (over 125 characters)",
            suggestion: "Keep alt text concise and under 125 characters"
          }
        ],
        score: 67
      };
      
      setResults(mockResults);
    } catch (error) {
      setSnackbarMessage("Error analyzing images. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setAnalyzing(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return "#dc3545";
      case "warning": return "#ffc107";
      case "info": return "#17a2b8";
      default: return "#6c757d";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical": return <Error />;
      case "warning": return <Warning />;
      case "info": return <Info />;
      default: return <Info />;
    }
  };

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
          Alt Text Analyzer
        </Typography>
        <Typography variant="h6" sx={{ 
          opacity: 0.9,
          maxWidth: "600px",
          mx: "auto",
          px: 2
        }}>
          Analyze and improve alt text for images on your website. Ensure all images are accessible to screen readers.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        {/* Input Section */}
        <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
            Analyze Website Images
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Website URL"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0077b6",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0077b6",
                    borderWidth: 2,
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={analyzing}
              startIcon={analyzing ? <CircularProgress size={20} /> : <Image />}
              sx={{
                backgroundColor: "#0077b6",
                px: 4,
                py: 1.5,
                fontSize: "16px",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              {analyzing ? "Analyzing..." : "Analyze Images"}
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>What we check:</strong> Missing alt text, empty alt attributes, generic descriptions, 
              overly long alt text, and decorative image handling.
            </Typography>
          </Alert>
        </Paper>

        {/* Results Section */}
        {results && (
          <Box sx={{ mb: 4 }}>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ color: "#0077b6", fontWeight: 700 }}>
                      {results.totalImages}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Images
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ color: "#28a745", fontWeight: 700 }}>
                      {results.withAltText}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      With Alt Text
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ color: "#dc3545", fontWeight: 700 }}>
                      {results.withoutAltText}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Missing Alt Text
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ color: "#ffc107", fontWeight: 700 }}>
                      {results.score}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Alt Text Score
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Issues List */}
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                Alt Text Issues Found
              </Typography>
              
              {results.issues.length === 0 ? (
                <Alert severity="success">
                  <Typography variant="h6">Great! No alt text issues found.</Typography>
                  <Typography variant="body2">
                    All images on this page have proper alt text attributes.
                  </Typography>
                </Alert>
              ) : (
                <List>
                  {results.issues.map((issue, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <Box sx={{ color: getSeverityColor(issue.severity) }}>
                            {getSeverityIcon(issue.severity)}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {issue.description}
                              </Typography>
                              <Chip
                                label={issue.severity.toUpperCase()}
                                size="small"
                                sx={{
                                  backgroundColor: getSeverityColor(issue.severity),
                                  color: "white",
                                  fontWeight: 600,
                                  fontSize: "10px"
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                                <strong>Element:</strong> {issue.element} | <strong>Selector:</strong> {issue.selector}
                              </Typography>
                              <Alert severity="info" sx={{ mt: 1 }}>
                                <Typography variant="body2">
                                  <strong>💡 Suggestion:</strong> {issue.suggestion}
                                </Typography>
                              </Alert>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < results.issues.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Box>
        )}

        {/* Best Practices */}
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
            Alt Text Best Practices
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#28a745" }}>
                ✅ Do's
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Be descriptive and specific" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Keep it concise (under 125 characters)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Use alt='' for decorative images" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Include text that appears in the image" />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#dc3545" }}>
                ❌ Don'ts
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Error sx={{ color: "#dc3545" }} />
                  </ListItemIcon>
                  <ListItemText primary="Use generic text like 'image' or 'photo'" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Error sx={{ color: "#dc3545" }} />
                  </ListItemIcon>
                  <ListItemText primary="Start with 'Image of' or 'Picture of'" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Error sx={{ color: "#dc3545" }} />
                  </ListItemIcon>
                  <ListItemText primary="Repeat the filename" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Error sx={{ color: "#dc3545" }} />
                  </ListItemIcon>
                  <ListItemText primary="Leave alt text empty for meaningful images" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>

        {/* CTA */}
        <Paper sx={{ 
          p: 4, 
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          mt: 4
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Need More Accessibility Tools?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Explore our full suite of accessibility testing tools.
          </Typography>
          <Button
            component={Link}
            href="/tools"
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
          >
            View All Tools
          </Button>
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
