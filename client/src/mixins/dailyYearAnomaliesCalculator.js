const colorPalette =  [
    'purple',
    'indigo',
    'blue',
    'normal',
    'yellow',
    'orange',
    'red'
];
const currentYear = 2020;
const colorMapRange =  [-5, -3.5, -1.5, 1.5, 3.5, 5];

const getWeekNumber = (d) => {
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
const calculateCurrentYearAnomalies = (dailyTemperature, weekOfYearAvg,  year) => {
    const dates  = [
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
    ];
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
        const anomaly = calculateDayAnomaly(dailyTemperature, weekOfYearAvg, currentDayProcessed, dayCounter);
        dayCounter++;
        const dateColor = getDayColorFromAnomaly(anomaly);
        const dateCategory = dates.find(category => category.key === dateColor);
        dateCategory && dateCategory.dates.push(date);       
        currentDayProcessed.setDate(currentDayProcessed.getDate() + 1);
    }
    return dates;
};
const getDayColorFromAnomaly = (anomaly) => {

    if (anomaly < colorMapRange[0]) {
        return colorPalette[0];
    } else if (anomaly >= colorMapRange[0] && anomaly < colorMapRange[1]) {
        return colorPalette[1];
    } else if (anomaly >= colorMapRange[1] && anomaly < colorMapRange[2]) {
        return colorPalette[2];
    } else if (anomaly >= colorMapRange[2] && anomaly < colorMapRange[3]) {
        return colorPalette[3];
    } else if (anomaly >= colorMapRange[3] && anomaly < colorMapRange[4]) {
        return colorPalette[4];
    } else if (anomaly >= colorMapRange[4] && anomaly <= colorMapRange[5]) {
        return colorPalette[5];
    } else {
        return colorPalette[6];
    }
};
const calculateDayAnomaly = (dailyTemperature, weekOfYearAvg, date, dayOfYear) => {
    try {
        const weekOfTheYear = getWeekNumber(date);
        const weekOfTheYearAvgTemperature = weekOfYearAvg.aggregations['2'].buckets.find(obj => obj.key === weekOfTheYear)['1'].value;
        const anomaly = dailyTemperature.hits.hits[dayOfYear]._source.t_avg - weekOfTheYearAvgTemperature;
        return anomaly;
    } catch (e) {
        return null;
    }
};
export default {
    data() {
        return {
            daySelected: null,
            showDateInfo: false,
            calculatedDates: [],
            created: false,
            calendar: null,
            visitedYearSet: new Set(),
            currentYear
        }
    },
    // fetchOnServer: false,
    // async fetch() {
    //     const process = await this.requestData()
    //     this.calculateCurrentYearAnomalies(this.year);
    // },
    async asyncData(context) {
        let year = parseInt(context.route.name);
        year = year ? year : currentYear;
        year = year === currentYear ? '' : `-${year}`;
        const response = await fetch(process.env.baseURL + `daily-temperatures${year}.json`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'origin'
        });
        const dailyTemperature = await response.json();
        const response2 = await fetch(process.env.baseURL + 'weekly-avg.json', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'origin'

        });
        const weekOfYearAvg = await response2.json();
        const calculatedDates = calculateCurrentYearAnomalies(dailyTemperature, weekOfYearAvg, parseInt(context.route.name));
        return { calculatedDates, dates: calculatedDates , dailyTemperature, weekOfYearAvg}
    },
    mounted() {
        this.visitedYearSet.add(this.year);
        this.created = true;
        this.$nextTick(() => {
            this.calendar = this.$refs.calendar;
            this.year === this.currentYear && this.calendar.focusDate && this.calendar.focusDate(new Date());
        });
    },
    methods: {
        async requestData() {
            const year = this.year === this.currentYear ? '' : `-${this.year}`;
            const response = await fetch(`${process.env.baseURL}daily-temperatures${year}.json`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
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
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'origin'

            });
            this.weekOfYearAvg = await response2.json();
            this.calculatedDates = calculateCurrentYearAnomalies(this.dailyTemperature, this.weekOfYearAvg, parseInt(this.year));
        },
        onYearChange(val) {
            if (val.year === this.year && this.create === true) {
                this.created = false;
                return;
            }
            /* if (val.year === this.currentYear) {
                this.$router.push('/');
            } */
            this.$router.push(`/${val.year}`);
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
            return getWeekNumber(d);
        }
    }
}