<template lang="pug">
  v-card
    v-card-title
      .headline Todorant
      v-btn(flat icon color='grey' @click='open("https://todorant.com")')
        v-icon(small) link
    v-card-text
      p Todorant is the only todo manager you will ever need again. It doesn't just help you to keep track of tasks, it manages them for you. Based on "Getting Things Done", "Willpower" and "Eat That Frog" books.
      p Todorant is used by {{stats ? stats.db.userCount : '~'}} users who created {{stats ? stats.db.todoCount : '~'}} todos.
      //- bar-chart(:chart-data='cloudflareData')
      bar-chart(:chart-data='userData')
      bar-chart(:chart-data='todoData')
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
  cloudflareData: any = {
    labels: [],
    datasets: []
  };
  userData: any = {
    labels: [],
    datasets: []
  };
  todoData: any = {
    labels: [],
    datasets: []
  };

  get stats() {
    return store.stats().todorant;
  }

  @Watch("stats")
  statsChanged() {
    this.cloudflareData = {
      labels: this.stats.cloudflare
        .map((a: any, i: number) => daysAgo(i))
        .reverse(),
      datasets: [
        {
          label: "Number of todorant.com visits",
          backgroundColor: "#f87979",
          data: this.stats.cloudflare
        }
      ]
    };

    this.userData = {
      labels: this.stats.db.userDaily.map((a: any) => daysAgo(a._id)).reverse(),
      datasets: [
        {
          label: "Number of new users",
          backgroundColor: "#f87979",
          data: this.stats.db.userDaily.map((o: any) => o.count).reverse()
        }
      ]
    };

    this.todoData = {
      labels: this.stats.db.todoDaily.map((a: any) => daysAgo(a._id)).reverse(),
      datasets: [
        {
          label: "Number of new todos",
          backgroundColor: "#f87979",
          data: this.stats.db.todoDaily.map((o: any) => o.count).reverse()
        }
      ]
    };
  }

  open(link: string) {
    window.open(link, "_blank");
  }
}
</script>