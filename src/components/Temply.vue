<template lang="pug">
ProjectCard(
  title='Temply',
  link='https://t.me/temply_bot',
  :numberOfUsers='numberOfUsers',
  :index='10'
)
  div(slot='description')
    p
      | Inline Telegram bot allowing users to create varios text templates an quickly use them later. Pretty useful for support workers as well as channel administrators. Completely free and
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/temply') open source
      | .
    p
      | Temply users created
      | {{ " " }}
      span(v-if='templatesCount') {{ templatesCount }}
      Loader(v-else)
      | {{ " " }}
      | templates.
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.voicy')
      v-col(cols='12', md='6')
        BarChart(:chartData='userData')
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
import { daysAgo } from '../helpers/daysAgo'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import { emptyDataSet } from '@/helpers/emptyDataSet'

const AppStore = namespace('AppStore')

@Component({
  components: { BarChart, ProjectCard, Loader, Link },
})
export default class Temply extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.temply
      ? toSpaces(this.stats.userCountSeparate.temply)
      : undefined
  }

  get templatesCount() {
    return this.stats.temply ? this.stats.temply.templatesCount : undefined
  }

  get userData() {
    return !this.stats.temply
      ? emptyDataSet
      : {
          labels: this.stats.temply.userDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new users',
              backgroundColor: this.color,
              data: this.stats.temply.userDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }
}
</script>
