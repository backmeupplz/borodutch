<template lang="pug">
  v-card
    v-card-title
      .headline Shieldy
      v-btn(flat icon color='grey' @click='open("https://t.me/shieldy_bot")')
        v-icon(small) link
    v-card-text
      p
        | Anti-spam Telegram bot that stops 99.99% of annoying spammers by asking users to go throug a very simple captcha-like process and restricting newcomers to only being able to send text (no media). Completely free and 
        a(href="https://github.com/backmeupplz/shieldy" target="_blank") open source
        | .
      p Shieldy is used by {{stats ? stats.chatCount : '~'}} chats. Total number of users is {{stats && stats.numberOfUsers ? stats.numberOfUsers : '~' }}.
      bar-chart(:chart-data='chatData')
      .title.pb-2 Publications
      ul
        li(v-for='link in links')
          a(:href='link.link' target="_blank") {{link.name}}
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
export default class Shieldy extends Vue {
  // links = [
  //   {
  //     link: 'https://www.producthunt.com/posts/shieldy',
  //     name: 'Product Hunt: Shieldy',
  //   },
  // ]
  // chatData: any = {
  //   labels: [],
  //   datasets: [],
  // }
  // get stats() {
  //   const shieldyStats = store.stats().shieldy
  //   if (shieldyStats) {
  //     shieldyStats.numberOfUsers = store.stats().userCountSeparate.shieldy
  //   }
  //   return shieldyStats
  // }
  // @Watch('stats')
  // statsChanged() {
  //   const labels = this.stats.chatDaily
  //     .map((a: any) => daysAgo(a._id))
  //     .reverse()
  //   const data = this.stats.chatDaily.map((o: any) => o.count).reverse()
  //   this.chatData = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Number of new chats',
  //         backgroundColor: '#f87979',
  //         data,
  //       },
  //     ],
  //   }
  // }
  // open(link: string) {
  //   window.open(link, '_blank')
  // }
}
</script>
