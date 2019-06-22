<template lang="pug">
  v-card
    v-card-title
      .headline Golden Borodutch
      v-btn(flat icon color='grey' @click='open("https://t.me/golden_borodutch")')
        v-icon(small) link
    v-card-text
      p It's my personal blog with {{stats ? stats.subCount : '~'}} subscribers. Nothing special, just some thoughts about business, IT, development, book reviews, lifestyle facts, etc. You know, yet another personal blog. I'd be pleased if you subscribed though. Careful: it's in Russian.
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";

@Component
export default class GoldenBorodutch extends Vue {
  get stats() {
    return store.stats().goldenBorodutch;
  }

  open(link: string) {
    window.open(link, "_blank");
  }
}
</script>