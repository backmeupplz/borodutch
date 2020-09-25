<template lang="pug">
ProjectCard(
  title='Golden Borodutch',
  link='https://t.me/golden_borodutch',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :noExtra='true',
  :loading='!stats.goldenBorodutch',
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

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class GoldenBorodutch extends Vue {
  @AppStore.State stats?: any

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        "It's my personal micro-blog with ",
        this.numberOfUsers,
        " subscribers. Nothing special, just some thoughts about business, IT, development, book reviews, lifestyle facts, etc. Careful: it's in Russian. If you want to read my long reads in English, here's ",
        {
          url: 'https://blog.borodutch.com',
          name: 'a link to my English blog',
        },
        '.',
      ],
    ]
  }

  get numberOfUsers() {
    return !this.stats || !this.stats.goldenBorodutch
      ? 0
      : toSpaces(this.stats.goldenBorodutch.subCount)
  }
}
</script>
