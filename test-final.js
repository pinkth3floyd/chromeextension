// Final test for Nepali calendar conversion
class NepaliCalendar {
    constructor() {
        this.nepaliMonths = [
            'Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Ashoj',
            'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
        ];

        this.nepaliCalendarData = {
            2080: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2081: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2084: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2085: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2087: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2088: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2089: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2090: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2091: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2092: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]
        };

        // Base date: 1 Baisakh 2080 BS = 13 April 2023 AD
        this.baseDate = new Date(2023, 3, 13); // April 13, 2023
        this.baseNepaliDate = { year: 2080, month: 1, day: 1 };
    }

    gregorianToNepali(gregorianDate) {
        const date = new Date(gregorianDate);
        // Use UTC to avoid timezone issues
        const utc1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        const utc2 = Date.UTC(this.baseDate.getFullYear(), this.baseDate.getMonth(), this.baseDate.getDate());
        const diffDays = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));

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

    getDaysInNepaliMonth(year, month) {
        if (this.nepaliCalendarData[year] && this.nepaliCalendarData[year][month - 1]) {
            return this.nepaliCalendarData[year][month - 1];
        }
        return 30;
    }

    getMonthName(month) {
        return this.nepaliMonths[month - 1];
    }

    getCurrentNepaliDate() {
        return this.gregorianToNepali(new Date());
    }

    formatNepaliDate(nepaliDate) {
        const monthName = this.getMonthName(nepaliDate.month);
        return `${nepaliDate.day} ${monthName} ${nepaliDate.year}`;
    }
}

// Test the conversion
const calendar = new NepaliCalendar();
const currentDate = new Date();
const currentNepaliDate = calendar.getCurrentNepaliDate();

console.log('=== Final Nepali Calendar Test ===');
console.log('Current Gregorian date:', currentDate.toDateString());
console.log('Current Nepali date:', calendar.formatNepaliDate(currentNepaliDate));
console.log('Year:', currentNepaliDate.year);
console.log('Month:', currentNepaliDate.month, `(${calendar.getMonthName(currentNepaliDate.month)})`);
console.log('Day:', currentNepaliDate.day);

// Test specific known dates
console.log('\n=== Known Date Tests ===');
const testDate1 = new Date(2023, 3, 13); // April 13, 2023
const nepaliDate1 = calendar.gregorianToNepali(testDate1);
console.log('April 13, 2023 =', calendar.formatNepaliDate(nepaliDate1), '(should be 1 Baisakh 2080)');

const testDate2 = new Date(2025, 6, 17); // July 17, 2025
const nepaliDate2 = calendar.gregorianToNepali(testDate2);
console.log('July 17, 2025 =', calendar.formatNepaliDate(nepaliDate2), '(should be 1 Shrawan 2082)');

console.log('================================'); 