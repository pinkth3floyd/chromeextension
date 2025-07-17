// Nepali Calendar Conversion Library
// Bikram Sambat (BS) to Gregorian Date conversion

class NepaliCalendar {
    constructor() {
        this.nepaliMonths = [
            'Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Ashoj',
            'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
        ];

        this.nepaliMonthsNepali = [
            'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'असोज',
            'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत'
        ];

        this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.weekdaysNepali = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'];

        // Nepali calendar data (BS year -> days in each month)
        this.nepaliCalendarData = {
            2080: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30],
            2081: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2084: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2085: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2087: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2088: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2089: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2090: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]
        };

        // Nepali holidays data (month-day -> holiday name)
        this.nepaliHolidays = {
            '1-1': { en: 'Nepali New Year', ne: 'नेपाली नयाँ वर्ष' },
            '1-11': { en: 'Loktantra Diwas', ne: 'लोकतन्त्र दिवस' },
            '1-15': { en: 'Buddha Jayanti', ne: 'बुद्ध जयन्ती' },
            '2-15': { en: 'Buddha Purnima', ne: 'बुद्ध पूर्णिमा' },
            '3-15': { en: 'Guru Purnima', ne: 'गुरु पूर्णिमा' },
            '4-15': { en: 'Krishsna Janmashtami', ne: 'कृष्ण जन्माष्टमी' },
            '5-15': { en: 'Indra Jatra', ne: 'इन्द्र जात्रा' },
            '6-15': { en: 'Dashain', ne: 'दशैं' },
            '7-15': { en: 'Tihar', ne: 'तिहार' },
            '8-15': { en: 'Chhath', ne: 'छठ' },
            '9-15': { en: 'Maghe Sankranti', ne: 'माघे संक्रान्ति' },
            '10-15': { en: 'Maha Shivaratri', ne: 'महा शिवरात्रि' },
            '11-15': { en: 'Holi', ne: 'होली' },
            '12-15': { en: 'Ram Navami', ne: 'राम नवमी' }
        };

        // Base date: 1 Baisakh 2080 BS = 13 April 2023 AD
        this.baseDate = new Date(2023, 3, 13); // April 13, 2023
        this.baseNepaliDate = { year: 2080, month: 1, day: 1 };
    }

    // Convert Gregorian date to Nepali date
    gregorianToNepali(gregorianDate) {
        const date = new Date(gregorianDate);
        const diffTime = date.getTime() - this.baseDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let nepaliYear = this.baseNepaliDate.year;
        let nepaliMonth = this.baseNepaliDate.month;
        let nepaliDay = this.baseNepaliDate.day + diffDays;

        // Adjust year and month
        while (nepaliDay > this.getDaysInNepaliMonth(nepaliYear, nepaliMonth)) {
            nepaliDay -= this.getDaysInNepaliMonth(nepaliYear, nepaliMonth);
            nepaliMonth++;
            
            if (nepaliMonth > 12) {
                nepaliMonth = 1;
                nepaliYear++;
            }
        }

        return {
            year: nepaliYear,
            month: nepaliMonth,
            day: nepaliDay
        };
    }

    // Convert Nepali date to Gregorian date
    nepaliToGregorian(nepaliYear, nepaliMonth, nepaliDay) {
        let totalDays = 0;

        // Calculate days from base date to target Nepali date
        for (let year = this.baseNepaliDate.year; year < nepaliYear; year++) {
            totalDays += this.getDaysInNepaliYear(year);
        }

        for (let month = 1; month < nepaliMonth; month++) {
            totalDays += this.getDaysInNepaliMonth(nepaliYear, month);
        }

        totalDays += nepaliDay - 1;

        const gregorianDate = new Date(this.baseDate);
        gregorianDate.setDate(gregorianDate.getDate() + totalDays);

        return gregorianDate;
    }

    // Get days in a Nepali month
    getDaysInNepaliMonth(year, month) {
        if (this.nepaliCalendarData[year] && this.nepaliCalendarData[year][month - 1]) {
            return this.nepaliCalendarData[year][month - 1];
        }
        return 30; // Default fallback
    }

    // Get days in a Nepali year
    getDaysInNepaliYear(year) {
        if (this.nepaliCalendarData[year]) {
            return this.nepaliCalendarData[year].reduce((sum, days) => sum + days, 0);
        }
        return 365; // Default fallback
    }

    // Get month name in English
    getMonthName(month, language = 'en') {
        if (language === 'ne') {
            return this.nepaliMonthsNepali[month - 1];
        }
        return this.nepaliMonths[month - 1];
    }

    // Get weekday name
    getWeekdayName(weekday, language = 'en') {
        if (language === 'ne') {
            return this.weekdaysNepali[weekday];
        }
        return this.weekdays[weekday];
    }

    // Format Nepali date
    formatNepaliDate(nepaliDate, language = 'en') {
        const monthName = this.getMonthName(nepaliDate.month, language);
        return `${nepaliDate.day} ${monthName} ${nepaliDate.year}`;
    }

    // Get holidays for a specific date
    getHolidays(month, day, language = 'en') {
        const key = `${month}-${day}`;
        if (this.nepaliHolidays[key]) {
            return this.nepaliHolidays[key][language];
        }
        return null;
    }

    // Get all holidays for a month
    getMonthHolidays(year, month, language = 'en') {
        const holidays = [];
        const daysInMonth = this.getDaysInNepaliMonth(year, month);

        for (let day = 1; day <= daysInMonth; day++) {
            const holiday = this.getHolidays(month, day, language);
            if (holiday) {
                holidays.push({
                    day: day,
                    name: holiday,
                    date: this.formatNepaliDate({ year, month, day }, language)
                });
            }
        }

        return holidays;
    }

    // Generate calendar data for a month
    generateCalendarData(year, month, language = 'en') {
        const daysInMonth = this.getDaysInNepaliMonth(year, month);
        const firstDayOfMonth = this.nepaliToGregorian(year, month, 1);
        const firstWeekday = firstDayOfMonth.getDay();
        
        const calendar = [];
        let dayCount = 1;

        // Previous month days
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevYear = month === 1 ? year - 1 : year;
        const daysInPrevMonth = this.getDaysInNepaliMonth(prevYear, prevMonth);

        for (let i = firstWeekday - 1; i >= 0; i--) {
            calendar.push({
                day: daysInPrevMonth - i,
                month: prevMonth,
                year: prevYear,
                isCurrentMonth: false,
                isToday: false,
                holiday: null
            });
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const holiday = this.getHolidays(month, day, language);
            const today = new Date();
            const currentNepaliDate = this.gregorianToNepali(today);
            
            calendar.push({
                day: day,
                month: month,
                year: year,
                isCurrentMonth: true,
                isToday: currentNepaliDate.year === year && 
                         currentNepaliDate.month === month && 
                         currentNepaliDate.day === day,
                holiday: holiday
            });
        }

        // Next month days
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;
        const remainingCells = 42 - calendar.length; // 6 rows * 7 days

        for (let day = 1; day <= remainingCells; day++) {
            calendar.push({
                day: day,
                month: nextMonth,
                year: nextYear,
                isCurrentMonth: false,
                isToday: false,
                holiday: null
            });
        }

        return calendar;
    }

    // Get current Nepali date
    getCurrentNepaliDate() {
        return this.gregorianToNepali(new Date());
    }

    // Validate Nepali date
    isValidNepaliDate(year, month, day) {
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > this.getDaysInNepaliMonth(year, month)) return false;
        return true;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NepaliCalendar;
} 