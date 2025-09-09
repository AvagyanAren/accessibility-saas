// pages/api/scan-fallback.js - Fallback using Puppeteer
import puppeteer from 'puppeteer-core';

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

  let browser;
  try {
    // Try to use Puppeteer with Chrome
    browser = await puppeteer.launch({
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

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.setUserAgent('Mozilla/5.0 (compatible; AccessibilityScanner/1.0)');

    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });

    // Wait for page to be ready
    await page.waitForLoadState?.('networkidle', { timeout: 10000 });

    // Basic accessibility check using Puppeteer
    const accessibilityResults = await page.evaluate(() => {
      const issues = [];
      
      // Check for missing alt text
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
      imagesWithoutAlt.forEach((img, index) => {
        issues.push({
          id: 'image-alt',
          impact: 'serious',
          description: 'Images must have alternate text',
          help: 'Ensure that image elements have alternate text',
          nodes: [{
            target: [`img:nth-of-type(${index + 1})`],
            html: img.outerHTML
          }]
        });
      });

      // Check for missing form labels
      const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      inputsWithoutLabels.forEach((input, index) => {
        const hasLabel = document.querySelector(`label[for="${input.id}"]`);
        if (!hasLabel) {
          issues.push({
            id: 'label',
            impact: 'serious',
            description: 'Form elements must have labels',
            help: 'Ensure that form elements have labels',
            nodes: [{
              target: [`input:nth-of-type(${index + 1})`],
              html: input.outerHTML
            }]
          });
        }
      });

      // Check for color contrast (basic check)
      const elements = document.querySelectorAll('*');
      elements.forEach((el, index) => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const backgroundColor = style.backgroundColor;
        
        if (color && backgroundColor && 
            color !== 'rgba(0, 0, 0, 0)' && 
            backgroundColor !== 'rgba(0, 0, 0, 0)') {
          // Basic contrast check - this is simplified
          const textColor = color.match(/\d+/g);
          const bgColor = backgroundColor.match(/\d+/g);
          
          if (textColor && bgColor && textColor.length >= 3 && bgColor.length >= 3) {
            const textR = parseInt(textColor[0]);
            const textG = parseInt(textColor[1]);
            const textB = parseInt(textColor[2]);
            const bgR = parseInt(bgColor[0]);
            const bgG = parseInt(bgColor[1]);
            const bgB = parseInt(bgColor[2]);
            
            const contrast = Math.abs(textR - bgR) + Math.abs(textG - bgG) + Math.abs(textB - bgB);
            
            if (contrast < 150) { // Basic threshold
              issues.push({
                id: 'color-contrast',
                impact: 'serious',
                description: 'Elements must have sufficient color contrast',
                help: 'Ensure all text elements have sufficient color contrast',
                nodes: [{
                  target: [`*:nth-of-type(${index + 1})`],
                  html: el.outerHTML
                }]
              });
            }
          }
        }
      });

      return {
        violations: issues,
        passes: [],
        incomplete: [],
        inapplicable: []
      };
    });

    res.status(200).json(accessibilityResults);
  } catch (err) {
    console.error("Fallback scan error:", err);
    res.status(500).json({ 
      error: "Failed to scan website using fallback method. Please try again later." 
    });
  } finally {
    if (browser) await browser.close();
  }
}
