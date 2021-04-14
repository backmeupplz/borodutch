<template lang="pug">
div
  v-row.flex-row.justify-center(v-show='!loading')
    v-col(cols='12', md='6', v-for='(v, i) in data', :key='i')
      BarChart(:chartData='v', :options='chartOptions', :height='200')
  v-row.d-flex.flex-row.justify-center.align-center.my-4(v-if='loading')
    Loader
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import BarChart from '@/components/BarChart.vue'
import Loader from '@/components/Loader.vue'
import { Prop } from 'vue-property-decorator'
import { toSpaces } from '@/helpers/toSpaces'

@Component({
  components: { BarChart, Loader },
})
export default class ChartsList extends Vue {
  @Prop({ required: true }) loading!: boolean
  @Prop({ required: true }) data!: any[]

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  spaced(v: number) {
    return toSpaces(v)
  }
}
</script>

<style></style>
