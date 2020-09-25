<template lang="pug">
ProjectCard(
  title='Voicy',
  link='https://t.me/voicybot',
  :publications='publications',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.voicy',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import { daysAgo, daysAgoLong, formatTime } from '@/helpers/daysAgo'
import { namespace } from 'vuex-class'
import { emptyDataSet } from '@/helpers/emptyDataSet'
import { toSpaces } from '@/helpers/toSpaces'
import { Prop } from 'vue-property-decorator'
import { createCloudflareData } from '@/helpers/createCloudflareData'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Voicy extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

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

  get descriptionText() {
    return [
      [
        'Voicy is a Telegram bot that converts speech to text from any voice messages and audio files it receives. This is one of my favorite pet projects. It supports over 100 languages and works with either Wit or Google speech recognition neural networks.',
      ],
      [
        'Voicy is currently installed at ',
        this.chatCount,
        ' chats, recognized ',
        this.voiceCount,
        ' voice messages resulting in ',
        { preformattedNumber: this.duration },
        ' years of speech.',
      ],
      [
        "If you see that the average response delay is too high — it's probably Telegram servers not giving the bot fresh updates, it happens from time to time. It's ",
        { url: 'https://github.com/backmeupplz/voicy', name: 'open source' },
        '.',
      ],
    ]
  }

  get chartsListData() {
    return [
      createCloudflareData(
        this.color,
        this.stats.voicy ? this.stats.voicy.cloudflare : undefined
      ),
      this.voicePerDayData,
      this.messagesPerDayData,
      this.chatsPerDayData,
      this.responseDelay,
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.voicy
      ? 0
      : toSpaces(this.stats.userCountSeparate.voicy)
  }

  get chatCount() {
    return !this.stats || !this.stats.voicy
      ? 0
      : this.stats.voicy.stats.chatCount
  }

  get voiceCount() {
    return !this.stats || !this.stats.voicy
      ? 0
      : this.stats.voicy.stats.voiceCount
  }

  get duration() {
    return !this.stats || !this.stats.voicy
      ? 0
      : (this.stats.voicy.stats.duration / 60 / 60 / 24 / 365).toFixed(2)
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
