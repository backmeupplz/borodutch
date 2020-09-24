<template lang="pug">
  v-card
    v-card-title
      .headline [WIP] Feedr
      v-btn(flat icon color='grey' @click='open("https://feedr.chat")')
        v-icon(small) link
    v-card-text
      p Feedr is a simple multi-channel support desk. Feedr is used by {{stats ? stats.db.userCount : '~'}} users who configured {{stats ? stats.db.botCount : '~'}} bots.
      bar-chart(:chart-data='userData')
      bar-chart(:chart-data='botData')
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
export default class Feedr extends Vue {
  // cloudflareData: any = {
  //   labels: [],
  //   datasets: []
  // };
  // userData: any = {
  //   labels: [],
  //   datasets: []
  // };
  // botData: any = {
  //   labels: [],
  //   datasets: []
  // };
  // get stats() {
  //   return store.stats().feedr;
  // }
  // @Watch("stats")
  // statsChanged() {
  //   this.cloudflareData = {
  //     labels: this.stats.cloudflare
  //       .map((a: any, i: number) => daysAgo(i))
  //       .reverse(),
  //     datasets: [
  //       {
  //         label: "Number of feedr.chat visits",
  //         backgroundColor: "#f87979",
  //         data: this.stats.cloudflare
  //       }
  //     ]
  //   };
  //   this.userData = {
  //     labels: this.stats.db.userDaily.map((a: any) => daysAgo(a._id)).reverse(),
  //     datasets: [
  //       {
  //         label: "Number of new users",
  //         backgroundColor: "#f87979",
  //         data: this.stats.db.userDaily.map((o: any) => o.count).reverse()
  //       }
  //     ]
  //   };
  //   this.botData = {
  //     labels: this.stats.db.botDaily.map((a: any) => daysAgo(a._id)).reverse(),
  //     datasets: [
  //       {
  //         label: "Number of new bots",
  //         backgroundColor: "#f87979",
  //         data: this.stats.db.botDaily.map((o: any) => o.count).reverse()
  //       }
  //     ]
  //   };
  // }
  // open(link: string) {
  //   window.open(link, "_blank");
  // }
}
</script>
