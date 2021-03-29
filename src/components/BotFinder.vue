<template lang="pug">
ProjectCard(
  title='Bot finder',
  link='https://bot-finder.com',
  :publications='publications',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.botfinder',
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
export default class BotFinder extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  publications = [
    {
      link:
        'https://vc.ru/tribuna/226020-eto-bot-rasshirenie-dlya-brauzera-pokazyvayushchee-bolshe-informacii-o-kommentatorah-na-vc-ru',
      name:
        'VC: «Это бот?» — расширение для браузера, показывающее больше информации о комментаторах на vc.ru',
    },
  ]

  get descriptionText() {
    return [
      [
        'A browser extension that allows you to see registration date, ratings, number of comments and published articles of commentators on vc.ru, TJournal and DTF. Fully ',
        {
          url: 'https://github.com/backmeupplz/bot-finder',
          name: 'open source',
        },
        '.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.botfinder)]
  }
}
</script>
