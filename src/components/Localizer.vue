<template lang="pug">
  v-card
    v-card-title
      .headline Localizer
      v-btn(flat icon color='grey' @click='open("https://localizer.dev")')
        v-icon(small) link
    v-card-text
      p
        | A free open-source self-hosted crowd-translating service. Check out examples at 
        a(href="https://localize.todorant.com" target="_blank") localize.todorant.com
        |  and 
        a(href="https://localize.borodutch.com" target="_blank") localize.borodutch.com
        | . It is also 
        a(href="https://github.com/backmeupplz/localizer-backend" target="_blank") open source
        | .
      bar-chart(:chart-data='datacollection')
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
import * as store from '../plugins/store'
import { daysAgo } from '../helpers/daysAgo'

@Component({
  components: { BarChart },
})
export default class Localizer extends Vue {
  links = [
    {
      link: 'https://www.producthunt.com/posts/localizer',
      name: 'Product Hunt: Localizer',
    },
  ]

  datacollection: any = {
    labels: [],
    datasets: [],
  }

  get stats() {
    return store.stats().localizer
  }

  @Watch('stats')
  statsChanged() {
    this.datacollection = {
      labels: this.stats.map((a: any, i: number) => daysAgo(i)).reverse(),
      datasets: [
        {
          label: 'Number of visits',
          backgroundColor: '#f87979',
          data: this.stats,
        },
      ],
    }
  }

  open(link: string) {
    window.open(link, '_blank')
  }
}
</script>
