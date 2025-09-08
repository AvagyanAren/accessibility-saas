import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
