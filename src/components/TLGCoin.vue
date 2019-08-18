<template lang="pug">
  v-card
    v-card-title
      .headline TLGCoin
      v-btn(flat icon color='grey' @click='open("https://t.me/tlgcoin_bot")')
        v-icon(small) link
    v-card-text
      p
        | Telegram clicker-bot with internal currency and fancy duels. It's like cookie clicker, but in Telegram and with competitive element. Completely free and 
        a(href="https://github.com/backmeupplz/tlgcoin") open source
        | .
      p TLGCoin was used by {{stats ? stats.userCount : '~'}} users, who mined {{stats ? stats.coinsCount : '~'}} coins.
      bar-chart(:chart-data='datacollection')
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
export default class TLGCoin extends Vue {
  datacollection: any = {
    labels: [],
    datasets: []
  };

  get stats() {
    return store.stats().tlgcoin;
  }

  @Watch("stats")
  statsChanged() {
    this.datacollection = {
      labels: this.stats.userDaily.map((a: any) => daysAgo(a._id)).reverse(),
      datasets: [
        {
          label: "Number of new users",
          backgroundColor: "#f87979",
          data: this.stats.userDaily.map((o: any) => o.count).reverse()
        }
      ]
    };
  }

  open(link: string) {
    window.open(link, "_blank");
  }
}
</script>