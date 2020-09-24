<template lang="pug">
ProjectCard(
  title='[WIP] Feedr',
  link='https://feedr.chat',
  :numberOfUsers='numberOfUsers',
  :index='5'
)
  div(slot='description')
    p
      | Feedr is a simple multi-channel support desk. Feedr users configured
      | {{ " " }}
      span(v-if='botCount') {{ botCount }}
      Loader(v-else)
      | {{ " " }}bots.
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.voicy')
      v-col(cols='12', md='6')
        BarChart(:chartData='userData')
      v-col(cols='12', md='6')
        BarChart(:chartData='botsData')
    v-row.d-flex.flex-row.justify-center.align-center.my-4(v-if='!stats.voicy')
      Loader
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
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
export default class Feedr extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.feedr
      ? toSpaces(this.stats.userCountSeparate.feedr)
      : undefined
  }

  get botCount() {
    return this.stats.feedr ? toSpaces(this.stats.feedr.db.botCount) : undefined
  }

  get userData() {
    return !this.stats.feedr
      ? emptyDataSet
      : {
          labels: this.stats.feedr.db.userDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new users',
              backgroundColor: this.color,
              data: this.stats.feedr.db.userDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }

  get botsData() {
    return !this.stats.feedr
      ? emptyDataSet
      : {
          labels: this.stats.feedr.db.botDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new bots',
              backgroundColor: this.color,
              data: this.stats.feedr.db.botDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }
}
</script>
