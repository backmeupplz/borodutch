<template lang="pug">
  v-card
    v-card-title
      .headline Mamkin Trade
      v-btn(flat icon color='grey' @click='open("https://mamkin.trade")')
        v-icon(small) link
    v-card-text
      p
        | Mamkin Trade is a crypto and stocks virtual trading platform, officially declared to be safe for your mental health. Completely free and 
        a(href="https://github.com/mamkin-trade") open source
        | .
      p Mamkin Trade was used by {{stats ? stats.userCount : '~'}} users who created {{stats ? stats.orderCount : '~'}} orders trading ${{stats ? stats.website.totalUSDTraded.toFixed(2) : '~'}}.
      bar-chart(:chart-data='userData')
      bar-chart(:chart-data='orderData')
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import BarChart from "./BarChart.vue";
import * as store from "../plugins/store";
import { daysAgo } from "../helpers/daysAgo";

@Component({
  components: { BarChart }
})
export default class MT extends Vue {
  userData: any = {
    labels: [],
    datasets: []
  };
  orderData: any = {
    labels: [],
    datasets: []
  };

  get stats() {
    return store.stats().mt;
  }

  @Watch("stats")
  statsChanged() {
    this.userData = {
      labels: this.stats.userDaily
        .filter((o: any) => o._id !== null)
        .map((a: any) => daysAgo(a._id))
        .reverse(),
      datasets: [
        {
          label: "Number of new users",
          backgroundColor: "#f87979",
          data: this.stats.userDaily
            .filter((o: any) => o._id !== null)
            .map((o: any) => o.count)
        }
      ]
    };

    this.orderData = {
      labels: this.stats.orderDaily.map((a: any) => daysAgo(a._id)).reverse(),
      datasets: [
        {
          label: "Number of new orders",
          backgroundColor: "#f87979",
          data: this.stats.orderDaily.map((o: any) => o.count)
        }
      ]
    };
  }

  open(link: string) {
    window.open(link, "_blank");
  }
}
</script>