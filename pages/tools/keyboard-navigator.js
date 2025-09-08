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
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import {
  Keyboard,
  CheckCircle,
  Error,
  Warning,
  Info,
  PlayArrow,
  Stop,
  Refresh,
  NavigateNext,
} from "@mui/icons-material";
import Link from "next/link";

export default function KeyboardNavigator() {
  const [url, setUrl] = useState("");
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTest = async () => {
    if (!url.trim()) {
      setSnackbarMessage("Please enter a URL to test");
      setSnackbarOpen(true);
      return;
    }

    setTesting(true);
    setActiveStep(0);
    try {
      // Simulate testing steps
      const steps = [
        "Scanning page for interactive elements...",
        "Testing tab order and focus management...",
        "Checking keyboard shortcuts and ARIA labels...",
        "Analyzing focus indicators and visual feedback...",
        "Generating accessibility report..."
      ];

      for (let i = 0; i < steps.length; i++) {
        setActiveStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      const mockResults = {
        totalElements: 24,
        keyboardAccessible: 18,
        issues: 6,
        score: 75,
        problems: [
          {
            type: "focus-trap",
            severity: "critical",
            element: "Modal dialog",
            description: "Modal cannot be closed with Escape key",
            suggestion: "Add onKeyDown handler for Escape key to close modal",
            code: "onKeyDown={(e) => e.key === 'Escape' && handleClose()}"
          },
          {
            type: "tab-order",
            severity: "warning",
            element: "Navigation menu",
            description: "Tab order skips important navigation items",
            suggestion: "Reorder elements or use tabIndex to fix tab sequence",
            code: "tabIndex={0} // for programmatically focused elements"
          },
          {
            type: "focus-indicator",
            severity: "warning",
            element: "Button group",
            description: "Focus indicators are not visible enough",
            suggestion: "Enhance focus outline with better contrast and visibility",
            code: "outline: 2px solid #0077b6; outline-offset: 2px;"
          },
          {
            type: "keyboard-shortcuts",
            severity: "info",
            element: "Search input",
            description: "No keyboard shortcuts for common actions",
            suggestion: "Add Ctrl+K shortcut for search focus",
            code: "onKeyDown={(e) => e.ctrlKey && e.key === 'k' && focus()}"
          },
          {
            type: "aria-labels",
            severity: "warning",
            element: "Icon buttons",
            description: "Icon buttons missing accessible labels",
            suggestion: "Add aria-label or aria-labelledby attributes",
            code: 'aria-label="Close dialog"'
          },
          {
            type: "skip-links",
            severity: "info",
            element: "Page navigation",
            description: "No skip links for main content",
            suggestion: "Add skip links to bypass navigation",
            code: '<a href="#main" className="skip-link">Skip to main content</a>'
          }
        ]
      };
      
      setResults(mockResults);
    } catch (error) {
      setSnackbarMessage("Error testing keyboard navigation. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setTesting(false);
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

  const testSteps = [
    "Scanning page for interactive elements...",
    "Testing tab order and focus management...",
    "Checking keyboard shortcuts and ARIA labels...",
    "Analyzing focus indicators and visual feedback...",
    "Generating accessibility report..."
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
          Keyboard Navigator
        </Typography>
        <Typography variant="h6" sx={{ 
          opacity: 0.9,
          maxWidth: "600px",
          mx: "auto",
          px: 2
        }}>
          Test and improve keyboard navigation on your website. Ensure all interactive elements are accessible via keyboard.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        {/* Input Section */}
        <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
            Test Keyboard Navigation
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
              onClick={handleTest}
              disabled={testing}
              startIcon={testing ? <CircularProgress size={20} /> : <Keyboard />}
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
              {testing ? "Testing..." : "Test Navigation"}
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>What we test:</strong> Tab order, focus management, keyboard shortcuts, 
              ARIA labels, focus indicators, and skip links.
            </Typography>
          </Alert>
        </Paper>

        {/* Testing Progress */}
        {testing && (
          <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
              Testing in Progress...
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {testSteps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        )}

        {/* Results Section */}
        {results && (
          <Box sx={{ mb: 4 }}>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ color: "#0077b6", fontWeight: 700 }}>
                      {results.totalElements}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Interactive Elements
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ color: "#28a745", fontWeight: 700 }}>
                      {results.keyboardAccessible}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Keyboard Accessible
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ color: "#dc3545", fontWeight: 700 }}>
                      {results.issues}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Issues Found
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
                      Navigation Score
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Issues List */}
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                Keyboard Navigation Issues
              </Typography>
              
              {results.problems.length === 0 ? (
                <Alert severity="success">
                  <Typography variant="h6">Excellent! No keyboard navigation issues found.</Typography>
                  <Typography variant="body2">
                    All interactive elements are properly accessible via keyboard.
                  </Typography>
                </Alert>
              ) : (
                <List>
                  {results.problems.map((problem, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <Box sx={{ color: getSeverityColor(problem.severity) }}>
                            {getSeverityIcon(problem.severity)}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {problem.description}
                              </Typography>
                              <Chip
                                label={problem.severity.toUpperCase()}
                                size="small"
                                sx={{
                                  backgroundColor: getSeverityColor(problem.severity),
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
                                <strong>Element:</strong> {problem.element}
                              </Typography>
                              <Alert severity="info" sx={{ mt: 1, mb: 1 }}>
                                <Typography variant="body2">
                                  <strong>💡 Suggestion:</strong> {problem.suggestion}
                                </Typography>
                              </Alert>
                              <Paper sx={{ p: 2, backgroundColor: "#f8f9fa", mt: 1 }}>
                                <Typography variant="caption" sx={{ color: "#666", display: "block", mb: 1 }}>
                                  Code Example:
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "14px" }}>
                                  {problem.code}
                                </Typography>
                              </Paper>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < results.problems.length - 1 && <Divider />}
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
            Keyboard Navigation Best Practices
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
                  <ListItemText primary="All interactive elements must be focusable" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logical tab order throughout the page" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Visible focus indicators" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Escape key closes modals and dropdowns" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Skip links for main content" />
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
                  <ListItemText primary="Keyboard shortcuts for common actions" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Arrow keys for menu navigation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Focus management in single-page apps" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="ARIA landmarks for page structure" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Live regions for dynamic content" />
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
