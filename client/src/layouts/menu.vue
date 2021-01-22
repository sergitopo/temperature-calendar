<template>
    <no-ssr>
        <div>
            <div class="phone-viewport">
                <md-bottom-bar class="md-accent">
                    <md-bottom-bar-item @click="$router.push(`/${currentYear}`)">
                        <calendar-icon/>
                            <span class="md-bottom-bar-label">{{calendariText}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item @click="$router.push('/monthly')">
                        <article-icon/>
                            <span class="md-bottom-bar-label">{{mesosText}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
            </div>
            <Nuxt/>
        </div>
    </no-ssr>
</template>

<script>

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import articleIcon from 'vue-material-design-icons/Apps.vue';
import calendarIcon from 'vue-material-design-icons/CalendarToday.vue';
import { MdBottomBar, MdBottomBarItem } from 'vue-material/dist/components';
import currentYear from '@/currentYear'


export default {
    components: {
        calendarIcon,
        articleIcon
    },
    data() {
        return {
            currentYear,
            anyText: 'Anys',
            mesosText: 'Mesos',
            calendariText: 'Calendari',
        }
    }
}

</script>
