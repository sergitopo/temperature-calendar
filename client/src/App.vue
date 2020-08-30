<template>
    <div id="app">
        <calendar @dayclick="getDayTemperatures" :from-date="new Date('01-01-2020')" :to-date="new Date()" ref="calendar" v-if="finishProcess" :attributes="dates" is-expanded :columns="$screens({ lg: 4, md: 2 }, 1)" :rows="$screens({ lg: 3, md: 6 }, 12)"></calendar>
        <modal v-if="showDateInfo" @close="showDateInfo = false">
            <slot name="header">
                <h3 slot="header">{{daySelected.day}}</h3>
            </slot>
            <slot name="body">
                <div slot="body">
                    <div style="padding-bottom: 1em">{{`Temperatura mitja del dia: ${daySelected.dayTemperature}`}}</div>
                    <div>{{`Temperatura mitja habitual de: ${Math.round(daySelected.normalDayTemperature * 100) / 100}`}}</div>
                </div>
            </slot>
        </modal>
    </div>
</template>

<script>

import modal from './components/Modal';

export default {
    name: 'App',
    components: {
         modal
    },
    data() {
        return {
            daySelected: null,
            dailyTemperature: null,
            showDateInfo: false,
            finishProcess: false,
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
    async created() {
        const url = 'http://ec2-3-250-218-11.eu-west-1.compute.amazonaws.com/elastic/daily_temperature/_search';
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'force-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'origin',
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
                }
            })
        });
        this.weekOfYearAvg = await response.json();
        const response2 = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'force-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'origin',
            body: JSON.stringify({
                "size":500,
                "sort":[
                    {
                        "date":{
                            "order":"asc",
                            "unmapped_type":"boolean"
                        }
                    }
                ],
                "query":{
                    "bool":{
                        "must":[
                            {
                            "range":{
                                "date":{
                                    "format":"strict_date_optional_time",
                                    "gte":"2019-12-31T23:00:00.000Z",
                                    "lte":"now"
                                }
                            }
                            }
                        ]
                    }
                }
            })
        });
        this.dailyTemperature = await response2.json();
        this.calculateCurrentYearAnomalies();
    },
     updated() {
        const calendar = this.$refs.calendar;
        calendar && calendar.focusDate(new Date());
    },
    methods: {
        calculateCurrentYearAnomalies() {
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
            const weekOfTheYear = this.getWeekNumber( day.date);
            const dayOfYear = Math.round(Math.abs((day.date - new Date ('01-01-2020')) / oneDay));
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
