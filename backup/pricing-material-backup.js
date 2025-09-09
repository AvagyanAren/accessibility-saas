import { Box, Typography, Container, Paper, Button } from "@mui/material";

export default function Pricing() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
          Pricing
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {[
            { name: "Free", price: "$0", desc: "Basic scans with limited reports." },
            { name: "Pro", price: "$19/mo", desc: "Unlimited scans, advanced reports, priority support." },
            { name: "Enterprise", price: "Custom", desc: "Team access, integrations, and dedicated support." },
          ].map((plan, idx) => (
            <Paper
              key={idx}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: "#fff",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                {plan.name}
              </Typography>
              <Typography variant="h4" sx={{ mb: 2, color: "#0077b6" }}>
                {plan.price}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                {plan.desc}
              </Typography>
              <Button variant="contained">Choose {plan.name}</Button>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
