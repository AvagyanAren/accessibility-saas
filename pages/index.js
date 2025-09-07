import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Chip,
  IconButton,
  Grid,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

export default function Home() {
  const [url, setUrl] = useState("");
  const [violations, setViolations] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

  const handleScan = async () => {
    setScanning(true);
    setViolations([]);
    setExpandedRows({});

    try {
      const res = await fetch(`/api/scan?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setViolations(data.violations || []);
    } catch (err) {
      alert("Failed to scan");
    }

    setScanning(false);
  };

  const toggleRow = (index) =>
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));

  const getStatusColor = (impact) => {
    switch (impact) {
      case "critical":
        return "#ff4c4c";
      case "serious":
        return "#ff9f43";
      default:
        return "#ccc";
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Accessibility Scanner
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Website URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleScan}
          disabled={scanning || !url}
        >
          {scanning ? "Scanning..." : "Scan"}
        </Button>
      </Box>

      {violations.length > 0 && (
        <Grid container spacing={3}>
          {violations.map((v, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {/* Top Row: Rule code on left, status on right */}
                <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
  }}
>
  <Typography
    variant="subtitle2"
    sx={{ fontSize: 12, color: "#999", fontWeight: 500 }}
  >
    {v.id || `#${idx + 1}`}
  </Typography>
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: getStatusColor(v.impact),
      }}
    />
    <Typography variant="body2">{v.impact}</Typography>
  </Box>
</Box>

                {/* Title + Accordion */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 0.5, flex: 1, pr: 1 }}
                  >
                    {v.help}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => toggleRow(idx)}
                    sx={{ ml: 1 }}
                  >
                    {expandedRows[idx] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>

                {/* Accordion Content */}
                {expandedRows[idx] && (
                  <Paper
                    elevation={0}
                    sx={{
                      mt: 1,
                      p: 1.5,
                      border: "0.5px solid #888",
                      borderRadius: 1,
                      fontFamily: "Roboto Mono, monospace",
                      fontSize: 13,
                      whiteSpace: "pre-wrap",
                      overflowX: "auto",
                      backgroundColor: "#fff",
                    }}
                  >
                    {v.nodes.map((n, i) => (
                      <div key={i}>
                        {n.html.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                      </div>
                    ))}
                  </Paper>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
