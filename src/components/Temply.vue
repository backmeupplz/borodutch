<template lang="pug">
  v-card
    v-card-title
      .headline Temply
      v-btn(flat icon color='grey' @click='open("https://t.me/temply_bot")')
        v-icon(small) link
    v-card-text
      p
        | Inline Telegram bot allowing users to create varios text templates an quickly use them later. Pretty useful for support workers as well as channel administrators. Completely free and 
        a(href="https://github.com/backmeupplz/temply" target="_blank") open source
        | .
      p Temply was used by {{stats ? stats.userCount : '~'}} users, who created {{stats ? stats.templatesCount : '~'}} templates.
      bar-chart(:chart-data='datacollection')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import BarChart from './BarChart.vue'
import { daysAgo } from '../helpers/daysAgo'

@Component({
  components: { BarChart },
})
export default class Temply extends Vue {
  // datacollection: any = {
  //   labels: [],
  //   datasets: [],
  // }
  // get stats() {
  //   return store.stats().temply
  // }
  // @Watch('stats')
  // statsChanged() {
  //   this.datacollection = {
  //     labels: this.stats.userDaily.map((a: any) => daysAgo(a._id)).reverse(),
  //     datasets: [
  //       {
  //         label: 'Number of new users',
  //         backgroundColor: '#f87979',
  //         data: this.stats.userDaily.map((o: any) => o.count).reverse(),
  //       },
  //     ],
  //   }
  // }
  // open(link: string) {
  //   window.open(link, '_blank')
  // }
}
</script>
