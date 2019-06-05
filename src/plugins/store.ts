// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export interface State {
  stats: any
}

const storeOptions = {
  state: {
    stats: {},
  },
  mutations: {
    setStats(state: State, stats: any) {
      state.stats = stats
    },
  },
  getters: {
    stats: (state: State) => state.stats,
  },
}

export const store = new Vuex.Store<State>(storeOptions)

// Getters
const getters = store.getters
export const stats = () => getters.stats as any

// Mutations
export const setStats = (stats: any) => {
  store.commit('setStats', stats)
}

// Get state
async function getState() {
  setStats((await axios.get('https://stats.borodutch.com/stats')).data)
}
getState()
