<template lang="pug">
ProjectCard(title='Borodutch', link='https://borodutch.com', :index='9')
  div(slot='description')
    p This is this website! Quite spectacular that you can check the requests to it as well in 21st century, right? Don't expect it to have many hits though as it's mainly visited by myself to check on the projects metrics.
    p
      | It's open source. Here's the code for
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/borodutch') the website
      | {{ " " }}
      | and for
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/borodutch-stats') the stats server
      | .
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.voicy')
      v-col(cols='12', md='6')
        BarChart(:chartData='chartsData')
    v-row.d-flex.flex-row.justify-center.align-center.my-4(v-if='!stats.voicy')
      Loader
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import ProjectCard from '@/components/ProjectCard.vue'
import BarChart from '@/components/BarChart.vue'
import Loader from '@/components/Loader.vue'
import Link from '@/components/Link.vue'
import { emptyDataSet } from '@/helpers/emptyDataSet'
import { daysAgo } from '@/helpers/daysAgo'

const AppStore = namespace('AppStore')

@Component({
  components: { BarChart, ProjectCard, Loader, Link },
})
export default class Borodutch extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  get chartsData() {
    return !this.stats.borodutch
      ? emptyDataSet
      : {
          labels: this.stats.borodutch
            .map((a: any, i: number) => daysAgo(i))
            .reverse(),
          datasets: [
            {
              label: 'Number of visits',
              backgroundColor: this.color,
              data: this.stats.borodutch,
            },
          ],
        }
  }
}
</script>
