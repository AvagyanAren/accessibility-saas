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

// Helper function to perform UX audit
const performUXAudit = (html, url) => {
  const uxIssues = [];
  
  // Check for viewport meta tag (mobile responsiveness)
  if (!html.includes('viewport')) {
    uxIssues.push({
      id: 'viewport-meta',
      category: 'mobile',
      severity: 'high',
      title: 'Missing Viewport Meta Tag',
      description: 'The page lacks a viewport meta tag, which may cause poor mobile user experience.',
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the head section.',
      impact: 'Users on mobile devices may experience zoomed-out or improperly scaled content.'
    });
  }

  // Check for navigation clarity
  const navCount = (html.match(/<nav[^>]*>/gi) || []).length;
  const headerCount = (html.match(/<header[^>]*>/gi) || []).length;
  if (navCount === 0 && headerCount === 0) {
    uxIssues.push({
      id: 'navigation-structure',
      category: 'navigation',
      severity: 'medium',
      title: 'Unclear Navigation Structure',
      description: 'No semantic navigation or header elements found. Users may struggle to find their way around.',
      recommendation: 'Use <nav> or <header> elements to clearly define navigation and page structure.',
      impact: 'Users may experience confusion when navigating the site.'
    });
  }

  // Check for call-to-action visibility (buttons/links)
  const buttonCount = (html.match(/<button[^>]*>/gi) || []).length;
  const anchorCount = (html.match(/<a[^>]*href/gi) || []).length;
  if (buttonCount === 0 && anchorCount < 3) {
    uxIssues.push({
      id: 'call-to-action',
      category: 'engagement',
      severity: 'low',
      title: 'Limited Call-to-Action Elements',
      description: 'Few interactive elements (buttons/links) found. Users may have limited engagement options.',
      recommendation: 'Ensure important actions are clearly visible as buttons or prominent links.',
      impact: 'Users may miss important actions or next steps.'
    });
  }

  // Check for form usability
  const formCount = (html.match(/<form[^>]*>/gi) || []).length;
  const inputCount = (html.match(/<input[^>]*>/gi) || []).length;
  if (formCount > 0 && inputCount > 0) {
    const labelCount = (html.match(/<label[^>]*>/gi) || []).length;
    if (labelCount < inputCount * 0.7) {
      uxIssues.push({
        id: 'form-usability',
        category: 'forms',
        severity: 'medium',
        title: 'Forms May Lack Clear Labels',
        description: 'Some form inputs appear to be missing labels, which can confuse users.',
        recommendation: 'Ensure all form inputs have associated <label> elements or aria-labels for clarity.',
        impact: 'Users may struggle to understand what information to enter in form fields.'
      });
    }
  }

  // Check for content hierarchy (headings)
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  if (h1Count === 0) {
    uxIssues.push({
      id: 'content-hierarchy',
      category: 'content',
      severity: 'medium',
      title: 'Missing Main Heading (H1)',
      description: 'No H1 heading found. Clear heading structure helps users understand content hierarchy.',
      recommendation: 'Add a single H1 element that describes the main purpose of the page.',
      impact: 'Users may have difficulty understanding the page structure and main content.'
    });
  } else if (h1Count > 1) {
    uxIssues.push({
      id: 'multiple-h1',
      category: 'content',
      severity: 'low',
      title: 'Multiple H1 Headings Found',
      description: 'Multiple H1 headings can confuse users and search engines about the page structure.',
      recommendation: 'Use a single H1 per page and use H2-H6 for subsections.',
      impact: 'Users may be unclear about the primary focus of the page.'
    });
  }

  // Check for loading performance indicators
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  const largeImgCount = imgTags.filter(img => {
    // Check for inline images (base64) or missing sizing attributes
    return img.includes('data:image') || (!img.includes('width=') && !img.includes('height='));
  }).length;
  
  if (largeImgCount > 0 && imgTags.length > 0) {
    const percentage = (largeImgCount / imgTags.length) * 100;
    if (percentage > 50) {
      uxIssues.push({
        id: 'image-optimization',
        category: 'performance',
        severity: 'medium',
        title: 'Images May Need Optimization',
        description: `Many images (${Math.round(percentage)}%) may lack proper sizing or optimization, potentially affecting page load speed.`,
        recommendation: 'Use responsive images with width/height attributes and consider lazy loading for better performance.',
        impact: 'Slow loading images can frustrate users and increase bounce rates.'
      });
    }
  }

  // Check for meta description (SEO/UX)
  if (!html.includes('meta name="description"') && !html.includes('meta property="og:description"')) {
    uxIssues.push({
      id: 'meta-description',
      category: 'discoverability',
      severity: 'low',
      title: 'Missing Meta Description',
      description: 'No meta description tag found. This affects how the page appears in search results.',
      recommendation: 'Add a meta description tag that summarizes the page content (150-160 characters).',
      impact: 'The page may have poor representation in search results, affecting user expectations.'
    });
  }

  return uxIssues;
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
    
    // Perform UX audit
    const uxIssues = performUXAudit(html, url);

    const results = {
      violations: violations,
      uxAudit: {
        issues: uxIssues,
        scannedUrl: url
      },
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
          const uxIssues = performUXAudit(html, url);
          
          const results = {
            violations: violations,
            uxAudit: {
              issues: uxIssues,
              scannedUrl: url
            },
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
    
    // Get HTML for UX audit
    const html = await page.content();
    const uxIssues = performUXAudit(html, url);
    
    // Add UX audit to results
    results.uxAudit = {
      issues: uxIssues,
      scannedUrl: url
    };
    
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

    // Try to get HTML from a simple fetch for UX audit
    let uxIssues = [];
    try {
      const simpleResponse = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AccessibilityScanner/1.0)'
        },
        timeout: 5000
      });
      if (simpleResponse.ok) {
        const html = await simpleResponse.text();
        uxIssues = performUXAudit(html, url);
      }
    } catch (e) {
      // If we can't get HTML, just continue without UX audit
      console.log("Could not perform UX audit:", e.message);
    }

    const results = {
      violations: basicViolations,
      uxAudit: {
        issues: uxIssues,
        scannedUrl: url
      },
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
