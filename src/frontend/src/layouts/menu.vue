<template>
    <client-only>
        <div>
            <div class="phone-viewport">
                <md-bottom-bar :md-active-item="activeItem" class="md-accent">
                    <md-bottom-bar-item id="calendar" @click="$router.push(`/${currentYear}`)">
                        <calendar-icon/>
                            <span class="md-bottom-bar-label">{{calendariText}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="monthly" @click="$router.push('/monthly')">
                        <article-icon/>
                            <span class="md-bottom-bar-label">{{mesosText}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
            </div>
            <Nuxt/>
        </div>
    </client-only>
</template>

<script>

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import articleIcon from 'vue-material-design-icons/Apps.vue';
import calendarIcon from 'vue-material-design-icons/CalendarToday.vue';
import currentYear from '../currentYear'


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
            activeItem: 'calendar'
        }
    },
    created() {
        if (this.$route.name === 'monthly') {
            this.activeItem = this.$route.name;
        }
    }
}

</script>
<style lang="postcss">
.md-bottom-bar.md-type-fixed .md-bottom-bar-item {
    min-width: 80px;
    max-width: unset;
    transition: .4s cubic-bezier(.4,0,.2,1);
    transition-property: color;
    will-change: color;
}

.phone-viewport {
    position: fixed;
    bottom:1px;
    width: 100vw;
    z-index: 2;
}
</style>
