import AppStore from '@/store/modules/AppStore'
import persistentState from '@/store/plugins/persistentState'
import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppStore,
  },
  plugins: [persistentState],
})

export default store

// Get state
async function getState() {
  const appStore = getModule(AppStore, store)
  appStore.fetchStats()
}
getState()
