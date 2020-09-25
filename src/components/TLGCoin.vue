<template lang="pug">
ProjectCard(
  title='TLGCoin',
  link='https://t.me/tlgcoin_bot',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.tlgcoin',
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
export default class TLGCoin extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        "Telegram clicker-bot with internal currency and fancy duels. It's like cookie clicker, but in Telegram and with competitive element. Completely free and ",
        { url: 'https://github.com/backmeupplz/tlgcoin', name: 'open source' },
        '.',
      ],

      ['TLGCoin users mined ', this.coinsCount, ' coins.'],
    ]
  }

  get chartsListData() {
    return [
      aggregateCount(
        this.color,
        'Number of new users',
        this.stats.tlgcoin ? this.stats.tlgcoin.userDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.tlgcoin
      ? 0
      : toSpaces(this.stats.userCountSeparate.tlgcoin)
  }

  get coinsCount() {
    return !this.stats || !this.stats.tlgcoin
      ? 0
      : this.stats.tlgcoin.coinsCount
  }
}
</script>
