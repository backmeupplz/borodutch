<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartdata)
  },
}
</script>
