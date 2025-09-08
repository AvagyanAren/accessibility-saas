import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Accessibility,
  Speed,
  Security,
  Support,
  CheckCircle,
  TrendingUp,
  People,
  Code,
  DesignServices,
  Business,
  Lightbulb,
  Rocket,
} from "@mui/icons-material";
import Link from "next/link";

export default function About() {
  const stats = [
    { number: "1B+", label: "People with disabilities worldwide", icon: <People /> },
    { number: "71%", label: "Of users with disabilities leave sites due to poor accessibility", icon: <TrendingUp /> },
    { number: "15%", label: "Of the global population has a disability", icon: <Accessibility /> },
    { number: "2.3x", label: "Higher conversion rates for accessible websites", icon: <Business /> },
  ];

  const features = [
    {
      icon: <Speed />,
      title: "Lightning Fast Scans",
      description: "Get comprehensive accessibility reports in under 30 seconds. No more waiting around for slow, outdated tools."
    },
    {
      icon: <Code />,
      title: "Developer-Friendly",
      description: "Built by developers, for developers. Integrate seamlessly into your workflow with our API and CI/CD tools."
    },
    {
      icon: <DesignServices />,
      title: "Design Integration",
      description: "Perfect for designers who want to ensure their creations work for everyone, not just the majority."
    },
    {
      icon: <Support />,
      title: "Expert Guidance",
      description: "Don't just find problems—learn how to fix them with our detailed guides and actionable recommendations."
    }
  ];

  const values = [
    {
      title: "Inclusion First",
      description: "We believe digital products should work for everyone, regardless of ability. Every decision we make is guided by this principle.",
      icon: <Accessibility />
    },
    {
      title: "Simplicity Matters",
      description: "Accessibility testing shouldn't be complicated. We've made it as simple as entering a URL and clicking scan.",
      icon: <Lightbulb />
    },
    {
      title: "Continuous Innovation",
      description: "The web evolves constantly, and so do we. We're always improving our tools to catch the latest accessibility issues.",
      icon: <Rocket />
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#e3f2fd" }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: { xs: 8, sm: 12 },
        textAlign: "center"
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ 
            fontWeight: 700, 
            mb: 3,
            fontSize: { xs: "32px", sm: "48px" }
          }}>
            Making the Web Accessible, One Scan at a Time
          </Typography>
          <Typography variant="h5" sx={{ 
            opacity: 0.9,
            mb: 4,
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.6
          }}>
            We're on a mission to make digital accessibility testing as simple as checking your email. 
            Because everyone deserves to access the web, regardless of their abilities.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#667eea",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: "18px",
              "&:hover": {
                backgroundColor: "#f8f9fa",
                transform: "translateY(-2px)"
              }
            }}
          >
            Start Your First Scan
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Our Story */}
        <Paper sx={{ p: 6, mb: 8, borderRadius: 3 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 600, 
            mb: 4, 
            color: "#333",
            textAlign: "center"
          }}>
            Our Story
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 3, color: "#555", lineHeight: 1.8 }}>
            It started with a simple observation: while working on web projects, we noticed that accessibility testing was always an afterthought—if it happened at all.
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3, fontSize: "18px", lineHeight: 1.8, color: "#666" }}>
            We'd see beautiful websites that looked perfect to us, but when we tested them with screen readers or keyboard navigation, 
            they became completely unusable. The tools available were either too complex, too expensive, or too slow to be practical 
            for everyday development work.
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, fontSize: "18px", lineHeight: 1.8, color: "#666" }}>
            That's when we realized: <strong>what if accessibility testing could be as easy as checking your spelling?</strong> 
            What if developers could catch accessibility issues in real-time, just like they catch syntax errors?
          </Typography>
          
          <Box sx={{ 
            backgroundColor: "#f8f9fa", 
            p: 4, 
            borderRadius: 2, 
            borderLeft: "4px solid #0077b6",
            mb: 4
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#333" }}>
              "We believe that accessibility isn't a feature—it's a fundamental requirement. 
              Every line of code we write should consider how it affects users with different abilities."
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic" }}>
              — Our Development Team
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ fontSize: "18px", lineHeight: 1.8, color: "#666" }}>
            Today, we're proud to serve thousands of developers, designers, and businesses who share our vision of a more inclusive web. 
            Every scan, every fix, every improvement brings us closer to a digital world where no one is left behind.
          </Typography>
        </Paper>

        {/* The Problem We Solve */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 600, 
            mb: 4, 
            color: "#333",
            textAlign: "center"
          }}>
            The Problem We Solve
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", p: 3, border: "1px solid #e9ecef" }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#dc3545" }}>
                    The Reality
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: "#dc3545" }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="71% of users with disabilities leave websites due to poor accessibility"
                        primaryTypographyProps={{ color: "#666" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: "#dc3545" }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Only 2% of websites meet basic accessibility standards"
                        primaryTypographyProps={{ color: "#666" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: "#dc3545" }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Accessibility lawsuits increased 300% in the last 5 years"
                        primaryTypographyProps={{ color: "#666" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", p: 3, border: "1px solid #e9ecef" }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#28a745" }}>
                    Our Solution
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: "#28a745" }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Instant accessibility scanning in under 30 seconds"
                        primaryTypographyProps={{ color: "#666" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: "#28a745" }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Clear, actionable fix recommendations for every issue"
                        primaryTypographyProps={{ color: "#666" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: "#28a745" }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Integration with your existing development workflow"
                        primaryTypographyProps={{ color: "#666" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Statistics */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 600, 
            mb: 4, 
            color: "#333",
            textAlign: "center"
          }}>
            The Numbers Don't Lie
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
                  <Avatar sx={{ 
                    backgroundColor: "#0077b6", 
                    width: 60, 
                    height: 60, 
                    mx: "auto", 
                    mb: 2 
                  }}>
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: "#0077b6", 
                    mb: 1 
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* What We Offer */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 600, 
            mb: 4, 
            color: "#333",
            textAlign: "center"
          }}>
            What We Offer
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  height: "100%", 
                  p: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4
                  }
                }}>
                  <CardContent>
                    <Avatar sx={{ 
                      backgroundColor: "#0077b6", 
                      width: 50, 
                      height: 50, 
                      mb: 2 
                    }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      color: "#333"
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 600, 
            mb: 4, 
            color: "#333",
            textAlign: "center"
          }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ p: 4, height: "100%", textAlign: "center" }}>
                  <Avatar sx={{ 
                    backgroundColor: "#28a745", 
                    width: 60, 
                    height: 60, 
                    mx: "auto", 
                    mb: 3 
                  }}>
                    {value.icon}
                  </Avatar>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: "#333"
                  }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.6 }}>
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Paper sx={{ 
          p: 6, 
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 3
        }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            Ready to Make Your Website Accessible?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of developers who are already building more inclusive digital experiences.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "white",
                color: "#667eea",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#f8f9fa"
                }
              }}
            >
              Start Scanning Now
            </Button>
            <Button
              component={Link}
              href="/resources"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "white",
                color: "white",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
