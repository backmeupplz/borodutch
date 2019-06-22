<template lang="pug">
  v-card
    v-card-title
      .headline Please, no
      v-btn(flat icon color='grey' @click='open("https://pleaseno.me")')
        v-icon(small) link
    v-card-text
      p
        | A simple webpage that has two pages: one just shows "Please, no" text, another also shows a "Please, no" GIF. I use it when I can simply answer "Please, no" to particular things. Completely free and 
        a(href="https://github.com/backmeupplz/pleaseno") open source
        | . Hosted on the GitHub Pages as well.
      bar-chart(:chart-data='datacollection')
      .title.pb-2 Publications
      ul
        li(v-for='link in links')
          a(:href='link.link' target="_blank") {{link.name}}
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
export default class Pleaseno extends Vue {
  links = [
    {
      link: "https://www.producthunt.com/posts/please-no",
      name: "Product Hunt: Please, no"
    }
  ];

  datacollection: any = {
    labels: [],
    datasets: []
  };

  get stats() {
    return store.stats().pleaseno;
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

  open(link: string) {
    window.open(link, "_blank");
  }
}
</script>