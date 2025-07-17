// Content script for Nepali Calendar Extension

class NepaliCalendarContent {
    constructor() {
        this.calendar = new NepaliCalendar();
        this.init();
    }

    init() {
        this.setupContextMenu();
        this.addDateConversionFeatures();
        this.observeDateInputs();
    }

    setupContextMenu() {
        // Add custom context menu for date conversion
        document.addEventListener('contextmenu', (e) => {
            const selectedText = window.getSelection().toString().trim();
            if (selectedText && this.isDateText(selectedText)) {
                // Store selected text for context menu
                window.selectedDateText = selectedText;
            }
        });
    }

    addDateConversionFeatures() {
        // Add floating conversion button
        this.createFloatingButton();
        
        // Add keyboard shortcut (Ctrl+Shift+N for Nepali date)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'N') {
                e.preventDefault();
                this.showQuickConverter();
            }
        });
    }

    createFloatingButton() {
        const button = document.createElement('div');
        button.id = 'nepali-calendar-float-btn';
        button.innerHTML = 'ने';
        button.title = 'Nepali Calendar - Click to convert selected date';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transition: all 0.3s ease;
            opacity: 0.8;
        `;

        button.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.opacity = '0.8';
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', () => {
            this.showQuickConverter();
        });

        document.body.appendChild(button);
    }

    showQuickConverter() {
        const selectedText = window.getSelection().toString().trim();
        let inputValue = selectedText;

        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 90%;
        `;

        content.innerHTML = `
            <h3 style="margin: 0 0 20px 0; color: #333; text-align: center;">
                Nepali Date Converter
            </h3>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">
                    Enter Date (Gregorian):
                </label>
                <input type="text" id="date-input" value="${inputValue}" 
                       placeholder="e.g., 2024-01-15 or 15/01/2024"
                       style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
            </div>
            <div id="result" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; text-align: center; min-height: 20px;">
                ${inputValue ? this.convertDate(inputValue) : 'Enter a date to convert'}
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="convert-btn" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Convert
                </button>
                <button id="close-btn" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Close
                </button>
            </div>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        const input = content.querySelector('#date-input');
        const convertBtn = content.querySelector('#convert-btn');
        const closeBtn = content.querySelector('#close-btn');
        const result = content.querySelector('#result');

        const updateResult = () => {
            const value = input.value.trim();
            if (value) {
                result.innerHTML = this.convertDate(value);
            } else {
                result.innerHTML = 'Enter a date to convert';
            }
        };

        input.addEventListener('input', updateResult);
        convertBtn.addEventListener('click', updateResult);
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        input.focus();
        if (inputValue) {
            updateResult();
        }
    }

    convertDate(dateString) {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return '<span style="color: #dc3545;">Invalid date format</span>';
            }

            const nepaliDate = this.calendar.gregorianToNepali(date);
            const formattedNepali = this.calendar.formatNepaliDate(nepaliDate);
            const holiday = this.calendar.getHolidays(nepaliDate.month, nepaliDate.day);

            let result = `
                <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 8px;">
                    ${formattedNepali}
                </div>
                <div style="font-size: 14px; color: #6c757d;">
                    ${date.toLocaleDateString()}
                </div>
            `;

            if (holiday) {
                result += `
                    <div style="margin-top: 8px; padding: 8px; background: #ff6b6b; color: white; border-radius: 4px; font-size: 12px;">
                        🎉 ${holiday}
                    </div>
                `;
            }

            return result;
        } catch (error) {
            return '<span style="color: #dc3545;">Error converting date</span>';
        }
    }

    isDateText(text) {
        // Simple date pattern matching
        const datePatterns = [
            /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/,
            /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,
            /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i
        ];

        return datePatterns.some(pattern => pattern.test(text));
    }

    observeDateInputs() {
        // Watch for date input fields and add conversion hints
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.addDateInputFeatures(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Check existing date inputs
        this.addDateInputFeatures(document.body);
    }

    addDateInputFeatures(container) {
        const dateInputs = container.querySelectorAll('input[type="date"], input[type="text"]');
        
        dateInputs.forEach(input => {
            if (input.type === 'text' && this.looksLikeDateInput(input)) {
                this.addNepaliDateHint(input);
            }
        });
    }

    looksLikeDateInput(input) {
        const name = input.name?.toLowerCase() || '';
        const id = input.id?.toLowerCase() || '';
        const placeholder = input.placeholder?.toLowerCase() || '';
        
        const dateKeywords = ['date', 'dob', 'birth', 'calendar'];
        return dateKeywords.some(keyword => 
            name.includes(keyword) || id.includes(keyword) || placeholder.includes(keyword)
        );
    }

    addNepaliDateHint(input) {
        if (input.dataset.nepaliHintAdded) return;
        
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            background: #007bff;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        hint.textContent = 'Press Ctrl+Shift+N for Nepali date';

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.appendChild(hint);
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        input.addEventListener('focus', () => {
            hint.style.opacity = '1';
        });

        input.addEventListener('blur', () => {
            hint.style.opacity = '0';
        });

        input.dataset.nepaliHintAdded = 'true';
    }
}

// Initialize content script
new NepaliCalendarContent();

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'convertDate') {
        const calendar = new NepaliCalendar();
        const nepaliDate = calendar.gregorianToNepali(new Date(request.date));
        sendResponse({ nepaliDate: calendar.formatNepaliDate(nepaliDate) });
    }
}); 