// Script to find the correct base date for Nepali calendar conversion
// Working backwards from: July 17, 2025 = 1 Shrawan 2082

class NepaliCalendar {
    constructor() {
        this.nepaliMonths = [
            'Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Ashoj',
            'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
        ];

        this.nepaliCalendarData = {
            2080: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30],
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
    }

    // Calculate days from 1 Baisakh 2080 to 1 Shrawan 2082
    calculateDaysToShrawan2082() {
        let totalDays = 0;
        
        // Days in 2080 (from Baisakh to end)
        for (let month = 1; month <= 12; month++) {
            totalDays += this.nepaliCalendarData[2080][month - 1];
        }
        
        // Days in 2081 (full year)
        for (let month = 1; month <= 12; month++) {
            totalDays += this.nepaliCalendarData[2081][month - 1];
        }
        
        // Days in 2082 (from Baisakh to Asar)
        for (let month = 1; month <= 3; month++) {
            totalDays += this.nepaliCalendarData[2082][month - 1];
        }
        
        return totalDays;
    }

    // Test different base dates
    testBaseDate(baseDate) {
        this.baseDate = new Date(baseDate);
        this.baseNepaliDate = { year: 2080, month: 1, day: 1 };
        
        const targetDate = new Date(2025, 6, 17); // July 17, 2025
        const utc1 = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        const utc2 = Date.UTC(this.baseDate.getFullYear(), this.baseDate.getMonth(), this.baseDate.getDate());
        const diffDays = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
        
        console.log(`Base date ${this.baseDate.toDateString()}: ${diffDays} days difference`);
        return diffDays;
    }
}

const calendar = new NepaliCalendar();
const expectedDays = calendar.calculateDaysToShrawan2082();

console.log('=== Finding Correct Base Date ===');
console.log('Expected days from 1 Baisakh 2080 to 1 Shrawan 2082:', expectedDays);

// Test different base dates
const testDates = [
    new Date(2023, 3, 13), // April 13, 2023
    new Date(2023, 3, 14), // April 14, 2023
    new Date(2023, 3, 15), // April 15, 2023
    new Date(2023, 3, 16), // April 16, 2023
    new Date(2023, 3, 17), // April 17, 2023
];

testDates.forEach(date => {
    const diffDays = calendar.testBaseDate(date);
    if (diffDays === expectedDays) {
        console.log(`✅ CORRECT BASE DATE FOUND: ${date.toDateString()}`);
    }
});

console.log('================================'); 