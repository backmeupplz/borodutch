<template lang="pug">
ProjectCard(
  title='Localizer',
  link='https://localizer.dev',
  :publications='publications',
  :index='12'
)
  div(slot='description')
    p
      | A free open-source self-hosted crowd-translating service. Check out examples at
      | {{ " " }}
      Link(url='https://localize.todorant.com') localize.todorant.com
      | {{ " " }}
      | and
      | {{ " " }}
      Link(url='https://localize.borodutch.com') localize.borodutch.com
      | . It is also
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/localizer-backend') open source
      | .
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.voicy')
      v-col(cols='12', md='6')
        BarChart(:chartData='cloudflareData')
    v-row.d-flex.flex-row.justify-center.align-center.my-4(
      v-if='!stats.localizer'
    )
      Loader
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { daysAgo } from '../helpers/daysAgo'
import { namespace } from 'vuex-class'
import ProjectCard from '@/components/ProjectCard.vue'
import BarChart from '@/components/BarChart.vue'
import Loader from '@/components/Loader.vue'
import Link from '@/components/Link.vue'
import { emptyDataSet } from '@/helpers/emptyDataSet'
const AppStore = namespace('AppStore')

@Component({
  components: { BarChart, ProjectCard, Loader, Link },
})
export default class Localizer extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  publications = [
    {
      link: 'https://www.producthunt.com/posts/localizer',
      name: 'Product Hunt: Localizer',
    },
  ]

  get cloudflareData() {
    return !this.stats.localizer
      ? emptyDataSet
      : {
          labels: this.stats.localizer
            .map((a: any, i: number) => daysAgo(i))
            .reverse(),
          datasets: [
            {
              label: 'Number of visits',
              backgroundColor: this.color,
              data: this.stats.localizer,
            },
          ],
        }
  }
}
</script>
