# Installation Guide

This guide will help you install the Nepali Calendar Extension on both Chrome and Firefox browsers.

## Prerequisites

- Chrome 88+ or Firefox 109+
- Internet connection (for initial setup)

## Chrome Installation

### Method 1: Developer Mode (Recommended for Testing)

1. **Download the Extension**
   - Download the extension files or clone the repository
   - Extract the files to a folder on your computer

2. **Open Chrome Extensions Page**
   - Open Chrome browser
   - Navigate to `chrome://extensions/`
   - Or go to Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner
   - This will show additional options

4. **Load the Extension**
   - Click "Load unpacked" button
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

5. **Pin the Extension**
   - Click the puzzle piece icon in the toolbar
   - Find "Nepali Calendar" and click the pin icon
   - The extension icon will now appear in your toolbar

### Method 2: Chrome Web Store (When Available)

1. **Visit the Chrome Web Store**
   - Go to the Chrome Web Store
   - Search for "Nepali Calendar"
   - Click "Add to Chrome"
   - Confirm the installation

## Firefox Installation

### Method 1: Temporary Add-on (Recommended for Testing)

1. **Download the Extension**
   - Download the extension files or clone the repository
   - Extract the files to a folder on your computer

2. **Open Firefox Debugging Page**
   - Open Firefox browser
   - Navigate to `about:debugging#/runtime/this-firefox`
   - Or go to Menu → More Tools → Web Developer → Connect

3. **Load the Extension**
   - Click "Load Temporary Add-on..."
   - Select the `manifest.json` file from the extension folder
   - The extension should now appear in your add-ons list

4. **Pin the Extension**
   - Click the menu button (hamburger icon)
   - Go to "Add-ons and themes"
   - Find "Nepali Calendar" and click "Pin to Toolbar"

### Method 2: Firefox Add-ons Store (When Available)

1. **Visit Firefox Add-ons**
   - Go to addons.mozilla.org
   - Search for "Nepali Calendar"
   - Click "Add to Firefox"
   - Confirm the installation

## Verification

After installation, you should see:

1. **Extension Icon**: A red "ने" icon in your browser toolbar
2. **Popup**: Clicking the icon opens the Nepali calendar
3. **Floating Button**: A red floating button appears on web pages
4. **Context Menu**: Right-click on dates to convert them

## Troubleshooting

### Chrome Issues

**Extension not loading:**
- Check that all files are present in the folder
- Verify `manifest.json` is in the root folder
- Try reloading the extension in `chrome://extensions/`

**Icon not appearing:**
- Click the puzzle piece icon in the toolbar
- Find "Nepali Calendar" and pin it
- Check if the extension is enabled

**Permissions denied:**
- The extension needs permissions for storage, activeTab, etc.
- These are standard permissions for calendar extensions

### Firefox Issues

**Add-on not loading:**
- Check that `manifest.json` exists and is valid
- Try refreshing the debugging page
- Check Firefox console for errors

**Temporary add-on expired:**
- Firefox temporary add-ons expire when you restart the browser
- Reload the add-on using the debugging page
- For permanent installation, use the Firefox Add-ons store

**Icon not appearing:**
- Go to Menu → Add-ons and themes
- Find "Nepali Calendar" and pin it to toolbar
- Check if the add-on is enabled

## Features to Test

After installation, test these features:

1. **Basic Calendar**
   - Click the extension icon
   - Verify current date is displayed
   - Test month navigation

2. **Date Conversion**
   - Use the floating button on web pages
   - Try keyboard shortcut (Ctrl+Shift+N)
   - Test context menu on selected dates

3. **Settings**
   - Open settings via the gear icon
   - Test language switching
   - Test theme switching

4. **Content Script**
   - Visit any website
   - Look for the floating "ने" button
   - Test date input field hints

## Uninstallation

### Chrome
1. Go to `chrome://extensions/`
2. Find "Nepali Calendar"
3. Click "Remove"
4. Confirm the removal

### Firefox
1. Go to Menu → Add-ons and themes
2. Find "Nepali Calendar"
3. Click the three dots menu
4. Select "Remove"
5. Confirm the removal

## Support

If you encounter issues:

1. **Check the console** for error messages
2. **Verify browser compatibility** (Chrome 88+, Firefox 109+)
3. **Try reinstalling** the extension
4. **Report issues** on the project's GitHub page

## Updates

### Chrome
- Developer mode installations require manual updates
- Download the latest version and reload the extension

### Firefox
- Temporary add-ons require manual reloading
- Permanent installations update automatically

---

**Enjoy using the Nepali Calendar Extension! 🇳🇵** 