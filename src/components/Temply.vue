<template lang="pug">
ProjectCard(
  title='Temply',
  link='https://t.me/temply_bot',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.temply',
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
export default class Temply extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Inline Telegram bot allowing users to create varios text templates an quickly use them later. Pretty useful for support workers as well as channel administrators. Completely free and ',
        { url: 'https://github.com/backmeupplz/temply', name: 'open source' },
        '.',
      ],
      ['Temply users created ', this.templatesCount, ' templates.'],
    ]
  }

  get chartsListData() {
    return [
      aggregateCount(
        this.color,
        'Number of new users',
        this.stats.temply ? this.stats.temply.userDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.temply
      ? 0
      : toSpaces(this.stats.userCountSeparate.temply)
  }

  get templatesCount() {
    return !this.stats || !this.stats.temply
      ? 0
      : this.stats.temply.templatesCount
  }
}
</script>
