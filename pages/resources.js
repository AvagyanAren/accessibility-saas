import { Box, Typography, Container, List, ListItem, Link } from "@mui/material";

export default function Resources() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
          Free Resources
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Learn more about accessibility and best practices with these resources:
        </Typography>
        <List>
          <ListItem>
            <Link href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">
              WCAG Guidelines – Web Content Accessibility Guidelines
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://developer.mozilla.org/en-US/docs/Web/Accessibility" target="_blank">
              MDN Web Docs on Accessibility
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://a11yproject.com/" target="_blank">
              The A11Y Project – Accessibility Resources
            </Link>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
}
