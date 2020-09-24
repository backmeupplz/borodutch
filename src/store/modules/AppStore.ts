import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
} from 'vuex-module-decorators'
import axios from 'axios'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  stats = {} as { [index: string]: any }
  openPanels = [] as number[]
  color = '#F09819'

  @MutationAction({ mutate: ['stats'] })
  async fetchStats() {
    const stats = (await axios.get('https://stats.borodutch.com/stats')).data
    return { stats }
  }

  @Mutation
  togglePanel(index: number) {
    if (!this.openPanels.includes(index)) {
      this.openPanels.push(index)
    } else {
      this.openPanels = this.openPanels.filter((v) => v !== index)
    }
  }

  @Mutation
  openAllPanels(length: number) {
    this.openPanels = new Array(length)
      .fill(0)
      .map((_, i) => i)
  }

  @Mutation
  closeAllPanels() {
    this.openPanels = []
  }
}
