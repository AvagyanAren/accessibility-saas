// pages/api/scan.js
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL required" });

  // Validate URL format
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  let browser;
  try {
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // For deployment environments
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Set a reasonable timeout
    await page.goto(url, { 
      waitUntil: "networkidle",
      timeout: 30000 // 30 seconds timeout
    });

    // Run Axe inside the page
    const results = await new AxeBuilder({ page }).analyze();

    res.status(200).json(results);
  } catch (err) {
    console.error("Scan error:", err);
    
    // Provide more specific error messages
    if (err.message.includes("browser") || err.message.includes("chromium")) {
      res.status(500).json({ 
        error: "Browser not available. Please run 'npm run setup' to install required browsers." 
      });
    } else if (err.message.includes("timeout")) {
      res.status(408).json({ 
        error: "Request timeout. The website took too long to load." 
      });
    } else if (err.message.includes("net::ERR_")) {
      res.status(400).json({ 
        error: "Unable to access the website. Please check the URL and try again." 
      });
    } else {
      res.status(500).json({ 
        error: "Failed to scan website. Please try again later." 
      });
    }
  } finally {
    if (browser) await browser.close();
  }
}
