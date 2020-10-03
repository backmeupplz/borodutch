<template lang="pug">
ProjectCard(
  title='Fix sleep',
  link='https://fixsleep.link',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.fixsleep',
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
        "A simple webpage with 17 rules on how to sleep better. I spent muptiple years researching all the available literature and knowledge on why we sleep and how to improve the quality of sleep. I've bulit this short version with links to scientific papers to share with family and friends because not everybody likes reading long articles.",
      ],
      [
        'Completely free and ',
        { url: 'https://github.com/backmeupplz/fixsleep', name: 'open source' },
        '. Hosted on the GitHub Pages.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.fixsleep)]
  }
}
</script>
