const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('file:///Users/maming/.openclaw/workspace-main/ppt-demo/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  
  const pages = [
    { slide: 0, name: '01-cover.png' },
    { slide: 1, name: '02-data.png' },
    { slide: 2, name: '03-agent.png' },
    { slide: 3, name: '04-pipeline.png' },
    { slide: 4, name: '05-act2.png' },
    { slide: 5, name: '06-compare.png' },
    { slide: 6, name: '07-quote.png' },
    { slide: 7, name: '08-advantages.png' },
    { slide: 8, name: '09-question.png' },
    { slide: 9, name: '10-end.png' },
  ];
  
  for (const p of pages) {
    if (p.slide > 0) {
      // Click the corresponding dot in the nav
      await page.click(`#nav .dot:nth-child(${p.slide + 1})`);
      await page.waitForTimeout(1000);
    }
    await page.screenshot({ path: p.name, fullPage: false });
    console.log('Saved:', p.name);
  }
  
  await browser.close();
})();
