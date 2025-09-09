#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');

async function verifySetup() {
  console.log('🔍 Verifying accessibility-saas setup...\n');

  try {
    // Check if Playwright browsers are installed
    console.log('1. Checking Playwright browser installation...');
    const browser = await chromium.launch({ headless: true });
    console.log('   ✅ Chromium browser is available');
    await browser.close();

    // Test a simple scan
    console.log('2. Testing accessibility scan...');
    const browser2 = await chromium.launch({ headless: true });
    const context = await browser2.newContext();
    const page = await context.newPage();
    
    // Test with a simple HTML page
    await page.setContent(`
      <html>
        <head><title>Test Page</title></head>
        <body>
          <h1>Test Heading</h1>
          <p>This is a test paragraph.</p>
          <button>Test Button</button>
        </body>
      </html>
    `);

    // Import AxeBuilder dynamically
    const { AxeBuilder } = await import('@axe-core/playwright');
    const results = await new AxeBuilder({ page }).analyze();
    
    console.log(`   ✅ Accessibility scan completed successfully`);
    console.log(`   📊 Found ${results.violations.length} violations in test page`);
    
    await browser2.close();

    console.log('\n🎉 Setup verification completed successfully!');
    console.log('   Your accessibility-saas is ready to use.');
    console.log('   Run "npm run dev" to start the development server.');

  } catch (error) {
    console.error('\n❌ Setup verification failed:');
    console.error(`   Error: ${error.message}`);
    
    if (error.message.includes('browser') || error.message.includes('chromium')) {
      console.error('\n💡 Solution:');
      console.error('   Run: npm run setup');
      console.error('   This will install the required Playwright browsers.');
    } else {
      console.error('\n💡 Solution:');
      console.error('   Make sure all dependencies are installed:');
      console.error('   npm install && npm run setup');
    }
    
    process.exit(1);
  }
}

verifySetup();
