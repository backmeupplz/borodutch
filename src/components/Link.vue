<template lang="pug">
a.link(:href='url', target='_blank', :style='extraStyle')
  slot
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class Link extends Vue {
  @Prop({ required: true }) url!: string

  @AppStore.State gradient!: string

  get extraStyle() {
    return `background-image: linear-gradient(${this.gradient});`
  }
}
</script>

<style>
.link {
  display: inline-block;
  -webkit-background-clip: text;
  background-clip: text;

  outline: 0;

  text-decoration: none;
}

@supports ((background-clip: text) or (-webkit-background-clip: text)) and
  ((text-fill-color: transparent) or (-webkit-text-fill-color: transparent)) {
  .link {
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
