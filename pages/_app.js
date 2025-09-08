import Navbar from "../components/Navbar";
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: "#e3f2fd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
