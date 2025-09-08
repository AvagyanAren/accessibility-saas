import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import {
  Contrast,
  Image,
  Keyboard,
  Speed,
  Accessibility,
  OpenInNew,
} from "@mui/icons-material";
import Link from "next/link";

export default function Tools() {
  const tools = [
    {
      id: "color-contrast",
      title: "Color Contrast Checker",
      description: "Test color combinations for WCAG accessibility compliance. Input hex codes and get instant contrast ratio results.",
      icon: <Contrast />,
      color: "#0077b6",
      status: "Available",
      features: ["WCAG AA/AAA compliance", "Live preview", "Random color generator", "Detailed compliance report"]
    },
    {
      id: "alt-text-analyzer",
      title: "Alt Text Analyzer",
      description: "Scan any webpage to find images missing alt text attributes. Perfect for quick accessibility audits.",
      icon: <Image />,
      color: "#28a745",
      status: "Coming Soon",
      features: ["Bulk image scanning", "Missing alt text detection", "Improvement suggestions", "Export results"]
    },
    {
      id: "keyboard-navigator",
      title: "Keyboard Navigation Tester",
      description: "Test keyboard accessibility by navigating through interactive elements without using a mouse.",
      icon: <Keyboard />,
      color: "#ffc107",
      status: "Coming Soon",
      features: ["Tab order testing", "Focus indicators", "Skip links detection", "Navigation flow analysis"]
    },
    {
      id: "performance-audit",
      title: "Performance Impact Analyzer",
      description: "Analyze how accessibility features affect your website's performance and loading times.",
      icon: <Speed />,
      color: "#6f42c1",
      status: "Coming Soon",
      features: ["Performance metrics", "Accessibility impact", "Optimization tips", "Before/after comparison"]
    },
    {
      id: "screen-reader-simulator",
      title: "Screen Reader Simulator",
      description: "Experience your website as screen reader users do. Test with different screen reader voices and settings.",
      icon: <Accessibility />,
      color: "#dc3545",
      status: "Coming Soon",
      features: ["Voice simulation", "Multiple screen readers", "Reading order testing", "Audio output"]
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
          Accessibility Mini-Tools
        </Typography>
        <Typography variant="h6" sx={{ 
          opacity: 0.9,
          maxWidth: "600px",
          mx: "auto",
          px: 2
        }}>
          Quick, focused utilities for specific accessibility testing needs. 
          Use these tools to quickly check and improve your website's accessibility.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        {/* Tools Grid */}
        <Grid container spacing={3}>
          {tools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <Card sx={{ 
                height: "100%", 
                display: "flex", 
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    mb: 2,
                    color: tool.color
                  }}>
                    {tool.icon}
                    <Chip 
                      label={tool.status} 
                      size="small" 
                      sx={{ 
                        ml: 1, 
                        backgroundColor: tool.status === "Available" ? "#28a745" : "#ffc107",
                        color: tool.status === "Available" ? "white" : "#333",
                        fontWeight: 500
                      }} 
                    />
                  </Box>
                  
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    fontSize: "18px"
                  }}>
                    {tool.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ 
                    color: "#666", 
                    mb: 2,
                    fontSize: "14px"
                  }}>
                    {tool.description}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    color: "#333"
                  }}>
                    Features:
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    {tool.features.map((feature, index) => (
                      <Typography 
                        key={index}
                        variant="caption" 
                        sx={{ 
                          display: "block",
                          color: "#666",
                          fontSize: "12px",
                          mb: 0.5
                        }}
                      >
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                
                <CardActions>
                  {tool.status === "Available" ? (
                    <Link href={`/tools/${tool.id}`} passHref>
                      <Button 
                        variant="contained"
                        sx={{ 
                          backgroundColor: tool.color,
                          "&:hover": {
                            backgroundColor: tool.color,
                            opacity: 0.9
                          }
                        }}
                        fullWidth
                      >
                        Use Tool
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      variant="outlined" 
                      disabled
                      fullWidth
                      sx={{ color: "#999" }}
                    >
                      Coming Soon
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Paper sx={{ 
          p: 4, 
          textAlign: "center",
          mt: 6,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white"
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Need More Comprehensive Testing?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Use our full accessibility scanner for complete website analysis with detailed reports and fix suggestions.
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
            Full Website Scanner
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
