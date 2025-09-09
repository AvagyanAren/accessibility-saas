import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import Link from "next/link";

// Shared components
import ToolHeader from "../../components/common/ToolHeader";
import ToolInput from "../../components/common/ToolInput";
import ScoreCard from "../../components/common/ScoreCard";
import IssueList from "../../components/common/IssueList";
import BestPractices from "../../components/common/BestPractices";
import ToolCTA from "../../components/common/ToolCTA";
import NotificationSnackbar from "../../components/common/NotificationSnackbar";

// Custom hook
import useToolAnalysis from "../../hooks/useToolAnalysis";

export default function AltTextAnalyzer() {
  const mockAnalysis = async (url) => {
    // Simulate analysis - in real implementation, this would call an API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
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
          suggestion: "Add descriptive alt text: 'Modern office workspace with team collaboration'",
          code: '<img src="hero.jpg" alt="Modern office workspace with team collaboration" />'
        },
        {
          type: "empty",
          severity: "warning",
          element: "img",
          selector: ".decoration-icon",
          description: "Decorative icon has empty alt text",
          suggestion: "Use alt='' for decorative images or add meaningful description",
          code: '<img src="decoration.svg" alt="" />'
        },
        {
          type: "generic",
          severity: "warning",
          element: "img",
          selector: ".product-image",
          description: "Product image has generic alt text",
          suggestion: "Replace 'image' with specific product description",
          code: '<img src="product.jpg" alt="Wireless Bluetooth Headphones - Black" />'
        },
        {
          type: "too-long",
          severity: "info",
          element: "img",
          selector: ".chart-image",
          description: "Alt text is too long (over 125 characters)",
          suggestion: "Keep alt text concise and under 125 characters",
          code: '<img src="chart.jpg" alt="Q3 sales increased 25% year-over-year" />'
        }
      ],
      score: 67
    };
  };

  const {
    url,
    setUrl,
    analyzing,
    results,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleAnalysis,
    closeSnackbar
  } = useToolAnalysis(mockAnalysis, {
    successMessage: "Alt text analysis completed successfully",
    errorMessage: "Error analyzing images. Please try again."
  });

  const bestPractices = [
    {
      type: "do",
      text: "Be descriptive and specific",
      description: "Describe what's in the image, not just that it's an image"
    },
    {
      type: "do", 
      text: "Keep it concise (under 125 characters)",
      description: "Screen readers read alt text in full, so keep it brief"
    },
    {
      type: "do",
      text: "Use alt='' for decorative images",
      description: "Empty alt text tells screen readers to skip decorative images"
    },
    {
      type: "do",
      text: "Include text that appears in the image",
      description: "If the image contains text, include it in the alt text"
    },
    {
      type: "dont",
      text: "Use generic text like 'image' or 'photo'",
      description: "This provides no useful information to screen reader users"
    },
    {
      type: "dont",
      text: "Start with 'Image of' or 'Picture of'",
      description: "Screen readers already announce it's an image"
    },
    {
      type: "dont",
      text: "Repeat the filename",
      description: "Filenames are usually not descriptive or meaningful"
    },
    {
      type: "dont",
      text: "Leave alt text empty for meaningful images",
      description: "This makes important content inaccessible"
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#e3f2fd" }}>
      <ToolHeader
        title="Alt Text Analyzer"
        subtitle="Analyze and improve alt text for images on your website"
        description="Ensure all images are accessible to screen readers by checking for missing, empty, or poorly written alt text attributes."
        icon={<Image />}
        onAction={handleAnalysis}
        actionText="Analyze Images"
        actionIcon={<Image />}
        actionLoading={analyzing}
      />

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        <ToolInput
          title="Analyze Website Images"
          value={url}
          onChange={setUrl}
          onSubmit={handleAnalysis}
          loading={analyzing}
          buttonText="Analyze Images"
          buttonIcon={<Image />}
          infoMessage="What we check: Missing alt text, empty alt attributes, generic descriptions, overly long alt text, and decorative image handling."
        />

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
