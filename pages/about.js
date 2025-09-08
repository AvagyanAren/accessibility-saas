import { Box, Typography, Container } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          We believe the web should be accessible to everyone. Our Accessibility
          Scanner helps developers, designers, and businesses identify and fix
          issues that prevent people with disabilities from using digital products.
        </Typography>
        <Typography variant="body1" paragraph>
          Founded by a team of designers and engineers, our mission is to make
          accessibility checks as easy and automated as possible, so you can
          focus on delivering great experiences for all users.
        </Typography>
      </Container>
    </Box>
  );
}
