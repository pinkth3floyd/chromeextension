// Background service worker for Nepali Calendar Extension

// Import browser polyfill and NepaliCalendar class
importScripts('scripts/browser-polyfill.js');
importScripts('scripts/nepali-calendar.js');

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Set default settings on first install
        browserAPI.storage.sync.set({
            language: 'en',
            theme: 'light',
            showHolidays: true
        });

        // Open welcome page
        browserAPI.tabs.create({
            url: browserAPI.runtime.getURL('welcome.html')
        });
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This is handled by the popup, but we can add additional functionality here
    console.log('Nepali Calendar extension clicked');
});

// Handle messages from content scripts or popup
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'getCurrentDate':
            const currentDate = new Date();
            const nepaliCalendar = new NepaliCalendar();
            const nepaliDate = nepaliCalendar.getCurrentNepaliDate();
            sendResponse({
                gregorian: currentDate,
                nepali: nepaliDate
            });
            break;

        case 'getHolidays':
            const calendar = new NepaliCalendar();
            const holidays = calendar.getMonthHolidays(
                request.year, 
                request.month, 
                request.language || 'en'
            );
            sendResponse({ holidays });
            break;

        case 'updateBadge':
            // Update extension badge with current Nepali date
            const cal = new NepaliCalendar();
            const today = cal.getCurrentNepaliDate();
            const badgeText = `${today.day}`;
            chrome.action.setBadgeText({ text: badgeText });
            chrome.action.setBadgeBackgroundColor({ color: '#ff6b6b' });
            break;

        default:
            sendResponse({ error: 'Unknown action' });
    }
});

// Update badge every day at midnight
function scheduleBadgeUpdate() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    setTimeout(() => {
        updateBadge();
        scheduleBadgeUpdate(); // Schedule next update
    }, timeUntilMidnight);
}

function updateBadge() {
    const calendar = new NepaliCalendar();
    const today = calendar.getCurrentNepaliDate();
    const badgeText = `${today.day}`;
    
    chrome.action.setBadgeText({ text: badgeText });
    chrome.action.setBadgeBackgroundColor({ color: '#ff6b6b' });
}

// Initialize badge and schedule updates
updateBadge();
scheduleBadgeUpdate();

// Context menu for quick date conversion
chrome.runtime.onInstalled.addListener(() => {
    browserAPI.contextMenus.create({
        id: 'convertDate',
        title: 'Convert to Nepali Date',
        contexts: ['selection']
    });
});

browserAPI.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'convertDate') {
        const selectedText = info.selectionText;
        
        // Try to parse the selected text as a date
        const date = new Date(selectedText);
        if (!isNaN(date.getTime())) {
            const calendar = new NepaliCalendar();
            const nepaliDate = calendar.gregorianToNepali(date);
            const formattedDate = calendar.formatNepaliDate(nepaliDate);
            
            // Show notification
            browserAPI.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: 'Nepali Date',
                message: `${selectedText} = ${formattedDate}`
            });
        }
    }
});

// Handle storage changes
browserAPI.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        // Update badge when settings change
        if (changes.language || changes.theme) {
            updateBadge();
        }
    }
});

// Periodic sync for calendar data (if needed)
browserAPI.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'updateCalendar') {
        updateBadge();
    }
});

// Create alarm for periodic updates
browserAPI.alarms.create('updateCalendar', { periodInMinutes: 60 }); 