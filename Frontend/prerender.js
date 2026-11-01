import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateSSG() {
  console.log('⚡ Starting SparkLens Static Site Generation (SSG)...');

  const distDir = path.resolve(__dirname, 'dist');
  const templatePath = path.resolve(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run client build first!');
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Import the SSR-compiled bundle
  const serverBundlePath = path.resolve(distDir, 'server/entry-server.js');
  const { render } = await import(`file://${serverBundlePath.replace(/\\/g, '/')}`);

  // Routes to statically generate
  const routes = ['/', '/welcome'];

  for (const route of routes) {
    const { html: appHtml } = render(route);

    // Inject prerendered markup into root container
    const finalHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    const targetDir = route === '/' 
      ? distDir 
      : path.resolve(distDir, route.replace(/^\//, ''));

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const outputPath = path.resolve(targetDir, 'index.html');
    fs.writeFileSync(outputPath, finalHtml, 'utf-8');
    console.log(`✓ Statically prerendered: ${route} -> ${path.relative(distDir, outputPath)}`);
  }

  // Clean up server build directory to keep dist minimal
  const serverDir = path.resolve(distDir, 'server');
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true });
  }

  console.log('🎉 SSG build complete: Fast initial paint and SEO-ready HTML generated in dist/!\n');
}

generateSSG().catch((err) => {
  console.error('SSG generation failed:', err);
  process.exit(1);
});

