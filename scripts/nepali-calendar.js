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

        // Base date: 1 Shrawan 2082 BS = 17 July 2025 AD (Thursday)
        this.baseDate = new Date(2025, 6, 17); // July 17, 2025
        this.baseNepaliDate = { year: 2082, month: 4, day: 1 };

        // Nepali calendar data (BS year -> days in each month)
        // Official data from Nepali Patro (1978-2099)
        this.nepaliCalendarData = {
            1978: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            1979: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            1980: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            1981: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            1982: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            1983: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            1984: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            1985: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            1986: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            1987: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            1988: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            1989: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            1990: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            1991: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            1992: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            1993: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            1994: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            1995: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            1996: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            1997: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            1998: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            1999: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
            2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
            2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
            2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
            2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
            2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
            2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
            2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
            2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2091: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
            2092: [30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2093: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2094: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
            2095: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
            2096: [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2097: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2098: [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31],
            2099: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]
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
    }

    // Convert Gregorian date to Nepali date
    gregorianToNepali(gregorianDate) {
        const date = new Date(gregorianDate);
        // Use UTC to avoid timezone issues
        const utc1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        const utc2 = Date.UTC(this.baseDate.getFullYear(), this.baseDate.getMonth(), this.baseDate.getDate());
        const diffDays = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));

        let nepaliYear = this.baseNepaliDate.year;
        let nepaliMonth = this.baseNepaliDate.month;
        let nepaliDay = this.baseNepaliDate.day;

        if (diffDays >= 0) {
            nepaliDay += diffDays;
            // Adjust year and month forward
            while (nepaliDay > this.getDaysInNepaliMonth(nepaliYear, nepaliMonth)) {
                nepaliDay -= this.getDaysInNepaliMonth(nepaliYear, nepaliMonth);
                nepaliMonth++;
                if (nepaliMonth > 12) {
                    nepaliMonth = 1;
                    nepaliYear++;
                }
            }
        } else {
            let daysLeft = -diffDays;
            nepaliDay -= daysLeft;
            // Adjust year and month backward
            while (nepaliDay < 1) {
                nepaliMonth--;
                if (nepaliMonth < 1) {
                    nepaliMonth = 12;
                    nepaliYear--;
                }
                nepaliDay += this.getDaysInNepaliMonth(nepaliYear, nepaliMonth);
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
        // Validate input
        if (!this.isValidNepaliDate(nepaliYear, nepaliMonth, nepaliDay)) {
            throw new Error(`Invalid Nepali date: ${nepaliYear}-${nepaliMonth}-${nepaliDay}`);
        }

        let totalDays = 0;

        // Calculate days from base Nepali date to target Nepali date
        if (nepaliYear > this.baseNepaliDate.year) {
            // Add days for complete years between base and target
            for (let year = this.baseNepaliDate.year; year < nepaliYear; year++) {
                totalDays += this.getDaysInNepaliYear(year);
            }
        } else if (nepaliYear < this.baseNepaliDate.year) {
            // Subtract days for years before base
            for (let year = nepaliYear; year < this.baseNepaliDate.year; year++) {
                totalDays -= this.getDaysInNepaliYear(year);
            }
        }

        // Add days for months in the target year
        if (nepaliYear === this.baseNepaliDate.year) {
            // Same year - calculate difference in months
            if (nepaliMonth > this.baseNepaliDate.month) {
                for (let month = this.baseNepaliDate.month; month < nepaliMonth; month++) {
                    totalDays += this.getDaysInNepaliMonth(nepaliYear, month);
                }
            } else if (nepaliMonth < this.baseNepaliDate.month) {
                for (let month = nepaliMonth; month < this.baseNepaliDate.month; month++) {
                    totalDays -= this.getDaysInNepaliMonth(nepaliYear, month);
                }
            }
        } else if (nepaliYear > this.baseNepaliDate.year) {
            // Future year - add all months up to target month
            for (let month = 1; month < nepaliMonth; month++) {
                totalDays += this.getDaysInNepaliMonth(nepaliYear, month);
            }
        } else {
            // Past year - subtract remaining months after target month
            for (let month = nepaliMonth; month < 13; month++) {
                totalDays += this.getDaysInNepaliMonth(nepaliYear, month);
            }
            // Then subtract all months in the base year up to base month
            for (let month = 1; month < this.baseNepaliDate.month; month++) {
                totalDays += this.getDaysInNepaliMonth(this.baseNepaliDate.year, month);
            }
            totalDays = -totalDays;
        }

        // Add days in the target month
        if (nepaliYear === this.baseNepaliDate.year && nepaliMonth === this.baseNepaliDate.month) {
            // Same month - calculate difference in days
            totalDays += nepaliDay - this.baseNepaliDate.day;
        } else if (nepaliYear >= this.baseNepaliDate.year) {
            // Future or same year - add days from start of month
            totalDays += nepaliDay - 1;
        } else {
            // Past year - subtract days from end of month
            totalDays -= this.getDaysInNepaliMonth(nepaliYear, nepaliMonth) - nepaliDay + 1;
        }

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
        
        // Calculate the first day of the month using proper weekday calculation
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