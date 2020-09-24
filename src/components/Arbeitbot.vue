<template lang="pug">
  v-card
    v-card-title
      .headline ArbeitBot
      v-btn(flat icon color='grey' @click='open("https://t.me/arbeit_bot")')
        v-icon(small) link
    v-card-text
      p
        | Freelance market as a Telegram bot with a twist. Instead of releasing the job to all the candidates on the platform, employers pick freelancers they like and freelancers only see employers' profiles if they get accepted. Completely free and 
        a(href="https://github.com/arbeitbot" target="_blank") open source
        | .
      p ArbeitBot was used by {{stats ? stats.userCount : '~'}} users who created {{stats ? stats.jobCount : '~'}} jobs.
      bar-chart(:chart-data='websiteData')
      bar-chart(:chart-data='userData')
      bar-chart(:chart-data='jobData')
      .title.pb-2 Publications
      ul
        li(v-for='link in links')
          a(:href='link.link' target="_blank") {{link.name}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import BarChart from './BarChart.vue'
import { daysAgo } from '../helpers/daysAgo'

@Component({
  components: { BarChart },
})
export default class Arbeitbot extends Vue {
  // links = [
  //   {
  //     link: 'https://www.producthunt.com/posts/arbeitbot',
  //     name: 'Product Hunt: ArbeitBot',
  //   },
  //   {
  //     link: 'https://habr.com/ru/post/310434/',
  //     name: 'Habr: Как мы написали фриланс-биржу для Telegram',
  //   },
  //   {
  //     link:
  //       'https://spark.ru/startup/arbeitbot/blog/18257/kak-arbeitbot-poluchil-pervie-1250-ustanovok',
  //     name: 'Spark: Как ArbeitBot получил первые 1250 установок',
  //   },
  //   {
  //     link: 'https://vc.ru/flood/21082-telegram-bot-growth',
  //     name:
  //       'VC: Кейс из России: Как мы без бюджета раскрутили два Telegram-бота до 17 500 чатов',
  //   },
  //   {
  //     link: 'https://vc.ru/tribuna/19537-arbeitbot',
  //     name: 'VC: Arbeitbot — бесплатная фриланс-биржа в Telegram',
  //   },
  // ]
  // websiteData: any = {
  //   labels: [],
  //   datasets: [],
  // }
  // userData: any = {
  //   labels: [],
  //   datasets: [],
  // }
  // jobData: any = {
  //   labels: [],
  //   datasets: [],
  // }
  // get stats() {
  //   return store.stats().arbeitbot
  // }
  // @Watch('stats')
  // statsChanged() {
  //   this.userData = {
  //     labels: this.stats.userDaily.map((a: any) => daysAgo(a._id)).reverse(),
  //     datasets: [
  //       {
  //         label: 'Number of new users',
  //         backgroundColor: '#f87979',
  //         data: this.stats.userDaily.map((o: any) => o.count).reverse(),
  //       },
  //     ],
  //   }
  //   this.jobData = {
  //     labels: this.stats.jobDaily.map((a: any) => daysAgo(a._id)).reverse(),
  //     datasets: [
  //       {
  //         label: 'Number of new jobs',
  //         backgroundColor: '#f87979',
  //         data: this.stats.jobDaily.map((o: any) => o.count).reverse(),
  //       },
  //     ],
  //   }
  //   this.websiteData = {
  //     labels: this.stats.website
  //       .map((a: any, i: number) => daysAgo(i))
  //       .reverse(),
  //     datasets: [
  //       {
  //         label: 'Number of arbeitbot.com visits',
  //         backgroundColor: '#f87979',
  //         data: this.stats.website,
  //       },
  //     ],
  //   }
  // }
  // open(link: string) {
  //   window.open(link, '_blank')
  // }
}
</script>
