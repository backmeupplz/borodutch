<template lang="pug">
  v-card
    v-card-title
      .headline Fondu
      v-btn(flat icon color='grey' @click='open("https://fondu.io")')
        v-icon(small) link
    v-card-text
      p
        | ERC-20 Ethereum smart-contract builder. Completely free and 
        a(href="https://github.com/backmeupplz/fondu") open source
        | . Hosted on the GitHub Pages.
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
export default class Fondu extends Vue {
  links = [
    {
      link: "https://www.producthunt.com/posts/fondu",
      name: "Product Hunt: Fondu"
    },
    {
      link:
        "https://www.bitrates.com/news/p/fondu-lets-anyone-write-ethereum-smart-contracts-no-programming-experience-needed",
      name:
        "Bitrates: Fondu Lets Anyone Write Ethereum Smart Contracts, No Programming Experience Needed"
    },
    {
      link:
        "https://thenextweb.com/hardfork/2018/08/07/smart-contracts-blockchain-ethereum/",
      name:
        "The New Web: This app makes writing Ethereum smart contracts super easy, perhaps too easy"
    },
    {
      link:
        "https://coinnewsnation.com/2018/08/this-app-makes-it-super-easy-to-write-smart-contracts-for-ethereum/",
      name:
        "CoinNews Nation: This app makes it super easy to write smart contracts for Ethereum"
    },
    {
      link:
        "https://www.chepicap.com/en/news/2745/new-fondu-app-lets-users-create-ethereum-smart-contracts-more-easily.html",
      name:
        "Chepicap: New Fondu app lets users create Ethereum smart contracts more easily"
    },
    {
      link:
        "https://cryptodaily.co.uk/2018/08/building-your-own-cryptocurrency-on-the-ethereum-blockchain-just-got-easier",
      name:
        "CryptoDaily: Building Your Own Cryptocurrency On The Ethereum Blockchain Just Got Easier"
    }
  ];

  datacollection: any = {
    labels: [],
    datasets: []
  };

  get stats() {
    return store.stats().fondu;
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