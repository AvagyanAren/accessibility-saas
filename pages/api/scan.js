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

  // Try simple scanner first (no browser required)
  try {
    console.log("Attempting simple scan method...");
    const simpleResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/scan-simple?url=${encodeURIComponent(url)}`);
    const simpleData = await simpleResponse.json();
    
    if (simpleResponse.ok) {
      console.log("Simple scan successful");
      return res.status(200).json(simpleData);
    }
  } catch (simpleErr) {
    console.error("Simple scan failed:", simpleErr);
  }

  // Try Playwright as fallback
  let browser;
  try {
    console.log("Attempting Playwright scan...");
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

    await page.goto(url, { 
      waitUntil: "domcontentloaded",
      timeout: 30000
    });

    await page.waitForLoadState('networkidle', { timeout: 10000 });

    const results = await new AxeBuilder({ page }).analyze();
    console.log("Playwright scan successful");
    res.status(200).json(results);
  } catch (err) {
    console.error("Playwright scan error:", err);
    
    // Try Puppeteer fallback
    try {
      console.log("Attempting Puppeteer fallback...");
      const fallbackResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/scan-fallback?url=${encodeURIComponent(url)}`);
      const fallbackData = await fallbackResponse.json();
      
      if (fallbackResponse.ok) {
        console.log("Puppeteer fallback successful");
        return res.status(200).json(fallbackData);
      }
    } catch (fallbackErr) {
      console.error("Puppeteer fallback also failed:", fallbackErr);
    }
    
    // Final error response
    res.status(500).json({ 
      error: "Unable to scan website. All scanning methods failed. Please try again later." 
    });
  } finally {
    if (browser) await browser.close();
  }
}
