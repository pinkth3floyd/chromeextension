// Popup functionality for Nepali Calendar Extension

class NepaliCalendarPopup {
    constructor() {
        this.calendar = new NepaliCalendar();
        // Get current Nepali date and set it as the initial view
        const currentNepaliDate = this.calendar.getCurrentNepaliDate();
        this.currentYear = currentNepaliDate.year;
        this.currentMonth = currentNepaliDate.month;
        this.language = 'en';
        this.theme = 'light';
        this.showHolidays = true;
        

        
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.updateDisplay();
        this.renderCalendar();
    }

    async loadSettings() {
        try {
            const result = await browserAPI.storage.sync.get(['language', 'theme', 'showHolidays']);
            this.language = result.language || 'en';
            this.theme = result.theme || 'light';
            this.showHolidays = result.showHolidays !== false;
            
            this.applyTheme();
            this.updateLanguageElements();
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    async saveSettings() {
        try {
            await browserAPI.storage.sync.set({
                language: this.language,
                theme: this.theme,
                showHolidays: this.showHolidays
            });
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prev-month').addEventListener('click', () => {
            this.navigateMonth(-1);
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.navigateMonth(1);
        });

        // Settings button
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.openSettings();
        });

        // Settings modal
        const modal = document.getElementById('settings-modal');
        const closeBtn = modal.querySelector('.close');
        
        closeBtn.addEventListener('click', () => {
            this.closeSettings();
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeSettings();
            }
        });

        // Settings form elements
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.language = e.target.value;
            this.saveSettings();
            this.updateLanguageElements();
            this.renderCalendar();
        });

        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.theme = e.target.value;
            this.saveSettings();
            this.applyTheme();
        });

        document.getElementById('show-holidays').addEventListener('change', (e) => {
            this.showHolidays = e.target.checked;
            this.saveSettings();
            this.renderCalendar();
        });
    }

    navigateMonth(direction) {
        this.currentMonth += direction;
        
        if (this.currentMonth > 12) {
            this.currentMonth = 1;
            this.currentYear++;
        } else if (this.currentMonth < 1) {
            this.currentMonth = 12;
            this.currentYear--;
        }

        this.renderCalendar();
    }

    updateDisplay() {
        const currentDate = new Date();
        const nepaliDate = this.calendar.getCurrentNepaliDate();
        
        // Update Gregorian date
        const gregorianDateElement = document.getElementById('gregorian-date');
        gregorianDateElement.textContent = currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Update Nepali date
        const nepaliDateElement = document.getElementById('nepali-date');
        nepaliDateElement.textContent = this.calendar.formatNepaliDate(nepaliDate, this.language);

        // Update current month/year display
        const monthYearElement = document.getElementById('current-month-year');
        const monthName = this.calendar.getMonthName(this.currentMonth, this.language);
        monthYearElement.textContent = `${monthName} ${this.currentYear}`;

        // Update holiday list
        this.updateHolidayList();
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const calendarData = this.calendar.generateCalendarData(
            this.currentYear, 
            this.currentMonth, 
            this.language
        );

        calendarGrid.innerHTML = '';

        calendarData.forEach(dayData => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            if (!dayData.isCurrentMonth) {
                dayElement.classList.add('other-month');
            }
            
            if (dayData.isToday) {
                dayElement.classList.add('today');
            }
            
            if (dayData.holiday && this.showHolidays) {
                dayElement.classList.add('holiday');
                dayElement.title = dayData.holiday;
            }

            dayElement.textContent = dayData.day;
            
            // Add click event for day selection
            dayElement.addEventListener('click', () => {
                this.selectDate(dayData);
            });

            calendarGrid.appendChild(dayElement);
        });

        this.updateDisplay();
    }

    selectDate(dayData) {
        const selectedDate = this.calendar.formatNepaliDate(dayData, this.language);
        const gregorianDate = this.calendar.nepaliToGregorian(dayData.year, dayData.month, dayData.day);
        
        // Show selected date info
        this.showDateInfo(selectedDate, gregorianDate, dayData.holiday);
    }

    showDateInfo(nepaliDate, gregorianDate, holiday) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'date-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${nepaliDate}</h4>
                <p>${gregorianDate.toLocaleDateString()}</p>
                ${holiday ? `<p class="holiday-name">${holiday}</p>` : ''}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateHolidayList() {
        const holidayList = document.getElementById('holiday-list');
        const currentNepaliDate = this.calendar.getCurrentNepaliDate();
        const todayHoliday = this.calendar.getHolidays(
            currentNepaliDate.month, 
            currentNepaliDate.day, 
            this.language
        );

        if (todayHoliday) {
            holidayList.innerHTML = `
                <div class="holiday-item">
                    <div class="holiday-name">${todayHoliday}</div>
                    <div class="holiday-date">${this.calendar.formatNepaliDate(currentNepaliDate, this.language)}</div>
                </div>
            `;
        } else {
            holidayList.innerHTML = `
                <div class="holiday-item">
                    <div class="holiday-name">${this.language === 'ne' ? 'आज कुनै चाडपर्व छैन' : 'No holidays today'}</div>
                    <div class="holiday-date">${this.calendar.formatNepaliDate(currentNepaliDate, this.language)}</div>
                </div>
            `;
        }
    }

    updateLanguageElements() {
        // Update weekdays
        const weekdays = document.querySelectorAll('.weekday');
        weekdays.forEach((day, index) => {
            day.textContent = this.calendar.getWeekdayName(index, this.language).substring(0, 3);
        });

        // Update holiday info title
        const holidayTitle = document.querySelector('.holiday-info h3');
        holidayTitle.textContent = this.language === 'ne' ? 'आजका कार्यक्रमहरू' : 'Today\'s Events';

        // Update settings form
        document.getElementById('language-select').value = this.language;
        document.getElementById('theme-select').value = this.theme;
        document.getElementById('show-holidays').checked = this.showHolidays;
    }

    applyTheme() {
        const body = document.body;
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(`${this.theme}-theme`);
    }

    openSettings() {
        const modal = document.getElementById('settings-modal');
        modal.style.display = 'block';
        
        // Update form values
        document.getElementById('language-select').value = this.language;
        document.getElementById('theme-select').value = this.theme;
        document.getElementById('show-holidays').checked = this.showHolidays;
    }

    closeSettings() {
        const modal = document.getElementById('settings-modal');
        modal.style.display = 'none';
    }

    // Utility method to format numbers in Nepali
    formatNepaliNumber(num) {
        if (this.language === 'ne') {
            const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
            return num.toString().split('').map(digit => nepaliDigits[parseInt(digit)]).join('');
        }
        return num.toString();
    }
}

// Add CSS for date notification
const style = document.createElement('style');
style.textContent = `
    .date-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    }

    .notification-content h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
    }

    .notification-content p {
        margin: 4px 0;
        font-size: 14px;
        opacity: 0.9;
    }

    .notification-content .holiday-name {
        color: #ffd700;
        font-weight: 600;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize the popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NepaliCalendarPopup();
}); 