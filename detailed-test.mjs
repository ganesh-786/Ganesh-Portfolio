import { chromium } from 'playwright';

async function detailedTest() {
  process.env.PLAYWRIGHT_BROWSERS_PATH = '0';
  const browser = await chromium.launch({ headless: true });
  
  console.log('🔍 DETAILED PORTFOLIO TESTING\n');
  console.log('═'.repeat(70));
  
  // ============================================
  // TEST 1: iPhone SE Badge Position Check
  // ============================================
  console.log('\n📱 TEST 1: iPhone SE (375x667) - Badge Position Analysis');
  console.log('─'.repeat(70));
  
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();
  
  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  console.log('Waiting 3 seconds for animations...');
  await page.waitForTimeout(3000);
  
  await page.screenshot({ 
    path: 'public/test-screenshots/detailed-1-iphone-se-initial.png',
    fullPage: false 
  });
  console.log('✓ Screenshot saved: detailed-1-iphone-se-initial.png\n');
  
  // Analyze navbar and badge positions
  console.log('ANALYZING NAVBAR AND BADGE POSITIONS:');
  console.log('─'.repeat(70));
  
  const measurements = await page.evaluate(() => {
    // Find navbar
    const nav = document.querySelector('nav, header, [class*="nav"], [class*="header"]');
    const navBox = nav ? nav.getBoundingClientRect() : null;
    
    // Find badge - try multiple selectors
    const badge = document.querySelector(
      '[class*="badge"], [class*="status"], :text("Available"), :text("Open to"), :text("opportunities")'
    );
    const badgeBox = badge ? badge.getBoundingClientRect() : null;
    
    // Find logo
    const logo = document.querySelector('[class*="logo"], a[href="/"], a[href="#"]');
    const logoBox = logo ? logo.getBoundingClientRect() : null;
    
    return {
      navbar: navBox ? {
        top: navBox.top,
        bottom: navBox.bottom,
        height: navBox.height,
        left: navBox.left,
        right: navBox.right
      } : null,
      badge: badgeBox ? {
        top: badgeBox.top,
        bottom: badgeBox.bottom,
        height: badgeBox.height,
        left: badgeBox.left,
        right: badgeBox.right,
        width: badgeBox.width
      } : null,
      logo: logoBox ? {
        top: logoBox.top,
        bottom: logoBox.bottom,
        left: logoBox.left,
        right: logoBox.right
      } : null,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    };
  });
  
  console.log('VIEWPORT:');
  console.log(`  Width: ${measurements.viewportWidth}px`);
  console.log(`  Height: ${measurements.viewportHeight}px\n`);
  
  if (measurements.navbar) {
    console.log('NAVBAR MEASUREMENTS:');
    console.log(`  Top: ${measurements.navbar.top}px`);
    console.log(`  Bottom: ${measurements.navbar.bottom}px`);
    console.log(`  Height: ${measurements.navbar.height}px`);
    console.log(`  Left: ${measurements.navbar.left}px`);
    console.log(`  Right: ${measurements.navbar.right}px\n`);
  } else {
    console.log('⚠️  WARNING: Navbar not found!\n');
  }
  
  if (measurements.logo) {
    console.log('LOGO MEASUREMENTS:');
    console.log(`  Top: ${measurements.logo.top}px`);
    console.log(`  Bottom: ${measurements.logo.bottom}px`);
    console.log(`  Left: ${measurements.logo.left}px`);
    console.log(`  Right: ${measurements.logo.right}px\n`);
  }
  
  if (measurements.badge) {
    console.log('BADGE MEASUREMENTS:');
    console.log(`  Top: ${measurements.badge.top}px`);
    console.log(`  Bottom: ${measurements.badge.bottom}px`);
    console.log(`  Height: ${measurements.badge.height}px`);
    console.log(`  Left: ${measurements.badge.left}px`);
    console.log(`  Right: ${measurements.badge.right}px`);
    console.log(`  Width: ${measurements.badge.width}px\n`);
    
    console.log('POSITION ANALYSIS:');
    console.log('─'.repeat(70));
    
    if (measurements.navbar) {
      const gapBetween = measurements.badge.top - measurements.navbar.bottom;
      const badgeBelowNavbar = measurements.badge.top >= measurements.navbar.bottom;
      const badgeInsideNavbar = measurements.badge.top < measurements.navbar.bottom;
      
      console.log(`  Gap between navbar bottom and badge top: ${gapBetween.toFixed(1)}px`);
      
      if (badgeBelowNavbar && gapBetween >= 10) {
        console.log(`  ✅ PASS: Badge is CLEARLY BELOW navbar (${gapBetween.toFixed(1)}px gap)`);
      } else if (badgeBelowNavbar && gapBetween >= 0) {
        console.log(`  ⚠️  MARGINAL: Badge is below navbar but gap is small (${gapBetween.toFixed(1)}px)`);
      } else if (badgeInsideNavbar) {
        console.log(`  ❌ FAIL: Badge OVERLAPS navbar (${Math.abs(gapBetween).toFixed(1)}px overlap)`);
      }
      
      // Check horizontal overlap with logo
      if (measurements.logo) {
        const horizontalOverlap = !(
          measurements.badge.right < measurements.logo.left ||
          measurements.badge.left > measurements.logo.right
        );
        
        if (horizontalOverlap) {
          console.log(`  ⚠️  Badge and logo overlap horizontally`);
        } else {
          console.log(`  ✓ Badge and logo do not overlap horizontally`);
        }
      }
    }
  } else {
    console.log('⚠️  WARNING: Badge not found on page!\n');
  }
  
  console.log('');
  
  // ============================================
  // TEST 2: Hamburger Menu Navigation
  // ============================================
  console.log('\n🍔 TEST 2: Hamburger Menu Navigation Test');
  console.log('─'.repeat(70));
  
  // Find and click hamburger
  const hamburger = await page.locator('button[aria-label*="menu" i], [class*="hamburger"], [class*="menu-toggle"], button:has-text("☰")').first();
  
  if (await hamburger.count() > 0) {
    console.log('✓ Hamburger menu button found');
    
    await hamburger.click();
    console.log('✓ Clicked hamburger menu');
    
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'public/test-screenshots/detailed-2-menu-open.png',
      fullPage: false 
    });
    console.log('✓ Screenshot saved: detailed-2-menu-open.png\n');
    
    // Check if menu is visible
    const menuVisible = await page.evaluate(() => {
      const menuItems = Array.from(document.querySelectorAll('a:has-text("Projects"), a:has-text("About"), a:has-text("Skills")'));
      return menuItems.some(item => {
        const rect = item.getBoundingClientRect();
        const style = window.getComputedStyle(item);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      });
    });
    
    if (menuVisible) {
      console.log('✅ Menu is OPEN and visible\n');
    } else {
      console.log('❌ Menu items not visible\n');
    }
    
    // Click Projects link
    const projectsLink = await page.locator('a:has-text("Projects")').first();
    
    if (await projectsLink.count() > 0) {
      const isVisible = await projectsLink.isVisible();
      console.log(`Projects link visible: ${isVisible}`);
      
      if (isVisible) {
        console.log('✓ Clicking "Projects" link...');
        await projectsLink.click();
        
        console.log('Waiting 2 seconds for scroll animation...');
        await page.waitForTimeout(2000);
        
        await page.screenshot({ 
          path: 'public/test-screenshots/detailed-3-after-projects-click.png',
          fullPage: false 
        });
        console.log('✓ Screenshot saved: detailed-3-after-projects-click.png\n');
        
        // Check if we scrolled to projects section
        const scrollCheck = await page.evaluate(() => {
          const projectsSection = document.querySelector('#projects, [id*="project"], section:has-text("Projects")');
          if (!projectsSection) return { found: false };
          
          const rect = projectsSection.getBoundingClientRect();
          const isInView = rect.top >= 0 && rect.top <= window.innerHeight;
          
          return {
            found: true,
            inView: isInView,
            topPosition: rect.top,
            scrollY: window.scrollY
          };
        });
        
        if (scrollCheck.found) {
          if (scrollCheck.inView) {
            console.log(`✅ PASS: Successfully scrolled to Projects section`);
            console.log(`  Projects section top: ${scrollCheck.topPosition.toFixed(1)}px from viewport top`);
            console.log(`  Current scroll position: ${scrollCheck.scrollY.toFixed(0)}px`);
          } else {
            console.log(`⚠️  Projects section found but not in viewport`);
            console.log(`  Section top: ${scrollCheck.topPosition.toFixed(1)}px`);
          }
        } else {
          console.log(`⚠️  Could not find Projects section`);
        }
      } else {
        console.log('❌ Projects link not visible in menu');
      }
    } else {
      console.log('❌ Projects link not found');
    }
  } else {
    console.log('❌ FAIL: Hamburger menu button not found');
  }
  
  console.log('');
  
  // ============================================
  // TEST 3: Full Page Scroll Check
  // ============================================
  console.log('\n📜 TEST 3: Full Page Scroll Through All Sections (375x667)');
  console.log('─'.repeat(70));
  
  // Scroll to top first
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  
  console.log('Starting from top of page...\n');
  
  // Get page height
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = 667;
  
  console.log(`Total page height: ${pageHeight}px`);
  console.log(`Viewport height: ${viewportHeight}px\n`);
  
  const sections = [
    { name: 'Hero', selector: 'section, [class*="hero"], main > div:first-child' },
    { name: 'About', selector: '#about, [id*="about"], section:has-text("About")' },
    { name: 'Skills', selector: '#skills, [id*="skill"], section:has-text("Skills")' },
    { name: 'Projects', selector: '#projects, [id*="project"], section:has-text("Projects")' },
    { name: 'Contact', selector: '#contact, [id*="contact"], section:has-text("Contact")' }
  ];
  
  let issuesFound = [];
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    console.log(`Checking ${section.name} section...`);
    
    const sectionEl = await page.locator(section.selector).first();
    
    if (await sectionEl.count() > 0) {
      await sectionEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      
      await page.screenshot({ 
        path: `public/test-screenshots/detailed-4-scroll-${section.name.toLowerCase()}.png`,
        fullPage: false 
      });
      
      // Check for layout issues
      const issues = await page.evaluate((sectionName) => {
        const problems = [];
        
        // Check for horizontal overflow
        const body = document.body;
        const html = document.documentElement;
        const bodyWidth = Math.max(body.scrollWidth, body.offsetWidth);
        const htmlWidth = Math.max(html.scrollWidth, html.offsetWidth);
        
        if (bodyWidth > 375 || htmlWidth > 375) {
          problems.push(`Horizontal overflow detected (body: ${bodyWidth}px, html: ${htmlWidth}px)`);
        }
        
        // Check for overlapping elements in viewport
        const elements = Array.from(document.querySelectorAll('*'));
        const viewportElements = elements.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
        
        // Check for text cutoff
        const textElements = viewportElements.filter(el => 
          el.textContent.trim().length > 0 && 
          window.getComputedStyle(el).display !== 'none'
        );
        
        for (const el of textElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > window.innerWidth + 5) {
            problems.push(`Text element extends beyond viewport: ${el.tagName} (${rect.right.toFixed(0)}px)`);
            break; // Only report first instance
          }
        }
        
        return problems;
      }, section.name);
      
      if (issues.length > 0) {
        console.log(`  ⚠️  Issues found in ${section.name}:`);
        issues.forEach(issue => console.log(`    - ${issue}`));
        issuesFound.push(...issues.map(i => `${section.name}: ${i}`));
      } else {
        console.log(`  ✅ ${section.name} section looks good`);
      }
    } else {
      console.log(`  ⚠️  ${section.name} section not found`);
    }
  }
  
  console.log('\n' + '─'.repeat(70));
  console.log('SCROLL TEST SUMMARY:');
  
  if (issuesFound.length === 0) {
    console.log('✅ NO LAYOUT ISSUES FOUND - All sections display correctly!');
  } else {
    console.log(`⚠️  Found ${issuesFound.length} issue(s):`);
    issuesFound.forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
  }
  
  await context.close();
  await browser.close();
  
  console.log('\n' + '═'.repeat(70));
  console.log('✅ DETAILED TESTING COMPLETE');
  console.log('📁 All screenshots saved to: public/test-screenshots/');
  console.log('═'.repeat(70));
}

detailedTest().catch(console.error);
