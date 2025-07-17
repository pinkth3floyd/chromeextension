# Nepali Calendar Extension

A beautiful and functional browser extension that provides Nepali calendar (Bikram Sambat) functionality with date conversion, holiday information, and bilingual support. Compatible with both Chrome and Firefox.

## Features

- 📅 **Bikram Sambat Calendar**: View dates in the traditional Nepali calendar system
- 🎉 **Nepali Holidays & Events**: Stay updated with important festivals and cultural events
- 🌐 **Bilingual Support**: Switch between English and Nepali languages
- ⚡ **Quick Date Conversion**: Convert dates instantly with floating converter
- 🎨 **Beautiful UI**: Modern, responsive design with Nepali flag elements
- 🔧 **Customizable Settings**: Theme, language, and holiday display preferences
- 📱 **Responsive Design**: Works perfectly on different screen sizes

## Installation

### For Development/Testing

#### Chrome
1. **Clone or download** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top right
4. **Click "Load unpacked"** and select the extension folder
5. **Pin the extension** to your toolbar for easy access

#### Firefox
1. **Clone or download** this repository to your local machine
2. **Open Firefox** and navigate to `about:debugging#/runtime/this-firefox`
3. **Click "Load Temporary Add-on"**
4. **Select the `manifest.json` file** from the extension folder
5. **The extension will appear** in your toolbar

### For Distribution

The extension is ready to be packaged and distributed on both the Chrome Web Store and Firefox Add-ons.

## File Structure

```
chromeextension/
├── manifest.json              # Extension configuration (Chrome)
├── manifest-firefox.json      # Extension configuration (Firefox)
├── popup.html                 # Main popup interface
├── welcome.html               # Welcome page for new users
├── background.js              # Service worker
├── content.js                 # Content script for web pages
├── package.json               # Build configuration
├── build.js                   # Build script
├── styles/
│   └── popup.css             # Popup styling
├── scripts/
│   ├── browser-polyfill.js   # Cross-browser compatibility layer
│   ├── nepali-calendar.js    # Core calendar logic
│   ├── popup.js              # Popup functionality
│   └── welcome.js            # Welcome page functionality
└── icons/
    ├── icon16.png            # 16x16 icon
    ├── icon32.png            # 32x32 icon
    ├── icon48.png            # 48x48 icon
    └── icon128.png           # 128x128 icon
```

## Usage

### Basic Usage

1. **Click the extension icon** in your Chrome toolbar
2. **View current dates** in both Gregorian and Nepali formats
3. **Navigate months** using the arrow buttons
4. **Click on dates** to see detailed information
5. **Access settings** via the gear icon in the footer

### Advanced Features

- **Keyboard Shortcut**: Press `Ctrl+Shift+N` on any webpage to open the date converter
- **Floating Button**: A red "ने" button appears on web pages for quick access
- **Context Menu**: Right-click on selected dates to convert them
- **Date Input Hints**: Date input fields show conversion hints

### Settings

- **Language**: Switch between English and Nepali
- **Theme**: Choose between light and dark themes
- **Holidays**: Toggle holiday display on/off

## Technical Details

### Calendar System

The extension uses the Bikram Sambat calendar system with accurate date conversions:

- **Base Date**: 1 Baisakh 2080 BS = 13 April 2023 AD
- **Supported Years**: 2080-2090 BS (2023-2033 AD)
- **Holiday Data**: Includes major Nepali festivals and events

### Permissions

- `storage`: Save user preferences
- `activeTab`: Access current tab for date conversion
- `contextMenus`: Right-click menu functionality
- `notifications`: Show date conversion results
- `alarms`: Schedule daily badge updates

### Browser Compatibility

- Chrome 88+ (Manifest V3)
- Firefox 109+ (Manifest V3)
- Chromium-based browsers (Edge, Brave, etc.)
- Cross-browser compatible with unified API

## Building for Distribution

### Quick Build

Use the provided build script to create packages for both browsers:

```bash
# Install dependencies
npm install

# Build for both Chrome and Firefox
npm run build

# Build for specific browser
npm run build:chrome
npm run build:firefox
```

This will create:
- `build/chrome/` - Chrome extension folder
- `build/firefox/` - Firefox extension folder
- `nepali-calendar-chrome-v1.0.0.zip` - Chrome package
- `nepali-calendar-firefox-v1.0.0.zip` - Firefox package

### Manual Build

#### 1. Prepare Icons

Ensure all icon sizes are present:
- 16x16, 32x32, 48x48, 128x128 pixels
- PNG format recommended

#### 2. Update Version

In both `manifest.json` and `manifest-firefox.json`, update the version number:
```json
{
  "version": "1.0.0"
}
```

#### 3. Package Extension

**For Chrome:**
1. Go to `chrome://extensions/`
2. Click "Pack extension"
3. Select the extension folder
4. Download the `.crx` file and `.pem` key

**For Firefox:**
1. Use the `build/firefox/` folder
2. Zip the contents for distribution

### 4. Store Submission

#### Chrome Web Store
1. Create a developer account at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Upload the extension package
3. Fill in store listing details:
   - **Name**: Nepali Calendar
   - **Description**: A beautiful Nepali calendar extension with Bikram Sambat dates, holidays, and events
   - **Category**: Productivity
   - **Language**: English, Nepali
4. Submit for review

#### Firefox Add-ons
1. Create a developer account at [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/)
2. Upload the extension package
3. Fill in store listing details:
   - **Name**: Nepali Calendar
   - **Description**: A beautiful Nepali calendar extension with Bikram Sambat dates, holidays, and events
   - **Category**: Productivity
   - **Language**: English, Nepali
4. Submit for review

## Development

### Local Development

1. **Make changes** to the code
2. **Reload extension** in `chrome://extensions/`
3. **Test functionality** by clicking the extension icon
4. **Debug** using Chrome DevTools

### Testing Checklist

- [ ] Popup opens correctly
- [ ] Date conversion works accurately
- [ ] Calendar navigation functions
- [ ] Settings save and load properly
- [ ] Content script works on web pages
- [ ] Context menu appears correctly
- [ ] Keyboard shortcuts function
- [ ] Responsive design on different sizes

### Common Issues

1. **Extension not loading**: Check manifest.json syntax
2. **Calendar not showing**: Verify nepali-calendar.js is loaded
3. **Icons missing**: Ensure all icon files exist
4. **Permissions denied**: Check manifest permissions

## Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Contact the development team
- Check the troubleshooting section

## Changelog

### Version 1.0.0
- Initial release
- Basic calendar functionality
- Date conversion features
- Bilingual support
- Holiday information
- Settings panel

## Acknowledgments

- Nepali calendar data sources
- Chrome Extension API documentation
- Community contributors and testers

---

**Made with ❤️ for the Nepali community worldwide** 