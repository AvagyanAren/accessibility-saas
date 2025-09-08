import Navbar from "../components/NavbarApple";
import { ThemeProvider } from "../contexts/ThemeContext";
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
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
