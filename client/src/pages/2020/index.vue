<template>
    <no-ssr>
        <div id="app">
            <calendar :class="{'avoid-back-arrow': this.year === 2016, 'avoid-forward-arrow': this.year === 2020}" @dayclick="getDayTemperatures" @update:to-page="onYearChange" @update:from-page="onYearChange" :from-date="new Date(`01-01-${this.year}`)" v-if="created" :to-date="new Date()" ref="calendar" :attributes="calculatedDates" is-expanded :columns="$screens({ lg: 4, md: 2 }, 1)" :rows="$screens({ lg: 3, md: 6 }, 12)"></calendar>
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
        </no-ssr>
</template>

<script>

import DailyYearAnomaliesCalculator from '@/mixins/DailyYearAnomaliesCalculator';

export default {
    name: 'App',
    data() {
        return {
            year: 2020
        }
    },
    layout: 'menu',
    fetch() {
       this.requestData()
    },
    mixins: [DailyYearAnomaliesCalculator]
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
.phone-viewport {
    position: fixed;
    bottom:1px;
    width: 100vw;
    z-index: 2;
}
.vc-day-content {
    width: calc(var(--day-content-width) + 10px)!important;
}
.vc-w-full.vc-relative {
    padding-bottom: 3rem;
}

.avoid-back-arrow .vc-arrows-container.title-center > div:first-child {
    display: none;
}
.avoid-forward-arrow .vc-arrows-container.title-center > div:last-child {
    display: none;
}
</style>
