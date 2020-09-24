<template lang="pug">
  v-card
    v-card-title
      .headline ResetBot
      v-btn(flat icon color='grey' @click='open("https://resetbot.com")')
        v-icon(small) link
    v-card-text
      p This website is intended to reset your Telegram bot getUpdates method. Useful, when bot updates get stuck for some unknown reason.
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
export default class Resetbot extends Vue {
  // datacollection: any = {
  //   labels: [],
  //   datasets: []
  // };
  // get stats() {
  //   return store.stats().resetbot;
  // }
  // @Watch("stats")
  // statsChanged() {
  //   this.datacollection = {
  //     labels: this.stats.map((a: any, i: number) => daysAgo(i)).reverse(),
  //     datasets: [
  //       {
  //         label: "Number of visits",
  //         backgroundColor: "#f87979",
  //         data: this.stats
  //       }
  //     ]
  //   };
  // }
  // open(link: string) {
  //   window.open(link, "_blank");
  // }
}
</script>
