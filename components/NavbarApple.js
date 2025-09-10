import React, { useState, useEffect, useRef, useCallback } from "react";
import Typography from "./apple/Typography";
import Button from "./apple/Button";
import { Box, Flex, HStack } from "./apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./apple/ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/router";

// Icons (simplified SVG components)
const ContrastIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

const KeyboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
    <line x1="6" y1="8" x2="6.01" y2="8"/>
    <line x1="10" y1="8" x2="10.01" y2="8"/>
    <line x1="14" y1="8" x2="14.01" y2="8"/>
    <line x1="18" y1="8" x2="18.01" y2="8"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="9" y1="16" x2="15" y2="16"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
    <polyline points="17,6 23,6 23,12"/>
  </svg>
);

const RecordVoiceOverIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

export default function NavbarApple() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);

  const tools = [
    {
      name: "Color Contrast Checker",
      href: "/tools/color-contrast",
      icon: <ContrastIcon />,
      available: true
    },
    {
      name: "Alt Text Analyzer",
      href: "/tools/alt-text-analyzer",
      icon: <ImageIcon />,
      available: true
    },
    {
      name: "Keyboard Navigator",
      href: "/tools/keyboard-navigator",
      icon: <KeyboardIcon />,
      available: true
    },
    {
      name: "Performance Audit",
      href: "/tools/performance-audit",
      icon: <TrendingUpIcon />,
      available: true
    },
    {
      name: "Screen Reader Simulator",
      href: "/tools/screen-reader-simulator",
      icon: <RecordVoiceOverIcon />,
      available: true
    }
  ];

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/resources" },
    { name: "API Docs", href: "/api-docs" }
  ];

  // Close dropdown when clicking outside - simplified approach
  const handleClickOutside = useCallback((event) => {
    // Only close if click is outside the dropdown menu itself
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToolsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (toolsOpen) {
      // Use capture phase for better event handling
      document.addEventListener('click', handleClickOutside, true);
      document.addEventListener('touchstart', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [toolsOpen, handleClickOutside]);

  // Close dropdown when route changes
  useEffect(() => {
    setToolsOpen(false);
  }, [router.pathname]);

  return (
    <Box
      ref={navbarRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.95)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `2px solid ${isDarkMode ? appleTheme.colors.dark.gray[300] : appleTheme.colors.gray[300]}`,
        padding: `${appleTheme.spacing[3]} 0`,
        boxShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <Box style={{ maxWidth: "1200px", margin: "0 auto", padding: `0 ${appleTheme.spacing[6]}` }}>
        <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
          {/* Left side - Logo and Navigation */}
          <HStack spacing={8} align="center">
            {/* Logo */}
            <Link href="/" passHref legacyBehavior>
              <a style={{ textDecoration: "none" }}>
                <Typography variant="title2" weight="bold" style={{
                  color: isDarkMode ? '#FFFFFF' : appleTheme.colors.primary[500]
                }}>
                  ScanWeb
                </Typography>
              </a>
            </Link>

            {/* Navigation */}
            <HStack spacing={6} wrap="wrap">
            {navigationItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link key={item.name} href={item.href} passHref legacyBehavior>
                  <a style={{ textDecoration: "none" }}>
                    <Button
                      variant="ghost"
                      size="small"
                      style={{
                        color: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
                        fontWeight: appleTheme.typography.fontWeight.medium,
                        fontSize: appleTheme.typography.fontSize.base,
                        borderBottom: isActive ? `2px solid ${appleTheme.colors.primary[500]}` : '2px solid transparent',
                        borderRadius: 0,
                        paddingBottom: appleTheme.spacing[1],
                        outline: 'none',
                        boxShadow: 'none'
                      }}
                    >
                      {item.name}
                    </Button>
                  </a>
                </Link>
              );
            })}

            {/* Tools Dropdown */}
            <Box ref={dropdownRef} style={{ position: "relative" }}>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setToolsOpen(!toolsOpen)}
                style={{
                  color: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
                  fontWeight: appleTheme.typography.fontWeight.medium,
                  fontSize: appleTheme.typography.fontSize.base,
                  display: "flex",
                  alignItems: "center",
                  gap: appleTheme.spacing[1],
                  borderBottom: toolsOpen ? `2px solid ${appleTheme.colors.primary[500]}` : '2px solid transparent',
                  borderRadius: 0,
                  paddingBottom: appleTheme.spacing[1],
                  outline: 'none',
                  boxShadow: 'none'
                }}
              >
                All Tools
                <ChevronDownIcon style={{ 
                  fontSize: "14px",
                  transform: toolsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease"
                }} />
              </Button>

              {/* Dropdown Menu */}
              {toolsOpen && (
                <Box
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: appleTheme.spacing[2],
                    backgroundColor: isDarkMode ? appleTheme.colors.dark.background.elevated : appleTheme.colors.background.primary,
                    borderRadius: appleTheme.borderRadius.xl,
                    border: `1px solid ${isDarkMode ? appleTheme.colors.dark.gray[300] : appleTheme.colors.gray[200]}`,
                    boxShadow: isDarkMode ? "0 10px 25px rgba(0,0,0,0.5)" : appleTheme.shadows.lg,
                    minWidth: "280px",
                    zIndex: 1001,
                    overflow: "hidden"
                  }}
                >
                  {/* All Tools Header */}
                  <Box
                    style={{
                      padding: `${appleTheme.spacing[4]} ${appleTheme.spacing[4]} ${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
                      borderBottom: `1px solid ${isDarkMode ? appleTheme.colors.dark.gray[200] : appleTheme.colors.gray[100]}`,
                      cursor: "pointer",
                      transition: `background-color ${appleTheme.transition.duration.base} ${appleTheme.transition.timing.ease}`
                    }}
                    onClick={() => {
                      setToolsOpen(false);
                      router.push("/tools");
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? appleTheme.colors.dark.gray[100] : appleTheme.colors.gray[50];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <Flex align="center" gap={3}>
                      <ContrastIcon />
                      <Box>
                        <Typography variant="callout" weight="semibold" style={{
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}>
                          All Tools
                        </Typography>
                        <Typography variant="caption1" style={{
                          color: isDarkMode ? '#AEAEB2' : '#6D6D70'
                        }}>
                          View all mini-tools
                        </Typography>
                      </Box>
                    </Flex>
                  </Box>

                  {/* Tools List */}
                  <Box>
                    {tools.map((tool, index) => (
                      <Box
                        key={tool.name}
                        style={{
                          padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
                          borderBottom: index < tools.length - 1 ? `1px solid ${isDarkMode ? appleTheme.colors.dark.gray[200] : appleTheme.colors.gray[100]}` : "none",
                          cursor: tool.available ? "pointer" : "not-allowed",
                          opacity: tool.available ? 1 : 0.6,
                          transition: `background-color ${appleTheme.transition.duration.base} ${appleTheme.transition.timing.ease}`
                        }}
                        onClick={() => {
                          if (tool.available) {
                            setToolsOpen(false);
                            router.push(tool.href);
                          }
                        }}
                        onMouseEnter={(e) => {
                          if (tool.available) {
                            e.currentTarget.style.backgroundColor = isDarkMode ? appleTheme.colors.dark.gray[100] : appleTheme.colors.gray[50];
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <Flex align="center" gap={3}>
                          {tool.icon}
                          <Box>
                            <Typography 
                              variant="footnote" 
                              weight={tool.available ? "medium" : "regular"}
                              style={{
                                color: isDarkMode ? (tool.available ? '#FFFFFF' : '#8E8E93') : '#000000'
                              }}
                            >
                              {tool.name}
                            </Typography>
                            <Typography variant="caption2" style={{
                              color: isDarkMode ? '#AEAEB2' : '#6D6D70'
                            }}>
                              {tool.available ? "Available" : "Coming Soon"}
                            </Typography>
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
            </HStack>
          </HStack>

          {/* Right side - Theme Toggle */}
          <ThemeToggle />
        </Flex>
      </Box>

      {/* Backdrop for click outside - covers entire viewport */}
      {toolsOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 998,
            backgroundColor: "transparent",
            cursor: "default"
          }}
          onClick={() => setToolsOpen(false)}
        />
      )}
    </Box>
  );
}
