<template lang="pug">
ProjectCard(
  title='[WIP] Feedr',
  link='https://feedr.chat',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.feedr',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import ProjectCard from '@/components/ProjectCard.vue'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import { aggregateCount } from '@/helpers/aggregateCount'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Feedr extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Feedr is a simple multi-channel support desk. Feedr users configured ',
        this.botCount,
        ' bots.',
      ],
    ]
  }

  get chartsListData() {
    return [
      aggregateCount(
        this.color,
        'Number of new users',
        this.stats.feedr ? this.stats.feedr.db.userDaily : undefined
      ),
      aggregateCount(
        this.color,
        'Number of new bots',
        this.stats.feedr ? this.stats.feedr.db.botDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.feedr
      ? 0
      : toSpaces(this.stats.userCountSeparate.feedr)
  }

  get botCount() {
    return !this.stats || !this.stats.feedr ? 0 : this.stats.feedr.db.botCount
  }
}
</script>
