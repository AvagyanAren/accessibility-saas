import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
} from "@mui/material";
import { ExpandMore, ExpandLess, ContentCopy } from "@mui/icons-material";

export default function Home() {
  const [url, setUrl] = useState("");
  const [violations, setViolations] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState("");
  const [hoveredFilter, setHoveredFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    setViolations([]);
    setExpandedRows({});

    try {
      // Add protocol if missing
      let scanUrl = url.trim();
      if (!scanUrl.startsWith('http://') && !scanUrl.startsWith('https://')) {
        scanUrl = 'https://' + scanUrl;
      }
      
      const res = await fetch(`/api/scan?url=${encodeURIComponent(scanUrl)}`);
      const data = await res.json();
      setViolations(data.violations || []);
    } catch (err) {
      console.error("Scan error:", err);
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
        return "#999";
    }
  };

  const getFriendlyTitle = (help) => {
    // Convert technical descriptions to user-friendly titles
    const titleMap = {
      "Documents must have <title> element to aid in navigation": "Missing Page Title",
      "<html> element must have a lang attribute": "Missing Language Declaration",
      "Document should have one main landmark": "Missing Main Content Area",
      "Page should contain a level-one heading": "Missing Main Heading",
      "Images must have alternate text": "Images Missing Alt Text",
      "Form elements must have labels": "Form Fields Missing Labels",
      "Elements must have sufficient color contrast": "Poor Color Contrast",
      "Interactive elements must be focusable": "Elements Not Keyboard Accessible",
      "ARIA attributes must be valid": "Invalid ARIA Attributes",
      "Elements must not have duplicate attributes": "Duplicate HTML Attributes",
      "Heading levels should only increase by one": "Incorrect Heading Order",
      "Form fields must have accessible names": "Form Fields Need Names",
      "Links must have discernible text": "Links Missing Text",
      "Buttons must have discernible text": "Buttons Missing Text",
      "Elements must have sufficient color contrast": "Text Hard to Read"
    };

    // Try to find exact match first
    if (titleMap[help]) {
      return titleMap[help];
    }

    // Try to find partial matches for common patterns
    if (help.includes("title")) return "Missing Page Title";
    if (help.includes("lang")) return "Missing Language Declaration";
    if (help.includes("main landmark")) return "Missing Main Content Area";
    if (help.includes("level-one heading")) return "Missing Main Heading";
    if (help.includes("alt text") || help.includes("alternate text")) return "Images Missing Alt Text";
    if (help.includes("labels") && help.includes("form")) return "Form Fields Missing Labels";
    if (help.includes("color contrast")) return "Poor Color Contrast";
    if (help.includes("focusable")) return "Elements Not Keyboard Accessible";
    if (help.includes("ARIA")) return "Invalid ARIA Attributes";
    if (help.includes("duplicate")) return "Duplicate HTML Attributes";
    if (help.includes("heading")) return "Incorrect Heading Order";
    if (help.includes("accessible names")) return "Form Fields Need Names";
    if (help.includes("discernible text") && help.includes("link")) return "Links Missing Text";
    if (help.includes("discernible text") && help.includes("button")) return "Buttons Missing Text";

    // If no match found, return a simplified version of the original
    return help.length > 50 ? help.substring(0, 50) + "..." : help;
  };

  const getDetailedDescription = (help) => {
    // Provide detailed descriptions for common accessibility issues
    const descriptionMap = {
      "Documents must have <title> element to aid in navigation": "Every webpage needs a descriptive title that appears in the browser tab. This helps users understand what page they're on and improves navigation.",
      "<html> element must have a lang attribute": "The page language must be declared so screen readers can pronounce words correctly and users understand the content language.",
      "Document should have one main landmark": "Pages need a clear main content area that screen readers can identify, making it easier for users to navigate to the primary content.",
      "Page should contain a level-one heading": "Every page should have one main heading (H1) that describes the page content and provides structure for screen readers.",
      "Images must have alternate text": "Images need descriptive text alternatives so users with visual impairments can understand what the image shows.",
      "Form elements must have labels": "All form fields need clear labels so users know what information to enter and screen readers can identify each field.",
      "Elements must have sufficient color contrast": "Text and background colors need enough contrast so users with visual impairments can read the content easily.",
      "Interactive elements must be focusable": "All clickable elements must be accessible via keyboard navigation for users who can't use a mouse.",
      "ARIA attributes must be valid": "ARIA attributes help screen readers understand page structure, but they must be used correctly to avoid confusion.",
      "Elements must not have duplicate attributes": "Duplicate HTML attributes can cause unexpected behavior and confuse assistive technologies.",
      "Heading levels should only increase by one": "Headings should follow a logical order (H1, then H2, then H3) to create a clear page structure for screen readers.",
      "Form fields must have accessible names": "Form fields need proper names or labels so screen readers can announce them correctly to users.",
      "Links must have discernible text": "Links need descriptive text so users understand where they'll go when clicked, especially when using screen readers.",
      "Buttons must have discernible text": "Buttons need clear text or labels so users understand what action will be performed when clicked.",
      "Elements must have sufficient color contrast": "Text must be clearly readable against its background color for users with visual impairments."
    };

    // Try to find exact match first
    if (descriptionMap[help]) {
      return descriptionMap[help];
    }

    // Try to find partial matches for common patterns
    if (help.includes("title")) return "Every webpage needs a descriptive title that appears in the browser tab. This helps users understand what page they're on and improves navigation.";
    if (help.includes("lang")) return "The page language must be declared so screen readers can pronounce words correctly and users understand the content language.";
    if (help.includes("main landmark")) return "Pages need a clear main content area that screen readers can identify, making it easier for users to navigate to the primary content.";
    if (help.includes("level-one heading")) return "Every page should have one main heading (H1) that describes the page content and provides structure for screen readers.";
    if (help.includes("alt text") || help.includes("alternate text")) return "Images need descriptive text alternatives so users with visual impairments can understand what the image shows.";
    if (help.includes("labels") && help.includes("form")) return "All form fields need clear labels so users know what information to enter and screen readers can identify each field.";
    if (help.includes("color contrast")) return "Text and background colors need enough contrast so users with visual impairments can read the content easily.";
    if (help.includes("focusable")) return "All clickable elements must be accessible via keyboard navigation for users who can't use a mouse.";
    if (help.includes("ARIA")) return "ARIA attributes help screen readers understand page structure, but they must be used correctly to avoid confusion.";
    if (help.includes("duplicate")) return "Duplicate HTML attributes can cause unexpected behavior and confuse assistive technologies.";
    if (help.includes("heading")) return "Headings should follow a logical order (H1, then H2, then H3) to create a clear page structure for screen readers.";
    if (help.includes("accessible names")) return "Form fields need proper names or labels so screen readers can announce them correctly to users.";
    if (help.includes("discernible text") && help.includes("link")) return "Links need descriptive text so users understand where they'll go when clicked, especially when using screen readers.";
    if (help.includes("discernible text") && help.includes("button")) return "Buttons need clear text or labels so users understand what action will be performed when clicked.";

    // If no match found, return the original help text
    return help;
  };

  const getFixSuggestion = (help) => {
    // Provide actionable fix suggestions for common accessibility issues
    const fixMap = {
      "Documents must have <title> element to aid in navigation": "Add a <title> tag in the <head> section: <title>Your Page Title</title>",
      "<html> element must have a lang attribute": "Add lang attribute to <html> tag: <html lang=\"en\"> (use appropriate language code)",
      "Document should have one main landmark": "Wrap main content in <main> tags or add role=\"main\" to the main content container",
      "Page should contain a level-one heading": "Add an <h1> tag with descriptive text that summarizes the page content",
      "Images must have alternate text": "Add alt attribute to <img> tags: <img src=\"image.jpg\" alt=\"Description of image\">",
      "Form elements must have labels": "Add <label> tags or aria-label attributes to form inputs: <label for=\"input1\">Field Name</label>",
      "Elements must have sufficient color contrast": "Increase contrast by using darker text on light backgrounds or lighter text on dark backgrounds. Aim for at least 4.5:1 ratio.",
      "Interactive elements must be focusable": "Add tabindex=\"0\" to interactive elements or use proper HTML elements like <button> instead of <div>",
      "ARIA attributes must be valid": "Remove invalid ARIA attributes or fix their values according to ARIA specification",
      "Elements must not have duplicate attributes": "Remove duplicate attributes from HTML elements - each attribute should appear only once",
      "Heading levels should only increase by one": "Restructure headings to follow logical order: H1 → H2 → H3 (skip no levels)",
      "Form fields must have accessible names": "Add proper labels using <label>, aria-label, or aria-labelledby attributes",
      "Links must have discernible text": "Add descriptive text inside <a> tags or use aria-label: <a href=\"/page\">Go to Page</a>",
      "Buttons must have discernible text": "Add text inside <button> tags or use aria-label: <button>Submit Form</button>",
      "Elements must have sufficient color contrast": "Use color contrast tools to test and adjust colors until they meet WCAG AA standards (4.5:1 ratio)"
    };

    // Try to find exact match first
    if (fixMap[help]) {
      return fixMap[help];
    }

    // Try to find partial matches for common patterns
    if (help.includes("title")) return "Add a <title> tag in the <head> section: <title>Your Page Title</title>";
    if (help.includes("lang")) return "Add lang attribute to <html> tag: <html lang=\"en\"> (use appropriate language code)";
    if (help.includes("main landmark")) return "Wrap main content in <main> tags or add role=\"main\" to the main content container";
    if (help.includes("level-one heading")) return "Add an <h1> tag with descriptive text that summarizes the page content";
    if (help.includes("alt text") || help.includes("alternate text")) return "Add alt attribute to <img> tags: <img src=\"image.jpg\" alt=\"Description of image\">";
    if (help.includes("labels") && help.includes("form")) return "Add <label> tags or aria-label attributes to form inputs: <label for=\"input1\">Field Name</label>";
    if (help.includes("color contrast")) return "Increase contrast by using darker text on light backgrounds or lighter text on dark backgrounds. Aim for at least 4.5:1 ratio.";
    if (help.includes("focusable")) return "Add tabindex=\"0\" to interactive elements or use proper HTML elements like <button> instead of <div>";
    if (help.includes("ARIA")) return "Remove invalid ARIA attributes or fix their values according to ARIA specification";
    if (help.includes("duplicate")) return "Remove duplicate attributes from HTML elements - each attribute should appear only once";
    if (help.includes("heading")) return "Restructure headings to follow logical order: H1 → H2 → H3 (skip no levels)";
    if (help.includes("accessible names")) return "Add proper labels using <label>, aria-label, or aria-labelledby attributes";
    if (help.includes("discernible text") && help.includes("link")) return "Add descriptive text inside <a> tags or use aria-label: <a href=\"/page\">Go to Page</a>";
    if (help.includes("discernible text") && help.includes("button")) return "Add text inside <button> tags or use aria-label: <button>Submit Form</button>";

    // If no match found, return a generic suggestion
    return "Review the element and ensure it follows accessibility best practices. Check WCAG guidelines for specific requirements.";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const filteredViolations = violations.filter(
    (v) => !filter || v.impact === filter
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: "40vh", sm: "35vh" },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          pt: { xs: 4, sm: 2 },
          px: { xs: 3, sm: 2 },
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          sx={{ 
            fontWeight: 700, 
            mb: 1, 
            color: "#0077b6",
            fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
            textAlign: "center",
            px: 2
          }}
        >
          Web Accessibility Checker
        </Typography>

        {/* Subtitle */}
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            color: "#333",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            textAlign: "center",
            px: 2,
            maxWidth: { xs: "100%", sm: "500px" }
          }}
        >
          Enter a URL below to quickly check accessibility issues
        </Typography>

        {/* Input + Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "flex-end" },
            gap: 2,
            width: "100%",
            maxWidth: { xs: "100%", sm: 500, md: 600 },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 0.5, 
            flex: 1,
            width: { xs: "100%", sm: "auto" }
          }}>
            <Typography variant="body2" sx={{ color: "#555", fontSize: "12px" }}>
              Website URL
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              sx={{ 
                "& .MuiOutlinedInput-root": { 
                  borderRadius: 3,
                  backgroundColor: url.trim() ? "white" : "transparent",
                  "&.Mui-focused": {
                    backgroundColor: "white",
                  }
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  fontSize: "14px",
                  color: "#999",
                }
              }}
            />
          </Box>
    <Button
      variant="contained"
      onClick={handleScan}
      disabled={scanning || !url.trim()}
      sx={{
        backgroundColor: "#0077b6",
        borderRadius: 3,
        color: "#fff",
        px: 4,
        py: 1.5,
        fontWeight: 600,
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#005f99",
          boxShadow: "none",
        },
        "&:disabled": {
          backgroundColor: "#ccc",
        },
      }}
    >
      {scanning ? "Scanning..." : "Scan"}
        </Button>
        </Box>
      </Box>

      {/* Spacer */}
      <Box sx={{ height: { xs: 3, sm: 4 } }} />

      {/* Loading indicator */}
      {scanning && (
        <Box sx={{ width: "100%", mb: 3 }}>
          <LinearProgress />
        </Box>
      )}

      {/* Filter */}
      {violations.length > 0 && (
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 0.5, 
          minWidth: { xs: "100%", sm: 160 }, 
          mb: 3,
          px: { xs: 2, sm: 0 },
          width: { xs: "100%", sm: "auto" }
        }}>
          <Typography variant="body2" sx={{ color: "#555", fontSize: "12px" }}>
            Filter by severity
          </Typography>
          <FormControl size="small" sx={{ minWidth: "100%" }}>
            <Select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setHoveredFilter("");
              }}
              onOpen={() => setIsFilterOpen(true)}
              onClose={() => {
                setIsFilterOpen(false);
                setHoveredFilter("");
              }}
              displayEmpty
              renderValue={(selected) => {
                if (hoveredFilter) {
                  return hoveredFilter;
                }
                if (selected === "" || selected === undefined) {
                  return "All";
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent",
                  "&.Mui-focused": {
                    backgroundColor: "white !important",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    backgroundColor: "white !important",
                  }
                },
                "& .MuiSelect-select": {
                  backgroundColor: "transparent",
                  color: "#333",
                  "&.Mui-focused": {
                    backgroundColor: "white !important",
                  }
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                  "&.Mui-focused": {
                    borderColor: "#0077b6",
                  }
                }
              }}
            >
            <MenuItem 
              value="" 
              onMouseEnter={() => setHoveredFilter("All")}
              onMouseLeave={() => setHoveredFilter("")}
            >
              All
            </MenuItem>
            <MenuItem 
              value="critical" 
              onMouseEnter={() => setHoveredFilter("Critical")}
              onMouseLeave={() => setHoveredFilter("")}
            >
              Critical
            </MenuItem>
            <MenuItem 
              value="serious" 
              onMouseEnter={() => setHoveredFilter("Serious")}
              onMouseLeave={() => setHoveredFilter("")}
            >
              Serious
            </MenuItem>
            <MenuItem 
              value="moderate" 
              onMouseEnter={() => setHoveredFilter("Moderate")}
              onMouseLeave={() => setHoveredFilter("")}
            >
              Moderate
            </MenuItem>
            <MenuItem 
              value="minor" 
              onMouseEnter={() => setHoveredFilter("Minor")}
              onMouseLeave={() => setHoveredFilter("")}
            >
              Minor
            </MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Summary */}
      {violations.length > 0 && (
        <Box sx={{ 
          mb: 3, 
          display: "flex", 
          gap: { xs: 2, sm: 4 }, 
          flexWrap: "wrap",
          justifyContent: "center",
          px: { xs: 2, sm: 0 }
        }}>
          <Typography sx={{ color: "#333" }}>Total Violations: {violations.length}</Typography>
          <Typography sx={{ color: "#d32f2f" }}>
            Critical: {violations.filter((v) => v.impact === "critical").length}
          </Typography>
          <Typography sx={{ color: "#f57c00" }}>
            Serious: {violations.filter((v) => v.impact === "serious").length}
          </Typography>
          <Typography sx={{ color: "#666" }}>
            Others:{" "}
            {violations.filter(
              (v) => v.impact !== "critical" && v.impact !== "serious"
            ).length}
          </Typography>
        </Box>
      )}

      {/* Violations Cards */}
      {filteredViolations.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: { xs: 1.5, sm: 2 },
            px: { xs: 2, sm: 2, md: 3 },
            pb: 6,
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          {filteredViolations.map((v, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 4,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {/* Top Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#666" }}>#{idx + 1}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getStatusColor(v.impact),
                    }}
                  />
                  <Typography sx={{ fontSize: 12, color: "#333" }}>{v.impact.charAt(0).toUpperCase() + v.impact.slice(1)}</Typography>
                </Box>
              </Box>

              {/* Title + Controls */}
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle1" sx={{ color: "#333", mb: 1 }}>
                  {getFriendlyTitle(v.help)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", fontSize: "14px", lineHeight: 1.4, mb: 1 }}>
                  {getDetailedDescription(v.help)}
                </Typography>
                
                {/* Fix Suggestion */}
                <Box sx={{ 
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #e9ecef", 
                  borderRadius: 2, 
                  p: 2, 
                  mb: 2 
                }}>
                  <Typography variant="body2" sx={{ 
                    color: "#495057", 
                    fontSize: "13px", 
                    fontWeight: 500, 
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5
                  }}>
                    💡 How to fix:
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: "#212529", 
                    fontSize: "13px", 
                    lineHeight: 1.4,
                    fontFamily: "monospace",
                    backgroundColor: "white",
                    padding: 1,
                    borderRadius: 1,
                    border: "1px solid #dee2e6"
                  }}>
                    {getFixSuggestion(v.help)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
                  <IconButton size="small" onClick={() => toggleRow(idx)}>
                    {expandedRows[idx] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard(JSON.stringify(v, null, 2))}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Accordion Content */}
              {expandedRows[idx] && (
                <Paper
                  elevation={0}
                  sx={{
                    mt: 1,
                    p: 2,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    fontFamily: "Roboto Mono, monospace",
                    fontSize: 14,
                    overflowX: "auto",
                    whiteSpace: "pre",
                    backgroundColor: "white",
                  }}
                >
                  {v.nodes.map((n, i) => (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: n.html.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
                      }}
                    />
                  ))}
                </Paper>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
