import { chromium } from 'playwright';

async function simpleTest() {
  process.env.PLAYWRIGHT_BROWSERS_PATH = '0';
  const browser = await chromium.launch({ headless: true });

  console.log('📱 SIMPLE TEST: iPhone SE (375x667)\n');
  console.log('='.repeat(70));
  
  const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await context.newPage();
  
  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  console.log('Waiting 5 seconds for all animations to complete...');
  await page.waitForTimeout(5000);
  
  console.log('Taking screenshot...');
  await page.screenshot({ 
    path: 'public/test-screenshots/final-iphone-se-test.png',
    fullPage: false 
  });
  console.log('✓ Screenshot saved: final-iphone-se-test.png\n');
  
  // Gather detailed information
  const analysis = await page.evaluate(() => {
    // Find navbar
    const nav = document.querySelector('nav, header');
    const navBox = nav ? nav.getBoundingClientRect() : null;
    
    // Find logo
    const logo = nav ? nav.querySelector('a, [class*="logo"]') : null;
    const logoText = logo ? logo.textContent.trim() : null;
    const logoVisible = logo ? (logo.offsetWidth > 0 && logo.offsetHeight > 0) : false;
    
    // Find badge - try multiple approaches
    let badge = null;
    let badgeText = '';
    
    // Try finding by text content
    const allElements = Array.from(document.querySelectorAll('*'));
    for (const el of allElements) {
      const text = el.textContent.trim().toLowerCase();
      if ((text.includes('available') || text.includes('open')) && text.includes('opportunit')) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          badge = rect;
          badgeText = el.textContent.trim();
          break;
        }
      }
    }
    
    // Find name heading
    const nameHeading = document.querySelector('h1, [class*="hero"] h1, [class*="title"]');
    const nameText = nameHeading ? nameHeading.textContent.trim() : null;
    
    // Check for gradient
    let hasGradient = false;
    if (nameHeading) {
      const spans = nameHeading.querySelectorAll('span');
      for (const span of spans) {
        const style = window.getComputedStyle(span);
        if (style.backgroundImage.includes('gradient') || style.background.includes('gradient')) {
          hasGradient = true;
          break;
        }
      }
    }
    
    return {
      navbar: navBox ? {
        top: navBox.top,
        bottom: navBox.bottom,
        height: navBox.height,
        left: navBox.left,
        right: navBox.right,
        width: navBox.width
      } : null,
      logo: {
        text: logoText,
        visible: logoVisible
      },
      badge: badge ? {
        top: badge.top,
        bottom: badge.bottom,
        height: badge.height,
        left: badge.left,
        right: badge.right,
        width: badge.width,
        text: badgeText
      } : null,
      name: {
        text: nameText,
        hasGradient: hasGradient
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  });
  
  console.log('ANALYSIS RESULTS:');
  console.log('='.repeat(70));
  
  // Question 1: Logo visibility
  console.log('\n1. Is the "Ganesh.dev" logo visible in the navbar?');
  if (analysis.logo.visible && analysis.logo.text) {
    console.log(`   ✅ YES - Logo "${analysis.logo.text}" is visible in the navbar`);
  } else {
    console.log(`   ❌ NO - Logo not found or not visible`);
  }
  
  // Question 2: Badge position
  console.log('\n2. Badge position relative to navbar:');
  if (analysis.badge && analysis.navbar) {
    console.log(`   Badge text: "${analysis.badge.text}"`);
    console.log(`   Badge top: ${analysis.badge.top.toFixed(1)}px`);
    console.log(`   Badge bottom: ${analysis.badge.bottom.toFixed(1)}px`);
    console.log(`   Navbar top: ${analysis.navbar.top.toFixed(1)}px`);
    console.log(`   Navbar bottom: ${analysis.navbar.bottom.toFixed(1)}px`);
    
    const gap = analysis.badge.top - analysis.navbar.bottom;
    
    if (analysis.badge.bottom <= analysis.navbar.top) {
      console.log(`   📍 Position: ABOVE the navbar (${Math.abs(gap).toFixed(1)}px above)`);
    } else if (analysis.badge.top >= analysis.navbar.bottom) {
      console.log(`   📍 Position: BELOW the navbar (${gap.toFixed(1)}px gap)`);
    } else {
      console.log(`   📍 Position: INSIDE/OVERLAPPING the navbar`);
      console.log(`   ⚠️  Badge overlaps navbar by ${Math.abs(gap).toFixed(1)}px`);
    }
  } else if (!analysis.badge) {
    console.log(`   ❌ Badge not found on page`);
  } else if (!analysis.navbar) {
    console.log(`   ❌ Navbar not found`);
  }
  
  // Question 3: Visual overlap
  console.log('\n3. Visual overlap between navbar and hero content:');
  if (analysis.navbar && analysis.badge) {
    if (analysis.badge.top < analysis.navbar.bottom) {
      console.log(`   ⚠️  YES - Badge overlaps with navbar area`);
    } else {
      console.log(`   ✅ NO - Clean separation between navbar and hero content`);
    }
  } else {
    console.log(`   ℹ️  Unable to determine (missing elements)`);
  }
  
  // Question 4: Name gradient
  console.log('\n4. Name "Ganesh Chaudhary" display:');
  if (analysis.name.text) {
    console.log(`   Text: "${analysis.name.text}"`);
    if (analysis.name.hasGradient) {
      console.log(`   ✅ YES - Gradient colors detected`);
    } else {
      console.log(`   ⚠️  Gradient not detected (may be on different element)`);
    }
  } else {
    console.log(`   ❌ Name heading not found`);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ TEST COMPLETE');
  console.log('📸 Screenshot: public/test-screenshots/final-iphone-se-test.png');
  console.log('='.repeat(70));
  
  await context.close();
  await browser.close();
}

simpleTest().catch(console.error);
