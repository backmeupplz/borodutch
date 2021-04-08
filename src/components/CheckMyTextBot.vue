<template lang="pug">
ProjectCard(
  title='Check my text bot',
  link='https://t.me/check_my_text_bot',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :noExtra='true',
  :loading='!stats.checkMyTextBot',
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

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class CheckMyTextBot extends Vue {
  @AppStore.State stats?: any

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Spellcheck Telegram bot. Just add it to your channel, active in private messages and get notified of any typos you post! Completely free and ',
        {
          url: 'https://github.com/backmeupplz/check_my_text_bot',
          name: 'open source',
        },
        '.',
      ],
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.speller
      ? 0
      : toSpaces(this.stats.userCountSeparate.speller)
  }
}
</script>
