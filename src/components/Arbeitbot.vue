<template lang="pug">
ProjectCard(
  title='ArbeitBot',
  link='https://t.me/arbeit_bot',
  :publications='publications',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.arbeitbot',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import { Prop } from 'vue-property-decorator'
import { createCloudflareData } from '@/helpers/createCloudflareData'
import { aggregateCount } from '@/helpers/aggregateCount'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Arbeitbot extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

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

  get descriptionText() {
    return [
      [
        "Freelance market as a Telegram bot with a twist. Instead of releasing the job to all the candidates on the platform, employers pick freelancers they like and freelancers only see employers' profiles if they get accepted. Completely free and ",
        { url: 'https://github.com/arbeitbot', name: 'open source' },
        '.',
      ],
      ['ArbeitBot users created ', this.jobCount, ' jobs.'],
    ]
  }

  get chartsListData() {
    return [
      createCloudflareData(
        this.color,
        this.stats.arbeitbot ? this.stats.arbeitbot.website : undefined
      ),
      aggregateCount(
        this.color,
        'Number of new users',
        this.stats.arbeitbot ? this.stats.arbeitbot.userDaily : undefined
      ),
      aggregateCount(
        this.color,
        'Number of new jobs',
        this.stats.arbeitbot ? this.stats.arbeitbot.jobDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.arbeitBot
      ? 0
      : toSpaces(this.stats.userCountSeparate.arbeitBot)
  }

  get jobCount() {
    return !this.stats || !this.stats.arbeitbot
      ? 0
      : this.stats.arbeitbot.jobCount
  }
}
</script>
