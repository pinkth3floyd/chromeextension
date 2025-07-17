#!/usr/bin/env node

/**
 * Build script for Nepali Calendar Extension
 * Creates packages for Chrome and Firefox
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Configuration
const config = {
  name: 'nepali-calendar',
  version: '1.0.0',
  browsers: ['chrome', 'firefox']
};

// Files to include in the package
const filesToInclude = [
  'manifest.json',
  'manifest-firefox.json',
  'popup.html',
  'welcome.html',
  'content.js',
  'background.js',
  'README.md',
  'scripts/',
  'styles/',
  'icons/'
];

// Files to exclude
const filesToExclude = [
  'node_modules/',
  '.git/',
  'build/',
  '*.zip',
  '*.crx',
  '*.xpi'
];

function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  createDirectory(destDir);
  fs.copyFileSync(src, dest);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

function shouldIncludeFile(filePath) {
  const relativePath = path.relative('.', filePath);
  
  // Check if file should be excluded
  for (const excludePattern of filesToExclude) {
    if (relativePath.includes(excludePattern.replace('*', ''))) {
      return false;
    }
  }
  
  // Check if file should be included
  for (const includePattern of filesToInclude) {
    if (relativePath.startsWith(includePattern) || relativePath === includePattern) {
      return true;
    }
  }
  
  // Include all files in scripts, styles, and icons directories
  if (relativePath.startsWith('scripts/') || 
      relativePath.startsWith('styles/') || 
      relativePath.startsWith('icons/')) {
    return true;
  }
  
  return false;
}

function createPackage(browser) {
  const packageDir = `build/${browser}`;
  const packageName = `${config.name}-${browser}-v${config.version}`;
  
  console.log(`Creating ${browser} package...`);
  
  // Clean and create package directory
  if (fs.existsSync(packageDir)) {
    fs.rmSync(packageDir, { recursive: true });
  }
  createDirectory(packageDir);
  
  // Copy files
  const items = fs.readdirSync('.');
  
  for (const item of items) {
    const itemPath = path.join('.', item);
    
    if (shouldIncludeFile(itemPath)) {
      if (fs.statSync(itemPath).isDirectory()) {
        copyDirectory(itemPath, path.join(packageDir, item));
      } else {
        copyFile(itemPath, path.join(packageDir, item));
      }
    }
  }
  
  // Use appropriate manifest file
  if (browser === 'firefox') {
    copyFile('manifest-firefox.json', path.join(packageDir, 'manifest.json'));
    fs.unlinkSync(path.join(packageDir, 'manifest-firefox.json'));
  } else {
    fs.unlinkSync(path.join(packageDir, 'manifest-firefox.json'));
  }
  
  // Create zip file
  const output = fs.createWriteStream(`${packageName}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });
  
  output.on('close', () => {
    console.log(`✅ ${browser} package created: ${packageName}.zip`);
    console.log(`   Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  });
  
  archive.on('error', (err) => {
    throw err;
  });
  
  archive.pipe(output);
  archive.directory(packageDir, false);
  archive.finalize();
}

function main() {
  console.log('🚀 Building Nepali Calendar Extension...\n');
  
  // Create build directory
  createDirectory('build');
  
  // Build for each browser
  for (const browser of config.browsers) {
    createPackage(browser);
  }
  
  console.log('\n🎉 Build completed successfully!');
  console.log('\nInstallation instructions:');
  console.log('Chrome:');
  console.log('  1. Open chrome://extensions/');
  console.log('  2. Enable "Developer mode"');
  console.log('  3. Click "Load unpacked" and select the chrome build folder');
  console.log('\nFirefox:');
  console.log('  1. Open about:debugging#/runtime/this-firefox');
  console.log('  2. Click "Load Temporary Add-on"');
  console.log('  3. Select the manifest.json file from the firefox build folder');
}

// Check if archiver is available
try {
  require.resolve('archiver');
  main();
} catch (error) {
  console.error('❌ Error: archiver package not found');
  console.log('Please install it with: npm install archiver');
  process.exit(1);
} 