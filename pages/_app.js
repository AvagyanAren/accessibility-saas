import Navbar from "../components/NavbarApple";
import { ThemeProvider } from "../contexts/ThemeContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../styles/apple-globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#F5F5F7",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
