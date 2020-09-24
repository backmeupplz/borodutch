<template lang="pug">
ProjectCard(
  title='Check my text bot',
  link='https://t.me/check_my_text_bot',
  :numberOfUsers='numberOfUsers',
  :index='7',
  :noExtra='true'
)
  div(slot='description')
    p
      | Spellcheck Telegram bot. Just add it to your channel, active in private messages and get notified of any typos you post! Completely free and
      | {{ " " }}
      Link(url='https://github.com/backmeupplz/check_my_text_bot') open source
      | .
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

const AppStore = namespace('AppStore')

@Component({
  components: { BarChart, ProjectCard, Loader, Link },
})
export default class Shieldy extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.speller
      ? toSpaces(this.stats.userCountSeparate.speller)
      : undefined
  }
}
</script>
