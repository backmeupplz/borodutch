<template lang="pug">
ProjectCard(
  title='DeleteNudesBot',
  link='https://t.me/DeleteNudesBot',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.deletenudesbot',
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
export default class DeleteNudesBot extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        "This bot deletes all nude pictures so that groups don't get banned by Telegram for explicit content. Simply add it to a group, give it admin rights to delete messages and you are done! Completely free and ",
        {
          url: 'https://github.com/backmeupplz/DeleteNudesBot',
          name: 'open source',
        },
        '.',
      ],
      ['DeleteNudesBot protects ', this.chatCount, ' chats.'],
    ]
  }

  get chartsListData() {
    return [
      aggregateCount(
        this.color,
        'Number of new chats',
        this.stats.deletenudesbot
          ? this.stats.deletenudesbot.chatDaily
          : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.deletenudesbot
      ? 0
      : toSpaces(this.stats.userCountSeparate.deletenudesbot)
  }

  get chatCount() {
    return !this.stats || !this.stats.deletenudesbot
      ? 0
      : this.stats.deletenudesbot.chatCount
  }
}
</script>
