<template>
    <div>
        <div class="phone-viewport">
            <md-bottom-bar class="md-accent">
                <!-- <md-bottom-bar-item @click="$router.push('/2019')">
                    <a href='/2021'/>
                    <home-icon/>
                        <span class="md-bottom-bar-label">Inici</span>
                </md-bottom-bar-item> -->
                <md-bottom-bar-item @click="$router.push(`/${currentYear}`)">
                    <calendar-icon/>
                        <span class="md-bottom-bar-label">Calendari</span>
                </md-bottom-bar-item>

                <md-bottom-bar-item @click="$router.push('/monthly')">
                    <article-icon/>
                        <span class="md-bottom-bar-label">Mesos</span>
                </md-bottom-bar-item>

                <md-bottom-bar-item>
                    <description-icon/>
                        <span class="md-bottom-bar-label">Anys</span>
                </md-bottom-bar-item>
            </md-bottom-bar>
        </div>
        <nuxt/>
    </div>
</template>

<script>

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import homeIcon from 'vue-material-design-icons/Home.vue';
import calendarIcon from 'vue-material-design-icons/CalendarToday.vue';
import articleIcon from 'vue-material-design-icons/Apps.vue';
import descriptionIcon from 'vue-material-design-icons/Details.vue';
import currentYear from '@/currentYear'


export default {
    components: {
        homeIcon,
        calendarIcon,
        articleIcon,
        descriptionIcon
    },
    data() {
        return {
            currentYear
        }
    }
}

</script>
