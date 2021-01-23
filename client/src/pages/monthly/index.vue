<template>
    <div>
        <div class="vc-arrows-container title-center">
            <div v-show="2015 !== year" @click="year--" role="button" class="vc-flex vc-justify-center vc-items-center vc-cursor-pointer vc-select-none vc-pointer-events-auto vc-text-gray-600 vc-rounded vc-border-2 vc-border-transparent hover:vc-opacity-50 hover:vc-bg-gray-300 focus:vc-border-gray-300">
                <svg data-v-63f7b5ec="" width="26px" height="26px" viewBox="0 -1 16 34" class="vc-svg-icon">
                    <path data-v-63f7b5ec="" d="M11.196 10c0 0.143-0.071 0.304-0.179 0.411l-7.018 7.018 7.018 7.018c0.107 0.107 0.179 0.268 0.179 0.411s-0.071 0.304-0.179 0.411l-0.893 0.893c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-8.321-8.321c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l8.321-8.321c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l0.893 0.893c0.107 0.107 0.179 0.25 0.179 0.411z"></path>
                </svg>
            </div>
            <div v-show="currentYear !== year" @click="year++" role="button" class="vc-flex vc-justify-center vc-items-center vc-cursor-pointer vc-select-none vc-pointer-events-auto vc-text-gray-600 vc-rounded vc-border-2 vc-border-transparent hover:vc-opacity-50 hover:vc-bg-gray-300 focus:vc-border-gray-300">
                <svg data-v-63f7b5ec="" width="26px" height="26px" viewBox="-5 -1 16 34" class="vc-svg-icon">
                    <path data-v-63f7b5ec="" d="M10.625 17.429c0 0.143-0.071 0.304-0.179 0.411l-8.321 8.321c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-0.893-0.893c-0.107-0.107-0.179-0.25-0.179-0.411 0-0.143 0.071-0.304 0.179-0.411l7.018-7.018-7.018-7.018c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l0.893-0.893c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l8.321 8.321c0.107 0.107 0.179 0.268 0.179 0.411z"></path>
                </svg>
            </div>
        </div>
        <div v-if="calculated" class="md-layout md-gutter md-alignment-center" style="margin: 2em; padding-bottom: 5em;">
            <div style="padding-bottom: 1em; font-size: 1.5rem">{{yearText}}</div>
            <div v-for="month in months" class="md-layout-item md-large-size-100 centered-text" style="padding-top: 0.5em" :style="{'background': month.color, 'color': month.textColor}">{{month.text || month.name}}</div>
        </div>
    </div>
</template>

<script>
    import currentYear from '@/currentYear';

    export default {
        data() {
            return {
                months: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
                currentYear,
                yearAvg: 0,
                year: currentYear,
                calculated: false,
                colorPalette: [
                    '#2166ac',
                    '#67a9cf',
                    '#d1e5f0',
                    '#e0dede',
                    '#fddbc7',
                    '#ef8a62',
                    '#b2182b'
                ],
                colorMapRange: [-2, -1.25, -0.5, 0.5, 1.25, 2]
            }
        },
        computed: {
            yearText() {
                return `${this.year} ${Math.round(this.yearAvg * 100) / 100}`;
            }
        },
        layout: 'menu',
        created() {
            this.months = this.months.map(month => {return  {name: month}});
            this.requestMonthData();
        },
        methods: {
            calculateMonthsAnomalies() {
                const whiteColorList = [0,1,5,6];
                let yearTemperatureAccumulator = 0;
                try {
                    this.months.forEach((month, i) =>  {
                        const monthData = this.yearMonthAvgTemperature.aggregations['2'].buckets[i];
                        if (monthData === undefined) {
                            month.anomaly = 0;
                            month.textColor = 'black';
                            month.color = 'transparent';
                            return;
                        }
                        yearTemperatureAccumulator += monthData['1'].value;
                        month.anomaly = monthData['1'].value - this.monthlyAbsoluteAvg.aggregations['2'].buckets[i]['1'].value ;
                        month.color = this.getColorAnomaly(month.anomaly);
                        const colorIndex = this.colorPalette.findIndex(color => color === month.color
                        );
                        month.textColor = whiteColorList.includes(colorIndex)  ? 'white' : 'black';
                        const numSign = month.anomaly && month.anomaly > 0 ? '+' : '';
                        month.text = month.anomaly ? `${month.name}  ${numSign}${Math.round(month.anomaly * 100) / 100}` : month.name;
                        
                    });
                    this.yearAvg = yearTemperatureAccumulator /  this.yearMonthAvgTemperature.aggregations['2'].buckets.length;
                } catch (e) {
                    this.yearAvg = 0;
                }
                this.calculated = true;
            },
            getColorAnomaly(anomalyTemperature) {
                if (anomalyTemperature < this.colorMapRange[0]) {
                    return this.colorPalette[0];
                } else if (anomalyTemperature >= this.colorMapRange[0] && anomalyTemperature < this.colorMapRange[1]) {
                    return this.colorPalette[1];
                } else if (anomalyTemperature >= this.colorMapRange[1] && anomalyTemperature < this.colorMapRange[2]) {
                    return this.colorPalette[2];
                } else if (anomalyTemperature >= this.colorMapRange[2] && anomalyTemperature < this.colorMapRange[3]) {
                    return this.colorPalette[3];
                } else if (anomalyTemperature >= this.colorMapRange[3] && anomalyTemperature < this.colorMapRange[4]) {
                    return this.colorPalette[4];
                } else if (anomalyTemperature >= this.colorMapRange[4] && anomalyTemperature <= this.colorMapRange[5]) {
                    return this.colorPalette[5];
                } else {
                    return this.colorPalette[6];
                }
            },
            async requestMonthData() {
                const year = this.year === this.currentYear ? '' : `-${this.year}`;
                const response = await fetch(`${process.env.baseURL}monthly-temperatures${year}.json`, {
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
                this.yearMonthAvgTemperature = await response.json();
                const response2 = await fetch(process.env.baseURL + 'monthly-avg.json', {
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
                this.monthlyAbsoluteAvg = await response2.json();
                this.calculatedDates = this.calculateMonthsAnomalies();
            }
        },
        watch: {
            async year(newVal) {
                this.calculated = false;
                const year = this.year === this.currentYear ? '' : `-${this.year}`;
                const response = await fetch(`${process.env.baseURL}monthly-temperatures${year}.json`, {
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
                this.yearMonthAvgTemperature = await response.json();
                this.calculatedDates = this.calculateMonthsAnomalies();

            }
        }
    }
</script>

<style lang="scss">
/* @import "~vue-material/components/MdAnimation/variables";
@import "~vue-material/theme/engine"; */

.md-layout-item {
    height: 40px;
    margin-top: 8px;
    margin-bottom: 8px;
    transition: .3s 500;

    &:after {
        width: 100%;
        height: 100%;
        display: block;
        background: md-get-palette-color(purple, 200);
        content: " ";
    }
  }
.centered-text {
    text-align: center;
}
.normal {
    background-color: #f7f7f7;
}
.anomaly--1 {
    background-color: #fddbc7;
}
.anomaly--2 {
    background-color: #ef8a62;
}
.anomaly--3 {
    background-color: #b2182b;
}
.anomaly--4 {
    background-color: #d1e5f0;
}
.anomaly--5 {
    background-color: #67a9cf;
}
.anomaly--6 {
    background-color: #2166ac;
}
body {
    min-height: unset;
}
</style>
