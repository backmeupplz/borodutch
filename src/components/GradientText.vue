<template lang="pug">
.gradient-text(:style='extraStyle')
  slot
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class GradientText extends Vue {
  @Prop({ required: false }) small?: boolean
  @Prop({ required: false }) color?: string

  get extraStyle() {
    return `background-image: linear-gradient(${this.gradient}); font-size: ${
      this.small ? 30 : this.$vuetify.breakpoint.smAndDown ? 40 : 70
    }px; line-height: ${
      this.small ? 30 : this.$vuetify.breakpoint.smAndDown ? 40 : 70
    }px`
  }

  get gradient() {
    return '46.19deg, #F09819 5.66%, #EDDE5D 94.35%'
  }
}
</script>

<style>
.gradient-text {
  display: inline-block;
  -webkit-background-clip: text;
  background-clip: text;
  width: fit-content;

  font-style: normal;
  font-weight: bold;

  color: white;

  padding-bottom: 15px;
}
@supports ((background-clip: text) or (-webkit-background-clip: text)) and
  ((text-fill-color: transparent) or (-webkit-text-fill-color: transparent)) {
  .gradient-text {
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
