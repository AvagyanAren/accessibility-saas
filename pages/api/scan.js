// pages/api/scan.js
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

export default async function handler(req, res) {
  // Set CORS headers for Next.js 15
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
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
    // Use Vercel's Playwright runtime
    browser = await chromium.launch({ 
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (compatible; AccessibilityScanner/1.0)'
    });
    
    const page = await context.newPage();

    // Set a reasonable timeout
    await page.goto(url, { 
      waitUntil: "domcontentloaded",
      timeout: 30000 // 30 seconds timeout
    });

    // Wait for page to be ready
    await page.waitForLoadState('networkidle', { timeout: 10000 });

    // Run Axe inside the page
    const results = await new AxeBuilder({ page }).analyze();

    res.status(200).json(results);
  } catch (err) {
    console.error("Playwright scan error:", err);
    
    // Try fallback method if Playwright fails
    try {
      console.log("Attempting fallback scan method...");
      const fallbackResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/scan-fallback?url=${encodeURIComponent(url)}`);
      const fallbackData = await fallbackResponse.json();
      
      if (fallbackResponse.ok) {
        console.log("Fallback scan successful");
        return res.status(200).json(fallbackData);
      }
    } catch (fallbackErr) {
      console.error("Fallback scan also failed:", fallbackErr);
    }
    
    // Provide more specific error messages
    if (err.message.includes("browser") || err.message.includes("chromium")) {
      res.status(500).json({ 
        error: "Browser not available. This might be a temporary issue. Please try again." 
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
