<template lang="pug">
ProjectCard(
  title='Shieldy',
  link='https://t.me/shieldy_bot',
  :publications='publications',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.shieldy',
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
export default class Shieldy extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  publications = [
    {
      link: 'https://www.producthunt.com/posts/shieldy',
      name: 'Product Hunt: Shieldy',
    },
    {
      link:
        'https://blog.borodutch.com/shieldy-got-acquired-by-1inch-exchange/',
      name: 'Shieldy got acquired by 1inch Network',
    },
    {
      name: 'Business Wire',
      link:
        'https://www.businesswire.com/news/home/20210605005015/en/Borodutch-Labs%E2%80%99-Nikita-Kolmogorov-Sells-Shieldy-with-20M-Users-to-1inch-Network-in-the-Largest-Telegram-Bot-Deal-so-Far',
    },
    {
      name: 'Financial Post',
      link:
        'https://financialpost.com/pmn/press-releases-pmn/business-wire-news-releases-pmn/borodutch-labs-nikita-kolmogorov-sells-shieldy-with-20m-users-to-1inch-network-in-the-largest-telegram-bot-deal-so-far',
    },
    {
      name: 'Market Watch',
      link:
        'https://www.marketwatch.com/press-release/borodutch-labs-nikita-kolmogorov-sells-shieldy-with-20m-users-to-1inch-network-in-the-largest-telegram-bot-deal-so-far-2021-06-05',
    },
    {
      name: 'Financial Content',
      link:
        'https://markets.financialcontent.com/stocks/news/read?GUID=41432815',
    },
    {
      name: 'Street Insider',
      link:
        'https://www.streetinsider.com/Business+Wire/Borodutch+Labs%E2%80%99+Nikita+Kolmogorov+Sells+Shieldy+with+20M+Users+to+1inch+Network+in+the+Largest+Telegram+Bot+Deal+so+Far/18524977.html',
    },
    {
      name: 'Townhall Finance',
      link:
        'https://markets.financialcontent.com/townhall/news/read?GUID=41432815',
    },
    {
      name: 'WRAL.com',
      link: 'https://markets.financialcontent.com/wral/news/read?GUID=41432815',
    },
    {
      name: 'yahoo!finance',
      link:
        'https://ca.finance.yahoo.com/news/borodutch-labs-nikita-kolmogorov-sells-160700214.html',
    },
  ]

  get descriptionText() {
    return [
      [
        'Anti-spam Telegram bot that stops 99.99% of annoying spammers by asking users to go through a very simple captcha-like process and restricting newcomers to only being able to send text (no media). Completely free and ',
        { url: 'https://github.com/backmeupplz/shieldy', name: 'open source' },
        '.',
      ],
      [
        'Shieldy is used by ',
        this.chatCount,
        ' chats. It got acquired by 1inch Network in June 2021.',
      ],
    ]
  }

  get chartsListData() {
    return [
      aggregateCount(
        this.color,
        'Number of new chats',
        this.stats.shieldy ? this.stats.shieldy.chatDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.shieldy
      ? toSpaces(this.stats.userCountSeparate.shieldy)
      : undefined
  }

  get chatCount() {
    return !this.stats || !this.stats.shieldy ? 0 : this.stats.shieldy.chatCount
  }
}
</script>
