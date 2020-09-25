<template lang="pug">
ProjectCard(
  title='Mamkin Trade',
  link='https://mamkin.trade',
  :publications='publications',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.mt',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'
import { Prop } from 'vue-property-decorator'
import { aggregateCount } from '@/helpers/aggregateCount'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class MT extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  publications = [
    {
      link: 'https://www.producthunt.com/posts/mamkin-trade',
      name: 'Product Hunt: Mamkin Trade',
    },
    {
      link:
        'https://vc.ru/dev/68012-kak-ya-zapustil-simulyator-torgov-kriptoy-mamkin-treyder-za-dve-nedeli',
      name:
        'VC: Как я запустил симулятор торгов криптой «Мамкин Трейдер» за две недели',
    },
  ]

  get descriptionText() {
    return [
      [
        'Mamkin Trade is a crypto and stocks virtual trading platform, officially declared to be safe for your mental health. Completely free and ',
        { url: 'https://github.com/mamkin-trade', name: 'open source' },
        '.',
      ],
      [
        ' Mamkin Trade users created ',
        this.orderCount,
        ' orders trading $',
        this.usdTraded,
        '.',
      ],
    ]
  }

  get chartsListData() {
    return [
      aggregateCount(
        this.color,
        'Number of new users',
        this.stats.mt ? this.stats.mt.userDaily : undefined
      ),
      aggregateCount(
        this.color,
        'Number of new orders',
        this.stats.mt ? this.stats.mt.orderDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.mt
      ? 0
      : toSpaces(this.stats.userCountSeparate.mt)
  }

  get orderCount() {
    return !this.stats || !this.stats.mt ? 0 : this.stats.mt.orderCount
  }

  get usdTraded() {
    return !this.stats || !this.stats.mt
      ? 0
      : parseInt(this.stats.mt.website.totalUSDTraded, 10)
  }
}
</script>
