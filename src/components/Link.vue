<template lang="pug">
a.link(:href='url' target='_blank')
  slot
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Link extends Vue {
  @Prop({ required: true }) url!: string
}
</script>

<style>
.link {
  color: #edde5d !important;
  outline: 0;
}
</style>
