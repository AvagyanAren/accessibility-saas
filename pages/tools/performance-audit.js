import React, { useState } from "react";
import { Box, Stack, HStack, VStack } from "../../components/apple/Layout";
import Typography from "../../components/apple/Typography";
import Button from "../../components/apple/Button";
import Input from "../../components/apple/Input";
import Card from "../../components/apple/Card";
import { appleTheme } from "../../styles/apple-theme";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Lightning,
  CheckCircle,
  XCircle,
  WarningCircle,
  Info,
  ChartLineUp,
  Memory,
  Network,
  Clock,
  Lightbulb,
  Rocket
} from "phosphor-react";
import Link from "next/link";

import { Container, Section } from "../../components/apple/Layout";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PerformanceAudit() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [auditing, setAuditing] = useState(false);
  const [results, setResults] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAudit = async () => {
    if (!url.trim()) {
      setSnackbarMessage(t("performanceAudit.errorEnterUrl"));
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
          firstContentfulPaint: { value: 1.2, score: 85, unit: "s" },
          largestContentfulPaint: { value: 2.1, score: 72, unit: "s" },
          cumulativeLayoutShift: { value: 0.08, score: 90, unit: "" },
          firstInputDelay: { value: 45, score: 88, unit: "ms" },
          timeToInteractive: { value: 3.2, score: 65, unit: "s" }
        },
        issues: [
          {
            category: "Images",
            severity: "warning",
            title: "Unoptimized images detected",
            description: "Large images without proper compression or format optimization",
            impact: "Increases page load time by 1.2s",
            suggestion: "Compress images and use modern formats like WebP",
            code: "Use tools like ImageOptim or TinyPNG for compression"
          },
          {
            category: "JavaScript",
            severity: "critical",
            title: "Large JavaScript bundle",
            description: "JavaScript bundle size exceeds recommended limits",
            impact: "Blocks main thread for 800ms",
            suggestion: "Implement code splitting and lazy loading",
            code: "const LazyComponent = React.lazy(() => import('./Component'))"
          },
          {
            category: "CSS",
            severity: "warning",
            title: "Unused CSS rules",
            description: "30% of CSS rules are not used on this page",
            impact: "Increases bundle size by 45KB",
            suggestion: "Remove unused CSS and implement critical CSS",
            code: "Use PurgeCSS or similar tools to remove unused styles"
          },
          {
            category: "Network",
            severity: "info",
            title: "Missing compression",
            description: "Resources not served with gzip/brotli compression",
            impact: "Increases transfer size by 60%",
            suggestion: "Enable gzip or brotli compression on server",
            code: "Add compression middleware to your server"
          },
          {
            category: "Caching",
            severity: "warning",
            title: "Short cache headers",
            description: "Static assets have short cache expiration times",
            impact: "Forces unnecessary re-downloads",
            suggestion: "Set longer cache headers for static assets",
            code: "Cache-Control: public, max-age=31536000"
          }
        ],
        recommendations: [
          "Enable text compression (gzip/brotli)",
          "Optimize images and use modern formats",
          "Implement lazy loading for images",
          "Use a CDN for static assets",
          "Minimize and compress CSS/JS",
          "Implement service worker for caching"
        ]
      };
      
      setResults(mockResults);
    } catch (error) {
      setSnackbarMessage(t("performanceAudit.errorAuditFailed"));
      setSnackbarOpen(true);
    } finally {
      setAuditing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return appleTheme.colors.success;
    if (score >= 70) return appleTheme.colors.warning;
    return appleTheme.colors.error;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return appleTheme.colors.error;
      case "warning": return appleTheme.colors.warning;
      case "info": return appleTheme.colors.info;
      default: return appleTheme.colors.gray[500];
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical": return <XCircle size={16} weight="fill" />;
      case "warning": return <WarningCircle size={16} weight="fill" />;
      case "info": return <Info size={16} weight="fill" />;
      default: return <Info size={16} weight="fill" />;
    }
  };

  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  return (
    <div style={{ 
      backgroundColor: themeColors.background.secondary, 
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Hero Section */}
      <Section background={isDarkMode ? "linear-gradient(135deg, rgba(28, 28, 30, 0.9) 0%, rgba(44, 44, 46, 0.9) 100%)" : "linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)"} padding="xl">
        <Container size="lg">
          <Box style={{ textAlign: "center" }}>
            <Typography variant="display" style={{ 
              marginBottom: appleTheme.spacing[6],
              color: themeColors.text.primary,
              fontWeight: appleTheme.typography.fontWeight.bold
            }}>
              {t("performanceAudit.title")}
            </Typography>
            <Typography variant="headline" weight="regular" style={{ 
              color: themeColors.text.secondary,
              marginBottom: appleTheme.spacing[8],
              maxWidth: "800px",
              margin: `0 auto ${appleTheme.spacing[8]} auto`,
              lineHeight: appleTheme.typography.lineHeight.relaxed,
              fontWeight: appleTheme.typography.fontWeight.medium
            }}>
              {t("performanceAudit.subtitle")}
            </Typography>
          </Box>
        </Container>
      </Section>

      <Container size="lg" style={{ padding: appleTheme.spacing[6] }}>
        {/* Input Section */}
        <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: themeColors.text.primary,
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            {t("performanceAudit.auditTitle")}
          </Typography>
          
          <HStack spacing={3} align="center" style={{ marginBottom: 0 }}>
            <Box style={{ flex: 1 }}>
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={setUrl}
                size="large"
                variant="filled"
                startIcon={<Lightning size={20} weight="fill" />}
              />
            </Box>
            <Button
              variant="primary"
              size="large"
              onClick={handleAudit}
              disabled={auditing}
              loading={auditing}
              startIcon={<ChartLineUp size={16} weight="regular" />}
              style={{ height: '54px', flexShrink: 0 }}
            >
              {auditing ? t("performanceAudit.auditing") : t("performanceAudit.startAudit")}
            </Button>
          </HStack>
        </Card>

          <Card variant="outlined" padding="md" style={{ 
          backgroundColor: isDarkMode ? themeColors.background.tertiary : '#F5F5F7',
          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#E5E5EA'}`,
          borderRadius: appleTheme.borderRadius.lg,
          marginTop: appleTheme.spacing[4],
          marginBottom: appleTheme.spacing[6],
          boxShadow: isDarkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
          width: '100%'
          }}>
          <Typography variant="body" style={{ 
            color: themeColors.text.secondary
          }}>
            <strong>{t("performanceAudit.whatWeAnalyze")}</strong> {t("performanceAudit.whatWeAnalyzeDesc")}
            </Typography>
        </Card>

        {/* Results Section */}
        {results && (
          <Box style={{ marginBottom: appleTheme.spacing[6] }}>
            {/* Overall Score */}
            <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6], textAlign: "center" }}>
              <Typography variant="title1" style={{ 
                marginBottom: appleTheme.spacing[2],
                color: themeColors.text.primary,
                fontWeight: appleTheme.typography.fontWeight.semibold
              }}>
                {t("performanceAudit.performanceScore")}
              </Typography>
              <Box style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: getScoreColor(results.overallScore) + "20",
                border: `8px solid ${getScoreColor(results.overallScore)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                marginBottom: appleTheme.spacing[4]
              }}>
                <Typography variant="display" style={{ 
                  color: getScoreColor(results.overallScore),
                  fontWeight: appleTheme.typography.fontWeight.bold
                }}>
                  {results.overallScore}
                </Typography>
              </Box>
              <Typography variant="body" style={{ color: themeColors.text.secondary }}>
                {results.overallScore >= 90 ? t("performanceAudit.excellentPerformance") : 
                 results.overallScore >= 70 ? t("performanceAudit.goodPerformance") : 
                 t("performanceAudit.needsImprovement")}
              </Typography>
            </Card>

            {/* Core Web Vitals */}
            <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
              <Typography variant="title1" style={{ 
                marginBottom: appleTheme.spacing[4],
                color: themeColors.text.primary,
                fontWeight: appleTheme.typography.fontWeight.semibold
              }}>
                Core Web Vitals
              </Typography>
              <HStack spacing={4} wrap="wrap">
                {Object.entries(results.metrics).map(([key, metric]) => (
                  <Card key={key} variant="outlined" padding="lg" style={{ 
                    flex: 1, 
                    minWidth: "200px", 
                    textAlign: "center",
                    borderColor: getScoreColor(metric.score) + "30"
                  }}>
                    <Typography variant="title2" style={{ 
                      color: getScoreColor(metric.score),
                      fontWeight: appleTheme.typography.fontWeight.bold,
                      marginBottom: appleTheme.spacing[1]
                    }}>
                      {metric.value}{metric.unit}
                    </Typography>
                    <Typography variant="caption" style={{ 
                      color: themeColors.text.tertiary,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Box style={{
                      marginTop: appleTheme.spacing[2],
                      padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                      backgroundColor: getScoreColor(metric.score) + "20",
                      color: getScoreColor(metric.score),
                      borderRadius: appleTheme.borderRadius.base,
                      fontSize: appleTheme.typography.fontSize.xs,
                      fontWeight: appleTheme.typography.fontWeight.semibold
                    }}>
                      Score: {metric.score}
                    </Box>
                  </Card>
                ))}
              </HStack>
            </Card>

            {/* Issues List */}
            <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
              <Typography variant="title1" style={{ 
                marginBottom: appleTheme.spacing[4],
                color: themeColors.text.primary,
                fontWeight: appleTheme.typography.fontWeight.semibold
              }}>
                Performance Issues
              </Typography>
              
              <VStack spacing={4}>
                {results.issues.map((issue, index) => (
                  <Card key={index} variant="outlined" padding="lg">
                    <HStack spacing={3} align="flex-start">
                      <Box style={{ color: getSeverityColor(issue.severity), marginTop: appleTheme.spacing[1] }}>
                        {getSeverityIcon(issue.severity)}
                      </Box>
                      <Box style={{ flex: 1 }}>
                        <HStack spacing={2} align="center" style={{ marginBottom: appleTheme.spacing[2] }}>
                          <Typography variant="title2" style={{ 
                            color: themeColors.text.primary,
                            fontWeight: appleTheme.typography.fontWeight.semibold
                          }}>
                            {issue.title}
                          </Typography>
                          <Box style={{
                            padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                            backgroundColor: getSeverityColor(issue.severity),
                            color: "white",
                            borderRadius: appleTheme.borderRadius.base,
                            fontSize: appleTheme.typography.fontSize.xs,
                            fontWeight: appleTheme.typography.fontWeight.semibold
                          }}>
                            {issue.severity.toUpperCase()}
                          </Box>
                          <Box style={{
                            padding: `${appleTheme.spacing[1]} ${appleTheme.spacing[2]}`,
                            backgroundColor: appleTheme.colors.gray[100],
                            color: themeColors.text.secondary,
                            borderRadius: appleTheme.borderRadius.base,
                            fontSize: appleTheme.typography.fontSize.xs,
                            fontWeight: appleTheme.typography.fontWeight.medium
                          }}>
                            {issue.category}
                          </Box>
                        </HStack>
                        <Typography variant="body" style={{ 
                          marginBottom: appleTheme.spacing[2],
                          color: themeColors.text.secondary
                        }}>
                          {issue.description}
                        </Typography>
                        <Typography variant="body" style={{ 
                          marginBottom: appleTheme.spacing[2],
                          color: themeColors.text.primary,
                          fontWeight: appleTheme.typography.fontWeight.medium
                        }}>
                          <strong>Impact:</strong> {issue.impact}
                        </Typography>
                        <Card variant="outlined" padding="md" style={{ 
                          backgroundColor: appleTheme.colors.info + "10",
                          borderColor: appleTheme.colors.info + "30",
                          marginBottom: appleTheme.spacing[2]
                        }}>
                          <Typography variant="body" style={{ color: themeColors.text.primary }}>
                            <strong><Lightbulb size={16} weight="fill" style={{ marginRight: "4px", verticalAlign: "middle" }} /> Suggestion:</strong> {issue.suggestion}
                          </Typography>
                        </Card>
                        <Card variant="outlined" padding="md" style={{ backgroundColor: appleTheme.colors.gray[50] }}>
                          <Typography variant="caption" style={{ 
                            color: themeColors.text.tertiary,
                            display: "block",
                            marginBottom: appleTheme.spacing[1]
                          }}>
                            Implementation:
                          </Typography>
                          <Typography variant="body" style={{ 
                            fontFamily: "SF Mono, Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                            fontSize: appleTheme.typography.fontSize.sm,
                            color: themeColors.text.primary
                          }}>
                            {issue.code}
                          </Typography>
                        </Card>
                      </Box>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            </Card>

            {/* Recommendations */}
            <Card variant="elevated" padding="xl">
              <Typography variant="title1" style={{ 
                marginBottom: appleTheme.spacing[4],
                color: themeColors.text.primary,
                fontWeight: appleTheme.typography.fontWeight.semibold
              }}>
                Quick Recommendations
              </Typography>
              <VStack spacing={2}>
                {results.recommendations.map((recommendation, index) => (
                  <HStack key={index} spacing={2} align="center">
                        <CheckCircle size={20} weight="fill" color={appleTheme.colors.success} />
                    <Typography variant="body" style={{ color: themeColors.text.primary }}>
                      {recommendation}
                    </Typography>
                  </HStack>
                ))}
              </VStack>
            </Card>
          </Box>
        )}

        {/* Best Practices */}
        <Card variant="elevated" padding="xl" style={{ marginBottom: appleTheme.spacing[6] }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: themeColors.text.primary,
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            {t("performanceAudit.bestPracticesTitle")}
          </Typography>
          
          <HStack spacing={6} align="flex-start" wrap="wrap">
            <Box style={{ flex: 1, minWidth: "300px" }}>
              <Typography variant="title2" style={{ 
                marginBottom: appleTheme.spacing[3],
                color: appleTheme.colors.success,
                fontWeight: appleTheme.typography.fontWeight.semibold,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <CheckCircle size={24} weight="fill" />
                {t("performanceAudit.coreOptimizations")}
              </Typography>
              <VStack spacing={2}>
                {[
                  t("performanceAudit.coreItem1"),
                  t("performanceAudit.coreItem2"),
                  t("performanceAudit.coreItem3"),
                  t("performanceAudit.coreItem4"),
                  t("performanceAudit.coreItem5"),
                  t("performanceAudit.coreItem6"),
                  t("performanceAudit.coreItem7")
                ].map((item, index) => (
                  <HStack key={index} spacing={2} align="center">
                        <CheckCircle size={20} weight="fill" color={appleTheme.colors.success} />
                    <Typography variant="body" style={{ color: themeColors.text.primary }}>
                      {item}
                    </Typography>
                  </HStack>
                ))}
              </VStack>
            </Box>
            
            <Box style={{ flex: 1, minWidth: "300px" }}>
              <Typography variant="title2" style={{ 
                marginBottom: appleTheme.spacing[3],
                color: appleTheme.colors.info,
                fontWeight: appleTheme.typography.fontWeight.semibold,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Rocket style={{ fontSize: "24px" }} />
                {t("performanceAudit.advancedTechniques")}
              </Typography>
              <VStack spacing={2}>
                {[
                  t("performanceAudit.advancedItem1"),
                  t("performanceAudit.advancedItem2"),
                  t("performanceAudit.advancedItem3"),
                  t("performanceAudit.advancedItem4"),
                  t("performanceAudit.advancedItem5"),
                  t("performanceAudit.advancedItem6"),
                  t("performanceAudit.advancedItem7")
                ].map((item, index) => (
                  <HStack key={index} spacing={2} align="center">
                    <Info style={{ color: appleTheme.colors.info, fontSize: "20px" }} />
                    <Typography variant="body" style={{ color: themeColors.text.primary }}>
                      {item}
                    </Typography>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </HStack>
        </Card>

        {/* CTA */}
        <Card variant="elevated" padding="xl" style={{ 
          background: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
          textAlign: "center"
        }}>
          <Typography variant="title1" style={{ 
            marginBottom: appleTheme.spacing[3],
            color: "white",
            fontWeight: appleTheme.typography.fontWeight.semibold
          }}>
            {t("performanceAudit.needMoreTools")}
          </Typography>
          <Typography variant="body" style={{ 
            marginBottom: appleTheme.spacing[4],
            color: "white",
            opacity: 0.9
          }}>
            {t("performanceAudit.needMoreToolsDesc")}
          </Typography>
          <Link href="/tools" passHref legacyBehavior>
            <a style={{ textDecoration: "none" }}>
              <Button
                variant="secondary"
                size="large"
                style={{
                  backgroundColor: "white",
                  color: "#007AFF",
                  fontWeight: appleTheme.typography.fontWeight.semibold
                }}
              >
                {t("keyboardNavigator.viewAllTools")}
              </Button>
            </a>
          </Link>
        </Card>
      </Container>

      {/* Snackbar */}
      {snackbarOpen && (
        <Box style={{
          position: "fixed",
          bottom: appleTheme.spacing[6],
          right: appleTheme.spacing[6],
          backgroundColor: appleTheme.colors.error,
          color: "white",
          padding: `${appleTheme.spacing[3]} ${appleTheme.spacing[4]}`,
          borderRadius: appleTheme.borderRadius.md,
          boxShadow: appleTheme.shadows.lg,
          zIndex: 1000
        }}>
          <Typography variant="footnote" style={{ color: "white" }}>
            {snackbarMessage}
          </Typography>
        </Box>
      )}
    </div>
  );
}