<template lang="pug">
ProjectCard(
  title='Fondu',
  link='https://fondu.io',
  :publications='publications',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.fondu',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import ProjectCard from '@/components/ProjectCard.vue'
import { namespace } from 'vuex-class'
import { createCloudflareData } from '@/helpers/createCloudflareData'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Fondu extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  publications = [
    {
      link: 'https://www.producthunt.com/posts/fondu',
      name: 'Product Hunt: Fondu',
    },
    {
      link:
        'https://www.bitrates.com/news/p/fondu-lets-anyone-write-ethereum-smart-contracts-no-programming-experience-needed',
      name:
        'Bitrates: Fondu Lets Anyone Write Ethereum Smart Contracts, No Programming Experience Needed',
    },
    {
      link:
        'https://thenextweb.com/hardfork/2018/08/07/smart-contracts-blockchain-ethereum/',
      name:
        'The New Web: This app makes writing Ethereum smart contracts super easy, perhaps too easy',
    },
    {
      link:
        'https://coinnewsnation.com/2018/08/this-app-makes-it-super-easy-to-write-smart-contracts-for-ethereum/',
      name:
        'CoinNews Nation: This app makes it super easy to write smart contracts for Ethereum',
    },
    {
      link:
        'https://www.chepicap.com/en/news/2745/new-fondu-app-lets-users-create-ethereum-smart-contracts-more-easily.html',
      name:
        'Chepicap: New Fondu app lets users create Ethereum smart contracts more easily',
    },
    {
      link:
        'https://cryptodaily.co.uk/2018/08/building-your-own-cryptocurrency-on-the-ethereum-blockchain-just-got-easier',
      name:
        'CryptoDaily: Building Your Own Cryptocurrency On The Ethereum Blockchain Just Got Easier',
    },
  ]

  get descriptionText() {
    return [
      [
        'ERC-20 Ethereum smart-contract builder. Completely free and ',
        { url: 'https://github.com/backmeupplz/fondu', name: 'open source' },
        '. Hosted on the GitHub Pages.',
      ],
    ]
  }

  get chartsListData() {
    return [createCloudflareData(this.color, this.stats.fondu)]
  }
}
</script>
