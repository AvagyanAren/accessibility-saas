import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';

export default function ToolInput({
  title = "Enter Website URL",
  placeholder = "https://example.com",
  value,
  onChange,
  onSubmit,
  loading = false,
  buttonText = "Analyze",
  buttonIcon,
  infoMessage,
  errorMessage,
  helperText,
  disabled = false
}) {
  return (
    <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#333" }}>
        {title}
      </Typography>
      
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Website URL"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || loading}
          helperText={helperText}
          error={!!errorMessage}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0077b6",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0077b6",
                borderWidth: 2,
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={disabled || loading || !value.trim()}
          startIcon={loading ? <CircularProgress size={20} /> : buttonIcon}
          sx={{
            backgroundColor: "#0077b6",
            px: 4,
            py: 1.5,
            fontSize: "16px",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          {loading ? "Analyzing..." : buttonText}
        </Button>
      </Box>

      {infoMessage && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            {infoMessage}
          </Typography>
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body2">
            {errorMessage}
          </Typography>
        </Alert>
      )}
    </Paper>
  );
}
