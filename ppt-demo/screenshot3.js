const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('file:///Users/maming/.openclaw/workspace-main/ppt-demo/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Verify we're on slide 1
  const t1 = await page.$eval('#deck', el => {
    const slides = el.querySelectorAll('.slide');
    return slides[0].querySelector('.h-hero, .kicker')?.textContent?.substring(0, 40);
  });
  console.log('Slide 1:', t1);

  const pages = [
    { slide: 0, name: '01-cover.png', desc: 'cover' },
    { slide: 1, name: '02-data.png', desc: 'data' },
    { slide: 2, name: '03-agent.png', desc: 'agent' },
    { slide: 3, name: '04-pipeline.png', desc: 'pipeline' },
    { slide: 4, name: '05-act2.png', desc: 'act2' },
    { slide: 5, name: '06-compare.png', desc: 'compare' },
    { slide: 6, name: '07-quote.png', desc: 'quote' },
    { slide: 7, name: '08-advantages.png', desc: 'adv' },
    { slide: 8, name: '09-question.png', desc: 'question' },
    { slide: 9, name: '10-end.png', desc: 'end' },
  ];

  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    // Check current slide content
    const idx = await page.evaluate(() => {
      return document.querySelector('#deck')?.style?.transform;
    });
    console.log(`Slide ${i+1} transform:`, idx);
    
    await page.screenshot({ path: p.name, fullPage: false });
    console.log('Saved:', p.name);

    // Go to next slide using page.keyboard
    if (i < pages.length - 1) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1200);
    }
  }

  await browser.close();
})();
