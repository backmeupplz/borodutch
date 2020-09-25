import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
} from 'vuex-module-decorators'
import axios from 'axios'

const colors = [
  ['46.19deg, #F09819 5.66%, #EDDE5D 94.35%', '#F09819cb'],
  ['46.19deg, #56AB2F 5.66%, #A8E063 94.35%', '#56AB2Fcb'],
  ['46.19deg, #EE9CA7 5.66%, #FFDDE1 94.35%', '#EE9CA7e6'],
  [
    '46.19deg, #119DA4 5.66%, #9BC7B2 31.53%, #FFE5BB 50.01%, #FFBE99 72.18%, #FF886A 94.35%',
    '#119DA4cb',
  ],
  ['46.19deg, #FBB13C 5.66%, #FF7A72 48.62%, #FF7A72 94.35%', '#FBB13Ccb'],
]
const randomColorPair =
  colors[Math.floor(Math.random() * Math.floor(colors.length))]

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  stats = {} as { [index: string]: any }
  openPanels = [] as number[]

  gradient = randomColorPair[0]
  color = randomColorPair[1]

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
