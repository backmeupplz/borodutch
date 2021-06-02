<template lang="pug">
ProjectCard(
  title='Shieldy',
  link='https://t.me/shieldy_bot',
  :publications='publications',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.shieldy',
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
import { aggregateCount } from '@/helpers/aggregateCount'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Shieldy extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  publications = [
    {
      link: 'https://www.producthunt.com/posts/shieldy',
      name: 'Product Hunt: Shieldy',
    },
    {
      link:
        'https://blog.borodutch.com/shieldy-got-acquired-by-1inch-exchange/',
      name: 'Shieldy got acquired by 1inch Network',
    },
  ]

  get descriptionText() {
    return [
      [
        'Anti-spam Telegram bot that stops 99.99% of annoying spammers by asking users to go throug a very simple captcha-like process and restricting newcomers to only being able to send text (no media). Completely free and ',
        { url: 'https://github.com/backmeupplz/shieldy', name: 'open source' },
        '.',
      ],
      [
        'Shieldy is used by ',
        this.chatCount,
        ' chats. It got acquired by 1inch Network in June 2021.',
      ],
    ]
  }

  get chartsListData() {
    return [
      aggregateCount(
        this.color,
        'Number of new chats',
        this.stats.shieldy ? this.stats.shieldy.chatDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.shieldy
      ? toSpaces(this.stats.userCountSeparate.shieldy)
      : undefined
  }

  get chatCount() {
    return !this.stats || !this.stats.shieldy ? 0 : this.stats.shieldy.chatCount
  }
}
</script>
