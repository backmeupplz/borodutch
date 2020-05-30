<template lang="pug">
  v-card
    v-card-title
      .headline Post Your Startup
      v-btn(flat icon color='grey' @click='open("https://localizer.dev")')
        v-icon(small) link
    v-card-text
      p
        | A list of >120 places to post your startup. I went through 
        a(href="https://www.placestopostyourstartup.com/") placestopostyourstartup.com
        | , posted Todorant everywhere and left notes along the way. You can sort and filter the result any way you want. It is also 
        a(href="https://github.com/backmeupplz/postyourstartup" target="_blank") open source
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
export default class PostYourStartup extends Vue {
  links = [
    {
      link: 'https://www.producthunt.com/posts/post-your-startup',
      name: 'Product Hunt: Post Your Startup',
    },
  ]

  datacollection: any = {
    labels: [],
    datasets: [],
  }

  get stats() {
    return store.stats().postyourstartup
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
