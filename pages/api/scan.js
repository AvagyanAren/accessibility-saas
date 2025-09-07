// pages/api/scan.js
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL required" });

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext(); // Must create a context
    const page = await context.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

    // Run Axe inside the page
    const results = await new AxeBuilder({ page }).analyze();

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scan" });
  } finally {
    if (browser) await browser.close();
  }
}
