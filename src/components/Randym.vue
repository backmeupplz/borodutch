<template lang="pug">
  v-card
    v-card-title
      .headline Randy Marsh
      v-btn(flat icon color='grey' @click='open("https://t.me/randymbot")')
        v-icon(small) link
    v-card-text
      p
        | Telegram raffle bot that allows channel and group admins to execute raffles with prizes among chat members or channel subscribers. Completely free and 
        a(href="https://github.com/backmeupplz/randymbot") open source
        | .
      p Randy was used in {{stats ? stats.chatCount : '~'}} chats to execute {{stats ? stats.raffleCount : '~'}} raffles.
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";

@Component
export default class Randym extends Vue {
  get stats() {
    return store.stats().randym;
  }

  open(link: string) {
    window.open(link, "_blank");
  }
}
</script>