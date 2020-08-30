<template>
    <div id="app">
        <calendar ref="calendar" v-if="finishProcess" :attributes="dates" is-expanded :columns="$screens({ lg: 4, md: 2 }, 1)" :rows="$screens({ lg: 3, md: 6 }, 12)"></calendar>
    </div>
</template>

<script>

import weekOfYearAvg from './weekOfYearAvgResponse.json';
import dailyTemperature from './response.json';

export default {
    name: 'App',
    data() {
        return {
            dailyTemperature: null,
            finishProcess: false,
            dates: [
                {
                    key: 'blue',
                    popover: {
                        label: `A`
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
                        label: `A`
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
                        label: `A`
                    },
                    highlight: {
                        contentClass: 'anomaly-cold--3',
                        fillMode: 'light'
                    },
                    dates: [],
                },
                 {
                    key: 'red',
                    highlight: {
                        contentClass: 'anomaly-hot--3',
                        fillMode: 'light'
                    },
                    dates: [],
                },
                 {
                    key: 'orange',
                    popover: {
                        label: `A`
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
                        label: `A`
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
                        label: `A`
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
            colorMapRange: [-5, -3.5, -2, -1, 1, 2, 3.5, 5]
        }
    },
    async created() {
        /* const response = await fetch('http://ec2-3-250-218-11.eu-west-1.compute.amazonaws.com/elastic/daily_temperature/_search', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                "aggs": {
                    "2": {
                        "histogram": {
                            "field": "week_number",
                            "interval": 1,
                            "min_doc_count": 1
                        },
                        "aggs": {
                            "1": {
                                "avg": {
                                    "field": "t_avg"
                                }
                            }
                        }
                    }
                },
                "size": 0,
                "_source": {
                    "excludes": []
                },
                "stored_fields": [
                    "*"
                ],
                "script_fields": {},
                "docvalue_fields": [
                    {
                        "field": "date",
                        "format": "date_time"
                    }
                ],
                "timeout": "30000ms"
            })
        });
        this.dailyTemperature = await response.json(); */
    },
    updated() {
        const calendar = this.$refs.calendar;
        calendar && calendar.move({ month: 1, year: 2020 })
    },
    mounted() {
        const firstDayOfYear = new Date ('01-01-2020');
        let currentDayProcessed = firstDayOfYear;
        const today = new Date();
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
        this.finishProcess = true;
    },
    methods: {
        getDayColorFromAnomaly(anomaly) {
            if (anomaly < this.colorMapRange[0]) {
                return this.colorPalette[0];
            } else if (anomaly >= this.colorMapRange[1] && anomaly < this.colorMapRange[2]) {
                return this.colorPalette[1];
            } else if (anomaly >= this.colorMapRange[2] && anomaly < this.colorMapRange[3]) {
                return this.colorPalette[2];
            } else if (anomaly >= this.colorMapRange[3] && anomaly < this.colorMapRange[4]) {
                return this.colorPalette[3];
            } else if (anomaly >= this.colorMapRange[4] && anomaly < this.colorMapRange[5]) {
                return this.colorPalette[4];
            } else if (anomaly >= this.colorMapRange[5] && anomaly < this.colorMapRange[6]) {
                return this.colorPalette[5];
            } else {
                return this.colorPalette[6];
            }
        },
        calculateDayAnomaly(date, dayOfYear) {
            try {
                const weekOfTheYear = this.getWeekNumber(date);
                const weeOfTheYearAvgTemperature = weekOfYearAvg.aggregations['2'].buckets.find(obj => obj.key === weekOfTheYear)['1'].value;
                const anomaly = dailyTemperature.hits.hits[dayOfYear]._source.t_avg - weeOfTheYearAvgTemperature;
                return anomaly;
            } catch (e) {
                return null;
            }
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
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.normal {
    background-color: #f7f7f7;
}
.anomaly-hot--1 {
    background-color: #fddbc7;
}
.anomaly-hot--2 {
    background-color: #ef8a62;
}
.anomaly-hot--3 {
    background-color: #b2182b;
}
.anomaly-cold--1 {
    background-color: #d1e5f0;
}
.anomaly-cold--2 {
    background-color: #67a9cf;
}
.anomaly-cold--3 {
    background-color: #2166ac;
}
.vc-rounded-full {
    border-radius: 0!important;
}
</style>
