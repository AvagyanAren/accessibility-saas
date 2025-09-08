import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Menu, 
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { 
  Contrast, 
  Image, 
  Keyboard, 
  Speed, 
  Accessibility,
  ExpandMore,
  RecordVoiceOver,
  TrendingUp
} from "@mui/icons-material";
import Link from "next/link";

export default function Navbar() {
  const [toolsAnchorEl, setToolsAnchorEl] = useState(null);
  const [toolsOpen, setToolsOpen] = useState(false);

  const handleToolsMouseEnter = (event) => {
    setToolsAnchorEl(event.currentTarget);
    setToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    setToolsOpen(false);
  };

  const handleToolsClose = () => {
    setToolsAnchorEl(null);
    setToolsOpen(false);
  };

  const tools = [
    {
      name: "Color Contrast Checker",
      href: "/tools/color-contrast",
      icon: <Contrast />,
      available: true
    },
    {
      name: "Alt Text Analyzer",
      href: "/tools/alt-text-analyzer",
      icon: <Image />,
      available: true
    },
    {
      name: "Keyboard Navigator",
      href: "/tools/keyboard-navigator",
      icon: <Keyboard />,
      available: true
    },
    {
      name: "Performance Audit",
      href: "/tools/performance-audit",
      icon: <TrendingUp />,
      available: true
    },
    {
      name: "Screen Reader Simulator",
      href: "/tools/screen-reader-simulator",
      icon: <RecordVoiceOver />,
      available: true
    }
  ];

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        background: "#e3f2fd",
        color: "#0077b6"
      }}
    >
      <Toolbar sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: { xs: 2, sm: 4 },
        flexWrap: "wrap",
        justifyContent: { xs: "center", sm: "flex-start" }
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: "#0077b6", 
            fontWeight: 700,
            fontSize: { xs: "1.1rem", sm: "1.25rem" }
          }}
        >
          ScanWeb
        </Typography>
        <Box sx={{ 
          display: "flex", 
          gap: { xs: 1.5, sm: 3 },
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Pricing", href: "/pricing" },
            { name: "Resources", href: "/resources" },
            { name: "API Docs", href: "/api-docs" }
          ].map((page) => (
            <Link
              key={page.name}
              href={page.href}
              passHref
              legacyBehavior
            >
              <Button
                variant="text"
                sx={{
                  color: "#0077b6",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  px: { xs: 1, sm: 2 },
                  py: { xs: 0.5, sm: 1 },
                  "&:hover": { backgroundColor: "rgba(0,119,182,0.1)" },
                }}
              >
                {page.name}
              </Button>
            </Link>
          ))}
          
          {/* All Tools Dropdown */}
          <Button
            variant="text"
            onClick={(e) => {
              if (toolsOpen) {
                handleToolsClose();
              } else {
                handleToolsMouseEnter(e);
              }
            }}
            sx={{
              color: "#0077b6",
              textTransform: "none",
              fontWeight: 500,
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              "&:hover": { backgroundColor: "rgba(0,119,182,0.1)" },
            }}
          >
            All Tools
            <ExpandMore sx={{ ml: 0.5, fontSize: 16 }} />
          </Button>
        </Box>
      </Toolbar>
      
      {/* Tools Dropdown Menu */}
      <Menu
        anchorEl={toolsAnchorEl}
        open={toolsOpen}
        onClose={handleToolsClose}
        sx={{
          "& .MuiPaper-root": {
            mt: 1,
            minWidth: 250,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: 2,
          }
        }}
      >
        <MenuItem 
          onClick={handleToolsClose}
          sx={{ 
            py: 1.5,
            px: 2,
            "&:hover": { backgroundColor: "#f8f9fa" }
          }}
        >
          <Link href="/tools" passHref legacyBehavior>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Contrast sx={{ color: "#0077b6" }} />
              </ListItemIcon>
              <ListItemText 
                primary="All Tools" 
                secondary="View all mini-tools"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </Box>
          </Link>
        </MenuItem>
        
        {tools.map((tool) => (
          <MenuItem 
            key={tool.name}
            onClick={handleToolsClose}
            disabled={!tool.available}
            sx={{ 
              py: 1.5,
              px: 2,
              "&:hover": { backgroundColor: tool.available ? "#f8f9fa" : "transparent" },
              opacity: tool.available ? 1 : 0.6
            }}
          >
            <Link href={tool.href} passHref legacyBehavior>
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {tool.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={tool.name}
                  secondary={tool.available ? "Available" : "Coming Soon"}
                  primaryTypographyProps={{ 
                    fontWeight: tool.available ? 500 : 400,
                    color: tool.available ? "#333" : "#999"
                  }}
                  secondaryTypographyProps={{ 
                    fontSize: "12px",
                    color: tool.available ? "#28a745" : "#ffc107"
                  }}
                />
              </Box>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}
