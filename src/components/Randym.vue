<template lang="pug">
ProjectCard(
  title='Randy Marsh',
  link='https://t.me/randymbot',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :noExtra='true',
  :loading='!stats.randym',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import ProjectCard from '@/components/ProjectCard.vue'
import { Prop } from 'vue-property-decorator'

const AppStore = namespace('AppStore')

@Component({
  components: {
    ProjectCard,
  },
})
export default class Randym extends Vue {
  @AppStore.State stats?: any

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Telegram raffle bot that allows channel and group admins to execute raffles with prizes among chat members or channel subscribers. Completely free and ',
        {
          url: 'https://github.com/backmeupplz/randymbot',
          name: 'open source',
        },
        '.',
      ],
      [
        'Randy was used in ',
        this.chatCount,
        ' chats to execute ',
        this.raffleCount,
        ' raffles.',
      ],
    ]
  }

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.randy
      ? toSpaces(this.stats.userCountSeparate.randy)
      : undefined
  }

  get chatCount() {
    return !this.stats || !this.stats.randym ? 0 : this.stats.randym.chatCount
  }

  get raffleCount() {
    return !this.stats || !this.stats.randym ? 0 : this.stats.randym.raffleCount
  }
}
</script>
