<template>
  <div v-if="calculated" class="md-layout md-gutter md-alignment-center" style="margin: 2em;">
    <div v-for="month in months" class="md-layout-item md-large-size-100 centered-text" style="padding-top: 0.5em" :style="{'background': month.color, 'color': month.textColor}">{{month.text || month.name}}</div>
  </div>
</template>

<script>

    export default {
        data() {
            return {
                months: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
                currentYear: 2020,
                year: 2020,
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
        layout: 'menu',
        created() {
            this.months = this.months.map(month => {return  {name: month}});
            this.requestData();
        },
        methods: {
            calculateMonthsAnomalies() {
                const whiteColorList = [0,1,5,6];
                this.yearMonthAvgTemperature.aggregations['2'].buckets.forEach((monthData, i) => {
                    const month = this.months[i];
                    month.anomaly = monthData['1'].value - this.monthlyAbsoluteAvg.aggregations['2'].buckets[i]['1'].value ;
                    month.color = this.getColorAnomaly(month.anomaly);
                    const colorIndex = this.colorPalette.findIndex(color => color === month.color
                    );
                    month.textColor = whiteColorList.includes(colorIndex)  ? 'white' : 'black';
                    const numSign = month.anomaly && month.anomaly > 0 ? '+' : '';
                    month.text = month.anomaly ? `${month.name}  ${numSign}${Math.round(month.anomaly * 100) / 100}` : month.name;
                    
                });
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
            async requestData() {
                const year = this.year === this.currentYear ? '' : `-${this.year}`;
                const response = await fetch(`${process.env.baseURL}monthly-temperatures${year}.json`, {
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
                this.yearMonthAvgTemperature = await response.json();
                const response2 = await fetch(process.env.baseURL + 'monthly-avg.json', {
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
                this.monthlyAbsoluteAvg = await response2.json();
                this.calculatedDates = this.calculateMonthsAnomalies();
            }
        },
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
