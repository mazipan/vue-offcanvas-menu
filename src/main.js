import Vue from 'vue'
import App from './App.vue'

import VueOffCanvas from './plugin.js'
Vue.use(VueOffCanvas)

new Vue({
  el: '#app',
  render: h => h(App)
})
