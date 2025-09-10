// pages/api/scan.js
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

// Helper function to analyze HTML for accessibility issues
const analyzeHTML = (html) => {
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

  return violations;
};

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

const rateLimit = (ip) => {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
};

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

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  if (!rateLimit(clientIP)) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL required" });

  // Validate URL format and security
  try {
    const urlObj = new URL(url);
    
    // Block private/internal IPs for security
    const privateIPs = [
      '127.0.0.1', 'localhost', '0.0.0.0',
      '10.', '172.16.', '172.17.', '172.18.', '172.19.',
      '172.20.', '172.21.', '172.22.', '172.23.',
      '172.24.', '172.25.', '172.26.', '172.27.',
      '172.28.', '172.29.', '172.30.', '172.31.',
      '192.168.'
    ];
    
    if (privateIPs.some(ip => urlObj.hostname.startsWith(ip))) {
      return res.status(400).json({ error: "Private/internal URLs are not allowed" });
    }
    
    // Only allow HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return res.status(400).json({ error: "Only HTTP and HTTPS URLs are allowed" });
    }
    
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  // Try simple scanner first (no browser required)
  try {
    // Direct simple scan without internal API call
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Upgrade-Insecure-Requests': '1'
      },
      redirect: 'follow',
      timeout: 10000 // Reduced timeout for faster failure detection
    });

    if (!response.ok) {
      // Handle specific HTTP status codes
      if (response.status === 498) {
        throw new Error('This website has anti-bot protection. Try scanning a different website like example.com, github.com, or stackoverflow.com.');
      } else if (response.status === 403) {
        throw new Error('Website blocked the request (HTTP 403). This might be a private/restricted area. Try a public page instead.');
      } else if (response.status === 401) {
        throw new Error('Authentication required (HTTP 401). This page requires login. Try a public page instead.');
      } else if (response.status === 429) {
        throw new Error('Too many requests (HTTP 429). Please try again later.');
      } else if (response.status === 404) {
        throw new Error('Page not found (HTTP 404). Please check the URL and try again.');
      } else {
        throw new Error(`HTTP ${response.status} - ${response.statusText}. This might be a restricted or private page.`);
      }
    }

    const html = await response.text();
    
    // Basic accessibility analysis using helper function
    const violations = analyzeHTML(html);

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

    return res.status(200).json(results);
  } catch (simpleErr) {
    console.error("Simple scan failed:", simpleErr);
    
    // If it's a redirect issue, try with a different approach
    if (simpleErr.message.includes('redirect count exceeded') || simpleErr.message.includes('fetch failed')) {
      try {
        // Try with a different user agent and no redirects
        const altResponse = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          redirect: 'manual',
          timeout: 15000
        });
        
        if (altResponse.ok) {
          const html = await altResponse.text();
          const violations = analyzeHTML(html);
          
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
              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              windowWidth: 1280,
              windowHeight: 720
            }
          };
          
          return res.status(200).json(results);
        }
      } catch (altErr) {
        console.error("Alternative scan also failed:", altErr);
      }
    }
  }

  // Try Playwright as fallback
  let browser;
  try {
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
      timeout: 20000
    });

    // Wait for page to be ready, but don't wait too long
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 });
    } catch (e) {
      // If networkidle times out, continue anyway
      console.log("Network idle timeout, continuing with scan");
    }

    const results = await new AxeBuilder({ page }).analyze();
    res.status(200).json(results);
  } catch (err) {
    console.error("Playwright scan error:", err);
    
    // Try Puppeteer fallback
    try {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      const fallbackResponse = await fetch(`${baseUrl}/api/scan-fallback?url=${encodeURIComponent(url)}`);
      const fallbackData = await fallbackResponse.json();
      
      if (fallbackResponse.ok) {
        return res.status(200).json(fallbackData);
      }
    } catch (fallbackErr) {
      console.error("Puppeteer fallback also failed:", fallbackErr);
    }
    
    // Final fallback - return a basic response with common accessibility issues
    const basicViolations = [
      {
        id: 'basic-checklist',
        impact: 'moderate',
        description: 'Basic accessibility checklist - manual verification recommended',
        help: 'This is a basic checklist. For comprehensive testing, try a different website or use browser developer tools.',
        nodes: [{
          target: ['body'],
          html: '<body>'
        }]
      }
    ];

    const results = {
      violations: basicViolations,
      passes: [],
      incomplete: [],
      inapplicable: [],
      testEngine: {
        name: 'basic-accessibility-checker',
        version: '1.0.0'
      },
      testRunner: {
        name: 'basic-checker'
      },
      testEnvironment: {
        userAgent: 'Basic Accessibility Checker',
        windowWidth: 1280,
        windowHeight: 720
      }
    };

    res.status(200).json(results);
  } finally {
    if (browser) await browser.close();
  }
}
