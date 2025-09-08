import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Chip,
  Alert,
  Paper,
} from '@mui/material';
import { getSeverityColor, getSeverityIcon } from '../../utils/accessibilityUtils';

export default function IssueList({ 
  issues, 
  emptyMessage = "No issues found",
  showCodeExamples = true,
  showImpact = true,
  showSuggestions = true,
  variant = "default" // default, accordion, compact
}) {
  if (!issues || issues.length === 0) {
    return (
      <Alert severity="success">
        <Typography variant="h6">{emptyMessage}</Typography>
      </Alert>
    );
  }

  const renderIssue = (issue, index) => {
    const severityColor = getSeverityColor(issue.severity);
    const SeverityIcon = getSeverityIcon(issue.severity);
    
    const issueContent = (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
            {issue.description || issue.title}
          </Typography>
          {issue.severity && (
            <Chip
              label={issue.severity.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: severityColor,
                color: "white",
                fontWeight: 600,
                fontSize: "10px"
              }}
            />
          )}
          {issue.category && (
            <Chip
              label={issue.category}
              size="small"
              variant="outlined"
              sx={{ fontSize: "10px" }}
            />
          )}
        </Box>
        
        {issue.element && (
          <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
            <strong>Element:</strong> {issue.element}
            {issue.selector && ` | <strong>Selector:</strong> ${issue.selector}`}
          </Typography>
        )}
        
        {showImpact && issue.impact && (
          <Typography variant="body2" sx={{ mb: 1, color: "#dc3545", fontWeight: 600 }}>
            Impact: {issue.impact}
          </Typography>
        )}
        
        {showSuggestions && issue.suggestion && (
          <Alert severity="info" sx={{ mt: 1, mb: 1 }}>
            <Typography variant="body2">
              <strong>💡 Suggestion:</strong> {issue.suggestion}
            </Typography>
          </Alert>
        )}
        
        {showCodeExamples && issue.code && (
          <Paper sx={{ p: 2, backgroundColor: "#f8f9fa", mt: 1 }}>
            <Typography variant="caption" sx={{ color: "#666", display: "block", mb: 1 }}>
              Code Example:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "14px" }}>
              {issue.code}
            </Typography>
          </Paper>
        )}
      </Box>
    );

    if (variant === "compact") {
      return (
        <ListItem key={index} sx={{ px: 0, py: 1 }}>
          <ListItemIcon>
            <Box sx={{ color: severityColor }}>
              <SeverityIcon />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={issue.description || issue.title}
            secondary={issue.impact}
          />
        </ListItem>
      );
    }

    return (
      <React.Fragment key={index}>
        <ListItem sx={{ px: 0, py: 2 }}>
          <ListItemIcon>
            <Box sx={{ color: severityColor }}>
              <SeverityIcon />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={issueContent}
          />
        </ListItem>
        {index < issues.length - 1 && <Divider />}
      </React.Fragment>
    );
  };

  return (
    <List>
      {issues.map(renderIssue)}
    </List>
  );
}
