<template lang="pug">
ProjectCard(
  title='Magic pill',
  link='https://magicpill.link',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.magicpill',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ProjectCard from '@/components/ProjectCard.vue'
import { createCloudflareData } from '@/helpers/createCloudflareData'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Fixsleep extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'A simple webpage listing benefits of reducing animal product intake based on scientific evidence. Just like with Fix sleep, I built this website to share it with people close to me. To save them time by researching this subject for them.',
      ],
      [
        'Completely free and ',
        {
          url: 'https://github.com/backmeupplz/magicpill',
          name: 'open source',
        },
        '. Hosted on the GitHub Pages.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.magicpill)]
  }
}
</script>
