import React from 'react';
import Typography from '../apple/Typography';
import { Box, Stack, HStack } from '../apple/Layout';
import { appleTheme } from '../../styles/apple-theme';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckCircle, Info, XCircle } from 'phosphor-react';

export default function BestPractices({ 
  title = "Best Practices",
  practices = [],
  columns = 2 
}) {
  const { isDarkMode } = useTheme();
  const themeColors = isDarkMode ? appleTheme.colors.dark : appleTheme.colors;

  if (!practices || practices.length === 0) {
    return null;
  }

  const dos = practices.filter(p => p.type === 'do');
  const donts = practices.filter(p => p.type === 'dont');
  const tips = practices.filter(p => p.type === 'tip');

  return (
    <Box style={{
      backgroundColor: isDarkMode ? themeColors.background.tertiary : appleTheme.colors.background.primary,
      padding: appleTheme.spacing[6],
      borderRadius: appleTheme.borderRadius.xl,
      border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : appleTheme.colors.gray[200]}`,
      boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : appleTheme.shadows.md
    }}>
      <Typography variant="title2" style={{ 
        fontWeight: appleTheme.typography.fontWeight.semibold, 
        marginBottom: appleTheme.spacing[6],
        color: themeColors.text.primary
      }}>
        {title}
      </Typography>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: columns === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: appleTheme.spacing[6],
        '@media (maxWidth: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        {dos.length > 0 && (
          <Box>
            <HStack spacing={2} align="center" style={{ marginBottom: appleTheme.spacing[4] }}>
              <CheckCircle size={20} weight="fill" style={{ color: appleTheme.colors.success }} />
              <Typography variant="title3" style={{ 
                fontWeight: appleTheme.typography.fontWeight.semibold,
                color: themeColors.text.primary
              }}>
                Do's
              </Typography>
            </HStack>
            <Stack spacing={3}>
              {dos.map((practice, index) => (
                <HStack key={index} spacing={3} align="flex-start">
                  <Box style={{ flexShrink: 0, marginTop: '2px' }}>
                    <CheckCircle size={16} weight="fill" style={{ color: appleTheme.colors.success }} />
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Typography variant="body" style={{ 
                      color: themeColors.text.primary,
                      fontWeight: appleTheme.typography.fontWeight.medium,
                      marginBottom: practice.description ? appleTheme.spacing[1] : 0
                    }}>
                      {practice.text}
                    </Typography>
                    {practice.description && (
                      <Typography variant="footnote" style={{ color: themeColors.text.secondary }}>
                        {practice.description}
                      </Typography>
                    )}
                  </Box>
                </HStack>
              ))}
            </Stack>
          </Box>
        )}
        
        {donts.length > 0 && (
          <Box>
            <HStack spacing={2} align="center" style={{ marginBottom: appleTheme.spacing[4] }}>
              <XCircle size={20} weight="fill" style={{ color: appleTheme.colors.error }} />
              <Typography variant="title3" style={{ 
                fontWeight: appleTheme.typography.fontWeight.semibold,
                color: themeColors.text.primary
              }}>
                Don'ts
              </Typography>
            </HStack>
            <Stack spacing={3}>
              {donts.map((practice, index) => (
                <HStack key={index} spacing={3} align="flex-start">
                  <Box style={{ flexShrink: 0, marginTop: '2px' }}>
                    <XCircle size={16} weight="fill" style={{ color: appleTheme.colors.error }} />
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Typography variant="body" style={{ 
                      color: themeColors.text.primary,
                      fontWeight: appleTheme.typography.fontWeight.medium,
                      marginBottom: practice.description ? appleTheme.spacing[1] : 0
                    }}>
                      {practice.text}
                    </Typography>
                    {practice.description && (
                      <Typography variant="footnote" style={{ color: themeColors.text.secondary }}>
                        {practice.description}
                      </Typography>
                    )}
                  </Box>
                </HStack>
              ))}
            </Stack>
          </Box>
        )}
        
        {tips.length > 0 && (
          <Box style={{ gridColumn: columns === 2 ? 'span 2' : 'span 1' }}>
            <HStack spacing={2} align="center" style={{ marginBottom: appleTheme.spacing[4] }}>
              <Info size={20} weight="fill" style={{ color: appleTheme.colors.info }} />
              <Typography variant="title3" style={{ 
                fontWeight: appleTheme.typography.fontWeight.semibold,
                color: themeColors.text.primary
              }}>
                Tips
              </Typography>
            </HStack>
            <Stack spacing={3}>
              {tips.map((practice, index) => (
                <HStack key={index} spacing={3} align="flex-start">
                  <Box style={{ flexShrink: 0, marginTop: '2px' }}>
                    <Info size={16} weight="fill" style={{ color: appleTheme.colors.info }} />
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Typography variant="body" style={{ 
                      color: themeColors.text.primary,
                      fontWeight: appleTheme.typography.fontWeight.medium,
                      marginBottom: practice.description ? appleTheme.spacing[1] : 0
                    }}>
                      {practice.text}
                    </Typography>
                    {practice.description && (
                      <Typography variant="footnote" style={{ color: themeColors.text.secondary }}>
                        {practice.description}
                      </Typography>
                    )}
                  </Box>
                </HStack>
              ))}
            </Stack>
          </Box>
        )}
      </div>
    </Box>
  );
}
