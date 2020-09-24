<template lang="pug">
ProjectCard(
  title='Golden Borodutch',
  link='https://t.me/golden_borodutch',
  :index='6',
  noExtra='true'
)
  div(slot='description')
    p
      | It's my personal micro-blog with
      | {{ " " }}
      span(v-if='numberOfUsers') {{ numberOfUsers }}
      Loader(v-else)
      | {{ " " }}
      | subscribers. Nothing special, just some thoughts about business, IT, development, book reviews, lifestyle facts, etc. Careful: it's in Russian. If you want to read my long reads in English, here's
      | {{ " " }}
      Link(url='https://blog.borodutch.com') a link to my English blog
      | .
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import Loader from '@/components/Loader.vue'
import Link from '@/components/Link.vue'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard, Loader, Link },
})
export default class GoldenBorodutch extends Vue {
  @AppStore.State stats?: any

  get numberOfUsers() {
    return this.stats.goldenBorodutch
      ? toSpaces(this.stats.goldenBorodutch.subCount)
      : undefined
  }
}
</script>
