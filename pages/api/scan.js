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
    
    // Direct simple scan without internal API call
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AccessibilityScanner/1.0)'
      },
      timeout: 30000
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    
    // Basic accessibility analysis using regex
    const violations = [];
    
    // Check for missing alt text on images
    const imgRegex = /<img[^>]*(?!alt\s*=)[^>]*>/gi;
    const images = html.match(imgRegex) || [];
    images.forEach((img, index) => {
      if (!img.includes('alt=')) {
        violations.push({
          id: 'image-alt',
          impact: 'serious',
          description: 'Images must have alternate text',
          help: 'Ensure that image elements have alternate text',
          nodes: [{
            target: [`img:nth-of-type(${index + 1})`],
            html: img
          }]
        });
      }
    });

    // Check for missing form labels
    const inputRegex = /<input[^>]*>/gi;
    const inputs = html.match(inputRegex) || [];
    inputs.forEach((input, index) => {
      if (!input.includes('aria-label') && !input.includes('aria-labelledby')) {
        const idMatch = input.match(/id="([^"]*)"/);
        if (idMatch) {
          const id = idMatch[1];
          const labelRegex = new RegExp(`<label[^>]*for="${id}"[^>]*>`, 'i');
          if (!labelRegex.test(html)) {
            violations.push({
              id: 'label',
              impact: 'serious',
              description: 'Form elements must have labels',
              help: 'Ensure that form elements have labels',
              nodes: [{
                target: [`input:nth-of-type(${index + 1})`],
                html: input
              }]
            });
          }
        }
      }
    });

    // Check for missing lang attribute
    if (!html.includes('lang=') && !html.includes('xml:lang=')) {
      violations.push({
        id: 'html-has-lang',
        impact: 'serious',
        description: 'HTML element must have a lang attribute',
        help: 'Ensure the HTML element has a lang attribute',
        nodes: [{
          target: ['html'],
          html: '<html>'
        }]
      });
    }

    // Check for missing title
    if (!html.includes('<title>')) {
      violations.push({
        id: 'document-title',
        impact: 'serious',
        description: 'Documents must have a title element',
        help: 'Ensure the document has a title element',
        nodes: [{
          target: ['head'],
          html: '<head>'
        }]
      });
    }

    const results = {
      violations: violations,
      passes: [],
      incomplete: [],
      inapplicable: [],
      testEngine: {
        name: 'simple-accessibility-scanner',
        version: '1.0.0'
      },
      testRunner: {
        name: 'simple-scanner'
      },
      testEnvironment: {
        userAgent: 'Mozilla/5.0 (compatible; AccessibilityScanner/1.0)',
        windowWidth: 1280,
        windowHeight: 720
      }
    };

    console.log("Simple scan successful");
    return res.status(200).json(results);
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
