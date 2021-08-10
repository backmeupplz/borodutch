<template lang="pug">
ProjectCard(
  title='Crypto Granny',
  link='https://t.me/CryptoGrannyLive',
  :index='index',
  :noExtra='true',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import { Prop } from 'vue-property-decorator'

@Component({
  components: { ProjectCard },
})
export default class CryptoGranny extends Vue {
  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Automated alerts when there is enough difference in price between crypto exchanges (including decentralized exchanges) to make a few percents arbitraging coins between them. Supports the most popular exchanges and works 24/7.',
      ],
    ]
  }
}
</script>
