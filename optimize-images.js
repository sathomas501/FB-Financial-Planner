#!/usr/bin/env node

/**
 * Image Optimization Script for Fatboy Financial Planner
 *
 * This script:
 * 1. Compresses PNG images
 * 2. Generates WebP versions
 * 3. Creates responsive sizes (400w, 800w, 1200w)
 * 4. Optimizes the logo separately
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'assets', 'images');
const OPTIMIZED_DIR = path.join(IMAGES_DIR, 'optimized');

// Configuration
const SCREENSHOT_WIDTHS = [400, 800, 1200]; // Responsive sizes
const LOGO_MAX_WIDTH = 320; // 2x for retina displays (160px display size)
const QUALITY = {
  png: 85,
  webp: 85,
  logo: 90 // Higher quality for logo
};

// Files to process
const SCREENSHOTS = [
  'summary_report.png',
  'plan_summary.png',
  'MC_dashboard.png',
  'assets_over_time.png',
  'projection_center.png',
  'landing_page.png',
  'plan_wizard.png',
  'goal_solver.png',
  'sankey_cashflow.png',
  'assets_accounts.png',
  'debt_entry.png',
  'allocations.png',
  'allocation_analyzer.png',
  'gas_guage_chart.png'
];

const LOGO = 'Fatboy Software Logo.png';

/**
 * Ensure output directory exists
 */
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

/**
 * Get file size in KB
 */
async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Optimize logo (single size, high quality)
 */
async function optimizeLogo() {
  console.log('\n📸 Optimizing Logo...');
  const inputPath = path.join(IMAGES_DIR, LOGO);
  const outputName = LOGO.replace(/\s/g, '_'); // Remove spaces

  try {
    const originalSize = await getFileSize(inputPath);

    // PNG version
    const pngOutput = path.join(OPTIMIZED_DIR, outputName);
    await sharp(inputPath)
      .resize(LOGO_MAX_WIDTH, null, { withoutEnlargement: true })
      .png({ quality: QUALITY.logo, compressionLevel: 9 })
      .toFile(pngOutput);

    const pngSize = await getFileSize(pngOutput);

    // WebP version
    const webpOutput = path.join(OPTIMIZED_DIR, outputName.replace('.png', '.webp'));
    await sharp(inputPath)
      .resize(LOGO_MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY.logo })
      .toFile(webpOutput);

    const webpSize = await getFileSize(webpOutput);

    console.log(`  ✓ ${LOGO}`);
    console.log(`    Original: ${originalSize}KB → PNG: ${pngSize}KB (-${((1 - pngSize/originalSize) * 100).toFixed(1)}%) | WebP: ${webpSize}KB (-${((1 - webpSize/originalSize) * 100).toFixed(1)}%)`);

    return { original: outputName, webp: outputName.replace('.png', '.webp') };
  } catch (error) {
    console.error(`  ✗ Error optimizing logo: ${error.message}`);
    return null;
  }
}

/**
 * Optimize screenshot with multiple sizes
 */
async function optimizeScreenshot(filename) {
  const inputPath = path.join(IMAGES_DIR, filename);
  const baseName = path.basename(filename, '.png');

  try {
    const originalSize = await getFileSize(inputPath);
    const results = {
      filename,
      original: originalSize,
      sizes: []
    };

    for (const width of SCREENSHOT_WIDTHS) {
      // PNG version
      const pngOutput = path.join(OPTIMIZED_DIR, `${baseName}-${width}w.png`);
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .png({ quality: QUALITY.png, compressionLevel: 9 })
        .toFile(pngOutput);

      const pngSize = await getFileSize(pngOutput);

      // WebP version
      const webpOutput = path.join(OPTIMIZED_DIR, `${baseName}-${width}w.webp`);
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY.webp })
        .toFile(webpOutput);

      const webpSize = await getFileSize(webpOutput);

      results.sizes.push({
        width,
        png: { filename: `${baseName}-${width}w.png`, size: pngSize },
        webp: { filename: `${baseName}-${width}w.webp`, size: webpSize }
      });
    }

    console.log(`  ✓ ${filename} (${originalSize}KB)`);
    results.sizes.forEach(size => {
      console.log(`    ${size.width}w: PNG ${size.png.size}KB | WebP ${size.webp.size}KB`);
    });

    return results;
  } catch (error) {
    console.error(`  ✗ Error optimizing ${filename}: ${error.message}`);
    return null;
  }
}

/**
 * Generate HTML snippets for responsive images
 */
function generateHtmlSnippets(screenshots, logo) {
  const snippets = [];

  // Logo snippet
  if (logo) {
    snippets.push(`
<!-- Logo (optimized) -->
<picture>
  <source srcset="/assets/images/optimized/${logo.webp}" type="image/webp">
  <img src="/assets/images/optimized/${logo.original}"
       alt="Fatboy Software Logo"
       loading="eager"
       style="max-width: 160px; height: auto;">
</picture>
`);
  }

  // Screenshot snippets
  screenshots.forEach(result => {
    if (!result) return;

    const baseName = path.basename(result.filename, '.png');
    const altText = baseName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const webpSrcset = result.sizes.map(s =>
      `/assets/images/optimized/${s.webp.filename} ${s.width}w`
    ).join(', ');

    const pngSrcset = result.sizes.map(s =>
      `/assets/images/optimized/${s.png.filename} ${s.width}w`
    ).join(', ');

    snippets.push(`
<!-- ${result.filename} -->
<picture>
  <source srcset="${webpSrcset}"
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 80vw, 1200px"
          type="image/webp">
  <source srcset="${pngSrcset}"
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 80vw, 1200px"
          type="image/png">
  <img src="/assets/images/optimized/${result.sizes[1].png.filename}"
       alt="${altText}"
       loading="lazy"
       style="max-width: 100%; height: auto;">
</picture>
`);
  });

  return snippets.join('\n');
}

/**
 * Main optimization function
 */
async function main() {
  console.log('🚀 Starting Image Optimization...\n');
  console.log(`Input directory: ${IMAGES_DIR}`);
  console.log(`Output directory: ${OPTIMIZED_DIR}\n`);

  // Ensure output directory exists
  await ensureDir(OPTIMIZED_DIR);

  // Optimize logo
  const logoResult = await optimizeLogo();

  // Optimize screenshots
  console.log('\n📸 Optimizing Screenshots...');
  const screenshotResults = [];
  for (const screenshot of SCREENSHOTS) {
    const result = await optimizeScreenshot(screenshot);
    if (result) screenshotResults.push(result);
  }

  // Calculate total savings
  const totalOriginal = screenshotResults.reduce((sum, r) => sum + parseFloat(r.original), 0);
  const totalOptimized = screenshotResults.reduce((sum, r) =>
    sum + r.sizes.reduce((s, size) => s + parseFloat(size.webp.size), 0) / r.sizes.length, 0
  );
  const savings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

  console.log('\n✅ Optimization Complete!');
  console.log(`\nTotal savings: ${totalOriginal.toFixed(2)}KB → ${totalOptimized.toFixed(2)}KB (${savings}% reduction)`);

  // Generate HTML snippets
  const htmlSnippets = generateHtmlSnippets(screenshotResults, logoResult);
  const snippetsPath = path.join(__dirname, 'IMAGE_SNIPPETS.html');
  await fs.writeFile(snippetsPath, htmlSnippets);

  console.log(`\n📝 HTML snippets saved to: IMAGE_SNIPPETS.html`);
  console.log('\nNext steps:');
  console.log('1. Review optimized images in assets/images/optimized/');
  console.log('2. Check IMAGE_SNIPPETS.html for responsive image code');
  console.log('3. Update your markdown files with the new image references');
  console.log('4. Test on mobile devices');
}

// Run the script
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
