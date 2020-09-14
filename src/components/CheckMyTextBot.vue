<template lang="pug">
  v-card
    v-card-title
      .headline Check my text bot
      v-btn(flat icon color='grey' @click='open("https://t.me/check_my_text_bot")')
        v-icon(small) link
    v-card-text
      p
        | Spellcheck Telegram bot. Just add it to your channel, active in private messages and get notified of any typos you post! Completely free and 
        a(href="https://github.com/backmeupplz/check_my_text_bot" target="_blank") open source
        | .
      p Check my text bot is used by {{stats ? stats.userCount : '~'}} users. Total number of users is {{stats && stats.numberOfUsers ? stats.numberOfUsers : '~' }}.
      bar-chart(:chart-data='userData')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import BarChart from './BarChart.vue'
import * as store from '../plugins/store'
import { daysAgo } from '../helpers/daysAgo'

@Component({
  components: { BarChart },
})
export default class Shieldy extends Vue {
  userData: any = {
    labels: [],
    datasets: [],
  }

  get stats() {
    const check = store.stats().checkMyTextBot
    if (check) {
      check.numberOfUsers = store.stats().userCountSeparate.speller
    }
    return check
  }

  @Watch('stats')
  statsChanged() {
    const labels = this.stats.userDaily
      .map((a: any) => daysAgo(a._id))
      .reverse()
    const data = this.stats.userDaily.map((o: any) => o.count).reverse()
    this.userData = {
      labels,
      datasets: [
        {
          label: 'Number of new users',
          backgroundColor: '#f87979',
          data,
        },
      ],
    }
  }

  open(link: string) {
    window.open(link, '_blank')
  }
}
</script>
