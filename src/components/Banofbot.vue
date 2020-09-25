<template lang="pug">
ProjectCard(
  title='Banofbot',
  link='https://t.me/banofbot',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.banofbot',
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
export default class Banofbot extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Telegram votekick bot. Allows to fight spammers or introduce democracy to chats by allowing users to vote for kicking specific members. Completely free and ',
        { url: 'https://github.com/backmeupplz/banofbot', name: 'open source' },
        '.',
      ],
      [
        'Banofbot was used to create ',
        this.requestCount,
        ' votekick requests in ',
        this.chatCount,
        ' chats.',
      ],
    ]
  }

  get chartsListData() {
    return [
      aggregateCount(
        this.color,
        'Number of new chats',
        this.stats.banofbot ? this.stats.banofbot.chatDaily : undefined
      ),
      aggregateCount(
        this.color,
        'Number of new requests',
        this.stats.banofbot ? this.stats.banofbot.requestDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.banofbot
      ? 0
      : toSpaces(this.stats.userCountSeparate.banofbot)
  }

  get requestCount() {
    return !this.stats || !this.stats.banofbot
      ? 0
      : this.stats.banofbot.requestCount
  }

  get chatCount() {
    return !this.stats || !this.stats.banofbot
      ? 0
      : this.stats.banofbot.chatCount
  }
}
</script>
