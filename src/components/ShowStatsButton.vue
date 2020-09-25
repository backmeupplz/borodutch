<template lang="pug">
.show-stats-button(@click='clickSafe')
  slot
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class ShowStatsButton extends Vue {
  @Prop({ required: false }) click?: () => void

  clickSafe() {
    if (this.click) {
      this.click()
    }
  }
}
</script>

<style>
.show-stats-button {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.show-stats-button:hover {
  color: black;
  background-color: white;
  opacity: 0.8;
}
@media only screen and (max-width: 450px) {
  .show-stats-button {
    margin-bottom: 18px;
  }
}
</style>
