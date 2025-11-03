import React, { useRef, useState, useEffect, useMemo } from "react";
import Typography from "./apple/Typography";
import Button from "./apple/Button";
import { Box, Flex, HStack } from "./apple/Layout";
import { appleTheme } from "../styles/apple-theme";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./apple/LanguageSwitcher";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavbarApple() {
  const { isDarkMode } = useTheme();
  const { t, language } = useLanguage();
  const router = useRouter();
  const navbarRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Memoize navigation items so they update when language changes
  const navigationItems = useMemo(() => [
    { name: t("nav.home"), href: "/", key: "home" },
    { name: t("nav.about"), href: "/about", key: "about" },
    { name: t("nav.pricing"), href: "/pricing", key: "pricing" },
    { name: t("nav.resources"), href: "/resources", key: "resources" },
    { name: t("nav.apiDocs"), href: "/api-docs", key: "apiDocs" }
  ], [t, language]);

  // Check if screen is mobile (less than 770px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 770);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Burger Icon Component
  const BurgerIcon = () => (
    <div
      onClick={toggleMobileMenu}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "24px",
        height: "20px",
        cursor: "pointer",
        padding: "4px"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
          transition: "all 0.3s ease",
          transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
        }}
      />
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
          transition: "all 0.3s ease",
          opacity: isMobileMenuOpen ? 0 : 1
        }}
      />
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
          transition: "all 0.3s ease",
          transform: isMobileMenuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none"
        }}
      />
    </div>
  );

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

            {/* Desktop Navigation */}
            {!isMobile && (
              <HStack spacing={6} wrap="wrap" align="center">
                {navigationItems.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link key={item.key} href={item.href} passHref legacyBehavior>
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
                            boxShadow: 'none',
                            height: "auto",
                            minHeight: "auto",
                            display: "flex",
                            alignItems: "center",
                            whiteSpace: "nowrap",
                            wordBreak: "keep-all",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%"
                          }}
                        >
                          {item.name}
                        </Button>
                      </a>
                    </Link>
                  );
                })}

                {/* All Tools Link */}
                <Link href="/tools" passHref legacyBehavior>
                  <a style={{ textDecoration: "none" }}>
                    <Button
                      variant="ghost"
                      size="small"
                      style={{
                        color: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
                        fontWeight: appleTheme.typography.fontWeight.medium,
                        fontSize: appleTheme.typography.fontSize.base,
                        borderBottom: router.pathname === "/tools" ? `2px solid ${appleTheme.colors.primary[500]}` : '2px solid transparent',
                        borderRadius: 0,
                        paddingBottom: appleTheme.spacing[1],
                        outline: 'none',
                        boxShadow: 'none',
                        height: "auto",
                        minHeight: "auto",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {t("nav.allTools")}
                    </Button>
                  </a>
                </Link>
              </HStack>
            )}
          </HStack>

          {/* Right side - Language Switcher and Burger Menu */}
          <HStack spacing={4} align="center" style={{ flexShrink: 0 }}>
            <LanguageSwitcher />
            {isMobile && <BurgerIcon />}
          </HStack>
        </Flex>

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
          <Box
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: isDarkMode ? "rgba(28, 28, 30, 0.98)" : "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              borderTop: `1px solid ${isDarkMode ? appleTheme.colors.dark.gray[300] : appleTheme.colors.gray[300]}`,
              boxShadow: isDarkMode ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 999
            }}
          >
            <Box style={{ padding: `${appleTheme.spacing[4]} ${appleTheme.spacing[6]}` }}>
              <Flex direction="column" gap={3}>
                {navigationItems.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link key={item.key} href={item.href} passHref legacyBehavior>
                      <a style={{ textDecoration: "none" }}>
                        <Button
                          variant="ghost"
                          size="medium"
                          style={{
                            color: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
                            fontWeight: appleTheme.typography.fontWeight.medium,
                            fontSize: appleTheme.typography.fontSize.lg,
                            backgroundColor: isActive ? (isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(0, 122, 255, 0.05)") : "transparent",
                            borderRadius: appleTheme.borderRadius.medium,
                            padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
                            width: "100%",
                            justifyContent: "flex-start",
                            outline: 'none',
                            boxShadow: 'none',
                            height: "auto",
                            minHeight: "auto"
                          }}
                        >
                          {item.name}
                        </Button>
                      </a>
                    </Link>
                  );
                })}

                {/* All Tools Link */}
                <Link href="/tools" passHref legacyBehavior>
                  <a style={{ textDecoration: "none" }}>
                    <Button
                      variant="ghost"
                      size="medium"
                      style={{
                        color: isDarkMode ? '#FFFFFF' : appleTheme.colors.text.primary,
                        fontWeight: appleTheme.typography.fontWeight.medium,
                        fontSize: appleTheme.typography.fontSize.lg,
                        backgroundColor: router.pathname === "/tools" ? (isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(0, 122, 255, 0.05)") : "transparent",
                        borderRadius: appleTheme.borderRadius.medium,
                        padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
                        width: "100%",
                        justifyContent: "flex-start",
                        outline: 'none',
                        boxShadow: 'none',
                        height: "auto",
                        minHeight: "auto"
                      }}
                    >
                      {t("nav.allTools")}
                    </Button>
                  </a>
                </Link>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
