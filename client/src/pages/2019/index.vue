<template>
    <div id="app">
        <calendar :class="{'avoid-back-arrow': this.year === 2016}" @dayclick="getDayTemperatures" @update:to-page="onYearChange" @update:from-page="onYearChange" :from-date="new Date(`01-01-${this.year}`)" v-if="created" :to-date="new Date()" ref="calendar" :attributes="calculatedDates" is-expanded :columns="$screens({ lg: 4, md: 2 }, 1)" :rows="$screens({ lg: 3, md: 6 }, 12)"></calendar>
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
        <main-menu/>
    </div>
</template>

<script>

import DailyYearAnomaliesCalculator from '@/mixins/DailyYearAnomaliesCalculator';

export default {
    name: 'App',
    data() {
        return {
            year: 2019
        }
    },
    mixins: [DailyYearAnomaliesCalculator]
}
</script>
