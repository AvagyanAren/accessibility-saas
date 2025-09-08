import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Card,
  CardContent,
  Alert,
  Button,
} from "@mui/material";
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  ArrowBack,
  OpenInNew,
} from "@mui/icons-material";
import Link from "next/link";

export default function CommonAccessibilityIssues() {
  const issues = [
    {
      title: "Missing Alt Text for Images",
      severity: "Critical",
      color: "#dc3545",
      description: "Images without alternative text are invisible to screen readers, making content inaccessible to visually impaired users.",
      impact: "Users with visual impairments cannot understand what images contain or their purpose.",
      solution: "Add descriptive alt text to all images. Use empty alt='' for decorative images.",
      example: '<img src="chart.jpg" alt="Sales increased by 25% in Q3 2023" />',
      wcag: "1.1.1 Non-text Content (Level A)"
    },
    {
      title: "Poor Color Contrast",
      severity: "Critical",
      color: "#dc3545",
      description: "Text that doesn't have sufficient contrast against its background is difficult to read for users with visual impairments.",
      impact: "Users with low vision or color blindness cannot read the text content.",
      solution: "Ensure at least 4.5:1 contrast ratio for normal text, 3:1 for large text.",
      example: 'color: #333; background-color: #fff; /* 12.63:1 ratio */',
      wcag: "1.4.3 Contrast (Minimum) (Level AA)"
    },
    {
      title: "Missing Form Labels",
      severity: "Critical",
      color: "#dc3545",
      description: "Form inputs without proper labels are not announced correctly by screen readers.",
      impact: "Users cannot understand what information to enter in form fields.",
      solution: "Use <label> elements or aria-label attributes to associate labels with form controls.",
      example: '<label for="email">Email Address</label><input id="email" type="email" />',
      wcag: "1.3.1 Info and Relationships (Level A)"
    },
    {
      title: "Missing Page Titles",
      severity: "Serious",
      color: "#ff9f43",
      description: "Pages without descriptive titles make navigation difficult for screen reader users.",
      impact: "Users cannot identify which page they're on or distinguish between multiple tabs.",
      solution: "Add unique, descriptive <title> elements to every page.",
      example: '<title>Contact Us - Your Company Name</title>',
      wcag: "2.4.2 Page Titled (Level A)"
    },
    {
      title: "Incorrect Heading Structure",
      severity: "Serious",
      color: "#ff9f43",
      description: "Headings that don't follow a logical hierarchy make content structure unclear.",
      impact: "Screen reader users cannot understand the content structure and navigate efficiently.",
      solution: "Use heading levels in order (H1, H2, H3) without skipping levels.",
      example: '<h1>Main Title</h1><h2>Section</h2><h3>Subsection</h3>',
      wcag: "1.3.1 Info and Relationships (Level A)"
    },
    {
      title: "Missing Focus Indicators",
      severity: "Serious",
      color: "#ff9f43",
      description: "Interactive elements without visible focus indicators make keyboard navigation difficult.",
      impact: "Keyboard users cannot see which element is currently focused.",
      solution: "Ensure all interactive elements have visible focus indicators.",
      example: 'button:focus { outline: 2px solid #0077b6; }',
      wcag: "2.4.7 Focus Visible (Level AA)"
    },
    {
      title: "Non-Descriptive Link Text",
      severity: "Moderate",
      color: "#ffc107",
      description: "Links with generic text like 'click here' don't provide context about their destination.",
      impact: "Screen reader users cannot understand where links will take them.",
      solution: "Use descriptive link text that explains the destination or action.",
      example: '<a href="/contact">Contact our support team</a>',
      wcag: "2.4.4 Link Purpose (Level A)"
    },
    {
      title: "Missing Language Declaration",
      severity: "Moderate",
      color: "#ffc107",
      description: "Pages without language attributes make it difficult for screen readers to pronounce content correctly.",
      impact: "Screen readers may mispronounce words or use wrong voice settings.",
      solution: "Add lang attribute to the <html> element.",
      example: '<html lang="en">',
      wcag: "3.1.1 Language of Page (Level A)"
    },
    {
      title: "Missing Skip Links",
      severity: "Moderate",
      color: "#ffc107",
      description: "Long pages without skip links force keyboard users to navigate through repetitive content.",
      impact: "Keyboard users must tab through navigation and other repetitive elements repeatedly.",
      solution: "Add skip links to allow users to jump to main content.",
      example: '<a href="#main" class="skip-link">Skip to main content</a>',
      wcag: "2.4.1 Bypass Blocks (Level A)"
    },
    {
      title: "Inaccessible PDFs",
      severity: "Moderate",
      color: "#ffc107",
      description: "PDF documents without proper structure are not accessible to screen readers.",
      impact: "Users with assistive technologies cannot access PDF content.",
      solution: "Create accessible PDFs with proper headings, alt text, and reading order.",
      example: "Use PDF accessibility tools to add proper structure and metadata.",
      wcag: "1.1.1 Non-text Content (Level A)"
    }
  ];

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "Critical":
        return <Error sx={{ color: "#dc3545" }} />;
      case "Serious":
        return <Warning sx={{ color: "#ff9f43" }} />;
      case "Moderate":
        return <Info sx={{ color: "#ffc107" }} />;
      default:
        return <CheckCircle sx={{ color: "#28a745" }} />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#e3f2fd" }}>
      {/* Header */}
      <Box sx={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: { xs: 4, sm: 6 },
        textAlign: "center"
      }}>
        <Box sx={{ maxWidth: "800px", mx: "auto", px: 2 }}>
          <Button
            component={Link}
            href="/resources"
            startIcon={<ArrowBack />}
            sx={{ 
              color: "white", 
              mb: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }
            }}
          >
            Back to Resources
          </Button>
          
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 2,
            fontSize: { xs: "24px", sm: "32px" }
          }}>
            10 Common Accessibility Issues and How to Fix Them
          </Typography>
          
          <Typography variant="h6" sx={{ 
            opacity: 0.9,
            mb: 2
          }}>
            Learn about the most frequent accessibility problems found on websites and practical solutions to resolve them.
          </Typography>
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Chip label="5 min read" sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }} />
            <Chip label="Beginner" sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }} />
            <Chip label="WCAG 2.1" sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1000px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        {/* Introduction */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
            Why Accessibility Matters
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites. 
            According to the World Health Organization, over 1 billion people worldwide have some form of disability. 
            Making your website accessible isn't just the right thing to do—it's also good for business, SEO, and user experience.
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Quick Tip:</strong> Many accessibility improvements benefit all users, not just those with disabilities. 
              Better contrast, clearer navigation, and descriptive text make your site more usable for everyone.
            </Typography>
          </Alert>
        </Paper>

        {/* Issues List */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: "#333", textAlign: "center" }}>
            The 10 Most Common Issues
          </Typography>
          
          {issues.map((issue, index) => (
            <Card key={index} sx={{ mb: 3, border: `1px solid ${issue.color}20` }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {getSeverityIcon(issue.severity)}
                  <Typography variant="h6" sx={{ ml: 1, fontWeight: 600, color: "#333" }}>
                    {index + 1}. {issue.title}
                  </Typography>
                  <Chip 
                    label={issue.severity} 
                    size="small" 
                    sx={{ 
                      ml: 2, 
                      backgroundColor: issue.color,
                      color: "white",
                      fontWeight: 500
                    }} 
                  />
                </Box>
                
                <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
                  {issue.description}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
                  Impact:
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                  {issue.impact}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
                  Solution:
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                  {issue.solution}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
                  Example:
                </Typography>
                <Box sx={{ 
                  backgroundColor: "#f8f9fa", 
                  p: 2, 
                  borderRadius: 1,
                  fontFamily: "monospace",
                  fontSize: "14px",
                  mb: 2,
                  border: "1px solid #e9ecef"
                }}>
                  {issue.example}
                </Box>
                
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
                  WCAG Reference:
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {issue.wcag}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Conclusion */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: "#f8f9fa" }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
            Next Steps
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            Start by addressing the critical issues first—missing alt text, poor contrast, and form labels. 
            These have the biggest impact on accessibility. Then work through the serious and moderate issues.
          </Typography>
          
          <List sx={{ mb: 3 }}>
            <ListItem>
              <ListItemIcon>
                <CheckCircle sx={{ color: "#28a745" }} />
              </ListItemIcon>
              <ListItemText 
                primary="Test your website with our free accessibility scanner"
                secondary="Get a comprehensive report with specific issues and fix suggestions"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle sx={{ color: "#28a745" }} />
              </ListItemIcon>
              <ListItemText 
                primary="Use our Color Contrast Checker tool"
                secondary="Test color combinations to ensure they meet WCAG standards"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle sx={{ color: "#28a745" }} />
              </ListItemIcon>
              <ListItemText 
                primary="Test with keyboard navigation"
                secondary="Try navigating your site using only the Tab key"
              />
            </ListItem>
          </List>
          
          <Box sx={{ textAlign: "center" }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#0077b6",
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "#005a8b" }
              }}
            >
              Test Your Website Now
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
