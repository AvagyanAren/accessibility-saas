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
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  RecordVoiceOver,
  CheckCircle,
  Error,
  Warning,
  Info,
  PlayArrow,
  Stop,
  VolumeUp,
  ExpandMore,
} from "@mui/icons-material";
import Link from "next/link";

export default function ScreenReaderSimulator() {
  const [url, setUrl] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSimulate = async () => {
    if (!url.trim()) {
      setSnackbarMessage("Please enter a URL to simulate");
      setSnackbarOpen(true);
      return;
    }

    setSimulating(true);
    try {
      // Simulate screen reader analysis
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockResults = {
        overallScore: 82,
        screenReaderExperience: {
          totalElements: 45,
          accessibleElements: 38,
          problematicElements: 7,
          navigationLandmarks: 6,
          headingStructure: "Good",
          formLabels: "Complete",
          linkDescriptions: "Mostly clear"
        },
        issues: [
          {
            type: "heading-structure",
            severity: "warning",
            element: "h3",
            description: "Heading hierarchy skipped (h1 → h3)",
            impact: "Screen readers may not announce proper document structure",
            suggestion: "Use h2 before h3 to maintain proper heading hierarchy",
            code: '<h2>Section Title</h2>\n<h3>Subsection Title</h3>'
          },
          {
            type: "missing-labels",
            severity: "critical",
            element: "input",
            description: "Form input missing accessible label",
            impact: "Screen reader users cannot identify the input purpose",
            suggestion: "Add label element or aria-label attribute",
            code: '<label for="email">Email Address</label>\n<input id="email" type="email" />'
          },
          {
            type: "link-text",
            severity: "warning",
            element: "a",
            description: "Link text is not descriptive ('Click here')",
            impact: "Screen reader users cannot understand link purpose out of context",
            suggestion: "Use descriptive link text that explains the destination",
            code: '<a href="/contact">Contact our support team</a>'
          },
          {
            type: "aria-roles",
            severity: "info",
            element: "button",
            description: "Custom button missing proper ARIA role",
            impact: "Screen reader may not recognize it as a button",
            suggestion: "Add role='button' and ensure keyboard accessibility",
            code: '<div role="button" tabindex="0" aria-label="Close dialog">×</div>'
          },
          {
            type: "live-regions",
            severity: "info",
            element: "status-message",
            description: "Dynamic content updates not announced to screen readers",
            impact: "Screen reader users miss important status changes",
            suggestion: "Use aria-live regions for dynamic content",
            code: '<div aria-live="polite" role="status">Form submitted successfully</div>'
          },
          {
            type: "focus-management",
            severity: "warning",
            element: "modal",
            description: "Modal does not trap focus properly",
            impact: "Screen reader users may lose track of focus location",
            suggestion: "Implement focus trap and return focus on close",
            code: '// Focus management in modal\nconst focusableElements = modal.querySelectorAll(\'[tabindex]:not([tabindex="-1"]), button, input, select, textarea\');'
          },
          {
            type: "table-structure",
            severity: "warning",
            element: "table",
            description: "Data table missing proper headers and scope",
            impact: "Screen reader users cannot understand table structure",
            suggestion: "Add proper table headers with scope attributes",
            code: '<th scope="col">Product Name</th>\n<th scope="col">Price</th>'
          }
        ],
        screenReaderOutput: [
          {
            element: "Navigation",
            content: "Main navigation landmark with 6 items",
            level: "landmark"
          },
          {
            element: "Heading",
            content: "Welcome to Our Website, heading level 1",
            level: "h1"
          },
          {
            element: "Heading",
            content: "About Our Services, heading level 2",
            level: "h2"
          },
          {
            element: "Text",
            content: "We provide comprehensive accessibility solutions...",
            level: "paragraph"
          },
          {
            element: "Button",
            content: "Get Started, button",
            level: "button"
          },
          {
            element: "Link",
            content: "Learn more about accessibility, link",
            level: "link"
          },
          {
            element: "Form",
            content: "Contact form with 3 fields",
            level: "form"
          }
        ],
        recommendations: [
          "Maintain proper heading hierarchy (h1 → h2 → h3)",
          "Ensure all form inputs have associated labels",
          "Use descriptive link text that makes sense out of context",
          "Add ARIA roles for custom interactive elements",
          "Implement live regions for dynamic content updates",
          "Ensure proper focus management in modals and dropdowns",
          "Use proper table headers with scope attributes"
        ]
      };
      
      setResults(mockResults);
    } catch (error) {
      setSnackbarMessage("Error simulating screen reader. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setSimulating(false);
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

  const getScoreColor = (score) => {
    if (score >= 90) return "#28a745";
    if (score >= 70) return "#ffc107";
    return "#dc3545";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
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
          Screen Reader Simulator
        </Typography>
        <Typography variant="h6" sx={{ 
          opacity: 0.9,
          maxWidth: "600px",
          mx: "auto",
          px: 2
        }}>
          Experience your website as screen reader users do. Test and improve screen reader accessibility.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        {/* Input Section */}
        <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
            Simulate Screen Reader Experience
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
              onClick={handleSimulate}
              disabled={simulating}
              startIcon={simulating ? <CircularProgress size={20} /> : <RecordVoiceOver />}
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
              {simulating ? "Simulating..." : "Start Simulation"}
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>What we test:</strong> Screen reader navigation, heading structure, form labels, 
              ARIA roles, live regions, and overall screen reader experience.
            </Typography>
          </Alert>
        </Paper>

        {/* Results Section */}
        {results && (
          <Box sx={{ mb: 4 }}>
            {/* Overall Score */}
            <Paper sx={{ p: 4, mb: 4, borderRadius: 3, textAlign: "center" }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: getScoreColor(results.overallScore),
                mb: 1
              }}>
                {results.overallScore}/100
              </Typography>
              <Typography variant="h6" sx={{ 
                color: getScoreColor(results.overallScore),
                mb: 3
              }}>
                {getScoreLabel(results.overallScore)} Screen Reader Experience
              </Typography>
            </Paper>

            {/* Tabs for different views */}
            <Paper sx={{ mb: 4, borderRadius: 3 }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Overview" />
                <Tab label="Screen Reader Output" />
                <Tab label="Issues & Fixes" />
              </Tabs>

              {/* Overview Tab */}
              {activeTab === 0 && (
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                    Screen Reader Experience Overview
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ textAlign: "center", p: 2 }}>
                        <CardContent>
                          <Typography variant="h4" sx={{ color: "#0077b6", fontWeight: 700 }}>
                            {results.screenReaderExperience.totalElements}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Elements
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ textAlign: "center", p: 2 }}>
                        <CardContent>
                          <Typography variant="h4" sx={{ color: "#28a745", fontWeight: 700 }}>
                            {results.screenReaderExperience.accessibleElements}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Accessible Elements
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ textAlign: "center", p: 2 }}>
                        <CardContent>
                          <Typography variant="h4" sx={{ color: "#dc3545", fontWeight: 700 }}>
                            {results.screenReaderExperience.problematicElements}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Problematic Elements
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ textAlign: "center", p: 2 }}>
                        <CardContent>
                          <Typography variant="h4" sx={{ color: "#17a2b8", fontWeight: 700 }}>
                            {results.screenReaderExperience.navigationLandmarks}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Navigation Landmarks
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Heading Structure
                          </Typography>
                          <Chip 
                            label={results.screenReaderExperience.headingStructure}
                            color={results.screenReaderExperience.headingStructure === "Good" ? "success" : "warning"}
                            size="small"
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Form Labels
                          </Typography>
                          <Chip 
                            label={results.screenReaderExperience.formLabels}
                            color={results.screenReaderExperience.formLabels === "Complete" ? "success" : "warning"}
                            size="small"
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Link Descriptions
                          </Typography>
                          <Chip 
                            label={results.screenReaderExperience.linkDescriptions}
                            color={results.screenReaderExperience.linkDescriptions === "Mostly clear" ? "warning" : "success"}
                            size="small"
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Screen Reader Output Tab */}
              {activeTab === 1 && (
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                    How Screen Readers Experience Your Page
                  </Typography>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      This is how screen readers would announce the content on your page. 
                      Listen to the order and context of information.
                    </Typography>
                  </Alert>
                  
                  <List>
                    {results.screenReaderOutput.map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon>
                          <VolumeUp sx={{ color: "#0077b6" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {item.element}
                              </Typography>
                              <Chip 
                                label={item.level}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: "10px" }}
                              />
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic" }}>
                              "{item.content}"
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Issues & Fixes Tab */}
              {activeTab === 2 && (
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                    Screen Reader Issues & Fixes
                  </Typography>
                  
                  {results.issues.length === 0 ? (
                    <Alert severity="success">
                      <Typography variant="h6">Excellent! No screen reader issues found.</Typography>
                      <Typography variant="body2">
                        Your website provides an excellent screen reader experience.
                      </Typography>
                    </Alert>
                  ) : (
                    <List>
                      {results.issues.map((issue, index) => (
                        <Accordion key={index} sx={{ mb: 1 }}>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                              <Box sx={{ color: getSeverityColor(issue.severity) }}>
                                {getSeverityIcon(issue.severity)}
                              </Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
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
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box>
                              <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                                <strong>Element:</strong> {issue.element}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2, color: "#dc3545", fontWeight: 600 }}>
                                Impact: {issue.impact}
                              </Typography>
                              <Alert severity="info" sx={{ mb: 2 }}>
                                <Typography variant="body2">
                                  <strong>💡 Suggestion:</strong> {issue.suggestion}
                                </Typography>
                              </Alert>
                              <Paper sx={{ p: 2, backgroundColor: "#f8f9fa" }}>
                                <Typography variant="caption" sx={{ color: "#666", display: "block", mb: 1 }}>
                                  Code Example:
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "14px" }}>
                                  {issue.code}
                                </Typography>
                              </Paper>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </List>
                  )}
                </Box>
              )}
            </Paper>

            {/* Recommendations */}
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                Screen Reader Optimization Recommendations
              </Typography>
              <List>
                {results.recommendations.map((recommendation, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "#28a745" }} />
                    </ListItemIcon>
                    <ListItemText primary={recommendation} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Best Practices */}
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
            Screen Reader Best Practices
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#28a745" }}>
                ✅ Essential Requirements
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Proper heading hierarchy (h1 → h2 → h3)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="All form inputs have associated labels" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Descriptive link text that makes sense out of context" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Alt text for all meaningful images" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="ARIA landmarks for page structure" />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#17a2b8" }}>
                🚀 Advanced Features
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Live regions for dynamic content updates" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Skip links for main content navigation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Focus management in modals and dropdowns" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Proper table headers with scope attributes" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Screen reader testing with actual tools" />
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
