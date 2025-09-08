import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CheckCircle, Info } from '@mui/icons-material';

export default function BestPractices({ 
  title = "Best Practices",
  practices = [],
  columns = 2 
}) {
  if (!practices || practices.length === 0) {
    return null;
  }

  const dos = practices.filter(p => p.type === 'do');
  const donts = practices.filter(p => p.type === 'dont');
  const tips = practices.filter(p => p.type === 'tip');

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
        {title}
      </Typography>
      
      <Grid container spacing={3}>
        {dos.length > 0 && (
          <Grid item xs={12} md={columns === 2 ? 6 : 4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#28a745" }}>
              ✅ Do's
            </Typography>
            <List dense>
              {dos.map((practice, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#28a745" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={practice.text}
                    secondary={practice.description}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        
        {donts.length > 0 && (
          <Grid item xs={12} md={columns === 2 ? 6 : 4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#dc3545" }}>
              ❌ Don'ts
            </Typography>
            <List dense>
              {donts.map((practice, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "#dc3545" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={practice.text}
                    secondary={practice.description}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        
        {tips.length > 0 && (
          <Grid item xs={12} md={columns === 2 ? 12 : 4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#17a2b8" }}>
              💡 Tips
            </Typography>
            <List dense>
              {tips.map((practice, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Info sx={{ color: "#17a2b8" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={practice.text}
                    secondary={practice.description}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
