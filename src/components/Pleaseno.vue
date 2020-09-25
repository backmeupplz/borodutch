<template lang="pug">
ProjectCard(
  title='Please, no',
  link='https://pleaseno.me',
  :publications='publications',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.pleaseno',
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
export default class Pleaseno extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  publications = [
    {
      link: 'https://www.producthunt.com/posts/please-no',
      name: 'Product Hunt: Please, no',
    },
  ]

  get descriptionText() {
    return [
      [
        'A simple webpage that has two pages: one just shows "Please, no" text, another also shows a "Please, no" GIF. I use it when I can simply answer "Please, no" to particular things. Completely free and ',
        { url: 'https://github.com/backmeupplz/pleaseno', name: 'open source' },
        '. Hosted on the GitHub Pages as well.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.pleaseno)]
  }
}
</script>
