<template lang="pug">
ProjectCard(
  title='Banofbot',
  link='https://t.me/banofbot',
  :numberOfUsers='numberOfUsers',
  :index='2'
)
  div(slot='description')
    p
      | Telegram votekick bot. Allows to fight spammers or introduce democracy to chats by allowing users to vote for kicking specific members. Completely free and
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/banofbot') open source
      | .
    p
      | Banofbot was used to create
      | {{ " " }}
      span(v-if='requestCount') {{ requestCount }}
      Loader(v-else)
      | {{ " " }}
      | votekick requests in
      | {{ " " }}
      span(v-if='chatCount') {{ chatCount }}
      Loader(v-else)
      | {{ " " }}
      | chats.
  div(slot='charts')
    v-row(v-show='!!stats.banofbot')
      v-col(cols='12', md='6')
        BarChart(:chartData='chatData')
      v-col(cols='12', md='6')
        BarChart(:chartData='requestData')
    v-row.d-flex.flex-row.justify-center.align-center.my-4(
      v-if='!stats.banofbot'
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
export default class Banofbot extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.banofbot
      ? toSpaces(this.stats.userCountSeparate.banofbot)
      : undefined
  }

  get requestCount() {
    return !this.stats.banofbot
      ? undefined
      : toSpaces(this.stats.banofbot.requestCount)
  }

  get chatCount() {
    return !this.stats.banofbot
      ? undefined
      : toSpaces(this.stats.banofbot.chatCount)
  }

  get chatData() {
    return !this.stats.banofbot
      ? emptyDataSet
      : {
          labels: this.stats.banofbot.chatDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new chats',
              backgroundColor: this.color,
              data: this.stats.banofbot.chatDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }

  get requestData() {
    return !this.stats.banofbot
      ? emptyDataSet
      : {
          labels: this.stats.banofbot.requestDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new requests',
              backgroundColor: this.color,
              data: this.stats.banofbot.requestDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }
}
</script>
