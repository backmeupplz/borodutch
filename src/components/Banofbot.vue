<template lang="pug">
  v-card
    v-card-title
      .headline Banofbot
      v-btn(flat icon color='grey' @click='open("https://t.me/banofbot")')
        v-icon(small) link
    v-card-text
      p
        | Telegram votekick bot. Allows to fight spammers or introduce democracy to chats by allowing users to vote for kicking specific members. Completely free and 
        a(href="https://github.com/backmeupplz/banofbot") open source
        | .
      p Banofbot was used by {{stats ? stats.userCount : '~'}} users who created {{stats ? stats.requestCount : '~'}} votekick requests in {{stats ? stats.chatCount : '~'}} chats.
      bar-chart(:chart-data='userData')
      bar-chart(:chart-data='chatData')
      bar-chart(:chart-data='requestData')
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
export default class Banofbot extends Vue {
  userData: any = {
    labels: [],
    datasets: []
  };
  chatData: any = {
    labels: [],
    datasets: []
  };
  requestData: any = {
    labels: [],
    datasets: []
  };

  get stats() {
    return store.stats().banofbot;
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

    this.chatData = {
      labels: this.stats.chatDaily.map((a: any) => daysAgo(a._id)).reverse(),
      datasets: [
        {
          label: "Number of new chats",
          backgroundColor: "#f87979",
          data: this.stats.chatDaily.map((o: any) => o.count)
        }
      ]
    };

    this.requestData = {
      labels: this.stats.requestDaily.map((a: any) => daysAgo(a._id)).reverse(),
      datasets: [
        {
          label: "Number of new requests",
          backgroundColor: "#f87979",
          data: this.stats.chatDaily.map((o: any) => o.count)
        }
      ]
    };
  }

  open(link: string) {
    window.open(link, "_blank");
  }
}
</script>