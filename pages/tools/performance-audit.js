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
  LinearProgress,
} from "@mui/material";
import {
  Speed,
  CheckCircle,
  Error,
  Warning,
  Info,
  TrendingUp,
  Memory,
  NetworkCheck,
  Timer,
} from "@mui/icons-material";
import Link from "next/link";

export default function PerformanceAudit() {
  const [url, setUrl] = useState("");
  const [auditing, setAuditing] = useState(false);
  const [results, setResults] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAudit = async () => {
    if (!url.trim()) {
      setSnackbarMessage("Please enter a URL to audit");
      setSnackbarOpen(true);
      return;
    }

    setAuditing(true);
    try {
      // Simulate audit process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResults = {
        overallScore: 78,
        metrics: {
          firstContentfulPaint: 1.2,
          largestContentfulPaint: 2.1,
          cumulativeLayoutShift: 0.05,
          firstInputDelay: 45,
          timeToInteractive: 3.2
        },
        issues: [
          {
            category: "Images",
            severity: "warning",
            title: "Unoptimized images detected",
            description: "Large images without proper compression or modern formats",
            impact: "Increases page load time by 2.3s",
            suggestion: "Use WebP format and compress images to reduce file size",
            savings: "Save 1.8s load time"
          },
          {
            category: "JavaScript",
            severity: "critical",
            title: "Large JavaScript bundle",
            description: "Main bundle is 450KB, exceeding recommended 200KB",
            impact: "Blocks page rendering and increases load time",
            suggestion: "Code split, lazy load, and remove unused dependencies",
            savings: "Save 1.2s load time"
          },
          {
            category: "CSS",
            severity: "warning",
            title: "Unused CSS rules",
            description: "40% of CSS is unused on this page",
            impact: "Unnecessary network overhead",
            suggestion: "Remove unused CSS and use critical CSS inlining",
            savings: "Save 0.8s load time"
          },
          {
            category: "Network",
            severity: "info",
            title: "Missing compression",
            description: "Text resources not compressed with gzip/brotli",
            impact: "Larger file sizes over the network",
            suggestion: "Enable gzip or brotli compression on server",
            savings: "Save 0.5s load time"
          },
          {
            category: "Caching",
            severity: "warning",
            title: "Short cache headers",
            description: "Static assets have short cache expiration",
            impact: "Frequent re-downloads of unchanged resources",
            suggestion: "Set longer cache headers for static assets",
            savings: "Improve repeat visit performance"
          },
          {
            category: "Third-party",
            severity: "info",
            title: "Blocking third-party scripts",
            description: "Analytics and tracking scripts block rendering",
            impact: "Delays page interactivity",
            suggestion: "Load third-party scripts asynchronously",
            savings: "Save 0.3s load time"
          }
        ],
        recommendations: [
          "Implement image optimization with WebP format",
          "Enable code splitting for JavaScript bundles",
          "Use critical CSS inlining for above-the-fold content",
          "Enable gzip/brotli compression",
          "Set proper cache headers for static assets",
          "Load third-party scripts asynchronously"
        ]
      };
      
      setResults(mockResults);
    } catch (error) {
      setSnackbarMessage("Error auditing performance. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setAuditing(false);
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
          Performance Audit
        </Typography>
        <Typography variant="h6" sx={{ 
          opacity: 0.9,
          maxWidth: "600px",
          mx: "auto",
          px: 2
        }}>
          Analyze and optimize your website's performance. Get detailed insights and actionable recommendations.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        {/* Input Section */}
        <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
            Audit Website Performance
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
              onClick={handleAudit}
              disabled={auditing}
              startIcon={auditing ? <CircularProgress size={20} /> : <Speed />}
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
              {auditing ? "Auditing..." : "Start Audit"}
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>What we analyze:</strong> Page load speed, Core Web Vitals, resource optimization, 
              caching strategies, and performance best practices.
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
                {getScoreLabel(results.overallScore)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={results.overallScore}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#e9ecef",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: getScoreColor(results.overallScore),
                    borderRadius: 4
                  }
                }}
              />
            </Paper>

            {/* Core Web Vitals */}
            <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                Core Web Vitals
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <CardContent>
                      <Timer sx={{ fontSize: 40, color: "#0077b6", mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {results.metrics.firstContentfulPaint}s
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        First Contentful Paint
                      </Typography>
                      <Chip 
                        label={results.metrics.firstContentfulPaint <= 1.8 ? "Good" : "Needs Improvement"}
                        size="small"
                        sx={{ 
                          mt: 1,
                          backgroundColor: results.metrics.firstContentfulPaint <= 1.8 ? "#28a745" : "#ffc107",
                          color: "white"
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <CardContent>
                      <TrendingUp sx={{ fontSize: 40, color: "#0077b6", mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {results.metrics.largestContentfulPaint}s
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Largest Contentful Paint
                      </Typography>
                      <Chip 
                        label={results.metrics.largestContentfulPaint <= 2.5 ? "Good" : "Needs Improvement"}
                        size="small"
                        sx={{ 
                          mt: 1,
                          backgroundColor: results.metrics.largestContentfulPaint <= 2.5 ? "#28a745" : "#ffc107",
                          color: "white"
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <CardContent>
                      <Memory sx={{ fontSize: 40, color: "#0077b6", mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {results.metrics.cumulativeLayoutShift}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cumulative Layout Shift
                      </Typography>
                      <Chip 
                        label={results.metrics.cumulativeLayoutShift <= 0.1 ? "Good" : "Needs Improvement"}
                        size="small"
                        sx={{ 
                          mt: 1,
                          backgroundColor: results.metrics.cumulativeLayoutShift <= 0.1 ? "#28a745" : "#ffc107",
                          color: "white"
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>

            {/* Performance Issues */}
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                Performance Issues
              </Typography>
              
              {results.issues.length === 0 ? (
                <Alert severity="success">
                  <Typography variant="h6">Excellent! No performance issues found.</Typography>
                  <Typography variant="body2">
                    Your website is performing optimally.
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
                                {issue.title}
                              </Typography>
                              <Chip
                                label={issue.category}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 1 }}
                              />
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
                                {issue.description}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1, color: "#dc3545", fontWeight: 600 }}>
                                Impact: {issue.impact}
                              </Typography>
                              <Alert severity="info" sx={{ mt: 1, mb: 1 }}>
                                <Typography variant="body2">
                                  <strong>💡 Suggestion:</strong> {issue.suggestion}
                                </Typography>
                              </Alert>
                              <Typography variant="body2" sx={{ color: "#28a745", fontWeight: 600 }}>
                                Potential Savings: {issue.savings}
                              </Typography>
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

            {/* Recommendations */}
            <Paper sx={{ p: 4, mt: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
                Optimization Recommendations
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
            Performance Best Practices
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#28a745" }}>
                ✅ Optimization Techniques
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Compress and optimize images (WebP, AVIF)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Minify CSS, JavaScript, and HTML" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Enable gzip/brotli compression" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Use CDN for static assets" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText primary="Implement proper caching headers" />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#17a2b8" }}>
                🚀 Advanced Optimizations
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Code splitting and lazy loading" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Critical CSS inlining" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Service workers for caching" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="Resource hints (preload, prefetch)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText primary="HTTP/2 and HTTP/3 support" />
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
