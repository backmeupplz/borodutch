<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'title'],
  mounted() {
    this.renderChart(this.chartdata)
  },
  watch: {
    chartData() {
      console.log('Chart data changed')
    },
  },
}
</script>
