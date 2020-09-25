<template lang="pug">
ProjectCard(
  title='Borodutch',
  link='https://borodutch.com',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.borodutch',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import ProjectCard from '@/components/ProjectCard.vue'
import { Prop } from 'vue-property-decorator'
import { createCloudflareData } from '@/helpers/createCloudflareData'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Borodutch extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        "This is this website! Quite spectacular that you can check the requests to it as well in 21st century, right? Don't expect it to have many hits though as it's mainly visited by myself to check on the projects metrics.",
      ],

      [
        "It's open source. Here's the code for ",
        {
          url: 'https://github.com/backmeupplz/borodutch',
          name: 'the website',
        },
        ' and for ',
        {
          url: 'https://github.com/backmeupplz/borodutch-stats',
          name: 'the stats server',
        },
        '.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.borodutch)]
  }
}
</script>
