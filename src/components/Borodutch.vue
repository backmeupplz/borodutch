<template lang="pug">
  v-card
    v-card-title
      .headline Borodutch
    v-card-text
      p This is this website! Quite spectacular that you can check the requests to it as well in 21st century, right? Don't expect it to have many hits though as it's mainly visited by myself to check on the projects metrics.
      p
        | It's open source. Here's the code for 
        a(href="https://github.com/backmeupplz/borodutch") the website
        |  and for 
        a(href="https://github.com/backmeupplz/borodutch-stats") the stats server
        | .
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
export default class Borodutch extends Vue {
  datacollection: any = {
    labels: [],
    datasets: []
  };

  get stats() {
    return store.stats().borodutch;
  }

  @Watch("stats")
  statsChanged() {
    this.datacollection = {
      labels: this.stats.map((a: any, i: number) => daysAgo(i)).reverse(),
      datasets: [
        {
          label: "Number of visits",
          backgroundColor: "#f87979",
          data: this.stats
        }
      ]
    };
  }
}
</script>