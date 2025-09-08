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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  Article,
  Code,
  DesignServices,
  School,
  Download,
  OpenInNew,
} from "@mui/icons-material";

export default function Resources() {
  const articles = [
    {
      title: "10 Common Accessibility Issues and How to Fix Them",
      description: "Learn about the most frequent accessibility problems found on websites and practical solutions to resolve them.",
      category: "Beginner",
      readTime: "5 min read",
      icon: <Article />,
      color: "#0077b6"
    },
    {
      title: "Complete Guide to WCAG 2.1 Guidelines",
      description: "Comprehensive overview of Web Content Accessibility Guidelines with real-world examples and implementation tips.",
      category: "Advanced",
      readTime: "15 min read",
      icon: <School />,
      color: "#28a745"
    },
    {
      title: "Color Contrast: Making Text Readable for Everyone",
      description: "Understanding color contrast ratios and tools to ensure your text is accessible to users with visual impairments.",
      category: "Design",
      readTime: "8 min read",
      icon: <DesignServices />,
      color: "#ffc107"
    },
    {
      title: "Keyboard Navigation Best Practices",
      description: "Essential techniques for creating keyboard-accessible interfaces that work for all users.",
      category: "Development",
      readTime: "6 min read",
      icon: <Code />,
      color: "#6f42c1"
    }
  ];

  const checklists = [
    {
      title: "Designer's Accessibility Checklist",
      items: [
        "Ensure sufficient color contrast (4.5:1 minimum)",
        "Use clear, readable fonts (minimum 16px)",
        "Provide alternative text for images",
        "Design focus states for interactive elements",
        "Plan for different screen sizes and zoom levels"
      ]
    },
    {
      title: "Developer's Accessibility Checklist",
      items: [
        "Add semantic HTML elements (header, main, nav, etc.)",
        "Implement proper heading hierarchy (H1, H2, H3)",
        "Ensure all interactive elements are keyboard accessible",
        "Add ARIA labels where needed",
        "Test with screen readers"
      ]
    },
    {
      title: "Content Creator's Accessibility Checklist",
      items: [
        "Write descriptive alt text for images",
        "Use clear, concise language",
        "Provide captions for videos",
        "Structure content with proper headings",
        "Avoid using color alone to convey information"
      ]
    }
  ];

  const tools = [
    {
      name: "WAVE Web Accessibility Evaluator",
      description: "Free browser extension for testing accessibility",
      link: "https://wave.webaim.org/",
      type: "Browser Extension"
    },
    {
      name: "axe DevTools",
      description: "Comprehensive accessibility testing for developers",
      link: "https://www.deque.com/axe/devtools/",
      type: "Browser Extension"
    },
    {
      name: "Color Contrast Analyzer",
      description: "Test color combinations for accessibility compliance",
      link: "https://www.tpgi.com/color-contrast-checker/",
      type: "Web Tool"
    },
    {
      name: "Screen Reader Testing",
      description: "Test with NVDA (free) or JAWS (paid) screen readers",
      link: "https://www.nvaccess.org/",
      type: "Software"
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
          Accessibility Resources
        </Typography>
        <Typography variant="h6" sx={{ 
          opacity: 0.9,
          maxWidth: "600px",
          mx: "auto",
          px: 2
        }}>
          Learn, implement, and master web accessibility with our comprehensive guides, 
          checklists, and tools.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 3 } }}>
        {/* Articles Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600, 
            mb: 3, 
            color: "#333",
            textAlign: "center"
          }}>
            📚 Learning Articles
          </Typography>
          <Grid container spacing={3}>
            {articles.map((article, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
                      color: article.color
                    }}>
                      {article.icon}
                      <Chip 
                        label={article.category} 
                        size="small" 
                        sx={{ 
                          ml: 1, 
                          backgroundColor: `${article.color}20`,
                          color: article.color,
                          fontWeight: 500
                        }} 
                      />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      fontSize: "16px"
                    }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: "#666", 
                      mb: 2,
                      fontSize: "14px"
                    }}>
                      {article.description}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: "#999",
                      fontSize: "12px"
                    }}>
                      {article.readTime}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      endIcon={<OpenInNew />}
                      sx={{ color: article.color }}
                    >
                      Read Article
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Checklists Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600, 
            mb: 3, 
            color: "#333",
            textAlign: "center"
          }}>
            ✅ Quick Checklists
          </Typography>
          <Grid container spacing={3}>
            {checklists.map((checklist, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ 
                  p: 3, 
                  height: "100%",
                  border: "1px solid #e9ecef"
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: "#333"
                  }}>
                    {checklist.title}
                  </Typography>
                  <List dense>
                    {checklist.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle sx={{ color: "#28a745", fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item}
                          primaryTypographyProps={{ 
                            fontSize: "14px",
                            color: "#555"
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tools Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600, 
            mb: 3, 
            color: "#333",
            textAlign: "center"
          }}>
            🛠️ Recommended Tools
          </Typography>
          <Grid container spacing={2}>
            {tools.map((tool, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ 
                  p: 2, 
                  height: "100%",
                  border: "1px solid #e9ecef",
                  transition: "box-shadow 0.2s",
                  "&:hover": {
                    boxShadow: 2
                  }
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    fontSize: "16px",
                    color: "#333"
                  }}>
                    {tool.name}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: "#666", 
                    mb: 2,
                    fontSize: "14px"
                  }}>
                    {tool.description}
                  </Typography>
                  <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center"
                  }}>
                    <Chip 
                      label={tool.type} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: "11px" }}
                    />
                    <Button 
                      size="small" 
                      endIcon={<OpenInNew />}
                      sx={{ fontSize: "12px" }}
                    >
                      Visit
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Paper sx={{ 
          p: 4, 
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white"
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 600, 
            mb: 2
          }}>
            Ready to Test Your Website?
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 3, 
            opacity: 0.9,
            maxWidth: "500px",
            mx: "auto"
          }}>
            Use our free accessibility checker to scan your website and get 
            detailed reports with actionable fix suggestions.
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
            Start Free Scan
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}