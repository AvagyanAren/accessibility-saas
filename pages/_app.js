import Navbar from "../components/NavbarApple";
import ThemeToggle from "../components/apple/ThemeToggle";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../styles/apple-globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            backgroundColor: "#F5F5F7",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Navbar />
          <Component {...pageProps} />
          
          {/* Fixed Theme Toggle in bottom left */}
          <div
            style={{
              position: "fixed",
              bottom: "24px",
              left: "24px",
              zIndex: 999,
            }}
          >
            <ThemeToggle />
          </div>
          
          <SpeedInsights />
          <Analytics />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default MyApp;
