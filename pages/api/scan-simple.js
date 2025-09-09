// pages/api/scan-simple.js - Simple accessibility scanner without Playwright
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL required" });

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    // Use a headless browser service or simple HTTP request
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AccessibilityScanner/1.0)'
      },
      timeout: 30000
    });

    if (!response.ok) {
      return res.status(400).json({ 
        error: `Unable to access the website. HTTP ${response.status}` 
      });
    }

    const html = await response.text();
    
    // Basic accessibility analysis using regex and DOM parsing
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

    // Check for missing heading structure
    const headingRegex = /<h([1-6])[^>]*>/gi;
    const headings = html.match(headingRegex) || [];
    let lastLevel = 0;
    headings.forEach((heading, index) => {
      const level = parseInt(heading.charAt(2));
      if (level > lastLevel + 1) {
        violations.push({
          id: 'heading-order',
          impact: 'moderate',
          description: 'Heading levels should not increase by more than one',
          help: 'Ensure heading levels increase by no more than one',
          nodes: [{
            target: [`h${level}:nth-of-type(${index + 1})`],
            html: heading
          }]
        });
      }
      lastLevel = level;
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

    // Check for color contrast issues (basic check)
    const textElements = html.match(/<[^>]*(?:p|span|div|h[1-6]|a|button)[^>]*>/gi) || [];
    textElements.forEach((element, index) => {
      if (element.includes('style=')) {
        const styleMatch = element.match(/style="([^"]*)"/);
        if (styleMatch) {
          const style = styleMatch[1];
          const colorMatch = style.match(/color:\s*([^;]+)/);
          const bgMatch = style.match(/background(?:-color)?:\s*([^;]+)/);
          
          if (colorMatch && bgMatch) {
            // Basic contrast check - this is simplified
            const color = colorMatch[1].trim();
            const bg = bgMatch[1].trim();
            
            // Check for common low-contrast combinations
            const lowContrast = (
              (color.includes('gray') && bg.includes('white')) ||
              (color.includes('light') && bg.includes('white')) ||
              (color.includes('white') && bg.includes('light'))
            );
            
            if (lowContrast) {
              violations.push({
                id: 'color-contrast',
                impact: 'serious',
                description: 'Elements must have sufficient color contrast',
                help: 'Ensure all text elements have sufficient color contrast',
                nodes: [{
                  target: [`*:nth-of-type(${index + 1})`],
                  html: element
                }]
              });
            }
          }
        }
      }
    });

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

    res.status(200).json(results);
  } catch (err) {
    console.error("Simple scan error:", err);
    res.status(500).json({ 
      error: "Failed to scan website. Please try again later." 
    });
  }
}
