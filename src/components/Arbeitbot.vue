<template lang="pug">
ProjectCard(
  title='ArbeitBot',
  link='https://t.me/arbeit_bot',
  :publications='publications',
  :numberOfUsers='numberOfUsers',
  :index='11'
)
  div(slot='description')
    p
      | Freelance market as a Telegram bot with a twist. Instead of releasing the job to all the candidates on the platform, employers pick freelancers they like and freelancers only see employers' profiles if they get accepted. Completely free and
      | {{ " " }}
      Link(url='https://github.com/arbeitbot') open source
      | .
    p
      | ArbeitBot users created
      | {{ " " }}
      span(v-if='jobCount') {{ jobCount }}
      Loader(v-else)
      | {{ " " }}
      | jobs.
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.voicy')
      v-col(cols='12', md='6')
        BarChart(:chartData='cloudflareData')
      v-col(cols='12', md='6')
        BarChart(:chartData='userData')
      v-col(cols='12', md='6')
        BarChart(:chartData='jobData')
    v-row.d-flex.flex-row.justify-center.align-center.my-4(v-if='!stats.voicy')
      Loader
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import BarChart from '@/components/BarChart.vue'
import Loader from '@/components/Loader.vue'
import Link from '@/components/Link.vue'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import { emptyDataSet } from '@/helpers/emptyDataSet'
import { daysAgo } from '@/helpers/daysAgo'

const AppStore = namespace('AppStore')

@Component({
  components: { BarChart, ProjectCard, Loader, Link },
})
export default class Arbeitbot extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  publications = [
    {
      link: 'https://www.producthunt.com/posts/arbeitbot',
      name: 'Product Hunt: ArbeitBot',
    },
    {
      link: 'https://habr.com/ru/post/310434/',
      name: 'Habr: Как мы написали фриланс-биржу для Telegram',
    },
    {
      link:
        'https://spark.ru/startup/arbeitbot/blog/18257/kak-arbeitbot-poluchil-pervie-1250-ustanovok',
      name: 'Spark: Как ArbeitBot получил первые 1250 установок',
    },
    {
      link: 'https://vc.ru/flood/21082-telegram-bot-growth',
      name:
        'VC: Кейс из России: Как мы без бюджета раскрутили два Telegram-бота до 17 500 чатов',
    },
    {
      link: 'https://vc.ru/tribuna/19537-arbeitbot',
      name: 'VC: Arbeitbot — бесплатная фриланс-биржа в Telegram',
    },
  ]

  get numberOfUsers() {
    return this.stats.userCountSeparate &&
      this.stats.userCountSeparate.arbeitBot
      ? toSpaces(this.stats.userCountSeparate.arbeitBot)
      : undefined
  }

  get jobCount() {
    return this.stats.arbeitbot ? this.stats.arbeitbot.jobCount : undefined
  }

  get cloudflareData() {
    return !this.stats.arbeitbot
      ? emptyDataSet
      : {
          labels: this.stats.arbeitbot.website
            .map((a: any, i: number) => daysAgo(i))
            .reverse(),
          datasets: [
            {
              label: 'Number of arbeitbot.com visits',
              backgroundColor: this.color,
              data: this.stats.arbeitbot.website,
            },
          ],
        }
  }
  get userData() {
    return !this.stats.arbeitbot
      ? emptyDataSet
      : {
          labels: this.stats.arbeitbot.userDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new users',
              backgroundColor: this.color,
              data: this.stats.arbeitbot.userDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }
  get jobData() {
    return !this.stats.arbeitbot
      ? emptyDataSet
      : {
          labels: this.stats.arbeitbot.jobDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new jobs',
              backgroundColor: this.color,
              data: this.stats.arbeitbot.jobDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }
}
</script>
