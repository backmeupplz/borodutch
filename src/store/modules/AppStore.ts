import { VuexModule, Module, MutationAction } from 'vuex-module-decorators'
import axios from 'axios'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  stats = {} as { [index: string]: any }

  @MutationAction({ mutate: ['stats'] })
  async fetchStats() {
    const stats = (await axios.get('https://stats.borodutch.com/stats')).data
    return { stats }
  }
}
