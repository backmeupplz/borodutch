<template lang="pug">
ProjectCard(
  title='Shieldy',
  link='https://t.me/shieldy_bot',
  :publications='publications',
  :numberOfUsers='numberOfUsers',
  :index='1'
)
  div(slot='description')
    p
      | Anti-spam Telegram bot that stops 99.99% of annoying spammers by asking users to go throug a very simple captcha-like process and restricting newcomers to only being able to send text (no media). Completely free and
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/shieldy') open source
      | .
    p
      | Shieldy is used by
      | {{ " " }}
      span(v-if='chatCount') {{ chatCount }}
      Loader(v-else)
      | {{ " " }}
      | chats.
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.shieldy')
      v-col(cols='12', md='6')
        BarChart(:chartData='chartData')
    v-row.d-flex.flex-row.justify-center.align-center.my-4(
      v-if='!stats.shieldy'
    )
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
export default class Shieldy extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  publications = [
    {
      link: 'https://www.producthunt.com/posts/shieldy',
      name: 'Product Hunt: Shieldy',
    },
  ]

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.shieldy
      ? toSpaces(this.stats.userCountSeparate.shieldy)
      : undefined
  }

  get chatCount() {
    return !this.stats.shieldy
      ? undefined
      : toSpaces(this.stats.shieldy.chatCount)
  }

  get chartData() {
    if (!this.stats.shieldy) {
      return emptyDataSet
    }
    const labels = this.stats.shieldy.chatDaily
      .map((a: any) => daysAgo(a._id))
      .reverse()
    const data = this.stats.shieldy.chatDaily.map((o: any) => o.count).reverse()
    return {
      labels,
      datasets: [
        {
          label: 'Number of new chats',
          backgroundColor: this.color,
          data,
        },
      ],
    }
  }
}
</script>
