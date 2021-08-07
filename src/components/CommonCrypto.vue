<template lang="pug">
ProjectCard(
  title='CommonCrypto',
  link='https://commoncrypto.dev',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.commoncrypto',
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
export default class CommonCrypto extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Free to use public API that provides all the tickers for 65+ crypto exchanges. I found the lack of such API disturbing so I created one. Feel free to use for any reason!',
      ],
      [
        'Completely free and ',
        {
          url: 'https://github.com/Borodutch/commoncrypto-backend',
          name: 'open source',
        },
        '.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.commoncrypto)]
  }
}
</script>
