<template lang="pug">
ProjectCard(
  title='Post Your Startup',
  link='https://postyourstartup.com',
  :publications='publications',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.postyourstartup',
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
export default class PostYourStartup extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  publications = [
    {
      link: 'https://www.producthunt.com/posts/post-your-startup',
      name: 'Product Hunt: Post Your Startup',
    },
  ]

  get descriptionText() {
    return [
      [
        'A list of >120 places to post your startup. I went through ',
        {
          url: 'https://www.placestopostyourstartup.com/',
          name: 'placestopostyourstartup.com',
        },
        ', posted Todorant everywhere and left notes along the way. You can sort and filter the result any way you want. It is also ',
        {
          url: 'https://github.com/backmeupplz/postyourstartup',
          name: 'open source',
        },
        '.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.postyourstartup)]
  }
}
</script>
