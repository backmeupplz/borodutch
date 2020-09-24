<template lang="pug">
ProjectCard(
  title='Randy Marsh',
  link='https://t.me/randymbot',
  :numberOfUsers='numberOfUsers',
  :index='3',
  :noExtra='true'
)
  div(slot='description')
    p
      | Telegram raffle bot that allows channel and group admins to execute raffles with prizes among chat members or channel subscribers. Completely free and
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/randymbot') open source
      | .
    p
      | Randy was used in
      | {{ " " }}
      span(v-if='chatCount') {{ chatCount }}
      Loader(v-else)
      | {{ " " }}
      | chats to execute
      | {{ " " }}
      span(v-if='raffleCount') {{ raffleCount }}
      Loader(v-else)
      | {{ " " }}
      | raffles.
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Link from '@/components/Link.vue'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import ProjectCard from '@/components/ProjectCard.vue'
import Loader from '@/components/Loader.vue'

const AppStore = namespace('AppStore')

@Component({
  components: {
    Link,
    ProjectCard,
    Loader,
  },
})
export default class Randym extends Vue {
  @AppStore.State stats?: any

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.randy
      ? toSpaces(this.stats.userCountSeparate.randy)
      : undefined
  }

  get chatCount() {
    return !this.stats.randym
      ? undefined
      : toSpaces(this.stats.randym.chatCount)
  }

  get raffleCount() {
    return !this.stats.randym
      ? undefined
      : toSpaces(this.stats.randym.raffleCount)
  }
}
</script>
