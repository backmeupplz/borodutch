<template lang="pug">
ProjectCard(
  title='TLGCoin',
  link='https://t.me/tlgcoin_bot',
  :numberOfUsers='numberOfUsers',
  :index='8'
)
  div(slot='description')
    p
      | Telegram clicker-bot with internal currency and fancy duels. It's like cookie clicker, but in Telegram and with competitive element. Completely free and
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/tlgcoin') open source
      | .
    p
      | TLGCoin users mined
      | {{ " " }}
      span(v-if='coinsCount') {{ coinsCount }}
      Loader(v-else)
      | {{ " " }}
      | coins.
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.voicy')
      v-col(cols='12', md='6')
        BarChart(:chartData='chartData')
    v-row.d-flex.flex-row.justify-center.align-center.my-4(v-if='!stats.voicy')
      Loader
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import BarChart from '@/components/BarChart.vue'
import Loader from '@/components/Loader.vue'
import Link from '@/components/Link.vue'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import { emptyDataSet } from '@/helpers/emptyDataSet'
import { daysAgo } from '@/helpers/daysAgo'

const AppStore = namespace('AppStore')

@Component({
  components: { BarChart, ProjectCard, Loader, Link },
})
export default class TLGCoin extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.tlgcoin
      ? toSpaces(this.stats.userCountSeparate.tlgcoin)
      : undefined
  }

  get coinsCount() {
    return this.stats.tlgcoin
      ? toSpaces(this.stats.tlgcoin.coinsCount)
      : undefined
  }

  get chartData() {
    return !this.stats.tlgcoin
      ? emptyDataSet
      : {
          labels: this.stats.tlgcoin.userDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new users',
              backgroundColor: this.color,
              data: this.stats.tlgcoin.userDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }
}
</script>
