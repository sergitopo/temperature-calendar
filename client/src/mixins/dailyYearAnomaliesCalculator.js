export default {
    data() {
        return {
            daySelected: null,
            dailyTemperature: null,
            showDateInfo: false,
            calculatedDates: [],
            created: false,
            calendar: null,
            visitedYearSet: new Set(),
            dates: [
                {
                    key: 'blue',
                    popover: {
                        label: `Temperatura mitja >1.5º per baix del normal`
                    },
                    highlight: {
                        contentClass: 'anomaly-cold--1',
                        fillMode: 'light'
                    },
                    dates: [],
                },
                 {
                    key: 'indigo',
                    popover: {
                        label: `Temperatura mitja >3.5º per baix del normal`
                    },
                    highlight: {
                        contentClass: 'anomaly-cold--2',
                        fillMode: 'light'
                    },
                    dates: [],
                },
                 {
                    key: 'purple',
                    popover: {
                        label: `Temperatura mitja >5º per baix del normal`
                    },
                    highlight: {
                        contentClass: 'anomaly-cold--3',
                        fillMode: 'light'
                    },
                    dates: [],
                },
                 {
                    key: 'red',
                    popover: {
                        label: `Temperatura mitja >5º per dalt del normal`
                    },
                    highlight: {
                        contentClass: 'anomaly-hot--3',
                        fillMode: 'light'
                    },
                    dates: [],
                },
                 {
                    key: 'orange',
                    popover: {
                        label: `Temperatura mitja >3.5º per dalt del normal`
                    },
                    highlight: {
                        contentClass: 'anomaly-hot--2',
                        fillMode: 'light'
                    },
                    dates: [],
                },
                {
                    key: 'yellow',
                    popover: {
                        label: `Temperatura mitja >1.5º per dalt del normal`
                    },
                    highlight: {
                        contentClass: 'anomaly-hot--1',
                        fillMode: 'light'
                    },
                    dates: [],
                },
                {
                    key: 'normal',
                    popover: {
                        label: `Temperatura mitja normal per a la data`
                    },
                    highlight: {
                        contentClass: 'normal',
                        fillMode: 'light'
                    },
                    dates: [],
                }
            ],
            colorPalette: [
                'purple',
                'indigo',
                'blue',
                'normal',
                'yellow',
                'orange',
                'red'
            ],
            colorMapRange: [-5, -3.5, -1.5, 1.5, 3.5, 5]
        }
    },
    fetchOnServer: false,
    async fetch() {
        const process = await this.requestData()
        this.calculateCurrentYearAnomalies(this.year);
    },
    mounted() {
        this.visitedYearSet.add(this.year);
        this.created = true;
        this.$nextTick(() => {
            this.calendar = this.$refs.calendar;
            this.year === 2020 && this.calendar.focusDate && this.calendar.focusDate(new Date());
        });
    },
    methods: {
        async requestData() {
            const year = this.year === 2020 ? '' : `-${this.year}`;
            const response = await fetch(`${process.env.baseURL}daily-temperatures${year}.json`, {
                method: 'GET',
                mode: 'cors',
                cache: 'force-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'origin'
            });
            this.dailyTemperature = await response.json();
            const response2 = await fetch(process.env.baseURL + 'weekly-avg.json', {
                method: 'GET',
                mode: 'cors',
                cache: 'force-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'origin'

            });
            this.weekOfYearAvg = await response2.json();
            return true;
        },
        onYearChange(val) {
            if (val.year === this.year && this.create === true) {
                this.created = false;
                return;
            }
            this.$router.push(`/${val.year}`);
        },
        clearCalculatedAnomalies() {
            this.dates.forEach(el => {
                el.dates = [];
            });
        },
        calculateCurrentYearAnomalies(year) {
            const firstDayOfYear = new Date (`01-01-${year}`);
            let currentDayProcessed = firstDayOfYear;
            let today = new Date();
            //FEXME
            if (year !== 2020) {
                today == new Date (`12-31-${year}`);
            }
            let dayCounter = 0;
            while (currentDayProcessed < today) {
                const date = new Date(currentDayProcessed);
                const anomaly = this.calculateDayAnomaly(currentDayProcessed, dayCounter);
                dayCounter++;
                const dateColor = this.getDayColorFromAnomaly(anomaly);
                const dateCategory = this.dates.find(category => category.key === dateColor);
                dateCategory && dateCategory.dates.push(date);
                currentDayProcessed.setDate(currentDayProcessed.getDate() + 1);
            }
            this.calculatedDates = this.dates;
        },
        getDayColorFromAnomaly(anomaly) {

            if (anomaly < this.colorMapRange[0]) {
                return this.colorPalette[0];
            } else if (anomaly >= this.colorMapRange[0] && anomaly < this.colorMapRange[1]) {
                return this.colorPalette[1];
            } else if (anomaly >= this.colorMapRange[1] && anomaly < this.colorMapRange[2]) {
                return this.colorPalette[2];
            } else if (anomaly >= this.colorMapRange[2] && anomaly < this.colorMapRange[3]) {
                return this.colorPalette[3];
            } else if (anomaly >= this.colorMapRange[3] && anomaly < this.colorMapRange[4]) {
                return this.colorPalette[4];
            } else if (anomaly >= this.colorMapRange[4] && anomaly <= this.colorMapRange[5]) {
                return this.colorPalette[5];
            } else {
                return this.colorPalette[6];
            }
        },
        calculateDayAnomaly(date, dayOfYear) {
            try {
                const weekOfTheYear = this.getWeekNumber(date);
                const weekOfTheYearAvgTemperature = this.weekOfYearAvg.aggregations['2'].buckets.find(obj => obj.key === weekOfTheYear)['1'].value;
                const anomaly = this.dailyTemperature.hits.hits[dayOfYear]._source.t_avg - weekOfTheYearAvgTemperature;
                return anomaly;
            } catch (e) {
                return null;
            }
        },
        getDayTemperatures(day) {
            const oneDay = 24 * 60 * 60 * 1000;
            const weekOfTheYear = this.getWeekNumber(day.date);
            const dayOfYear = Math.round(Math.abs((day.date - new Date (`01-01-${this.year}`)) / oneDay));
            const weekOfTheYearAvgTemperature = this.weekOfYearAvg.aggregations['2'].buckets.find(obj => obj.key === weekOfTheYear)['1'].value;
            const dayTemperature = this.dailyTemperature.hits.hits[dayOfYear]._source.t_avg;
            console.log(dayTemperature);
            console.log(weekOfTheYearAvgTemperature);
            this.daySelected = {
                day: day.ariaLabel,
                dayTemperature: dayTemperature,
                normalDayTemperature: weekOfTheYearAvgTemperature
            }
            this.showDateInfo = true;
        },
        getWeekNumber(d) {
            // Copy date so don't modify original
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            // Set to nearest Thursday: current date + 4 - current day number
            // Make Sunday's day number 7
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
            // Get first day of year
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
            // Calculate full weeks to nearest Thursday
            var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
            // Return array of year and week number
            return  weekNo;
        }
    }
}