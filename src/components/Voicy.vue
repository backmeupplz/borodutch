<template lang="pug">
  v-card
    v-card-title
      .headline Voicy
      v-btn(flat icon color='grey' @click='open("https://t.me/voicybot")')
        v-icon(small) link
    v-card-text
      p Voicy is a Telegram bot that converts speech to text from any voice messages and audio files it receives. This is one of my favorite pet projects. It supports over 100 languages and works with either Wit or Google speech recognition neural networks.
      p Voicy is currently installed at {{stats.stats ? stats.stats.chatCount : '~'}} chats, recognized {{stats.stats ? stats.stats.voiceCount : '~'}} voice messages resulting in {{stats.stats ? (stats.stats.duration / 60 / 60 / 24 / 365).toFixed(2) : '~'}} years of speech.
      p
        | If you see that the average response delay is too high — it's probably Telegram servers not giving the bot fresh updates, it happens from time to time. It's 
        a(href="https://github.com/backmeupplz/voicy") open source
        |.
      bar-chart(:chart-data='cloudflareData')
      bar-chart(:chart-data='voicePerDayData')
      bar-chart(:chart-data='messagesPerDayData')
      bar-chart(:chart-data='chatsPerDayData')
      bar-chart(:chart-data='responseDelay')
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
import { daysAgo, daysAgoLong, formatTime } from "../helpers/daysAgo";

@Component({
  components: { BarChart }
})
export default class Voicy extends Vue {
  links = [
    {
      link: "https://www.producthunt.com/posts/voicy",
      name: "Product Hunt: Voicy"
    },
    {
      link: "https://habr.com/ru/post/316824/",
      name: "Habr: Рецепт разработки бота под Telegram"
    },
    {
      link:
        "https://spark.ru/startup/voicy/blog/19008/kak-zapustit-proekt-v-odinochku/",
      name: "Spark: Личный опыт: как запустить проект в одиночку"
    },
    {
      link: "https://vc.ru/flood/21082-telegram-bot-growth",
      name:
        "VC: Кейс из России: Как мы без бюджета раскрутили два Telegram-бота до 17 500 чатов"
    }
  ];

  cloudflareData: any = {
    labels: [],
    datasets: []
  };
  voicePerDayData: any = {
    labels: [],
    datasets: []
  };
  messagesPerDayData: any = {
    labels: [],
    datasets: []
  };
  chatsPerDayData: any = {
    labels: [],
    datasets: []
  };
  responseDelay: any = {
    labels: [],
    datasets: []
  };

  get stats() {
    const voicy = store.stats().voicy;
    return voicy ? voicy : {};
  }

  @Watch("stats")
  statsChanged() {
    if (!this.stats.cloudflare) {
      return;
    }
    this.cloudflareData = {
      labels: this.stats.cloudflare
        .map((a: any, i: number) => daysAgo(i))
        .reverse(),
      datasets: [
        {
          label: "Number of voicybot.com visits",
          backgroundColor: "#f87979",
          data: this.stats.cloudflare
        }
      ]
    };
    this.voicePerDayData = {
      labels: this.stats.stats.hourlyStats.map((a: any) => daysAgo(a._id)),
      datasets: [
        {
          label: "Number of voice messages recognized per day",
          backgroundColor: "#f87979",
          data: this.stats.stats.hourlyStats.map((v: any) => v.count)
        }
      ]
    };
    this.messagesPerDayData = {
      labels: this.stats.stats.messageStats
        .map((a: any, i: number) => daysAgo(i))
        .reverse(),
      datasets: [
        {
          label: "Number of messages received per day",
          backgroundColor: "#f87979",
          data: this.stats.stats.messageStats.map((v: any) => v.count)
        }
      ]
    };
    let numOfChats = 0;
    this.chatsPerDayData = {
      labels: this.stats.stats.chatDailyStats
        .map((a: any, i: number) => daysAgoLong(i))
        .reverse(),
      datasets: [
        {
          label: "Total number of chats per day",
          backgroundColor: "#f87979",
          data: this.stats.stats.chatDailyStats.map((v: any) => {
            numOfChats = numOfChats + v.count;
            return numOfChats;
          })
        }
      ]
    };
    this.responseDelay = {
      labels: Object.keys(this.stats.stats.responseTime).map((a: any) =>
        formatTime(new Date(parseInt(a, 10) * 1000))
      ),
      datasets: [
        {
          label: "Average response delay (s)",
          backgroundColor: "#f87979",
          data: Object.values(this.stats.stats.responseTime)
        }
      ]
    };
  }

  open(link: string) {
    window.open(link, "_blank");
  }
}
</script>