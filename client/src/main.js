import Vue from 'vue'
import App from './App.vue'
import Calendar from 'v-calendar/lib/components/calendar.umd'

Vue.config.productionTip = false
Vue.component('calendar', Calendar);
new Vue({
  render: h => h(App),
}).$mount('#app')

// Register components in your 'main.js'
