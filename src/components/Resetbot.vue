<template lang="pug">
ProjectCard(
  title='ResetBot',
  link='https://resetbot.com',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.resetbot',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import { namespace } from 'vuex-class'
import { Prop } from 'vue-property-decorator'
import { createCloudflareData } from '@/helpers/createCloudflareData'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Resetbot extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'This website is intended to reset your Telegram bot getUpdates method. Useful, when bot updates get stuck for some unknown reason. ',
        {
          url: 'https://github.com/backmeupplz/reset-bot',
          name: 'Open source',
        },
        '.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.resetbot)]
  }
}
</script>
