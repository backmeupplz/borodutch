<template lang="pug">
ProjectCard(
  title='Voicy',
  link='https://t.me/voicybot',
  :publications='publications',
  :numberOfUsers='numberOfUsers',
  :index='0'
)
  div(slot='description')
    p Voicy is a Telegram bot that converts speech to text from any voice messages and audio files it receives. This is one of my favorite pet projects. It supports over 100 languages and works with either Wit or Google speech recognition neural networks.
    p
      | Voicy is currently installed at
      | {{ " " }}
      span(v-if='chatCount') {{ chatCount }}
      Loader(v-else)
      | {{ " " }}
      | chats, recognized
      | {{ " " }}
      span(v-if='voiceCount') {{ voiceCount }}
      Loader(v-else)
      | {{ " " }}
      | voice messages resulting in
      | {{ " " }}
      span(v-if='duration') {{ duration }}
      Loader(v-else)
      | {{ " " }}
      | years of speech.
    p
      | If you see that the average response delay is too high — it's probably Telegram servers not giving the bot fresh updates, it happens from time to time. It's
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/voicy') open source
      | .
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.voicy')
      v-col(cols='12', md='6')
        BarChart(:chartData='cloudflareData')
      v-col(cols='12', md='6')
        BarChart(:chartData='voicePerDayData')
      v-col(cols='12', md='6')
        BarChart(:chartData='messagesPerDayData')
      v-col(cols='12', md='6')
        BarChart(:chartData='chatsPerDayData')
      v-col(cols='12', md='6')
        BarChart(:chartData='responseDelay')
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
import { daysAgo, daysAgoLong, formatTime } from '@/helpers/daysAgo'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import { emptyDataSet } from '@/helpers/emptyDataSet'

const AppStore = namespace('AppStore')

@Component({
  components: { BarChart, ProjectCard, Loader, Link },
})
export default class Voicy extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  publications = [
    {
      link: 'https://www.producthunt.com/posts/voicy',
      name: 'Product Hunt: Voicy',
    },
    {
      link: 'https://habr.com/ru/post/316824/',
      name: 'Habr: Рецепт разработки бота под Telegram',
    },
    {
      link:
        'https://spark.ru/startup/voicy/blog/19008/kak-zapustit-proekt-v-odinochku/',
      name: 'Spark: Личный опыт: как запустить проект в одиночку',
    },
    {
      link: 'https://vc.ru/flood/21082-telegram-bot-growth',
      name:
        'VC: Кейс из России: Как мы без бюджета раскрутили два Telegram-бота до 17 500 чатов',
    },
  ]

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.voicy
      ? toSpaces(this.stats.userCountSeparate.voicy)
      : undefined
  }

  get chatCount() {
    return !this.stats.voicy
      ? undefined
      : toSpaces(this.stats.voicy.stats.chatCount)
  }

  get voiceCount() {
    return !this.stats.voicy
      ? undefined
      : toSpaces(this.stats.voicy.stats.voiceCount)
  }

  get duration() {
    return !this.stats.voicy
      ? undefined
      : (this.stats.voicy.stats.duration / 60 / 60 / 24 / 365).toFixed(2)
  }

  get cloudflareData() {
    return !this.stats.voicy
      ? emptyDataSet
      : {
          labels: this.stats.voicy.cloudflare
            .map((a: any, i: number) => daysAgo(i))
            .reverse(),
          datasets: [
            {
              label: 'Number of voicybot.com visits',
              backgroundColor: this.color,
              data: this.stats.voicy.cloudflare,
            },
          ],
        }
  }

  get voicePerDayData() {
    return !this.stats.voicy
      ? emptyDataSet
      : {
          labels: this.stats.voicy.stats.hourlyStats.map((a: any) =>
            daysAgo(a._id)
          ),
          datasets: [
            {
              label: 'Number of voice messages recognized per day',
              backgroundColor: this.color,
              data: this.stats.voicy.stats.hourlyStats.map((v: any) => v.count),
            },
          ],
        }
  }

  get messagesPerDayData() {
    return !this.stats.voicy
      ? emptyDataSet
      : {
          labels: this.stats.voicy.stats.messageStats
            .map((a: any, i: number) => daysAgo(i))
            .reverse(),
          datasets: [
            {
              label: 'Number of messages received per day',
              backgroundColor: this.color,
              data: this.stats.voicy.stats.messageStats.map(
                (v: any) => v.count
              ),
            },
          ],
        }
  }

  get chatsPerDayData() {
    let numOfChats = 0
    return !this.stats.voicy
      ? emptyDataSet
      : {
          labels: this.stats.voicy.stats.chatDailyStats
            .map((a: any, i: number) => daysAgoLong(i))
            .reverse(),
          datasets: [
            {
              label: 'Total number of chats per day',
              backgroundColor: this.color,
              data: this.stats.voicy.stats.chatDailyStats.map((v: any) => {
                numOfChats = numOfChats + v.count
                return numOfChats
              }),
            },
          ],
        }
  }

  get responseDelay() {
    let numOfChats = 0
    return !this.stats.voicy
      ? emptyDataSet
      : {
          labels: Object.keys(
            this.stats.voicy.stats.responseTime
          ).map((a: any) => formatTime(new Date(parseInt(a, 10) * 1000))),
          datasets: [
            {
              label: 'Average response delay (s)',
              backgroundColor: this.color,
              data: Object.values(this.stats.voicy.stats.responseTime),
            },
          ],
        }
  }
}
</script>
