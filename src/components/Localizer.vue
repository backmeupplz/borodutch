<template lang="pug">
ProjectCard(
  title='Localizer',
  link='https://localizer.dev',
  :publications='publications',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.localizer',
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
export default class Localizer extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  publications = [
    {
      link: 'https://www.producthunt.com/posts/localizer',
      name: 'Product Hunt: Localizer',
    },
  ]

  get descriptionText() {
    return [
      [
        'A free open-source self-hosted crowd-translating service. Check out examples at ',
        { url: 'https://localize.todorant.com', name: 'localize.todorant.com' },
        ' and ',
        {
          url: 'https://localize.borodutch.com',
          name: 'localize.borodutch.com',
        },
        '. It is also ',
        {
          url: 'https://github.com/backmeupplz/localizer-backend',
          name: 'open source',
        },
        '.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.localizer)]
  }
}
</script>
