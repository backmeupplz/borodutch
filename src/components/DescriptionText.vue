<template lang="pug">
div
  p(v-for='(arr, i) in data', :key='i')
    span(v-for='(v, j) in arr', :key='j')
      span(v-if='typeof v === "string"') {{ v }}
      Link(v-if='!!v.url', :url='v.url') {{ v.name }}
      span(v-if='v.preformattedNumber') {{ v.preformattedNumber }}
      Loader(v-else-if='v === 0')
      span(v-if='typeof v === "number" && v !== 0') {{ spaced(v) }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Link from '@/components/Link.vue'
import Loader from '@/components/Loader.vue'
import { Prop } from 'vue-property-decorator'
import { toSpaces } from '@/helpers/toSpaces'

@Component({
  components: { Link, Loader },
})
export default class DescriptionText extends Vue {
  @Prop({ required: true }) data!: (
    | number
    | undefined
    | { url: string; name: string }
    | { preformattedNumber: string }
    | string
  )[][]

  spaced(v: number) {
    return toSpaces(v)
  }
}
</script>

<style></style>
