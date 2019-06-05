// Dependencies
import Vue from 'vue'
import App from './App.vue'
import { store } from './plugins/store'
import './plugins/vuetify'

Vue.config.productionTip = true

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
